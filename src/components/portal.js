
import Vue from 'vue'
import wormhole from './wormhole'
import Target from './portal-target'
import { extractAttributes } from '../utils'

const inBrowser = (typeof window !== 'undefined')

let pid = 1

export default {
  abstract: true,
  name: 'portal',
  props: {
    /* global HTMLElement */
    disabled: { type: Boolean, default: false },
    name: { type: String, default: () => String(pid++) },
    slim: { type: Boolean, default: false },
    tag: { type: [String], default: 'DIV' },
    targetEl: { type: inBrowser ? [String, HTMLElement] : String },
    to: { type: String, default: () => String(Math.round(Math.random() * 10000000)) },
  },

  mounted () {
    if (this.targetEl) {
      this.mountToTarget()
    }
    if (!this.disabled) {
      this.sendUpdate()
    }
  },

  updated () {
    if (this.disabled) {
      this.clear()
    } else {
      this.sendUpdate()
    }
  },

  beforeDestroy () {
    this.clear()
    if (this.mountedComp) {
      this.mountedComp.$destroy()
    }
  },

  watch: {
    to (newValue, oldValue) {
      oldValue && this.clear(oldValue)
      this.sendUpdate()
    },
    targetEl (newValue, oldValue) {
      this.mountToTarget()
    },
  },

  methods: {

    sendUpdate () {
      if (this.to) {
        if (this.$slots.default) {
          wormhole.open({
            from: this.name,
            to: this.to,
            passengers: [...this.$slots.default],
          })
        }
      } else if (!this.to && !this.targetEl) {
        console.warn('[vue-portal]: You have to define a target via the `to` prop.')
      }
    },

    clear (target) {
      wormhole.close({
        from: this.name,
        to: target || this.to,
      })
    },

    mountToTarget () {
      let el
      const target = this.targetEl

      if (typeof target === 'string') {
        el = document.querySelector(this.targetEl)
      } else if (target instanceof HTMLElement) {
        el = target
      } else {
        console.warn('[vue-portal]: value of targetEl must be of type String or HTMLElement')
        return
      }

      const attributes = extractAttributes(el)

      if (el) {
        const target = new Vue({
          ...Target,
          parent: this,
          propsData: {
            name: this.to,
            tag: el.tagName,
            attributes,
          },
        })
        target.$mount(el)
        this.mountedComp = target
      } else {
        console.warn('[vue-portal]: The specified targetEl ' + this.targetEl + ' was not found')
      }
    },
  },

  render (h) {
    const children = this.$slots.default || []
    const Tag = this.tag
    if (children.length && this.disabled) {
      return children.length <= 1 && this.slim
        ? children[0]
        : (<Tag>{children}</Tag>)
    } else {
      return (<Tag class={'v-portal'} style={'display: none'} key={'v-portal-placeholder'}/>)
      // h(this.tag, { class: { 'v-portal': true }, style: { display: 'none' }, key: 'v-portal-placeholder' })
    }
  },
}
