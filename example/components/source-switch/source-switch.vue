<template>
  <div>
    <div class="">
      <ul class="controls">
        <li class="controls--item">
          <a href="#" class="controls--link" :class="{ 'controls--link-active': active === 'ss-A' }"
            @click.prevent=" active = 'ss-A' ">
            Get Content from source A
          </a>
        </li>
        <li class="controls--item">
          <a href="#" class="controls--link" :class="{ 'controls--link-active': active === 'ss-B' }"
            @click.prevent=" active = 'ss-B' ">
            Get content from source B
          </a>
        </li>
      </ul>
    </div>
    <div class="wrapper">
      <portal-source :active="active" name="ss-A" />
      <portal-source :active="active" name="ss-B" />
      <destination :source="active" />
    </div>
  </div>
</template>

<script>
  import portalSource from './source.vue'
  import Destination from './destination.vue'

  export default {
    components: {
      portalSource, Destination,
    },
    data() {
      return {
        active: 'ss-A'
      }
    },
  }
</script>
