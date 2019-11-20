
<template>
  <div class="container" ref="cont">
    <slot/>
  </div>
</template>

<script>
// @ts-nocheck
export default {
  name: 'Container',
}
</script>

<style lang="stylus" scoped>
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
