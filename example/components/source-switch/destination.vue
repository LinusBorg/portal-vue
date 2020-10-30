<template>
  <div>
    <portal-target
      :name="source"
      @change="handleChange"
      slim
      :transition="{ name: 'fade', mode: 'out-in' }"
    />
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
    handleChange(newContent: Transport, oldContent: Transport) {
      this.currentSource = newContent.from
    },
  },
})
</script>
