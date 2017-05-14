/*
    portal-vue
    Version: 1.0.0-beta.3
    Licence: MIT
    (c) Thorsten Lünborg
  */
  
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
	typeof define === 'function' && define.amd ? define(['vue'], factory) :
	(global.PortalVue = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

Vue = 'default' in Vue ? Vue['default'] : Vue;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function extractAttributes(el) {
  var map = el.hasAttributes() ? el.attributes : [];
  var attrs = {};
  for (var i = 0; i < map.length; i++) {
    var attr = map[i];
    if (attr.value) {
      attrs[attr.name] = attr.value === '' ? true : attr.value;
    }
  }
  return attrs;
}

function freeze(item) {
  if (Array.isArray(item) || (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
    return Object.freeze(item);
  }
  return item;
}

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var routes = {};

var Wormhole = function () {
  function Wormhole(routes) {
    _classCallCheck(this, Wormhole);

    this.routes = routes;
    this.clearQueue = [];
    this.updateQueue = [];
    this.runScheduled = false;
  }

  _createClass(Wormhole, [{
    key: 'send',
    value: function send(name, passengers) {
      var job = { name: name, passengers: passengers };
      this.updateQueue.push(job);
      this._scheduleRun();
    }
  }, {
    key: 'close',
    value: function close(name) {
      var job = { name: name };
      this.clearQueue.push(job);
      this._scheduleRun();
    }
  }, {
    key: '_scheduleRun',
    value: function _scheduleRun() {
      if (!this.runScheduled) {
        this.runScheduled = true;

        Vue.nextTick(this._runQueue.bind(this));
      }
    }
  }, {
    key: '_runQueue',
    value: function _runQueue() {
      var _this = this;

      var keys = Object.keys(this.routes);

      this.clearQueue.forEach(function (_ref) {
        var name = _ref.name;

        if (keys.includes(name)) {
          _this.routes[name] = undefined;
        }
      });
      this.clearQueue = [];

      this.updateQueue.forEach(function (_ref2) {
        var name = _ref2.name,
            passengers = _ref2.passengers;

        if (keys.includes(name)) {
          _this.routes[name] = freeze(passengers);
        } else {
          Vue.set(_this.routes, name, freeze(passengers));
        }
      });
      this.updateQueue = [];

      this.runScheduled = false;
    }
  }]);

  return Wormhole;
}();
var wormhole = new Wormhole(routes);

var Target = {
  abstract: true,
  name: 'portalTarget',
  props: {
    attributes: { type: Object },
    name: { type: String, required: true },
    slim: { type: Boolean, default: false },
    tag: { type: String, default: 'div' }
  },
  data: function data() {
    return {
      routes: routes
    };
  },
  mounted: function mounted() {
    this.updateAttributes();
  },
  updated: function updated() {
    this.updateAttributes();
  },
  beforeDestroy: function beforeDestroy() {
    this.$el.innerHTML = '';
  },


  methods: {
    updateAttributes: function updateAttributes() {
      if (this.attributes) {
        var attrs = this.attributes;
        var el = this.$el;

        if (attrs.class) {
          attrs.class.trim().split(' ').forEach(function (klass) {
            el.classList.add(klass);
          });
          delete attrs.class;
        }

        var keys = Object.keys(attrs);

        for (var i = 0; i < keys.length; i++) {
          el.setAttribute(keys[i], attrs[keys[i]]);
        }
      }
    }
  },
  computed: {
    passengers: function passengers() {
      return this.routes[this.name] || null;
    },
    renderSlim: function renderSlim() {
      var passengers = this.passengers || [];
      return passengers.length === 1 && !this.attributes && this.slim;
    }
  },

  render: function render(h) {
    var children = this.passengers || [];

    if (this.renderSlim) {
      return children[0];
    } else {
      return h(this.tag, {
        class: { 'vue-portal-target': true }
      }, children);
    }
  }
};

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var inBrowser = typeof window !== 'undefined';

var Portal = {
  abstract: true,
  name: 'portal',
  props: {
    disabled: { type: Boolean, default: false },
    slim: { type: Boolean, default: false },
    tag: { type: [String], default: 'DIV' },
    targetEl: { type: inBrowser ? [String, HTMLElement] : String },
    to: { type: String }
  },

  mounted: function mounted() {
    if (this.targetEl) {
      this.mountToTarget();
    }
    if (!this.disabled) {
      this.sendUpdate();
    }
  },
  updated: function updated() {
    if (this.disabled) {
      this.clear();
    } else {
      this.sendUpdate();
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.clear();
    if (this.mountedComp) {
      this.mountedComp.$destroy();
    }
  },


  watch: {
    to: function to(newValue, oldValue) {
      oldValue && this.clear(oldValue);
      this.sendUpdate();
    },
    targetEl: function targetEl(newValue, oldValue) {
      this.mountToTarget();
    }
  },

  methods: {
    sendUpdate: function sendUpdate() {
      if (this.to) {
        if (this.$slots.default) {
          wormhole.send(this.to, [].concat(_toConsumableArray(this.$slots.default)));
        }
      } else if (!this.to && !this.targetEl) {
        console.warn('[vue-portal]: You have to define a targte via the `to` prop.');
      }
    },
    clear: function clear(target) {
      wormhole.close(target || this.to);
    },
    mountToTarget: function mountToTarget() {
      var el = void 0;
      var target = this.targetEl;

      if (typeof target === 'string') {
        el = document.querySelector(this.targetEl);
      } else if (target instanceof HTMLElement) {
        el = target;
      } else {
        console.warn('[vue-portal]: value of targetEl must eb of type String or HTMLElement');
        return;
      }

      var attributes = extractAttributes(el);

      if (el) {
        var _target = new Vue(_extends({}, Target, {
          parent: this,
          propsData: {
            name: this.to || Math.round(Math.random() * 10000000),
            tag: el.tagName,
            attributes: attributes
          }
        }));
        _target.$mount(el);
        this.mountedComp = _target;
      } else {
        console.warn('[vue-portal]: The specified targetEl ' + this.targetEl + ' was not found');
      }
    }
  },

  render: function render(h) {
    var children = this.$slots.default || [];

    if (children.length && this.disabled) {
      return children.length <= 1 && this.slim ? children[0] : h(this.tag, children);
    } else {
      return h(this.tag, { class: { 'v-portal': true }, style: { display: 'none' }, key: 'v-portal-placeholder' });
    }
  }
};

function install(Vue$$1) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  Vue$$1.component(opts.portalName || 'portal', Portal);
  Vue$$1.component(opts.portalTargetName || 'portal-target', Target);
}
if (typeof window !== 'undefined' && window.Vue) {
  console.log('auto install!');
  window.Vue.use({ install: install });
}

var index = {
  install: install,
  Portal: Portal,
  PortalTarget: Target
};

return index;

})));
//# sourceMappingURL=portal-vue.js.map
