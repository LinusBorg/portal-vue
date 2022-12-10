import {
  type FunctionalComponent,
  type VNode,
  computed,
  defineComponent,
  h,
  watch,
} from 'vue'
import { useWormhole } from '../composables/wormhole'

const PortalTargetContent: FunctionalComponent = (_, { slots }) => {
  return slots.default?.()
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'portalTarget',
  props: {
    multiple: { type: Boolean, default: false },
    name: { type: String, required: true },
    slotProps: { type: Object, default: () => ({}) },
  },
  emits: ['change'],
  setup(props, { emit, slots }) {
    const wormhole = useWormhole()

    const slotVnodes = computed<{ vnodes: VNode[]; vnodesFn: () => VNode[] }>(
      () => {
        const transports = wormhole.getContentForTarget(
          props.name,
          props.multiple
        )
        const wrapperSlot = slots.wrapper
        const rawNodes = transports.map((t) => t.content(props.slotProps))
        const vnodes = wrapperSlot
          ? rawNodes.flatMap((nodes) =>
              nodes.length ? wrapperSlot(nodes) : []
            )
          : rawNodes.flat(1)
        return {
          vnodes,
          vnodesFn: () => vnodes, // just to make Vue happy. raw vnodes in a slot give a DEV warning
        }
      }
    )

    watch(
      slotVnodes,
      ({ vnodes }) => {
        const hasContent = vnodes.length > 0
        const content = wormhole.transports.get(props.name)
        const sources = content ? [...content.keys()] : []
        emit('change', { hasContent, sources })
      },
      { flush: 'post' }
    )
    return () => {
      const hasContent = !!slotVnodes.value.vnodes.length
      if (hasContent) {
        return [
          // this node is a necessary hack to force Vue to change the scoped-styles boundary
          // TODO:  find less hacky solution
          h('div', {
            style: 'display: none',
            key: '__portal-vue-hacky-scoped-slot-repair__',
          }),
          // we wrap the slot content in a functional component
          // so that transitions in the slot can properly determine first render
          // for `appear` behavior to work properly
          h(PortalTargetContent, slotVnodes.value.vnodesFn),
        ]
      } else {
        return slots.default?.()
      }
    }
  },
})
