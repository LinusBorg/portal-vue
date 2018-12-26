<template>
  <div>
    <div id="from">
      <portal to="target">
        <p>Content1</p>
      </portal>
    </div>
    <div id="to">
      <portal-target name="target" slim />
    </div>
  </div>
</template>

<script>
export default {}
</script>
