(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global.VuePortal = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

Vue = 'default' in Vue ? Vue['default'] : Vue;

var buffer = {};

var wormhole = new Vue({
  methods: {
    sendUpdate: function sendUpdate(name, passengers) {
      buffer[name] = passengers;
      this.$emit(name, passengers);
    },
    get: function get(name) {
      return buffer[name] || null
    },
    clear: function clear(name) {
      buffer[name] = null;
      this.$emit(name, null);
    }
  }
});

var Target = {
	name: 'portalTarget',
  props: {
    name: { type: String, required: true },
		id: { type: String },
    tag: { type: String, default: 'div' },
  },

	beforeMount: function beforeMount() {
		this.checkWormhole();
  	wormhole.$on(this.name, this.update);
  },
  beforeDestroy: function beforeDestroy() {
		this.$el.innerHTML = '';
  	wormhole.$off(this.name, this.update);
  },

	watch: {
		name: function name(newName, oldName) {
			wormhole.$off(oldName, this.update);
			wormhole.$on(newName, this.update);
			this.checkWormhole();
		}
	},

	methods: {

		checkWormhole: function checkWormhole() {
			var passengers = wormhole.get(this.name);
			this.update(passengers);
		},

		update: function update(passengers) {

      if (passengers) {
        this.passengers = passengers; // cache vNodes for render function
      } else {
        this.passengers = null;
      }
      this.$forceUpdate(); // force re-render
    }
  },

	render: function render(h) {
  	return h(this.tag, {
    	class: { 'vue-portal-target': true },
			attrs: {
				id: this.id && this.id.substr(1) || false,
			}
    }, this.passengers)
  }
};

var Portal = {
	name: 'portal',
  props: {
    to: { type: String, required: true },
    mountTarget: { type: String },
  },

	beforeMount: function beforeMount() {
		if (this.mountTarget) {
			this.mountToTarget();
		}
  	this.sendUpdate();
  },
  beforeUpdate: function beforeUpdate() {
		this.sendUpdate();
	},
	beforeDestroy: function beforeDestroy() {
		wormhole.clear(this.to);
		if (this.mountedComp) {
			this.mountedComp.$destroy();
		}
	},

	watch: {
		to: function to (newValue, oldValue) {
			oldValue && wormhole.sendUpdate(oldValue, null);
			this.sendUpdate();
		},
		mountTarget: function mountTarget (newValue, oldValue) {
			this.mountToTarget();
		}
	},

	methods: {

		sendUpdate: function sendUpdate() {
			if (this.to) {
				wormhole.sendUpdate(this.to, this.$slots.default);
			} else {
				console.warn('[vue-portal]: You have to define a targte via the `to` prop.');
			}
    },

		mountToTarget: function mountToTarget() {
			var el = document.querySelector(this.mountTarget);

			if (el) {

				var target = new Vue(Object.assign({}, Target,
					{propsData: {
						name: this.to || Math.round(Math.random() * 10000),
						id: this.mountTarget,
						tag: el.tagName,
					}}));
				target.$mount(el);
				this.mountedComp = target;

			} else {
				console.warn('[vue-porta]: The specified mountTarget ' + this.mountTarget + ' was not found');
			}
		}
  },

	render: function render(h) {
  	return  null
  }
};

function install(Vue$$1, opts) {
  if ( opts === void 0 ) opts = {};


  Vue$$1.component(opts.portalName || 'portal', Portal);
  Vue$$1.component(opts.portalTargetName || 'portal-target', Target);
}

var index = {
  install: install,
  Portal: Portal,
  PortalTarget: Target
};

return index;

})));
