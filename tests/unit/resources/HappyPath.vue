<template>
  <div>
    <div id="from">
      <portal ref="portal" to="target">
        <p key="1">Test1</p>
        <p key="2">Test2</p>
        <p v-if="show" id="additional">{{ text }}</p>
      </portal>
    </div>
    <div id="to">
      <portal-target name="target" ref="target" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'HappyPath',
  data: () => ({ text: 'Test3', show: false }),
}
</script>
