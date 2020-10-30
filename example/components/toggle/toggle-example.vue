<template>
  <div>
    <div>
      <ul class="controls">
        <li class="controls--item">
          <a
            href="#"
            class="controls--link toggle-dest"
            @click.prevent="showDestination = !showDestination"
            >Toggle Destination</a
          >
        </li>
        <li class="controls--item">
          <a
            href="#"
            class="controls--link toggle-source"
            @click.prevent="showSource = !showSource"
            >Toggle Source</a
          >
        </li>
      </ul>
    </div>
    <div class="wrapper" id="sho-hide-example">
      <portal-destination
        class="item"
        v-if="showDestination"
      ></portal-destination>
      <portal-source class="item" v-if="showSource"></portal-source>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import portalSource from './source-comp.vue'
import portalDestination from './destination.vue'

export default defineComponent({
  data() {
    return {
      showDestination: true,
      showSource: true,
    }
  },
  components: {
    portalSource,
    portalDestination,
  },
})
</script>
