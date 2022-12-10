import {
  type Slots,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  watch,
} from 'vue'
import { useWormhole } from '../composables/wormhole'
import type { Name, PortalProps } from '../types'
import { __DEV__, assertStaticProps, inBrowser } from '../utils'

export function usePortal(props: PortalProps, slots: Slots) {
  const wormhole = useWormhole()

  function sendUpdate() {
    if (!inBrowser) return
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

  function clear(target?: Name) {
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
  compatConfig: { MODE: 3 },
  name: 'portal',
  props: {
    disabled: { type: Boolean },
    name: { type: [String, Symbol], default: () => Symbol() },
    order: { type: Number },
    slotProps: { type: Object, default: () => ({}) },
    to: {
      type: String,
      default: () => String(Math.round(Math.random() * 10000000)),
    },
  },
  setup(props, { slots }) {
    __DEV__ && assertStaticProps('Portal', props, ['order', 'name'])
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
