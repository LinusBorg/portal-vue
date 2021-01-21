<template>
  <div class="split-container" ref="container">
    <resize-observer @notify="handleResize" />
    <button
      class="split-tab-button"
      :class="isActive('example')"
      type="button"
      @click="setDisplay('example')"
    >
      Example
    </button>
    <button
      class="split-tab-button"
      :class="isActive('code')"
      type="button"
      @click="setDisplay('code')"
    >
      Code
    </button>
    <button
      class="split-tab-button"
      :class="isActive('both')"
      type="button"
      @click="setDisplay('both')"
    >
      Example+Code
    </button>
    <div class="split" :class="state.orientation">
      <div v-if="exampleVisible" class="split-example">
        <keep-alive>
          <slot name="example" />
        </keep-alive>
      </div>
      <div v-if="codeVisible" class="split-code">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  nextTick,
  computed,
  PropType,
  ref,
} from 'vue'

type Display = 'example' | 'code' | 'both'
type Orientation = 'horizontal' | 'vertical'

export default defineComponent({
  props: {
    active: {
      type: String as PropType<Display>,
      default: 'example',
    },
  },
  setup(props) {
    const container = ref<HTMLElement>()
    const state = reactive({
      display: props.active,
      orientation: 'horizontal' as Orientation,
      width: Infinity,
    })

    const exampleVisible = computed(() =>
      ['example', 'both'].includes(state.display)
    )
    const codeVisible = computed(() => ['code', 'both'].includes(state.display))

    function isActive(type: string) {
      return state.display === type ? 'split-tab-button-active' : ''
    }
    function setDisplay(value: Display) {
      state.display = value
    }
    function handleResize() {
      const el = container.value
      if (el && el instanceof HTMLElement) {
        const { width } = el.getBoundingClientRect()
        state.width = width
        if (width < 800) {
          state.orientation = 'horizontal'
        } else {
          state.orientation = 'vertical'
        }
      }
    }

    onMounted(async () => {
      await nextTick()
      handleResize()
    })
    return {
      container,
      state,
      codeVisible,
      exampleVisible,
      isActive,
      setDisplay,
      handleResize,
    }
  },
  /*data() {
    return {
      display: this.active,
      column: false,
      width: Infinity,
    }
  },
  mounted() {
    this.$nextTick(this.handleResize)
  },
  computed: {
    exampleVisible(): boolean {
      return this.display === 'example' || this.display === 'both'
    },
    codeVisible(): boolean {
      return this.display === 'code' || this.display === 'both'
    },
  },
  methods: {
    handleResize() {
      const el = this.$refs.cont
      if (el && el instanceof HTMLElement) {
        const { width } = el.getBoundingClientRect()
        this.width = width
        if (width < 800) {
          this.column = true
        } else {
          this.column = false
        }
      }
    },
    setDisplay(type: Display) {
      this.display = type
    },
    isActive(type: string) {
      return this.display === type ? 'split-tab-button-active' : ''
    },
  },*/
})
</script>

<style>
@import '~vue-resize/dist/vue-resize.css';
</style>

<style lang="stylus" scoped>
.split-container {
  margin: 20px 0;
  padding: 20px;
  background: #EEE;
  border-radius: 5px;
}

.split-tab-button {
  border: none;
  background: #fff;
  padding: 12px 24px;
  font-size: 14px;
  display: inline-flex;
  margin-bottom: 5px;
}

.split-tab-button-active {
  color: #fff;
  background: #3eaf7c;
}

.split {
  background-color: white;
  border-radius: 5px;
  width: auto;
  display: flex;
  margin: 0 -10px;

  &.horizontal {
    flex-direction: column;

    & > div {
      width: auto;
    }
  }

  & > div {
    padding: 0 10px;
    flex: 1 1 auto;
    width: 50%; // width: 50%;
  }
}

.split-example {
  margin: 0.85rem 0;
}
</style>
