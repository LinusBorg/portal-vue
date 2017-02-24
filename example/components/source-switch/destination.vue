<template>
  <div class="item destination">
    <portal-target :name="source" />
  </div>
</template>

<script>
  export default {
    props: ['source'],
  }
</script>

<style>

</style>
