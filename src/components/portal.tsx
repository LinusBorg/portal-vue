import Vue from 'vue'
import { VNode } from 'vue'
import { TransportInput, TransportVector } from '../types'
import { wormhole } from './wormhole'

let _id = 1

export default Vue.extend({
  name: 'portal',
  props: {
    disabled: { type: Boolean },
    name: { type: String, default: () => String(_id++) },
    order: { type: Number, default: 0 },
    slim: { type: Boolean },
    slotProps: { type: Object, default: () => ({}) },
    tag: { type: String, default: 'DIV' },
    to: {
      type: String,
      default: () => String(Math.round(Math.random() * 10000000)),
    },
  },
  created() {
    this.$nextTick(() => {
      wormhole.registerSource(this.name, this)
    })
  },
  mounted() {
    if (!this.disabled) {
      this.sendUpdate()
    }
  },

  updated() {
    if (this.disabled) {
      this.clear()
    } else {
      this.sendUpdate()
    }
  },

  beforeDestroy() {
    wormhole.unregisterSource(this.name)
    this.clear()
  },
  watch: {
    to(newValue: string, oldValue: string): void {
      oldValue && oldValue !== newValue && this.clear(oldValue)
      this.sendUpdate()
    },
  },

  methods: {
    clear(target?: string) {
      const closer: TransportVector = {
        from: this.name,
        to: target || this.to,
      }
      wormhole.close(closer)
    },
    normalizeSlots(): Function[] | VNode[] | undefined {
      return this.$scopedSlots.default
        ? [this.$scopedSlots.default]
        : this.$slots.default
    },
    normalizeOwnChildren(children: VNode[] | Function): VNode[] {
      return typeof children === 'function'
        ? children(this.slotProps)
        : children
    },
    sendUpdate() {
      const slotContent = this.normalizeSlots()
      if (slotContent) {
        const transport: TransportInput = {
          from: this.name,
          to: this.to,
          passengers: [...slotContent],
          order: this.order,
        }
        wormhole.open(transport)
      } else {
        this.clear()
      }
    },
  },

  render(h): VNode {
    const children: VNode[] | Function =
      this.$slots.default || this.$scopedSlots.default || []
    const Tag = this.tag
    if (children && this.disabled) {
      return children.length <= 1 && this.slim ? (
        this.normalizeOwnChildren(children)[0]
      ) : (
        <Tag>{this.normalizeOwnChildren(children)}</Tag>
      )
    } else {
      return this.slim
        ? h()
        : h(Tag, {
            class: { 'v-portal': true },
            style: { display: 'none' },
            key: 'v-portal-placeholder',
          })
    }
  },
})
