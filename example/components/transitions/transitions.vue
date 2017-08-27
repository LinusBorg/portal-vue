<template>
  <div id="#transitions-example">
    <div>
      <ul class="controls">
        <li class="controls--item">
          <a href="#" class="controls--link"
            @click.prevent="toggle">
            Switch to {{this.show === 'right' ? 'A' :  'B'}}
          </a>
        </li>
      </ul>
    </div>
    <div class="wrapper">
      <container type="destination">
        
        <portal-target name="destination-transitions" />
        
      </container>
    </div>
    <portal to="destination-transitions" name="source-transitions">
      <transition name="fade" mode="out-in">
        <div v-if="show === 'left'" key="A">
          This is A
        </div>
        <div v-else key="B">
          This is B
        </div>
      </transition>
    </portal>  
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: 'left',
    }
  },
  methods: {
    toggle() {
      this.show = this.show === 'left' ? 'right' : 'left'
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
