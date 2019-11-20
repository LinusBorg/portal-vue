<template lang="html">
  <div class="split-container" ref="cont">
    <resize-observer @notify="handleResize"/>
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
    <div class="split" :class="column ? 'column' : ''">
      <div
        v-if="exampleVisible"
        class="split-example"
      >
        <keep-alive>
          <slot name="example"/>
        </keep-alive>
      </div>
      <div
        v-if="codeVisible"
        class="split-code"
      >
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      display: this.active,
      column: false,
      width: Infinity,
    }
  },
  props: {
    active: {
      type: String,
      default: 'example',
    },
  },
  mounted() {
    this.$nextTick(this.handleResize)
  },
  computed: {
    /**
     * @return {boolean}
     */
    exampleVisible() {
      return this.display === 'example' || this.display === 'both'
    },
    /**
     * @returns { boolean }
     */
    codeVisible() {
      return this.display === 'code' || this.display === 'both'
    },
  },
  methods: {
    handleResize() {
      const el = this.$refs.cont
      console.log('yay', el)
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
    /**
     * @param {string} type
     */
    setDisplay(type) {
      this.display = type
    },
    /**
     * @param {string} type
     */
    isActive(type) {
      return this.display === type ? 'split-tab-button-active' : ''
    },
  },
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

  &.column {
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
