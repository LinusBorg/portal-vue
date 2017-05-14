<template>
  <div id="empty-portal-example">
    <div class="wrapper">

      <container type="source">
        <portal to="empty-portal-destination" />
      </container>

      <container type="destination">
        <portal-target name="empty-portal-destination" slim />
      </container>

    </div>
  </div>
</template>

<script>
  // This Example is just used to test that an empty portal works as expected.
  export default {

  }
</script>

<style>

</style>
