<template>
  <div>
    <div class="">
      <ul class="controls">
        <li class="controls--item">
          <a href="#" class="controls--link" :class="{ 'controls--link-active': disabled }"
            @click.prevent=" disabled = !disabled ">
            {{this.disabled ? 'Enable' : 'Disable'}}
          </a>
        </li>
      </ul>
    </div>
    <div class="wrapper">
      <div class="item source">
        <portal to="comp-as-root" :disabled="disabled">
          <test :test-prop="testProp"></test>
        </portal>
      </div>
      <div class="item destination">
        <portal-target name="comp-as-root" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'compAsRoot',
    data () {
      return { disabled: true, testProp: 'Test!!' }
    },
    components: {
      test: {
        props: ['testProp'],
        render (h) {
          return h('DIV', [h('p', `This was rendered with a component as the root element in the portal: ${this.testProp}`)])
        },
      },
    },
    methods: {

    },
  }
</script>

<style>

</style>
