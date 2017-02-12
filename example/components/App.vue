<template>
  <div>

    <toggle-example />

    <target-switch />

    <source-switch />

    <mount-to-external />
  </div>

</template>

<script>
  import ToggleExample from './toggle/toggle-example.vue'
  import TargetSwitch from './target-switch/target-switch.vue'
  import SourceSwitch from './source-switch/source-switch.vue'
  import MountToExternal from './mount-to/mount-to-external.vue'

  export default {
    components: {
      ToggleExample,
      TargetSwitch,
      SourceSwitch,
      MountToExternal
    }
  }
</script>

<style>

</style>
