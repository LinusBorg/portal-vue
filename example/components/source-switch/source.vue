<template>
  <div v-if="active === name" class="item source">
    <p>
      <i>This content was portal'ed to {{ `${name}` }}</i>
    </p>
    <portal :to="`${name}`">
      <p>This is Content in Source {{ name }}</p>
    </portal>
  </div>

  <div v-else class="item source">
    <p>This is Content in Source {{ name }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      name: { type: String },
      active: { type: String },
    },
  }
</script>

<style>

</style>
