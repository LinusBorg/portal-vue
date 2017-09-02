<template>
  <container type="destination">
    <p>
      Below the line , you see the some content.
    </p>
    <p>
      It was created in the component on the right, and transfered here with VuePortal.<br>
      Click the "x" to remove links - all vue directives continue to work in their original context.<br>
      Hint: When the source component is removed, then the target's content below disappears as well.
    </p>
    <portal-target name="toggle-destination" :transition="{name: 'fade'}" tag="ul">

    </portal-target>
  </container>
</template>

<script>
  export default {
    name: 'destination',
  }
</script>

<style>

</style>
