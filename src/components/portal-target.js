// import { transports } from './wormhole'
import { combinePassengers } from '../utils'
import wormhole from './wormhole'

export default {
  abstract: false,
  name: 'portalTarget',
  props: {
    attributes: { type: Object, default: () => ({}) },
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
    if (!this.transports[this.name]) {
      this.$set(this.transports, this.name, [])
    }
  },
  mounted() {
    this.unwatch = this.$watch('ownTransports', this.emitChange)
    this.$nextTick(() => {
      if (this.transition) {
        // only when we have a transition, because it causes a re-render
        this.firstRender = false
      }
    })
    if (this.$options.abstract) {
      this.$options.abstract = false
    }
  },
  updated() {
    if (this.$options.abstract) {
      this.$options.abstract = false
    }
  },
  beforeDestroy() {
    this.unwatch()
  },

  computed: {
    ownTransports() {
      const transports = this.transports[this.name] || []
      if (this.multiple) {
        return transports
      }
      return transports.length === 0 ? [] : [transports[transports.length - 1]]
    },
    passengers() {
      return combinePassengers(this.ownTransports, this.slotProps)
    },
    hasAttributes() {
      return Object.keys(this.attributes).length > 0
    },
    withTransition() {
      return !!this.transition
    },
    transitionData() {
      const t = this.transition
      const data = {}

      // During first render, we render a dumb transition without any classes, events and a fake name
      // We have to do this to emulate the normal behaviour of transitions without `appear`
      // because in Portals, transitions can behave as if appear was defined under certain conditions.
      if (
        this.firstRender &&
        (typeof this.transition === 'object' && !this.transition.appear)
      ) {
        data.props = { name: '__notranstition__portal-vue__' }
        return data
      }

      if (typeof t === 'string') {
        data.props = { name: t }
      } else if (typeof t === 'object') {
        data.props = t
      }
      if (this.renderSlim) {
        data.props.tag = this.tag
      }
      data.on = this.transitionEvents

      return data
    },
    transportedClasses() {
      return this.ownTransports
        .map(transport => transport.class)
        .reduce((array, subarray) => array.concat(subarray), [])
      //.filter((string, index, array) => array.indexOf(string) === index)
    },
  },

  methods: {
    emitChange(newTransports, oldTransports) {
      if (this.multiple) {
        this.$emit('change', [...newTransports], [...oldTransports])
      } else {
        const newTransport =
          newTransports.length === 0 ? undefined : newTransports[0]
        const oldTransport =
          oldTransports.length === 0 ? undefined : oldTransports[0]
        this.$emit('change', { ...newTransport }, { ...oldTransport })
      }
    },
    // can't be a computed prop because it has to "react" to $slot changes.
    children() {
      return this.passengers.length !== 0
        ? this.passengers
        : this.$slots.default || []
    },
    noWrapper() {
      const noWrapper = !this.hasAttributes && this.slim
      if (noWrapper && this.children().length > 1) {
        console.warn(
          '[portal-vue]: PortalTarget with `slim` option received more than one child element.'
        )
      }
      return noWrapper
    },
  },
  render(h) {
    this.$options.abstract = true
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

    return noWrapper ? (
      children[0]
    ) : (
      <Tag
        class={`vue-portal-target ${this.transportedClasses.join(' ')}`}
        {...this.attributes}
      >
        {children}
      </Tag>
    )
  },
}
