<template>
  <div>
    <div id="from">
      <portal to="target" :disabled="disabled">
        <p>Portal Content</p>
      </portal>
    </div>
    <div id="to">
      <portal-target name="target">
        <p>Default Content</p>
      </portal-target>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({ disabled: false }),
}
</script>
