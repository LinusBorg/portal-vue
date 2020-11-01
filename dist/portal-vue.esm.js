import { inject, provide, defineComponent, onMounted, onUpdated, onBeforeUnmount, watch, computed, h, getCurrentInstance, createApp, readonly, reactive } from 'vue';

const wormholeSymbol = Symbol('wormhole');
function useWormhole() {
  const wh = inject(wormholeSymbol);

  if (!wh) {
    throw new Error("\n    [portal-vue]: Injection for 'wormhole' not found. \n    Are you sure you installed the plugin with 'app.use(plugin)'?");
  }

  return wh;
}
function provideWormhole(wormhole) {
  provide(wormholeSymbol, wormhole);
}

let _id = 1;
function usePortal(props, slots) {
  const wormhole = useWormhole();

  function sendUpdate() {
    const {
      to,
      name: from,
      order
    } = props;

    if (slots.default) {
      wormhole.open({
        to,
        from,
        order,
        content: slots.default
      });
    } else {
      clear();
    }
  }

  function clear(target) {
    wormhole.close({
      to: target != null ? target : props.to,
      from: props.name
    });
  }

  onMounted(() => {
    if (!props.disabled) {
      sendUpdate();
    }
  });
  onUpdated(() => {
    if (props.disabled) {
      clear();
    } else {
      sendUpdate();
    }
  });
  onBeforeUnmount(() => {
    clear();
  });
  watch(() => props.to, (newTo, oldTo) => {
    if (props.disabled) return;

    if (oldTo && oldTo !== newTo) {
      clear(oldTo);
    }

    sendUpdate();
  });
}
var Portal = defineComponent({
  name: 'portal',
  props: {
    disabled: {
      type: Boolean
    },
    name: {
      type: String,
      default: () => String(_id++)
    },
    order: {
      type: Number,
      default: 0
    },
    slim: {
      type: Boolean
    },
    slotProps: {
      type: Object,
      default: () => ({})
    },
    to: {
      type: String,
      default: () => String(Math.round(Math.random() * 10000000))
    }
  },

  setup(props, {
    slots
  }) {
    usePortal(props, slots);
    return () => {
      if (props.disabled && slots.default) {
        return slots.default(props.slotProps);
      } else {
        return null;
      }
    };
  }

});

const PortalTargetContent = (_, {
  slots
}) => {
  return slots.default == null ? void 0 : slots.default();
};
var PortalTarget = defineComponent({
  name: 'portalTarget',
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    slotProps: {
      type: Object,
      default: () => ({})
    },
    __parent: {
      type: Object
    }
  },

  setup(props, {
    emit,
    slots
  }) {
    // TODO: validate if parent injection works
    // depends on MountingPortalTarget
    if (props.__parent) {
      useParentInjector(props.__parent);
    }

    const wormhole = useWormhole();
    const slotVnodes = computed(() => {
      const transports = wormhole.getContentForTarget(props.name);
      const wrapperSlot = slots.wrapper;
      const rawNodes = transports.map(t => t.content(props.slotProps));
      const vnodes = wrapperSlot ? rawNodes.flatMap(nodes => nodes.length ? wrapperSlot(nodes) : []) : rawNodes.flat(1);
      return {
        vnodes,
        vnodesFn: () => vnodes
      };
    });
    watch(slotVnodes, ({
      vnodes
    }) => {
      const hasContent = vnodes.length > 0;
      const content = wormhole.transports.get(props.name);
      const sources = content ? [...content.keys()] : [];
      emit('change', {
        hasContent,
        sources
      });
    });
    return () => {
      const hasContent = !!slotVnodes.value.vnodes.length;

      if (hasContent) {
        return h(PortalTargetContent, slotVnodes.value.vnodesFn);
      } else {
        slots.default == null ? void 0 : slots.default();
      }
    };
  }

});

function useParentInjector(parent) {
  const vm = getCurrentInstance();
  vm.parent = parent;
}

