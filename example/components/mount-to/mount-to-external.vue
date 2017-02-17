<template>
  <div>
    <h5>Mount a &lt;portal-target&gt;</h5>
    <button @click="toggle">toggle portal &amp; target</button>
    <button @click="target = ''">Unset targetEl</button>
    <portal v-if="show" to="external" :targetEl="targetEl">
      This content will be portal'ed to an element outside of this Vue app, with the help of the <i>targetEl</i> prop.
    </portal>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        show: false,
        target: '#external-target',
      }
    },
    methods: {
      toggle () { this.show = !this.show },
    },
    computed: {
      targetEl () {
        return this.target === '' ? document.querySelector('#external-target') : this.target
      },
    },
  }
</script>
