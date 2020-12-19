<template>
  <div>
    <button @click="disabled = !disabled">Toggle "Disable"</button>
    <Design-Container>
      <Design-Panel color="green" text="Source">
        <p>
          The content below this paragraph is rendered in the right/bottom (red)
          container by PortalVue if the portal is enabled. Otherwise, it's shown
          here in place.
        </p>
        <Portal to="right-disable" :disabled="disabled">
          <p class="red">
            This is content from the left/top container (green).
          </p>
        </Portal>
      </Design-Panel>
      <Design-Panel color="red" text="Target" left>
        <PortalTarget name="right-disable"></PortalTarget>
      </Design-Panel>
    </Design-Container>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    disabled: false,
  }),
})
</script>
