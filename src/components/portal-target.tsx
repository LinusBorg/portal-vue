import {
  defineComponent,
  PropType,
  h,
  resolveComponent,
  FunctionalComponent,
  ComponentOptions,
  ComponentInternalInstance,
  getCurrentInstance,
  computed,
  watch,
  VNode,
} from 'vue'
import { useWormhole } from '@/composables/wormhole'

type TransitionComponent = PropType<
  ComponentOptions<any> | FunctionalComponent | string
>
export default defineComponent({
  name: 'portalTarget',
  props: {
    multiple: { type: Boolean, default: false },
    name: { type: String, required: true },
    slotProps: { type: Object, default: () => ({}) },
    transition: {
      type: [String, Object, Function] as TransitionComponent,
    },
    __parent: {
      type: Object as PropType<ComponentInternalInstance>,
    },
  },
  setup(props, { emit, slots }) {
    // TODO: validate if parent injection works
    // depends on MountingPortalTarget
    if (props.__parent) {
      useParentInjector(props.__parent)
    }

    const wormhole = useWormhole()

    const allTransports = wormhole.transports

    // TODO: Allow to wrap sources' passengers with a custom slot
    const slotVnodes = computed<{ vnodes: VNode[]; vnodesFn: () => VNode[] }>(
      () => {
        const transports = allTransports[props.name] ?? []
        const wrapperSlot = slots.wrapper
        const vnodes = props.multiple
          ? transports.flatMap((t) =>
              wrapperSlot
                ? wrapperSlot(t.passengers(props.slotProps))
                : t.passengers(props.slotProps)
            )
          : wrapperSlot
          ? wrapperSlot(
              transports[transports.length - 1]?.passengers(props.slotProps) ||
                []
            )
          : transports[transports.length - 1]?.passengers(props.slotProps) || []
        return {
          vnodes,
          vnodesFn: () => vnodes, // just to make Vue happy. raw vnodes in a slot give a DEV warning
        }
      }
    )

    watch(slotVnodes, ({ vnodes }) => {
      const hasContent = vnodes.length > 0
      const sources = allTransports[props.name]?.map((t) => t.from)
      emit('change', { hasContent, sources })
    })

    return () => {
      const transition = props.transition
        ? typeof props.transition === 'string'
          ? resolveComponent(props.transition)
          : props.transition
        : undefined
      if (transition) {
        return h(transition, slotVnodes.value.vnodesFn)
      } else if (slotVnodes.value.vnodes.length) {
        return slotVnodes.value.vnodes
      } else {
        return slots.default?.()
      }
    }
  },
})

function useParentInjector(parent: ComponentInternalInstance) {
  const vm = getCurrentInstance()
  vm!.parent = parent
}

export const PortalTargetContent: FunctionalComponent<{ content: VNode[] }> = (
  props
) => {
  return props.content
}
