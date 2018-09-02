<template>
  <div>
    <portal to="target" disabled :slot-props="{ message: 'Hi!' }">
      <p slot-scope="{ message }">
        Hi!
      </p>
    </portal>
  </div>
</template>
<script>
export default {}
</script>

