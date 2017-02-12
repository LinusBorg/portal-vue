<template>
  <nav class="col-xs-12 col-md-3 ">
    <ul class="list ph3">
      <li v-for="item in items">
        <a v-if="item.id" class=" f6 mb2 lh-copy link dark-gray"
          @click.prevent="goTo(item.id)" :href="item.id">
          {{ item.text }}
        </a>
        <div v-else class="mr1 mt4 bb mb2 lh-copy f4 dark-gray tracked">
          {{ item.text }}
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
  import scroll from 'scroll'
  import page from 'scroll-doc'
  import { offset } from '../util/index.js'

  export default {
    data() {
      return {
        items: [
          { text: 'Documentation' },
          { text: 'Portal component', id: '#portal' },
          { text: 'PortalTarget component', id: '#portal-target' },
          { text: 'Examples' },
          { text: 'Simple Usage', id: '#simple-usage' },
          { text: 'Switch between Targets', id: '#switch-targets' },
          { text: 'Switch Source of a Target', id: '#switch-sources' },
          { text: 'Mount Target outside of App', id: '#mount-outside' },
        ]
      }
    },
    methods: {
      goTo(id) {
        const el = document.querySelector(id)
        if (!el) return
        const { top } = offset(el)
        scroll.top(page, top)
      }
    },
  }
</script>

<style>

</style>
