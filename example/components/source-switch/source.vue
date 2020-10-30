<template>
  <div v-if="active === name">
    <p>
      <i>This content was portal'ed to {{ `${name}` }}</i>
    </p>
    <portal :to="name" :name="name">
      <p :key="name">This is Content in Source {{ name }}</p>
    </portal>
  </div>

  <div v-else>
    <p>This is Content in Source {{ name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    name: { type: String },
    active: { type: String },
  },
})
</script>

<style></style>
