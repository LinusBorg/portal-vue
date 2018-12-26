<template>
  <div class="panel" :style="style">
    <span
      v-if="text"
      class="text"
      :class="{ left: left }"
      :style="`color: ${color};`"
    >{{ text.toUpperCase() }}</span>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#666',
    },
    text: String,
    left: Boolean,
    order: {
      type: [String, Number],
      default: 0,
    },
  },
  computed: {
    style() {
      const { color, order } = this
      return {
        'border-color': color,
        order: +order,
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.panel {
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 10px;
  position: relative;
  flex: 1 1 100px;
}

.text {
  font-size: 10px;
  position: absolute;
  top: 5px;
  right: 10px;

  &.left {
    right: auto;
    left: 10px;
  }
}
</style>