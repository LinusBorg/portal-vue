<template>
  <div>
    <h1><portal-target name="title">Home</portal-target></h1>
    <router-link to="/router-view-with-portals">Home</router-link>
    <router-link to="/router-view-with-portals/a">a</router-link>
    <router-link to="/router-view-with-portals/b">b</router-link>
    <p>
      This page has two sub-routes, "Page A" and "Page B". Both of the routes
      have a portal that will teleport the title of the sub-route to the header
      on the parent route. If neither sub-route is active, it uses the default
      title.
    </p>
    <p>This allows sub-routes to set page elements in parent routes.</p>

    <p>
      <strong><code>router-view</code> contents:</strong>
    </p>

    <div class="router-view-box"><router-view /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style>
.router-view-box {
  border: 1px solid black;
  padding: 10px;
}
</style>
