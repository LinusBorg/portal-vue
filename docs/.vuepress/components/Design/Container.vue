
<template>
  <div class="container" :class="{ column: column }" ref="cont">
    <resize-observer @notify="handleResize"/>
    <slot/>
  </div>
</template>

<script>
// @ts-nocheck
export default {
  name: 'Container',
  data: () => ({
    column: false,
  }),
  methods: {
    handleResize() {
      const { width } = this.$refs.cont.getBoundingClientRect()
      if (width < 600) {
        this.column = true
      } else {
        this.column = false
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~vue-resize/dist/vue-resize.css'

.container {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-items: space-around;

  &.column {
    flex-direction: column;
    justify-items: flex-start;
  }
}
</style>
