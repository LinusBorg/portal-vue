<template>
  <div class="target-switch">
    <div>
      <ul class="controls">
        <li class="controls--item">
          <a
            href="#"
            class="controls--link"
            :class="{ 'controls--link-active': target === 'ts-A' }"
            @click.prevent="target = 'ts-A'"
          >
            Portal to A
          </a>
        </li>
        <li class="controls--item">
          <a
            href="#"
            class="controls--link"
            :class="{ 'controls--link-active': target === 'ts-B' }"
            @click.prevent="target = 'ts-B'"
          >
            Portal to B
          </a>
        </li>
      </ul>
    </div>
    <div class="wrapper">
      <container type="source"> <Source-comp :target="target" /> </container>
      <container type="destination">
        <destination name="ts-A" key="A" />
      </container>
      <container type="destination">
        <destination name="ts-B" key="B" />
      </container>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SourceComp from './source-comp.vue'
import Destination from './destination.vue'

export default Vue.extend({
  components: {
    SourceComp,
    Destination,
  },
  data() {
    return {
      target: 'ts-A',
    }
  },
})
</script>

<style></style>
