<template>
  <div class="target-switch-destination">
    <h5>This is Target "{{ name }}"</h5>
    <portal-target :name="name" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    name: { type: String },
  },
})
</script>

<style></style>
