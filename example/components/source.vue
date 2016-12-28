<template>
  <div class="source">
    <p>Here you can add the todos</p>
    <p>
      Normally, they would be rendered below the input, but with VuePortal
      we can render them outside of this component, further up the DOM tree in this case.
    </p>
    <input type="text" v-model="newTodo" @keyup.enter="add"><button @click="add">Add</button>
    <portal to="destination">
      <ul class="todo-list">
        <li v-for="(todo, index) in todos">{{todo}} (<a href="#" @click.prevent="remove(index)">x</a>)</li>
      </ul>
    </portal>
    <p>Below is the raw data from of this component</p>
    <pre>{{$data}}</pre>
  </div>
</template>

<script>
  export default {
    name: 'source',
    props: {

    },
    data() {
      return {
        newTodo: '',
        todos: ['Todo #1', 'Todo #2']
      }
    },
    methods: {
      add() {
        this.todos.push(this.newTodo)
        this.newTodo = ''
      },
      remove(index) {
        this.todos.splice(index, 1)
      }
    },
  }
</script>

<style>
  .source {
    border: 1px solid navy;
    border-radius: 5px;
    margin: 15px;
    margin-top: 30px;
    padding: 15px;
  }
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
