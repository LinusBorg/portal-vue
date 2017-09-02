<template>
  <div id="#transitions-example">
    <div>
      <ul class="controls">
        <li class="controls--item">Transition from source: 
          <a href="#" class="controls--link"
            @click.prevent="toggleSource">
            Toggle
          </a>
        </li>
        <li class="controls--item">
          Transition in target:
          <a href="#" class="controls--link" @click.prevent="toggleTarget">
            Toggle
          </a>
          </li>
      </ul>
    </div>
    
    <div class="wrapper">
      <container type="destination">
        <h4>Transition passed from the child</h4>
        <portal-target name="source-transitions" />
        
        <h4>Transition defined on the PortalTarget component</h4>

        <portal-target 
          name="target-transitions" 
          slim
          :transition="{ name: 'fade', mode: 'out-in' }"
          :transition-events="{ enter: log }"/>
      </container>
    </div>
    
    <portal to="source-transitions" name="source-transitions">
      <transition name="fade" mode="out-in">
        <div v-if="showSource === 'left'" key="SourceA" class="A__">
          This is A
        </div>
        <div v-else key="SourceB" class="B__">
          This is B
        </div>
      </transition>
    </portal>  

    <portal to="target-transitions" name="target-transitions">
      <div v-if="showTarget === 'left'" key="TargetA" class="A__">
        This is A
      </div>
      <div v-else key="TargetB" class="B__">
        This is B
      </div>
    </portal>


  </div>
</template>

<script>
export default {
  data() {
    return {
      showSource: 'left',
      showTarget: 'left',
    }
  },
  methods: {
    toggleSource() {
      this.showSource = this.showSource === 'left' ? 'right' : 'left'
    },
    toggleTarget() {
      this.showTarget = this.showTarget === 'left' ? 'right' : 'left'
    },
    log(x) {
      console.log('log event!', x)
    }
  }
}
</script>
