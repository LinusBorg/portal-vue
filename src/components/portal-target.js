
import { transports } from './wormhole'

export default {
  abstract: true,
  name: 'portalTarget',
  props: {
    attributes: { type: Object },
    name: { type: String, required: true },
    slim: { type: Boolean, default: false },
    tag: { type: String, default: 'div' },
  },
  data () {
    return {
      transports,
    }
  },

  mounted () {
    this.unwatch = this.$watch(function () { return this.transports[this.name] }, this.emitChange)
    this.updateAttributes()
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
    emitChange (transport) {
      console.log('emitting change')
      this.$emit('change', {
        ...transport,
      })
    },
  },
  computed: {
    passengers () {
      return this.transports[this.name] && this.transports[this.name].passengers
    },
    renderSlim () {
      const passengers = this.passengers || []
      return passengers.length === 1 && !this.attributes && this.slim
    },
  },

  render (h) {
    const children = this.passengers || []
    const Tag = this.tag
    if (this.renderSlim) {
      return children[0]
    } else {
      return (<Tag class={'vue-portal-target'}>{children}</Tag>)
    }
  },
}
