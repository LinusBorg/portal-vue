<template>
  <div class="main-container">
    <div class="sidebar">
      <ul>
        <li v-for="target in routes" v-bind:key="target.path">
          <router-link :to="target.path"> {{ target.path }}</router-link>
        </li>
      </ul>
    </div>
    <div class="viewport"><router-view /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { routes } from '../router'

export default defineComponent({
  name: 'App',
  setup() {
    return {
      routes,
    }
  },
})
</script>

<style lang="postcss">
.main-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  padding: 10px;
  flex: 0 0 300px;
  border-right: 3px solid var(--vue-color);
}

.viewport {
  flex: 1 1 auto;
  padding: 25px;
}
</style>
