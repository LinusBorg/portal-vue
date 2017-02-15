<template>
  <div>
    <h5>Mount a &lt;portal-target&gt;</h5>
    <button @click="toggle">toggle portal &amp; target</button>
    <button @click="target = ''">Unset mountTarget</button>
    <portal v-if="show" to="external" :mountTarget="mountTarget">
      This content will be portal'ed to an element outside of this Vue app, with the help of the <i>mountTarget</i> prop.
    </portal>
  </div>
</template>

<script>
  export default {
    props: {

    },
    data() {
      return {
        show: false,
        target: '#external-target'
      }
    },
    methods: {
      toggle() { this.show = !this.show },
    },
    computed: {
      mountTarget() {
          return this.target === '' ? document.querySelector('#external-target') : this.target
      }
    }
  }
</script>
