
import { transports } from './wormhole'

export default {
  abstract: true,
  name: 'portalTarget',
  props: {
    attributes: { type: Object },
    name: { type: String, required: true },
    slim: { type: Boolean, default: false },
    tag: { type: String, default: 'div' },
    transition: { type: [Boolean, String, Object], default: false },
    transitionEvents: { type: Object, default: () => ({}) },
  },
  data () {
    return {
      transports,
      firstRender: true,
    }
  },
  created () {
    // this.firstRender = true
  },
  mounted () {
    if (!this.transports[this.name]) {
      this.$set(this.transports, this.name, undefined)
    }

    this.unwatch = this.$watch(function () { return this.transports[this.name] }, this.emitChange)

    this.updateAttributes()
    this.$nextTick(() => {
      this.firstRender = false
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
    emitChange (newTransport, oldTransport) {
      this.$emit('change',
        { ...newTransport },
        { ...oldTransport }
      )
    },
  },
  computed: {
    slots () {
      return this.$slots.default && this.$slots.default.filter(v => v.tag)
    },
    passengers () {
      return (this.transports[this.name] && this.transports[this.name].passengers) || []
    },
    children () {
      return this.passengers.length !== 0 ? this.passengers : (this.slots || [])
    },
    renderSlim () {
      const renderSlim = !this.attributes && this.slim
      if (renderSlim && this.children.length > 1) {
        console.warn('[portal-vue]: PortalTarget with `slim` option received more than one child element.')
        debugger
      }
      return renderSlim
    },
    renderTransition () {
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
    const TransitionType = this.renderSlim ? 'transition' : 'transition-group'
    const Tag = this.tag
    // console.log('should render: ', this.renderTransition)
    const result = this.renderTransition
      ? (<TransitionType {...this.transitionData} class='vue-portal-target'>
          {this.children}
        </TransitionType>)
      : this.renderSlim
        ? this.children[0]
        : <Tag class='vue-portal-target'>{this.children}</Tag>

    return result
  },
}
