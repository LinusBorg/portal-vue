<template>
  <div id="disabled-example">
    <div class="">
      <ul class="controls">
        <li class="controls--item">
          <a
            href="#"
            class="controls--link"
            :class="{ 'controls--link-active': !disabled }"
            @click.prevent="disabled = !disabled"
          >
            {{ disabled ? 'Enable' : 'Disable' }}
          </a>
        </li>
      </ul>
    </div>
    <div class="wrapper">
      <container type="source">
        <portal to="disabled-destination" :disabled="disabled">
          <p>
            When Portal is disabled, this paragraph is rendered in the left
            box.<br />
            When it's enabled, it's rendered in the right box.
          </p>
          <div ref="text">Some more Text ...</div>
          <test ref="test" />
        </portal>
      </container>

      <container type="destination">
        <portal-target name="disabled-destination" />
      </container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Test from '../test-component.vue'

export default defineComponent({
  components: { Test },
  props: {},
  data() {
    return {
      disabled: false,
    }
  },
  mounted() {
    // test when refs are available
    // this.$nextTick(() => {
    //   this.$nextTick(() => {
    //     console.log(this.$refs.text)
    //     console.log(this.$refs.text.getBoundingClientRect())
    //   })
    // })
    this.$nextTick(() => {
      // @ts-ignore
      console.log(this.$refs.text.getBoundingClientRect())
      // @ts-ignore
      console.log(this.$refs.test.$el.getBoundingClientRect())
    })
  },
})
</script>
