<template>
  <container type="source">
    <p>Here you can add the todos</p>
    <p>
      Normally, they would be rendered below the input, but with VuePortal we
      can render them outside of this component, into the componenton the left
      in this case.
    </p>
    <input type="text" v-model="newTodo" @keyup.enter="add" /><button
      @click="add"
    >
      Add
    </button>
    <portal to="toggle-destination">
      <!-- <ul class="todo-list"> -->
      <li v-for="(todo, index) in todos" :key="todo">
        {{ todo }} (<a href="#" @click.prevent="remove(index)">x</a>)
      </li>
      <!-- </ul> -->
    </portal>
    <p>Below is the raw data from this component</p>
    <pre>{{ $data }}</pre>
  </container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Source',
  data() {
    return {
      newTodo: '',
      todos: ['Todo #1', 'Todo #2'],
    }
  },
  methods: {
    add() {
      this.todos.push(this.newTodo)
      this.newTodo = ''
    },
    remove(index: number): void {
      this.todos.splice(index, 1)
    },
  },
})
</script>

<style>
.todo-list {
  list-style-type: none;
  display: block;
}
.todo-list--item {
  margin-bottom: 5px;
  border: 1px solid #999;
  border-radius: 2px;
  padding: 5px;
}
</style>
