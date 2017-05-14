<template>
  <div class="item" :class="type">
    <div v-if="$slots.header" class="header">
      <slot name="header"/>
    </div>

    <div class="body">
      <slot />
    </div>
  </div>
</template>

<script>
  const types = ['source', 'destination']
  export default {
    abstract: true,
    props: {
      type: {
        type: String, required: true,
        validator: (value) => types.indexOf(value) !== -1,
      },
    },
  }
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.header {
  padding: 5px;
  padding-left: 15px;
}
.body {
  padding: 15px;
}

.item {
  border: 1px solid rgb(220, 220, 220);
  border-radius: 2px;
  margin: 15px;
  margin-top: 30px;
  // padding: 15px;
}

.item.source {
  border-color: $vueColor;
  border-width: 2px;
}

.item.destination {
  border-width: 2px;
  border-color: $red;
}
</style>
