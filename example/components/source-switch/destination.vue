<template>
  <div>
    <portal-target :name="source" @change="handleChange" />
    <p>The current source is named: {{currentSource}}</p>
  </div>
</template>

<script>
  export default {
    props: ['source'],
    data () {
      return {
        currentSource: '',
      }
    },
    methods: {
      handleChange (newContent, oldContent) {
        this.currentSource = newContent.from
      },
    },
  }
</script>

<style>

</style>
