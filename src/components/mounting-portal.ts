import {
  Component,
  ComponentOptions,
  createApp,
  defineComponent,
  getCurrentInstance,
  h,
  onBeforeUnmount,
  PropType,
} from 'vue'
import { usePortal } from './portal'
import PortalTarget from './portal-target'
import { inBrowser } from '@/utils'
import { useWormhole, wormholeSymbol } from '@/composables/wormhole'

let _id = 0

export default defineComponent({
  name: 'MountingPortal',
  inheritAttrs: false,
  props: {
    mountTo: { type: String, required: true },

    // Portal
    disabled: { type: Boolean },
    // name for the portal
    name: {
      type: String,
      default: () => 'mounted_' + String(_id++),
    },
    order: { type: Number, default: 0 },
    slotProps: { type: Object, default: () => ({}) },
    tag: { type: String, default: 'DIV' },
    // name for the target
    to: {
      type: String,
      default: () => String(Math.round(Math.random() * 10000000)),
    },

    // Target
    multiple: { type: Boolean, default: false },
    targetSlotProps: { type: Object, default: () => ({}) },
    transition: { type: [String, Object, Function] as PropType<Component> },
  },
  setup(props, { slots }) {
    const wormhole = useWormhole()
    if (inBrowser) {
      const el = getTargetEl(props.mountTo)

      const targetProps = {
        multiple: props.multiple,
        name: props.to,
        transition: props.transition,
        slotProps: props.targetSlotProps,
        __parent: getCurrentInstance()?.parent,
      }

      const app = createApp({
        // TODO: fix Component type error
        render: () => h(PortalTarget as ComponentOptions, targetProps),
      })
      app.provide(wormholeSymbol, wormhole)
      onBeforeUnmount(() => {
        app.unmount(el)
      })
    }

    usePortal(props, slots)

    return () => {
      if (props.disabled && slots.default) {
        return slots.default()
      } else {
        return null
      }
    }
  },
})

function getTargetEl(mountTo: string): HTMLElement {
  const el: HTMLElement | null = document.querySelector(mountTo)

  if (!el) {
    throw new Error(
      `[portal-vue]: Mount Point '${mountTo}' not found in document`
    )
  }
  return el
}
