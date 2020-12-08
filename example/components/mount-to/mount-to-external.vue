<template>
  <div>
    <h5>Mount a &lt;portal-target&gt;</h5>
    <button @click="toggleAuto">toggle auto portal &amp; target</button>
    <!-- <button @click="toggleManual">toggle manual portal &amp; target</button> -->
    <!-- <button @click="target = ''">Unset targetEl</button> -->

    <Portal to="mountedTarget" v-if="showAuto">
      <p>Hello from an automatically generated Portal <i>and</i> Target</p>
      <Test />
    </Portal>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, provide } from 'vue'
import Test from './Test.vue'
import { mountPortalTarget } from 'portal-vue'
export default defineComponent({
  // components: { Test }, // testing that `parent` option works
  data() {
    return {
      showManual: false,
      showAuto: false,
    }
  },
  setup() {
    provide('test', 'Test')
    mountPortalTarget(
      {
        multiple: false,
        name: 'mountedTarget',
      },
      '#external-target'
    )
  },
  components: {
    Test,
  },
  methods: {
    toggleManual() {
      this.showManual = !this.showManual
    },
    toggleAuto() {
      this.showAuto = !this.showAuto
    },
  },
})
</script>
