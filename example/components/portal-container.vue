<template>
  <div class="item" :class="type">
    <div v-if="$slots.header" class="header"><slot name="header" /></div>

    <div class="body"><slot /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const types = ['source', 'destination']

export default defineComponent({
  // @ts-ignore
  abstract: true,
  props: {
    type: {
      type: String,
      required: true,
      validator: (value: string) => types.indexOf(value) !== -1,
    },
  },
})
</script>

<style lang="postcss" scoped>
.header {
  padding: 5px;
  padding-left: 15px;
}
.body {
  padding: 15px;
}

.item {
  border: 1px solid rgb(220, 220, 220);
  border-radius: 2px;
  margin: 15px;
  margin-top: 30px;
}

.item.source {
  border-color: var(--vue-color);
  border-width: 2px;
}

.item.destination {
  border-width: 2px;
  border-color: var(--red);
}
</style>
