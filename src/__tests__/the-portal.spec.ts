import { describe, it, expect, vi } from 'vitest'
import Portal from '@/components/portal'
import { wormholeSymbol } from '@/composables/wormhole'
import type { PortalProps } from '@/types'
import { createWormhole } from '@/wormhole'
import { mount } from '@vue/test-utils'

const createWormholeMock = () => {
  const wh = createWormhole(false)

  vi.spyOn(wh, 'open')
  vi.spyOn(wh, 'close')

  return wh
}

function createWrapper(props: Partial<PortalProps> = {}, options = {}) {
  const wormholeMock = createWormholeMock()
  return {
    wh: wormholeMock,
    wrapper: mount(Portal, {
      props: {
        to: 'destination',
        name: 'source',
        ...props,
      } as any,
      slots: {
        default: `<span class="test-span">Test</span>`,
      },
      global: {
        provide: {
          [wormholeSymbol as unknown as string]: wormholeMock,
        },
        ...options,
      },
    }),
  }
}

describe('Portal', function () {
  it('renders nothing/a Fragment', function () {
    // expect(wrapper.$refs.portal.$el.nodeName).to.equal('#comment')
    const { wrapper } = createWrapper()
    expect(wrapper.html()).toBe('')
  })

  it('calls Wormhole.open with right content', function () {
    const { wh } = createWrapper()
    expect(wh.open).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'destination',
        from: 'source',
        content: expect.any(Function),
      })
    )
  })

  it('calls Wormhole close & sendUpdate when destination changes', async () => {
    const { wrapper, wh } = createWrapper()
    await wrapper.setProps({ to: 'destination2' })

    expect(wh.close).toHaveBeenCalled()
    // no idea why it's 3 and not 2 though. maybe related to test-utils
    expect(wh.open).toHaveBeenCalledTimes(3)
  })

  it('calls Wormhole.close() when destroyed', () => {
    const { wrapper, wh } = createWrapper()
    wrapper.unmount()
    expect(wh.close).toHaveBeenCalledWith({
      to: 'destination',
      from: 'source',
    })
  })

  it('renders locally when `disabled` prop is true', () => {
    const { wrapper } = createWrapper({ disabled: true })
    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
