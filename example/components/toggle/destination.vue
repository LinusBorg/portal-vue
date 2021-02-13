<template>
  <container type="destination">
    <p>Below the line , you see the some content.</p>
    <p>
      It was created in the component on the right, and transfered here with
      VuePortal.
      <br />Click the "x" to remove links - all vue directives continue to work
      in their original context. <br />Hint: When the source component is
      removed, then the target's content below disappears as well.
    </p>
    <ul>
      <portal-target name="toggle-destination">
        <template v-slot:wrapper="nodes">
          <fade-group>
            <component v-for="node in nodes" :is="node" :key="node" />
          </fade-group>
        </template>
      </portal-target>
    </ul>
  </container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'destination',
})
</script>

<style></style>
