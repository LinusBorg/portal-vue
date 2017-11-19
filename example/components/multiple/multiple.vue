<template>
    <div class="wrapper">
      <src v-for="list in lists" :list="list" :key="list.id"></src>
        <destination></destination>
    </div>
</template>

<script>
    import Src from "./source.vue";
    import Destination from './destination.vue';

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
    ];

    function pickStartItems(count) {
      const items = []
      for (let i = 0; i < count; i++) {
        items.push(startingItems[Math.floor(Math.random() * startingItems.length)])
      }
      return items
    }

    export default {
        components: {Src, Destination},
      data() {
          const lists = [];
          const names = ['Grocery List', 'Christmas Presents', 'Menu'];
          for (const id in names) {
            lists.push({
              id,
              name: names[id],
              enabled: true,
              items: pickStartItems(parseInt(id) + 2),
            })
          }
          return {
            lists
          }
      }
    }
</script>