<template>
  <div>
    <Portal to="mountedTarget">Test</Portal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mountPortalTarget } from '../../../src'
export default defineComponent({
  setup() {
    mountPortalTarget(
      {
        name: 'mountedTarget',
      },
      '#external-target'
    )
    return {}
  },
})
</script>

<style scoped></style>
