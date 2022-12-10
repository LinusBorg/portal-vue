<template>
  <div>
    <portal
      to="target"
      disabled
      :slot-props="{ message: 'Hi!' }"
      v-slot="{ message }"
    >
      <p>{{ message }}</p>
    </portal>
  </div>
</template>
<script>
export default {}
</script>
