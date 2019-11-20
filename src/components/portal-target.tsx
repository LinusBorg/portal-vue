import Vue from 'vue'
import { VNode, PropOptions } from 'vue'
import { combinePassengers } from '@/utils'
import { Transport, PropWithComponent } from '../types'

import { wormhole } from '@/components/wormhole'

export default Vue.extend({
  name: 'portalTarget',
  props: {
    multiple: { type: Boolean, default: false },
    name: { type: String, required: true },
    slim: { type: Boolean, default: false },
    slotProps: { type: Object, default: () => ({}) },
    tag: { type: String, default: 'div' },
    transition: { type: [String, Object, Function] } as PropOptions<
      PropWithComponent
    >,
  },
  data() {
    return {
      transports: wormhole.transports,
      firstRender: true,
    }
  },
  created() {
    this.$nextTick(() => {
      wormhole.registerTarget(this.name, this)
    })
  },
  watch: {
    ownTransports() {
      this.$emit('change', this.children().length > 0)
    },
    name(newVal, oldVal) {
      /**
       * TODO
       * This should warn as well ...
       */
      wormhole.unregisterTarget(oldVal)
      wormhole.registerTarget(newVal, this)
    },
  },
  mounted() {
    if (this.transition) {
      this.$nextTick(() => {
        // only when we have a transition, because it causes a re-render
        this.firstRender = false
      })
    }
  },
  beforeDestroy() {
    wormhole.unregisterTarget(this.name)
  },

  computed: {
    ownTransports(): Transport[] {
      const transports: Transport[] = this.transports[this.name] || []
      if (this.multiple) {
        return transports
      }
      return transports.length === 0 ? [] : [transports[transports.length - 1]]
    },
    passengers(): VNode[] {
      return combinePassengers(this.ownTransports, this.slotProps)
    },
  },

  methods: {
    // can't be a computed prop because it has to "react" to $slot changes.
    children(): VNode[] {
      return this.passengers.length !== 0
        ? this.passengers
        : this.$scopedSlots.default
        ? (this.$scopedSlots.default(this.slotProps) as VNode[])
        : this.$slots.default || []
    },
    // can't be a computed prop because it has to "react" to this.children().
    noWrapper() {
      const noWrapper = this.slim && !this.transition
      if (noWrapper && this.children().length > 1) {
        console.warn(
          '[portal-vue]: PortalTarget with `slim` option received more than one child element.'
        )
      }
      return noWrapper
    },
  },
  render(h): VNode {
    const noWrapper = this.noWrapper()
    const children = this.children()
    const Tag = this.transition || this.tag

    return noWrapper
      ? children[0]
      : this.slim && !Tag
      ? h()
      : h(
          Tag,
          {
            props: {
              // if we have a transition component, pass the tag if it exists
              tag: this.transition && this.tag ? this.tag : undefined,
            },
            class: { 'vue-portal-target': true },
          },

          children
        )
  },
})
