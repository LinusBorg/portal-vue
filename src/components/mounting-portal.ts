import { PortalTargetProps, Wormhole } from '@/types'
import {
  ComponentOptions,
  createApp,
  defineComponent,
  getCurrentInstance,
  h,
  onBeforeUnmount,
  onMounted,
} from 'vue'
import { useWormhole, wormholeSymbol } from '../composables/wormhole'
import { __DEV__, assertStaticProps, inBrowser } from '../utils'
import { usePortal } from './portal'
import PortalTarget from './portal-target'

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
    // name for the target
    to: {
      type: String,
      default: () => String(Math.round(Math.random() * 10000000)),
    },

    targetSlotProps: { type: Object, default: () => ({}) },
  },
  setup(props, { slots }) {
    __DEV__ &&
      assertStaticProps('Portal', props, [
        'mountTo',
        'order',
        'name',
        'append',
        'multiple',
      ])

    const wormhole = useWormhole()
    usePortal(props, slots)

    if (inBrowser) {
      const el = getTargetEl(props.mountTo)

      const targetProps = {
        multiple: true, // aways true, as for non-multiple portals, the native `Teleport` component is better suited.
        name: props.to,
        __parent: getCurrentInstance()?.parent,
      }

      mountPortalTarget(targetProps, wormhole, el)
    }

    return () => {
      if (props.disabled && slots.default) {
        return slots.default()
      } else {
        return null
      }
    }
  },
})

function mountPortalTarget(
  targetProps: PortalTargetProps,
  wormhole: Wormhole,
  el: HTMLElement
) {
  const app = createApp({
    // TODO: fix Component type error
    render: () => h(PortalTarget as ComponentOptions, targetProps),
  })

  app.provide(wormholeSymbol, wormhole)

  onMounted(() => app.mount(el))
  onBeforeUnmount(() => {
    app.unmount(el)
  })
}

function getTargetEl(mountTo: string): HTMLElement {
  const el: HTMLElement | null = document.querySelector(mountTo)

  if (!el) {
    throw new Error(
      `[portal-vue]: Mount Point '${mountTo}' not found in document`
    )
  }
  return el
}
