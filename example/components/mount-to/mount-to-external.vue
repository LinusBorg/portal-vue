<template>
  <div>
    <h5>Mount a &lt;portal-target&gt;</h5>
    <button @click="toggleAuto">toggle auto portal &amp; target</button>
    <!-- <button @click="toggleManual">toggle manual portal &amp; target</button> -->
    <!-- <button @click="target = ''">Unset targetEl</button> -->

    <MountingPortal mountTo="#external-target" append v-if="showAuto">
      <p>Hello from an automatically generated Portal <i>and</i> Target</p>
      <Test />
    </MountingPortal>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import Test from './Test.vue'
export default defineComponent({
  // components: { Test }, // testing that `parent` option works
  data() {
    return {
      showManual: false,
      showAuto: false,
    }
  },
  setup() {
    console.log(inject('test'))
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
