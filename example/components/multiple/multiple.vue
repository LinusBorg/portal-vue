<template>
  <div class="wrapper">
    <src v-for="list in lists" :list="list" :key="list.id"></src>
    <destination></destination>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Src from './source.vue'
import Destination from './destination.vue'

const startingItems = [
  'carrots',
  'detergent',
  'lego',
  'mushrooms',
  'pudding',
  'risotto',
  'spaghetti',
  'super nintendo',
  'teddy bear',
  'train set',
  'yoghurt',
]

function pickStartItems(count: number) {
  const items = []
  for (let i = 0; i < count; i++) {
    items.push(startingItems[Math.floor(Math.random() * startingItems.length)])
  }
  return items
}

export default defineComponent({
  components: { Src, Destination },
  data() {
    const lists = []
    const names = ['Grocery List', 'Christmas Presents', 'Menu']
    const orders = [2, 1, 3]
    for (const id in names) {
      lists.push({
        id: orders[id],
        name: names[id],
        enabled: true,
        items: pickStartItems(parseInt(id) + 2),
      })
    }
    return {
      lists,
    }
  },
})
</script>
