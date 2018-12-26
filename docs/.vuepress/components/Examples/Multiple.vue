<template>
  <div>
    <Design-Container>
      <Design-Panel color="green" text="Source #1">
        <button @click="show1 = !show1">Toggle this</button>
        <Portal :disabled="!show1" to="right-multiple" :order="2">
          <p class="red">This is content from the left/top container (green). #1</p>
        </Portal>
      </Design-Panel>
      <Design-Panel color="green" text="Source #2">
        <button @click="show2 = !show2">Toggle this</button>
        <Portal :disabled="!show2" to="right-multiple" :order="1">
          <p class="red">This is content from the left/top container (green) #2.</p>
        </Portal>
      </Design-Panel>
      <Design-Panel color="red" text="Target" left>
        <PortalTarget name="right-multiple" multiple></PortalTarget>
      </Design-Panel>
    </Design-Container>
  </div>
</template>
<script>
export default {
  data: () => ({
    show1: true,
    show2: true,
  }),
}
</script>
