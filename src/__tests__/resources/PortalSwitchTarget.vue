<template>
  <div>
    <div id="from">
      <portal v-bind:to="target">
        <p>Content</p>
      </portal>
    </div>
    <div id="target1">
      <portal-target name="target1" />
    </div>
    <div id="target2">
      <portal-target name="target2" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { target: 'target1' }
  },
}
</script>
