<template>
  <div id="empty-portal-example">
    <div class="wrapper">
      <div class="item source">
        <portal to="empty-portal-destination">

        </portal>
      </div>
      <div class="item destination">
        <portal-target name="empty-portal-destination" slim />
      </div>
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
