<template>
  <div class="source">
    <p class="source-style">this will be red</p>
    <portal to="scoped-styles-destination" :disabled="show">
      <p class="source-style">
        This text should be red in both source and target
      </p>
    </portal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ScopedStylesSource',
  props: {
    show: {
      type: Boolean,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style scoped>
.source-style {
  color: red;
}
</style>
