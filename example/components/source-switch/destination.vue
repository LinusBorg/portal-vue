<template>
  <div>
    <portal-target :name="source" @change="handleChange" transition="fade" />
    <p>The current source is named: {{ currentSource }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Transport } from '@/types'

export default defineComponent({
  props: ['source'],
  data() {
    return {
      currentSource: '',
    }
  },
  methods: {
    handleChange({ sources }: { sources: string[] }) {
      this.currentSource = sources[0]
    },
  },
})
</script>
