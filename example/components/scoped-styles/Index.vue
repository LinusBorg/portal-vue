<template>
  <div>
    <button @click="show = !show">Toggle</button> <br />
    <div class="wrapper">
      <container type="source">
        <Source :show="show" />
      </container>
      <container type="destination">
        <Destination />
      </container>
    </div>
  </div>
</template>

<script lang="ts">
/*eslint-disable vue/no-reserved-component-names*/
import Source from './Source.vue'
import Destination from './Destination.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    Source,
    Destination,
  },
  setup() {
    const show = ref(false)
    return {
      show,
    }
  },
})
</script>
