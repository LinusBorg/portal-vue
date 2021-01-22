<template>
  <p class="source-style">This should be green</p>
  <div class="portal-target">
    <portal-target name="scoped-styles-destination" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ScopedStylesDestination',
  setup() {
    return {}
  },
})
</script>

<style scoped>
.source-style {
  color: green;
}
</style>
