import Vue from 'vue'
import wormhole from './wormhole'
import Target from './portal-target'
import { extractAttributes } from '../utils'

const inBrowser = typeof window !== 'undefined'

let pid = 1

export default {
  abstract: false,
  name: 'portal',
  props: {
    /* global HTMLElement */
    disabled: { type: Boolean, default: false },
    name: { type: String, default: () => String(pid++) },
    order: { type: Number, default: 0 },
    slim: { type: Boolean, default: false },
    slotProps: { type: Object, default: () => ({}) },
    tag: { type: [String], default: 'DIV' },
    targetEl: { type: inBrowser ? [String, HTMLElement] : String },
    targetClass: { type: String },
    to: {
      type: String,
      default: () => String(Math.round(Math.random() * 10000000)),
    },
  },

  mounted() {
    if (this.targetEl) {
      this.mountToTarget()
    }
    if (!this.disabled) {
      this.sendUpdate()
    }
    // Reset hack to make child components skip the portal when defining their $parent
    // was set to true during render when we render something locally.
    if (this.$options.abstract) {
      this.$options.abstract = false
    }
  },

  updated() {
    if (this.disabled) {
      this.clear()
    } else {
      this.sendUpdate()
    }
    // Reset hack to make child components skip the portal when defining their $parent
    // was set to true during render when we render something locally.
    if (this.$options.abstract) {
      this.$options.abstract = false
    }
  },

  beforeDestroy() {
    this.clear()
    if (this.mountedComp) {
      this.mountedComp.$destroy()
    }
  },
  watch: {
    to(newValue, oldValue) {
      oldValue && oldValue !== newValue && this.clear(oldValue)
      this.sendUpdate()
    },
    targetEl(newValue, oldValue) {
      if (newValue) {
        this.mountToTarget()
      }
    },
  },

  methods: {
    normalizedSlots() {
      return this.$scopedSlots.default
        ? [this.$scopedSlots.default]
        : this.$slots.default
    },
    sendUpdate() {
      const slotContent = this.normalizedSlots()

      if (slotContent) {
        wormhole.open({
          from: this.name,
          to: this.to,
          passengers: [...slotContent],
          class: this.targetClass && this.targetClass.split(' '),
          order: this.order,
        })
      } else {
        this.clear()
      }
    },

    clear(target) {
      wormhole.close({
        from: this.name,
        to: target || this.to,
      })
    },

    mountToTarget() {
      let el
      const target = this.targetEl

      if (typeof target === 'string') {
        el = document.querySelector(target)
      } else if (target instanceof HTMLElement) {
        el = target
      } else {
        console.warn(
          '[vue-portal]: value of targetEl must be of type String or HTMLElement'
        )
        return
      }

      if (el) {
        const newTarget = new Vue({
          ...Target,
          parent: this,
          propsData: {
            name: this.to,
            tag: el.tagName,
            attributes: extractAttributes(el),
          },
        })
        newTarget.$mount(el)
        this.mountedComp = newTarget
      } else {
        console.warn(
          '[vue-portal]: The specified targetEl ' + target + ' was not found'
        )
      }
    },
    normalizeChildren(children) {
      return typeof children === 'function'
        ? children(this.slotProps)
        : children
    },
  },

  render(h) {
    const children = this.$slots.default || this.$scopedSlots.default || []
    const Tag = this.tag
    if (children.length && this.disabled) {
      // hack to make child components skip the portal when defining their $parent
      this.$options.abstract = true
      return children.length <= 1 && this.slim ? (
        children[0]
      ) : (
        <Tag>{this.normalizeChildren(children)}</Tag>
      )
    } else {
      return (
        <Tag
          class={'v-portal'}
          style={'display: none'}
          key={'v-portal-placeholder'}
        />
      )
      // h(this.tag, { class: { 'v-portal': true }, style: { display: 'none' }, key: 'v-portal-placeholder' })
    }
  },
}
