<template>
  <div id="scoped-slot-example">
    <div class="">
      <ul class="controls">
        <li class="controls--item">
          <a
            href="#"
            class="controls--link"
            :class="{ 'controls--link-active': !scopedSlot }"
            @click.prevent="scopedSlot = !scopedSlot"
          >
            {{ scopedSlot ? 'Enable' : 'Disable' }}
          </a>
        </li>
      </ul>
    </div>
    <div class="wrapper">
      <container type="source">
        <portal
          to="scoped-slot-destination"
          :disabled="scopedSlot"
          :slot-props="{ message: 'Message for local!!' }"
        >
          <template #default="{ message }">
            <p>
              This content was created with a scoped Slot.<br />
              When Portal is disabled, this paragraph is rendered in the left
              box.<br />
              When it's enabled, it's rendered in the right box.
            </p>
            <div ref="text">{{ message }}</div>
            <test ref="test" />
          </template>
        </portal>
      </container>

      <container type="destination">
        <portal-target
          name="scoped-slot-destination"
          :slot-props="{ message: 'Message for Target!!!!' }"
        />
      </container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Test from '../test-component.vue'

export default defineComponent({
  name: 'scopedSlotExample',
  components: { Test },
  data() {
    return {
      scopedSlot: false,
    }
  },
})
</script>

<style></style>
