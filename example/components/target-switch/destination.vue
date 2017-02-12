<template>
  <div class="target-switch-destination">
    <h5>This is Target "{{ name }}"</h5>
    <portal-target :name="name" />
  </div>
</template>

<script>
  export default {
    props: {
      name: { type: String },
    },
    data() {
      return {

      }
    },
    methods: {

    },
  }
</script>

<style>

</style>
