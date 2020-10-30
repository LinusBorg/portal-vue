import Vue from 'vue'
import { VNode, VueConstructor, PropOptions } from 'vue'
import Portal from './portal'
import PortalTarget from './portal-target'
import { wormhole } from './wormhole'
import { pick } from '@/utils'

import { PropWithComponent } from '../types'

let _id = 0

export type withPortalTarget = VueConstructor<
  Vue & {
    portalTarget: any
  }
>

const portalProps = [
  'disabled',
  'name',
  'order',
  'slim',
  'slotProps',
  'tag',
  'to',
]

const targetProps = ['multiple', 'transition']

export default (Vue as withPortalTarget).extend({
  name: 'MountingPortal',
  inheritAttrs: false,
  props: {
    append: { type: [Boolean, String] },
    bail: {
      type: Boolean,
    },
    mountTo: { type: String, required: true },

    // Portal
    disabled: { type: Boolean },
    // name for the portal
    name: {
      type: String,
      default: () => 'mounted_' + String(_id++),
    },
    order: { type: Number, default: 0 },
    slim: { type: Boolean },
    slotProps: { type: Object, default: () => ({}) },
    tag: { type: String, default: 'DIV' },
    // name for the target
    to: {
      type: String,
      default: () => String(Math.round(Math.random() * 10000000)),
    },

    // Target
    multiple: { type: Boolean, default: false },
    targetSlim: { type: Boolean },
    targetSlotProps: { type: Object, default: () => ({}) },
    targetTag: { type: String, default: 'div' },
    transition: { type: [String, Object, Function] } as PropOptions<
      PropWithComponent
    >,
  },
  created() {
    if (typeof document === 'undefined') return
    let el: HTMLElement | null = document.querySelector(this.mountTo)

    if (!el) {
      console.error(
        `[portal-vue]: Mount Point '${this.mountTo}' not found in document`
      )
      return
    }

    const props = this.$props

    // Target already exists
    if (wormhole.targets[props.name]) {
      if (props.bail) {
        console.warn(`[portal-vue]: Target ${props.name} is already mounted.
        Aborting because 'bail: true' is set`)
      } else {
        this.portalTarget = wormhole.targets[props.name]
      }
      return
    }

    const { append } = props
    if (append) {
      const type = typeof append === 'string' ? append : 'DIV'
      const mountEl = document.createElement(type)
      el.appendChild(mountEl)
      el = mountEl
    }

    // get props for target from $props
    // we have to rename a few of them
    const _props = pick(this.$props, targetProps)
    _props.slim = this.targetSlim
    _props.tag = this.targetTag
    _props.slotProps = this.targetSlotProps
    _props.name = this.to

    this.portalTarget = new PortalTarget({
      el,
      parent: this.$parent || this,
      propsData: _props,
    })
  },

  beforeDestroy() {
    const target = this.portalTarget
    if (this.append) {
      const el = target.$el
      el.parentNode.removeChild(el)
    }
    target.$destroy()
  },

  render(h): VNode {
    if (!this.portalTarget) {
      console.warn("[portal-vue] Target wasn't mounted")
      return h()
    }

    // if there's no "manual" scoped slot, so we create a <Portal> ourselves
    if (!this.$scopedSlots.manual) {
      const props = pick(this.$props, portalProps)
      return h(
        Portal,
        {
          props: props,
          attrs: this.$attrs,
          on: this.$listeners,
          scopedSlots: this.$scopedSlots,
        },
        this.$slots.default
      )
    }

    // else, we render the scoped slot
    let content: VNode = (this.$scopedSlots.manual({
      to: this.to,
    }) as unknown) as VNode

    // if user used <template> for the scoped slot
    // content will be an array
    if (Array.isArray(content)) {
      content = content[0]
    }

    if (!content) return h()

    return content
  },
})
