import Vue from 'vue'

export const buffer = {}

const wormhole = new Vue({
  methods: {
    sendUpdate(name, passengers) {
      buffer[name] = passengers
      this.$emit(name, passengers)
    },
    get(name) {
      return buffer[name] || null
    },
    clear(name) {
      buffer[name] = null
      this.$emit(name, null)
    }
  }
})

export default wormhole
