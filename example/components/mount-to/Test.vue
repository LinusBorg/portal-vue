<template>
  <div>Test Injection: {{ testInjection }}</div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

export default defineComponent({
  setup() {
    const testInjection = inject('test')

    return {
      testInjection,
    }
  },
})
</script>

<style scoped></style>
