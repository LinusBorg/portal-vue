<template>
  <div>
    <div id="from">
      <portal to="target" :disabled="disabled">
        <p>Test</p>
      </portal>
    </div>
    <div id="to">
      <portal-target name="target" />
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({ disabled: false }),
}
</script>
