<template>
  <container type="source">
    <h2>{{ list.name }}</h2>

    <form @submit.prevent.stop="addItem">
      <input type="text" v-model="newItem">
      <button>Add</button>
    </form>

    <pre>{{ list.items }}</pre>

    <button @click="togglePortal">Toggle Portal</button>

    <portal to="lists" :disabled="!list.enabled">
      <h3>{{ list.name }}</h3>
      <ul>
        <li v-for="(item, i) in items" :key="i">{{ item }}</li>
      </ul>
    </portal>
  </container>
</template>

<script>
  export default {
    props: ['list'],

    data () {
      return {
        newItem: '',
      }
    },

    methods: {
      addItem () {
        this.items.push(this.newItem)
        this.newItem = ''
      },

      togglePortal () {
        this.list.enabled = !this.list.enabled;
      }
    },

    computed: {
      items () {
        return this.list.items;
      }
    }
  }
</script>