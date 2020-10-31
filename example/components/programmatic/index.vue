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
        <li class="controls--item">
          <a href="#" class="controls--link" @click.prevent="checkTarget"
            >has Target?</a
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

const { Wormhole } =
  process.env.NODE_ENV === 'production'
    ? require('@/../dist/portal-vue.common.js')
    : require('@/index')

export default defineComponent({
  data() {
    return {}
  },
  methods: {
    open() {
      const passengers = () => [
        h('p', 'Test-Text from the parent, sent with a button click'),
      ]
      Wormhole.open({
        to: 'programmatic-target',
        from: 'programmatic-source',
        passengers,
      })
    },
    close() {
      Wormhole.close({
        to: 'programmatic-target',
        from: 'programmatic-source',
      })
    },
    checkTarget() {
      const res = Wormhole.targets.includes('programmatic-target')
      window.alert(`Does 'programmatic-target exist'? \n${res}`)
    },
  },
})
</script>
