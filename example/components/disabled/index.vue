<template>
  <div id="disabled-example">
    <div class="">
      <ul class="controls">
        <li class="controls--item">
          <a href="#" class="controls--link" :class="{ 'controls--link-active': !disabled }"
            @click.prevent=" disabled = !disabled ">
            {{this.disabled ? 'Enable' : 'Disable'}}
          </a>
        </li>
      </ul>
    </div>
    <div class="wrapper">
      <div class="item source">
        <portal to="disabled-destination" :disabled="disabled">
          <p>
            When Portal is disabled, this paragraph is rendered in the left box.<br>
            When it's enabled, it's rendered in the right box.
          </p>
        </portal>
      </div>
      <div class="item destination">
        <portal-target name="disabled-destination" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {

    },
    data() {
      return {
        disabled: false
      }
    },
    methods: {

    },
  }
</script>

<style>

</style>
