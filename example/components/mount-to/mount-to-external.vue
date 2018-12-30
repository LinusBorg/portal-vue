<template>
  <div>
    <h5>Mount a &lt;portal-target&gt;</h5>
    <button @click="toggleAuto">toggle auto portal &amp; target</button>
    <button @click="toggleManual">toggle manual portal &amp; target</button>
    <button @click="target = ''">Unset targetEl</button>

    <MountingPortal mountTo="#external-target" append v-if="showAuto">
      <p>Hello from an automatically generated Portal <i>and</i> Target</p>
    </MountingPortal>

    <MountingPortal mountTo="#external-target" to="external-target-name" append>
      <portal
        :disabled="!showManual"
        slot-scope="{
          to,
        }"
        :to="to"
        name="external-portal"
      >
        <div>
          <p>
            This content will be portal'ed to an element outside of this Vue
            app, with the help of the <i>targetEl</i> prop.
          </p>
          <test />
        </div>
      </portal>
    </MountingPortal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Test from '../test-component.vue'
export default Vue.extend({
  components: { Test }, // testing that `parent` option works
  data() {
    return {
      showManual: false,
      showAuto: false,
    }
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
