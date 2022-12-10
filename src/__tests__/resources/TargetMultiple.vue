<template>
  <div>
    <div id="from1">
      <portal to="target" name="from1" :order="2">
        <p>Content1</p>
      </portal>
    </div>
    <div id="from2">
      <portal to="target" name="from2" :order="1">
        <p>Content2</p>
      </portal>
    </div>
    <div id="to">
      <portal-target name="target" multiple />
    </div>
  </div>
</template>

<script>
export default {}
</script>
