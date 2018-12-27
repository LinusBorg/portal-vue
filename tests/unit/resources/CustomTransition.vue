<template>
  <Transition name="fade"> <slot /> </Transition>
</template>

<script>
export default {
  name: 'CustomFadeTransition',
}
</script>
