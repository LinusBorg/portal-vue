// import { transports } from './wormhole'
import { combinePassengers } from '../utils'
import wormhole from './wormhole'

export default {
  abstract: true,
  name: 'portalTarget',
  props: {
    attributes: { type: Object },
    multiple: { type: Boolean, default: false },
    name: { type: String, required: true },
    slim: { type: Boolean, default: false },
    tag: { type: String, default: 'div' },
    transition: { type: [Boolean, String, Object], default: false },
    transitionEvents: { type: Object, default: () => ({}) },
  },
  data () {
    return {
      transports: wormhole.transports,
      firstRender: true,
    }
  },
  created () {
    if (!this.transports[this.name]) {
      this.$set(this.transports, this.name, [])
    }
  },
  mounted () {
    this.unwatch = this.$watch('ownTransports', this.emitChange)

    this.updateAttributes()
    this.$nextTick(() => {
      if (this.transition) { // only when we have a transition, because it causes a re-render
        this.firstRender = false
      }
    })
  },
  updated () {
    this.updateAttributes()
  },
  beforeDestroy () {
    this.unwatch()
    this.$el.innerHTML = ''
  },

  methods: {
    updateAttributes () {
      if (this.attributes) {
        const attrs = this.attributes
        const el = this.$el

        // special treatment for class
        if (attrs.class) {
          attrs.class.trim().split(' ').forEach((klass) => {
            el.classList.add(klass)
          })
          delete attrs.class
        }

        const keys = Object.keys(attrs)

        for (let i = 0; i < keys.length; i++) {
          el.setAttribute(keys[i], attrs[keys[i]])
        }
      }
    },
    emitChange (newTransports, oldTransports) {
      if (this.multiple) {
        this.$emit('change',
          [...newTransports],
          [...oldTransports]
        )
      } else {
        const newTransport = newTransports.length === 0 ? undefined : newTransports[0]
        const oldTransport = oldTransports.length === 0 ? undefined : oldTransports[0]
        this.$emit('change',
          { ...newTransport },
          { ...oldTransport }
        )
      }
    },
  },
  computed: {
    ownTransports () {
      const transports = this.transports[this.name] || []
      if (this.multiple) {
        return transports
      }
      return transports.length === 0 ? [] : [transports[transports.length - 1]]
    },
    passengers () {
      return combinePassengers(this.ownTransports)
    },
    children () {
      return this.passengers.length !== 0 ? this.passengers : (this.$slots.default || [])
    },
    noWrapper () {
      const noWrapper = !this.attributes && this.slim
      if (noWrapper && this.children.length > 1) {
        console.warn('[portal-vue]: PortalTarget with `slim` option received more than one child element.')
      }
      return noWrapper
    },
    withTransition () {
      return !!this.transition
    },
    transitionData () {
      const t = this.transition
      const data = {}

      // During first render, we render a dumb transition without any classes, events and a fake name
      // We have to do this to emulate the normal behaviour of transitions without `appear`
      // because in Portals, transitions can behave as if appear was defined under certain conditions.
      if (this.firstRender && (typeof this.transition === 'object' && !this.transition.appear)) {
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
  },

  render (h) {
    const TransitionType = this.noWrapper ? 'transition' : 'transition-group'
    const Tag = this.tag

    if (this.withTransition) {
      return (
        <TransitionType {...this.transitionData} class='vue-portal-target'>
          {this.children}
        </TransitionType>
      )
    }

    // Solves a bug where Vue would sometimes duplicate elements upon changing multiple or disabled
    const wrapperKey = this.ownTransports.length

    return this.noWrapper
      ? this.children[0]
      : <Tag class='vue-portal-target' key={wrapperKey}>{this.children}</Tag>
  },
}
