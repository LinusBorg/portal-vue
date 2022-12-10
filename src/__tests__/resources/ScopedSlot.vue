<template>
  <div>
    <div id="from">
      <portal to="target" v-slot="{ message }">
        <p>Your message reads: {{ message }}</p>
      </portal>
    </div>
    <div id="to">
      <portal-target name="target" :slot-props="{ message: 'Hi!' }" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'scopedSlot',
}
</script>
