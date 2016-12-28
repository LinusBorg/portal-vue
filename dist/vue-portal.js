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

var Portal = {
	name: 'portal',
  props: {
    to: { type: String, required: true },
    mountTo: { type: String },
    tag: {type: String, default: 'div'},
  },
  beforeMount: function beforeMount() {
  	this.sendUpdate();
  },
  beforeDestroy: function beforeDestroy() {
    wormhole.clear(this.to);
  },
  updated: function updated() {
		this.sendUpdate();
	},
  methods: {
  	sendUpdate: function sendUpdate() {
    	wormhole.sendUpdate(this.to, this.$slots.default);
    },
  },
  render: function render(h) {
  	return  null
  }
};

var PortalTarget = {
	name: 'portalTarget',
  props: {
    name: { type: String, required: true },
    tag: {type: String, default: 'div' }
  },
  beforeMount: function beforeMount() {
		this.checkWormhole();
  	wormhole.$on(this.name, this.update);
  },
  beforeDestroy: function beforeDestroy() {
  	wormhole.$off(this.name, this.update);
  },
  methods: {

		checkWormhole: function checkWormhole() {
			var passengers = wormhole.get(this.name);
			passengers && this.update(passengers);
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
    	class: { 'vue-portal-target': true }
    }, this.passengers)
  }
};

function install(Vue$$1, opts) {
  if ( opts === void 0 ) opts = {};


  Vue$$1.component(opts.portalName || 'portal', Portal);
  Vue$$1.component(opts.portalTargetName || 'portal-target', PortalTarget);
}

var index = {
  install: install,
  Portal: Portal,
  PortalTarget: PortalTarget
};

return index;

})));
