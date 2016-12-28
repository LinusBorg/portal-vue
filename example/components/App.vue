<template>
  <div>
    <div>
      <ul class="controls">
        <li class="controls--item">
          <a href="#" class="controls--link" @click.prevent="showDestination = !showDestination">Toggle Destination</a>
        </li>
        <li class="controls--item">
          <a href="#" class="controls--link" @click.prevent="showSource = !showSource">Toggle Source</a>
        </li>
      </ul>
    </div>
    <portal-destination v-if="showDestination"></portal-destination>
    <portal-source v-if="showSource"></portal-source>
  </div>

</template>

<script>
  import portalSource from './source.vue'
  import portalDestination from './destination.vue'

  export default {
    data() {
      return {
        showDestination: true,
        showSource: true,
      }
    },
    components: {
      portalSource,
      portalDestination
    },
  }
</script>

<style>
  .controls {
    list-style-type: none;
    display: block;
    border-bottom: 1px solid black;
    margin-bottom: 30px;
  }
  .controls--item {
    display: inline-block;
    padding: 3px;
  }
  .controls--link {
    text-decoration: none;
    display: block;
    border: 1px solid green;
    border-radius: 2px;
    padding: 5px;
  }
</style>
