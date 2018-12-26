<template>
  <div class="target-switch-destination">
    <h5>This is Target "{{ name }}"</h5>
    <portal-target :name="name" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: { type: String },
  },
})
</script>

<style></style>
