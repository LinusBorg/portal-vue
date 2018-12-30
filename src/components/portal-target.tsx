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
    transitionGroup: { type: Boolean },
  },
  data() {
    return {
      transports: wormhole.transports,
      firstRender: true,
    }
  },
  created() {
    if (wormhole.hasTarget(this.name)) {
      console.warn(`
      [portal-vue] - There already exists another <PortalTarget> with name '${
        this.name
      }'.
      That can lead to unpredictable behaviour and should be avoided.
      `)
    }
    wormhole.registerTarget(this.name, this)
  },
  watch: {
    ownTransports() {
      this.$emit('change', this.children().length > 1)
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
    this.$nextTick(() => {
      if (this.transition) {
        // only when we have a transition, because it causes a re-render
        this.firstRender = false
      }
    })
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
    withTransition(): boolean {
      return !!this.transition
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
      const noWrapper = this.slim
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
    const { transition } = this
    const Transition =
      typeof transition === 'string'
        ? this.transitionGroup
          ? 'transition-group'
          : 'transition'
        : transition
    const Tag = this.tag

    if (this.withTransition) {
      return h(
        Transition,
        {
          props:
            typeof transition === 'string' ? { name: transition } : undefined,
          class: 'vue-portal-target',
        },
        children
      )
    }

    return noWrapper
      ? children[0]
      : this.slim
      ? h()
      : h(
          Tag,
          {
            class: { 'vue-portal-target': true },
          },

          children
        )
  },
})
