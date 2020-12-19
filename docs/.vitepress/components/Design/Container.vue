<template>
  <div class="container" ref="cont">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Container',
})
</script>

<style scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-items: space-around;
}
container.column {
  flex-direction: column;
  justify-items: flex-start;
}
</style>
