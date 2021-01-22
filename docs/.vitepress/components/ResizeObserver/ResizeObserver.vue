<template>
  <div class="resize-observer" tabindex="-1" ref="el" />
</template>

<script lang="ts">
// Code adapted from https://github.com/Akryum/vue-resize
// and ported to Vue 3 by me
import { defineComponent, onBeforeUnmount, ref, onMounted, nextTick } from 'vue'

function createObject(compareAndNotify: EventListener) {
  const object = document.createElement('object')
  object.setAttribute('aria-hidden', 'true')
  object.setAttribute('tabindex', '-1')
  object.type = 'text/html'
  object.data = 'about:blank'

  object!.contentDocument?.defaultView?.addEventListener(
    'resize',
    compareAndNotify
  )
  return object
}

export default defineComponent({
  name: 'ResizeObserver',

  setup(_, { emit }) {
    const el = ref<HTMLElement>()
    let object: HTMLObjectElement
    const state = {
      w: 0,
      h: 0,
    }

    function compareAndNotify() {
      if (
        state.w !== el.value!.offsetWidth ||
        state.h !== el.value!.offsetHeight
      ) {
        state.w = el.value!.offsetWidth
        state.h = el.value!.offsetHeight
        emit('notify', {
          ...state,
        })
      }
    }

    onMounted(async () => {
      await nextTick()
      state.w = el.value!.offsetWidth
      state.h = el.value!.offsetHeight
      object = createObject(compareAndNotify)
      el.value?.appendChild(object)
      compareAndNotify()
    })
    onBeforeUnmount(() => {
      if (object && object.onload) {
        object.contentDocument?.defaultView?.removeEventListener(
          'resize',
          compareAndNotify
        )
      }
      el.value!.removeChild(object)
      // @ts-ignore
      object = undefined
    })

    return {
      el,
    }
  },
})
</script>

<style scoped>
.resize-observer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  pointer-events: none;
  display: block;
  overflow: hidden;
  opacity: 0;
}

.resize-observer >>> object {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}
</style>