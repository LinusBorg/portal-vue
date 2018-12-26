<template>
  <Design-Container>
    <Design-Panel color="green" text="Source">
      <p>
        The content below this paragraph is
        rendered in the right/bottom (red) container by PortalVue
      </p>
      <Portal to="right-basic">
        <p class="red">
          This is content from the left/top container (green).
          The cool part is, it works across components,
          so you can send your content anywhere!
        </p>
      </Portal>
    </Design-Panel>
    <Design-Panel color="red" text="Target" left>
      <PortalTarget name="right-basic"></PortalTarget>
    </Design-Panel>
  </Design-Container>
</template>