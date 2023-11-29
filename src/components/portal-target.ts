import {
  type FunctionalComponent,
  type VNode,
  defineComponent,
  h,
  onMounted,
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
    let mounted = false
    const slotVnodes = () => {
      const transports = wormhole.getContentForTarget(
        props.name,
        props.multiple
      )
      const sourceWrapperSlot = slots.sourceWrapper ?? slots.wrapper
      let vnodes = transports
        .map((t) => {
          const content = t
            .content(props.slotProps)
            .map((vnode) => slots.itemWrapper?.(vnode)[0] ?? vnode)
          return sourceWrapperSlot ? sourceWrapperSlot(content) : content
        })
        .flat(1)
      vnodes = slots.outerWrapper ? slots.outerWrapper(vnodes) : vnodes
      mounted && emitSlotChange(vnodes)
      return vnodes
    }

    const emitSlotChange = (vnodes: VNode[]) => {
      const hasContent = vnodes.length > 0
      const content = wormhole.transports.get(props.name)
      const sources = content ? [...content.keys()] : []
      emit('change', { hasContent, sources })
    }
    onMounted(() => (mounted = true))
    return () => {
      const vnodes = slotVnodes()
      const hasContent = !!vnodes.length
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
          h(PortalTargetContent, () => vnodes),
        ]
      } else {
        return slots.default?.()
      }
    }
  },
})
