<template>
  <div>
    <div class="">
      <ul class="controls">
        <li class="controls--item">
          <a
            href="#"
            class="controls--link"
            :class="{ 'controls--link-active': disabled }"
            @click.prevent="disabled = !disabled"
          >
            {{ this.disabled ? 'Enable' : 'Disable' }}
          </a>
        </li>
      </ul>
    </div>
    <div class="wrapper">
      <container type="source">
        <portal to="comp-as-root" :disabled="disabled">
          <test :test-prop="testProp"></test>
        </portal>
      </container>

      <container type="destination">
        <portal-target name="comp-as-root" />
      </container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { VNode } from 'vue'

export default defineComponent({
  name: 'compAsRoot',
  data() {
    return { disabled: true, testProp: 'Test!!' }
  },
  components: {
    test: defineComponent({
      props: {
        testProp: String,
      },
      render(): VNode {
        return h('DIV', [
          h(
            'p',
            `This was rendered with a component as the root element in the portal: ${this.testProp}`
          ),
        ])
      },
    }),
  },
})
</script>
