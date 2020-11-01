<template>
  <div>
    <div>
      <ul class="controls">
        <li class="controls--item">
          <a href="#" class="controls--link" @click.prevent="open"
            >Send content</a
          >
        </li>
        <li class="controls--item">
          <a href="#" class="controls--link" @click.prevent="close"
            >Clear content</a
          >
        </li>
      </ul>
    </div>
    <div class="wrapper">
      <container type="destination">
        <portal-target name="programmatic-target" ref="dest" />
      </container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

import { Wormhole } from 'portal-vue'

export default defineComponent({
  data() {
    return {}
  },
  methods: {
    open() {
      const content = () => [
        h('p', 'Test-Text from the parent, sent with a button click'),
      ]
      Wormhole.open({
        to: 'programmatic-target',
        from: 'programmatic-source',
        content,
      })
    },
    close() {
      Wormhole.close({
        to: 'programmatic-target',
        from: 'programmatic-source',
      })
    },
  },
})
</script>
