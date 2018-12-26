<template>
  <portal-target name="empty-destination">
    <ul class="controls">
      <li class="controls--item">
        <a href="#" class="controls--link" @click.prevent="count++"
          >Increase counter</a
        >
      </li>
    </ul>
    <p>
      This is default content for the Target <br />
      It has a counter: {{ count }}
    </p>
    <p>
      It gets rendered whenever there is no content from a sourc Portal
      available
    </p>
  </portal-target>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: () => ({
    count: 0,
  }),
})
</script>

<style></style>
