<template>
  <div>
    <button @click="show = !show">Toggle v-if</button>
    {{show}}
    <Design-Container>
      <Design-Panel color="green" text="Source">
        <p>
          The content below this paragraph is
          rendered in the right/bottom (red) container by PortalVue
          if the portal is actually rendered.
          When it's removed again, the content in the red panel will be removed as well.
        </p>
        <Portal v-if="show" to="right-conditional">
          <p class="red">This is content from the left/top container (green).</p>
        </Portal>
      </Design-Panel>
      <Design-Panel color="red" text="Target" left>
        <PortalTarget name="right-conditional"></PortalTarget>
      </Design-Panel>
    </Design-Container>
  </div>
</template>
<script>
export default {
  data: () => ({
    show: true,
  }),
}
</script>
