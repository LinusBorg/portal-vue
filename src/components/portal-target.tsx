import Vue from 'vue'
import { VNode, VNodeData } from 'vue'
import { combinePassengers } from '@/utils'
import { Transport } from '../types'

import { wormhole } from '@/components/wormhole'

export default Vue.extend({
  name: 'portalTarget',
  props: {
    multiple: { type: Boolean, default: false },
    name: { type: String, required: true },
    slim: { type: Boolean, default: false },
    slotProps: { type: Object, default: () => ({}) },
    tag: { type: String, default: 'div' },
    transition: { type: [Boolean, String, Object], default: false },
    transitionEvents: { type: Object, default: () => ({}) },
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
    wormhole.registerTarget(this.name)
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
      wormhole.registerTarget(newVal)
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
    transitionData() {
      const t = this.transition
      const data: VNodeData = {}

      // During first render, we render a dumb transition without any classes, events and a fake name
      // We have to do this to emulate the normal behaviour of transitions without `appear`
      // because in Portals, transitions can behave as if appear was defined under certain conditions.
      if (this.firstRender && (typeof t === 'object' && !t.appear)) {
        data.props = { name: '__notranstition__portal-vue__' }
        return data
      }

      if (typeof t === 'string') {
        data.props = { name: t }
      } else if (typeof t === 'object') {
        data.props = t
      }
      if (this.slim) {
        //@ts-ignore
        data.props.tag = this.tag
      }
      data.on = this.transitionEvents

      return data
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
    const TransitionType = noWrapper ? 'transition' : 'transition-group'
    const Tag = this.tag

    if (this.withTransition) {
      return (
        <TransitionType {...this.transitionData} class="vue-portal-target">
          {children}
        </TransitionType>
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
