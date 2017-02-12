<template>
  <div class="target-switch">
    <div>
      <ul class="controls">
        <li class="controls--item">
          <a href="#" class="controls--link" :class="{ 'controls--link-active': target === 'ts-A' }"
            @click.prevent="target = 'ts-A' ">
            Portal to A
          </a>
        </li>
        <li class="controls--item" >
          <a href="#" class="controls--link" :class="{ 'controls--link-active': target === 'ts-B' }"
            @click.prevent="target = 'ts-B' ">
            Portal to B
          </a>
        </li>
      </ul>
    </div>
    <div class="wrapper">
      <Source-comp class="item source" :target="target"></Source-comp>
      <destination class="item destination" name="ts-A" key="A"></destination>
      <destination class="item destination" name="ts-B" key="B"></destination>
    </div>
  </div>
</template>

<script>
  import SourceComp from './source-comp.vue'
  import Destination from './destination.vue'

  export default {
    components: {
      SourceComp, Destination,
    },
    props: {

    },
    data() {
      return {
        target: 'ts-A'
      }
    },
    methods: {

    },
  }
</script>

<style>

</style>
