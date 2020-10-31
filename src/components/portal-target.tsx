import {
  defineComponent,
  PropType,
  h,
  resolveComponent,
  FunctionalComponent,
  ComponentOptions,
  ComponentInternalInstance,
  getCurrentInstance,
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
  setup(props) {
    if (props.__parent) {
      useParentInjector(props.__parent)
    }

    const wormhole = useWormhole()

    const allTransports = wormhole.transports

    const myTransports = () => {
      const transports = allTransports[props.name] ?? []
      const vnodes = transports.flatMap((t) => t.passengers(props.slotProps))
      return vnodes
    }
    return () => {
      const transition = props.transition
        ? typeof props.transition === 'string'
          ? resolveComponent(props.transition)
          : props.transition
        : undefined
      if (transition) {
        return h(transition, myTransports)
      } else {
        return myTransports()
      }
    }
  },
})

function useParentInjector(parent: ComponentInternalInstance) {
  const vm = getCurrentInstance()
  vm!.parent = parent
}
