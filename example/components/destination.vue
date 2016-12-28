<template>
  <div class="destination">
    <p>
      Below this paragraph, you see the list todos.<br>
      It was transfered here from the below component with VuePortal.<br>
      Click the "x" remove links - all vue directives continue to work in their original context.
    </p>
    <portal-target name="destination">

    </portal-target>
  </div>
</template>

<script>
  export default {
    name: 'destination',
  }
</script>

<style>
.destination {
  border: 1px solid #333;
  border-radius: 5px;
  margin: 15px;
  margin-top: 30px;
  padding: 15px;
}
</style>
