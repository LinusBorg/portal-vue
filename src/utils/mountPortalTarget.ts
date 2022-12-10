import type { PortalTargetProps } from '../types'
import {
  type ComponentInternalInstance,
  createApp,
  getCurrentInstance,
  h,
  onBeforeUnmount,
  onMounted,
} from 'vue'
import PortalTarget from '../components/portal-target'

export function mountPortalTarget(
  targetProps: PortalTargetProps,
  el: HTMLElement | string
) {
  const app = createApp({
    // @ts-expect-error no idea why h() doesn't like this import
    render: () => h(PortalTarget, targetProps),
  })

  if (!targetProps.multiple) {
    // this is hacky as it relies on internals, but works.
    // TODO: can we get rid of this by somehow properly replacing the target's .parent?
    const provides =
      (
        getCurrentInstance() as ComponentInternalInstance & {
          provides: Record<string, any>
        }
      ).provides ?? {}
    app._context.provides = Object.create(provides)
    //Object.assign(app._context.provides, Object.create(provides))
  }
  onMounted(() => {
    app.mount(el)
  })
  onBeforeUnmount(() => {
    app.unmount()
  })
}
