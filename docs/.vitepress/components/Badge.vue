
<script>
import { computed } from 'vue'
export default {
  props: {
    type: {
      type: String,
    }
  },
}
</script>

<template>
  <span class="badge" :class="$props.type">
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 3px 5px;
  background-color: #14b337;
  color: white;
  border-radius: 3px;
  font-size: 12px;
}

.badge.warning {
  color: rgb(27, 27, 27);
  background-color: #e29911;

}
.badge.error {
  background-color: #af1717;

}
</style>