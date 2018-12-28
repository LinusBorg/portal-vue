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
import Vue from 'vue'
import { Wormhole } from 'portal-vue'
// const { Wormhole } =
//   process.env.NODE_ENV === 'production'
//     ? require('@/../dist/portal-vue.common.js')
//     : require('@/index').default

export default Vue.extend({
  data() {
    return {}
  },
  methods: {
    open() {
      const passengers = [
        this.$createElement(
          'p',
          'Test-Text from the parent, sent with a button click'
        ),
      ]
      Wormhole.open({
        to: 'programmatic-target',
        from: 'programmatic-source',
        passengers,
      })
    },
    close(force = false) {
      Wormhole.close(
        {
          to: 'programmatic-target',
          from: force ? 'wrong-source' : 'programmatic-source',
        },
        force
      )
    },
    checkTarget() {
      const res = Wormhole.hasTarget('programmatic-target')
      window.alert(`Does 'programmatic-target exist'? \n${res}`)
    },
  },
})
</script>
