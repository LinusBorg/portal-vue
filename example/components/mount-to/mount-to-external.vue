<template>
  <div>
    <h5>Mount a &lt;portal-target&gt;</h5>
    <button @click="toggle">toggle portal &amp; target</button>
    <button @click="target = ''">Unset targetEl</button>
    <PortalTargetProvider
      mountTo="#external-target"
      name="external-target-name"
      append
    >
      <portal
        :disabled="!show"
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
    </PortalTargetProvider>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Test from '../test-component.vue'
export default Vue.extend({
  components: { Test }, // testing that `parent` option works
  data() {
    return {
      show: false,
    }
  },
  methods: {
    toggle() {
      this.show = !this.show
    },
  },
})
</script>
