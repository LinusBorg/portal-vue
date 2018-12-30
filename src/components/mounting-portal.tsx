import Vue from 'vue'
import { VNode, VueConstructor } from 'vue'
import Portal from './portal'
import PortalTarget from './portal-target'
import { wormhole } from './wormhole'
import { pick } from '@/utils'

import { PortalProps } from '@/types'
import { portalProps } from '@/utils/portalProps'

let _id = 0

export type withPortalTarget = VueConstructor<
  Vue & {
    portalTarget: any
  }
>

export default (Vue as withPortalTarget).extend({
  name: 'MountingPortal',
  inheritAttrs: false,
  props: {
    ...portalProps,
    append: { type: [Boolean, String] },
    bail: {
      type: Boolean,
    },
    mountTo: { type: String, required: true },
  },
  data() {
    return {
      props: { ...this.$props },
    }
  },
  created() {
    let el: HTMLElement | null = document.querySelector(this.mountTo)

    if (!el) {
      console.error(
        `[portal-vue]: Mount Point '${this.mountTo}' not found in document`
      )
      return
    }

    const props = this.props

    // Target alredy exists
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

    this.portalTarget = new PortalTarget({
      el,
      parent: this,
      propsData: {
        name: props.name,
        ...this.$attrs,
      },
    })
  },
  beforeDestroy() {
    const target = this.portalTarget
    if (this.props.append) {
      const el = target.$el
      el.parentNode.removeChild(el)
    }
    target.$destroy()
  },
  render(h): VNode {
    const props = this.props

    if (!this.portalTarget) {
      console.warn("[portal-vue] Target wasn't mounted")
      return h()
    }
    if (!this.$scopedSlots.default) {
      const props = pick<PortalProps, keyof PortalProps>(
        this.$props,
        Object.keys(portalProps) as (keyof PortalProps)[]
      )
      return h(
        Portal,
        {
          props: Object.assign(props),
          attrs: this.$attrs,
          on: this.$listeners,
          scopedSlots: this.$scopedSlots,
        },
        this.$slots.default
      )
    }

    let content: VNode = (this.$scopedSlots.default({
      to: props.name,
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
