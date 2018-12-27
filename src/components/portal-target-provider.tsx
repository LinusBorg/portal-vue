import Vue from 'vue'
import { VNode } from 'vue'
import Portal from './portal'
import PortalTarget from './portal-target'
import { wormhole } from './wormhole'

let _id = 0

export default Vue.extend({
  name: 'PortalTargetProvider',
  inheritAttrs: false,
  props: {
    append: { type: [Boolean, String] },
    force: {
      type: Boolean,
    },
    mountTo: { type: String, required: true },
    name: {
      type: String,
      default: (): object => `Target-${String(_id++)}` as any,
    },
  },
  created() {
    let el: HTMLElement | null = document.querySelector(this.mountTo)

    if (!el) {
      console.error(
        `[portal-vue]: Mount Point '${this.mountTo}' not found in document`
      )
      return
    }

    const props = { ...this.$props }
    ;(this as any).props = props

    // Target alredy exists
    if (wormhole.targets[props.name]) {
      if (!props.force) {
        console.info(`[portal-vue]: Target ${props.name} is already mounted.
        Make sure it's the right one`)

        return
      }
    }

    const { append } = props
    if (append) {
      const type = typeof append === 'string' ? append : 'DIV'
      const mountEl = document.createElement(type)
      el.appendChild(mountEl)
      el = mountEl
    }

    ;(this as any).portalTarget = new PortalTarget({
      el,
      parent: this,
      propsData: {
        name: props.name,
        ...this.$attrs,
      },
    })
  },
  beforeDestroy() {
    const target = (this as any).portalTarget
    if ((this as any).props.append) {
      const el = target.$el
      el.parentNode.removeChild(el)
    }
    target.$destroy()
  },
  render(h): VNode {
    const props = (this as any).props

    if (!(this as any).portalTarget) {
      console.warn("[portal-vue] Target wasn't mounted")
      return h()
    }
    if (!this.$scopedSlots.default) {
      console.error(
        `[portal-vue]: <PortalTargetProvider> expects to be passed a scoped slot.`
      )
      return h()
    }
    debugger
    let content: VNode = (this.$scopedSlots.default({
      to: props.name,
    }) as unknown) as VNode

    // if user used <template> for the scoped slot
    // content will be an array
    if (Array.isArray(content)) {
      content = content[0]
    }
    debugger
    if (!content) return h()

    if (content.componentOptions && content.componentOptions.Ctor !== Portal) {
      console.error(
        `[portal-vue]: First and only child element of <PortalTargetrovider> has to be an instance of <Portal>`
      )
      return h()
    }
    return content
  },
})
