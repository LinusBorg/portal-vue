import Vue from 'vue'
import { VNode } from 'vue'
import { TransportInput, TransportVector } from '../types'
import wormhole from './wormhole'

let _id = 1

export default Vue.extend({
  name: 'portal',
  props: {
    disabled: { type: Boolean },
    name: { type: String, default: (): object => String(_id++) as any },
    order: { type: Number, default: 0 },
    slim: { type: Boolean },
    slotProps: { type: Object, default: () => ({}) },
    tag: { type: String, default: 'DIV' },
    to: {
      type: String,
      default: (): object =>
        String(Math.round(Math.random() * 10000000)) as any,
    },
  },
  created() {
    if (wormhole.hasSource(this.name)) {
      console.warn(`
      [portal-vue] - There already exists another <Portal> with name '${
        this.name
      }'.
      That can lead to unpredictable behaviour and should be avoided.
      `)
    }
    wormhole.registerSource(this.name)
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
    normalizedSlots(): Function[] | VNode[] {
      return this.$scopedSlots.default
        ? [this.$scopedSlots.default]
        : this.$slots.default
    },
    normalizeChildren(children: VNode[] | Function): VNode[] {
      return typeof children === 'function'
        ? children(this.slotProps)
        : children
    },
    sendUpdate() {
      const slotContent = this.normalizedSlots()
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
    if (children.length && this.disabled) {
      return children.length <= 1 && this.slim ? (
        this.normalizeChildren(children)[0]
      ) : (
        <Tag>{this.normalizeChildren(children)}</Tag>
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
