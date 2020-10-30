import { useWormhole } from '@/composables/wormhole'
import {
  defineComponent,
  Fragment,
  h,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  Slots,
  watch,
} from 'vue'

let _id = 1

export interface PortalProps {
  disabled: boolean
  name: string
  order: number
  slim?: boolean
  slotProps: Record<string, any>
  to: string
}

export function usePortal(props: PortalProps, slots: Slots) {
  const wormhole = useWormhole()

  function sendUpdate() {
    const { to, name: from, order } = props
    if (slots.default) {
      wormhole.open({
        to,
        from,
        order,
        passengers: slots.default,
      })
    } else {
      clear()
    }
  }

  function clear(target?: string) {
    wormhole.close({
      to: props.to,
      from: target ?? props.name,
    })
  }
  onMounted(() => {
    if (!props.disabled) {
      sendUpdate()
    }
  })

  onUpdated(() => {
    if (props.disabled) {
      clear()
    } else {
      sendUpdate()
    }
  })

  onBeforeUnmount(() => {
    clear()
  })

  watch(
    () => props.to,
    (newTo, oldTo) => {
      if (oldTo && oldTo !== newTo) {
        clear()
      }
      sendUpdate()
    }
  )
}

export default defineComponent({
  name: 'portal',
  props: {
    disabled: { type: Boolean },
    name: { type: String, default: () => String(_id++) },
    order: { type: Number, default: 0 },
    slim: { type: Boolean },
    slotProps: { type: Object, default: () => ({}) },
    to: {
      type: String,
      default: () => String(Math.round(Math.random() * 10000000)),
    },
  },
  setup(props, { slots }) {
    usePortal(props, slots)

    return () => {
      if (props.disabled && slots.default) {
        return h(Fragment, slots.default)
      } else {
        return null
      }
    }
  },
})
