<template>
  <div>
    <portal-target :name="source" @change="handleChange">
      <template #wrapper="nodes">
        <transition name="fade" mode="out-in">
          <component :is="nodes[0]" />
        </transition>
      </template>
    </portal-target>
    <p>The current source is named: {{ currentSource }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['source'],
  data() {
    return {
      currentSource: '',
    }
  },
  methods: {
    handleChange({ sources }: { sources: string[] }) {
      // this.currentSource = sources[0]
    },
  },
})
</script>