const inBrowser = typeof window !== 'undefined';
function stableSort(array, compareFn) {
  return array.map((v, idx) => {
    return [idx, v];
  }).sort(function (a, b) {
    return compareFn(a[1], b[1]) || a[0] - b[0];
  }).map(c => c[1]);
}

let _id$1 = 0;
var MountingPortal = defineComponent({
  name: 'MountingPortal',
  inheritAttrs: false,
  props: {
    mountTo: {
      type: String,
      required: true
    },
    // Portal
    disabled: {
      type: Boolean
    },
    // name for the portal
    name: {
      type: String,
      default: () => 'mounted_' + String(_id$1++)
    },
    order: {
      type: Number,
      default: 0
    },
    slotProps: {
      type: Object,
      default: () => ({})
    },
    tag: {
      type: String,
      default: 'DIV'
    },
    // name for the target
    to: {
      type: String,
      default: () => String(Math.round(Math.random() * 10000000))
    },
    // Target
    multiple: {
      type: Boolean,
      default: false
    },
    targetSlotProps: {
      type: Object,
      default: () => ({})
    }
  },

  setup(props, {
    slots
  }) {
    const wormhole = useWormhole();

    if (inBrowser) {
      var _getCurrentInstance;

      const el = getTargetEl(props.mountTo);
      const targetProps = {
        multiple: props.multiple,
        name: props.to,
        slotProps: props.targetSlotProps,
        __parent: (_getCurrentInstance = getCurrentInstance()) == null ? void 0 : _getCurrentInstance.parent
      };
      const app = createApp({
        // TODO: fix Component type error
        render: () => h(PortalTarget, targetProps)
      });
      app.provide(wormholeSymbol, wormhole);
      onBeforeUnmount(() => {
        app.unmount(el);
      });
    }

    usePortal(props, slots);
    return () => {
      if (props.disabled && slots.default) {
        return slots.default();
      } else {
        return null;
      }
    };
  }

});

function getTargetEl(mountTo) {
  const el = document.querySelector(mountTo);

  if (!el) {
    throw new Error("[portal-vue]: Mount Point '" + mountTo + "' not found in document");
  }

  return el;
}

function createWormhole() {
  const transports = reactive(new Map());

  function open(transport) {
    if (!inBrowser) return;
    const {
      to,
      from,
      content,
      order = Infinity
    } = transport;
    if (!to || !from || !content) return;

    if (!transports.has(to)) {
      transports.set(to, new Map());
    }

    const transportsForTarget = transports.get(to);
    const newTransport = {
      to,
      from,
      content,
      order
    };
    transportsForTarget.set(from, newTransport);
  }

  function close(transport) {
    const {
      to,
      from
    } = transport;
    if (!to || !from) return;
    const transportsForTarget = transports.get(to);

    if (!transportsForTarget) {
      return;
    }

    transportsForTarget.delete(from);

    if (!transportsForTarget.size) {
      transports.delete(to);
    }
  }

  function getContentForTarget(target) {
    const transportsForTarget = transports.get(target);
    if (!transportsForTarget) return [];
    return stableSort(Array.from((transportsForTarget == null ? void 0 : transportsForTarget.values()) || []), (a, b) => a.order - b.order);
  }

  return readonly({
    open,
    close,
    transports,
    getContentForTarget
  });
}
const wormhole = createWormhole();

function install(app, options = {}) {
  var _options$wormhole;

  app.component(options.portalName || 'Portal', Portal);
  app.component(options.portalTargetName || 'PortalTarget', PortalTarget);
  app.component(options.MountingPortalName || 'MountingPortal', MountingPortal);
  const wormhole$1 = (_options$wormhole = options.wormhole) != null ? _options$wormhole : wormhole;
  app.provide(wormholeSymbol, wormhole$1);
} // alternative name for named import

const plugin = install;
const Wormhole = wormhole;

export { MountingPortal, Portal, PortalTarget, PortalTargetContent, Wormhole, install, plugin, provideWormhole, useWormhole };
//# sourceMappingURL=portal-vue.esm.js.map
