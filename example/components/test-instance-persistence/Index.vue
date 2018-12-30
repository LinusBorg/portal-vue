<template>
  <div>
    <br>
    <open-dialog-button @start-processing="loading = true" @stop-processing="loading= false"/>
    <modal-block v-if="loading">Processing...</modal-block>
    <br>
    <portal-target name="modal" multiple></portal-target>
  </div>
</template>

<script>
import Vue from "vue";

const ModalBlock = Vue.extend({
  template: `
  	<portal to="modal">
      <div class="modal-wrapper" :key="_uid">
        <div class="modal-content" >
          <slot />
        </div>
      </div>
    </portal>
  `,
});

const AsyncForm = Vue.extend({
  template: `
  	<form class="async-form">
    	<label>
    		Some valuable input: <input type="text" name="X" v-model="foo" /><br />
			</label>
      <button type="button" @click="_start">
      	Start async action
      </button>
      <button type="button" @click="$emit('close')">
      	Cancel
			</button>
    </form>
  `,
  data() {
    return {
      foo: "",
    };
  },
  methods: {
    _start() {
      this.$emit("start-processing");
      setTimeout(() => {
        this.$emit("end-processing");
      }, 150000);
    },
  },
});

const OpenDialogButton = Vue.extend({
  components: {
    AsyncForm,
    ModalBlock,
  },
  template: `
  	<div>
    	<div class="button-wrapper">
        <button type="button" @click="_dialog">
          Show dialog
        </button>
      </div>
      <modal-block v-if="dialog">
      	<async-form @close="_cancel" @start-processing="start" @stop-processing="stop" :key="_uid"/>
      </modal-block>
    </div>
  `,
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    _dialog() {
      this.dialog = true;
    },
    _cancel() {
      this.dialog = false;
    },
    start() {
      this.$emit("start-processing");
    },
    stop() {
      this.$emit("stop-processing");
    },
  },
});

export default {
  components: {
    OpenDialogButton,
    AsyncForm,
    ModalBlock,
  },
  data() {
    return {
      loading: false,
    };
  },
};
</script>

<style scoped>
</style>