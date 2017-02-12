<template>
  <div>
    <h5>Mount a &lt;portal-target&gt;</h5>
    <button @click="toggle">toggle portal &amp; target</button>
    <portal v-if="show" to="external" mountTarget="#external-target">
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
        show: false
      }
    },
    methods: {
      toggle() { this.show = !this.show },
    },
  }
</script>
