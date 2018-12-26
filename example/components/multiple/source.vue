<template>
  <container type="source">
    <h2>{{ list.name }}</h2>

    <form @submit.prevent.stop="addItem">
      <input type="text" v-model="newItem" /> <button>Add</button>
    </form>

    <pre>{{ list.items }}</pre>

    <button @click="togglePortal">Toggle Portal</button>

    <portal
      :name="list.name"
      to="lists"
      :disabled="!list.enabled"
      :order="parseInt(list.id)"
    >
      <h3>{{ list.name }}</h3>
      <ul>
        <li v-for="(item, i) in items" :key="i">{{ item }}</li>
      </ul>
    </portal>
  </container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      newItem: '',
    }
  },

  methods: {
    addItem() {
      this.items.push(this.newItem)
      this.newItem = ''
    },

    togglePortal() {
      this.list.enabled = !this.list.enabled
    },
  },

  computed: {
    items(): Array<string> {
      return this.list.items
    },
  },
})
</script>
