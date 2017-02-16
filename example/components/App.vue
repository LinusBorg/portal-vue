<template>
  <div>

    <toggle-example />

    <target-switch />

    <source-switch />

    <disabled />

    <comp-as-root />

    <mount-to-external />
  </div>

</template>

<script>
  import ToggleExample from './toggle/toggle-example.vue'
  import TargetSwitch from './target-switch/target-switch.vue'
  import SourceSwitch from './source-switch/source-switch.vue'
  import Disabled from './disabled'
  import CompAsRoot from './comp-as-root/comp-as-root.vue'
  import MountToExternal from './mount-to/mount-to-external.vue'

  export default {
    components: {
      ToggleExample,
      TargetSwitch,
      SourceSwitch,
      Disabled,
      CompAsRoot,
      MountToExternal
    }
  }
</script>

<style>

</style>
