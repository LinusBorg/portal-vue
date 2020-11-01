<template>
  <!-- eslint-disable vue/valid-v-for -->
  <div>
    <button @click="show = !show">Toggle</button>
    <portal to="wrapper-slot-target">
      <p key="a" v-if="show">A</p>
      <p key="" v-else>B</p>
    </portal>

    <PortalTarget name="wrapper-slot-target">
      <template #wrapper="nodes">
        <div class="wrapper-slot-box">
          <p>This box was added through a #wrapper slot on the target</p>
          <transition name="fade" mode="out-in">
            <component :is="nodes[0]" />
          </transition>
        </div>
      </template>
    </PortalTarget>
  </div>
</template>

<script lang="ts">
// eslint-disable vue/valid-v-for
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      show: ref(true),
    }
  },
})
</script>

<style>
.wrapper-slot-box {
  border: 1px solid black;
  padding: 10px;
}
</style>
