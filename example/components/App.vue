<template>
  <div>

    <toggle-example />

    <target-switch />

    <source-switch />

    <disabled />

    <mount-to-external />
  </div>

</template>

<script>
  import ToggleExample from './toggle/toggle-example.vue'
  import TargetSwitch from './target-switch/target-switch.vue'
  import SourceSwitch from './source-switch/source-switch.vue'
  import Disabled from './disabled'
  import MountToExternal from './mount-to/mount-to-external.vue'

  export default {
    components: {
      ToggleExample,
      TargetSwitch,
      SourceSwitch,
      Disabled,
      MountToExternal
    }
  }
</script>

<style>

</style>
