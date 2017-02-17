<script>
  import { routes } from './wormhole'

  export default {
    name: 'portalTarget',
    props: {
      name: { type: String, required: true },
      tag: { type: String, default: 'div' },
      attributes: { type: Object },
    },
    data () {
      return {
        routes,
      }
    },

    mounted () {
      this.updateAttributes()
    },
    updated () {
      this.updateAttributes()
    },
    beforeDestroy () {
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
    },
    computed: {
      passengers () {
        return this.routes[this.name] || null
      },
    },

    render (h) {
      const children = this.passengers || []

      if (children.length === 1 && !this.attributes) {
        return children[0]
      } else {
        return h(this.tag, {
          class: { 'vue-portal-target': true },
        }, children)
      }
    },
  }
</script>
