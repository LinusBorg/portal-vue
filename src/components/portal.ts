import { useWormhole } from '@/composables/wormhole'
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  Slots,
  watch,
} from 'vue'
import { PortalProps } from '@/types'
let _id = 1

export function usePortal(props: PortalProps, slots: Slots) {
  const wormhole = useWormhole()

  function sendUpdate() {
    const { to, name: from, order } = props
    if (slots.default) {
      wormhole.open({
        to,
        from: from!,
        order,
        content: slots.default,
      })
    } else {
      clear()
    }
  }

  function clear(target?: string) {
    wormhole.close({
      to: target ?? props.to,
      from: props.name,
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
      if (props.disabled) return
      if (oldTo && oldTo !== newTo) {
        clear(oldTo)
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
    order: { type: Number },
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
        return slots.default(props.slotProps)
      } else {
        return null
      }
    }
  },
})
