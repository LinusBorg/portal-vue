<template>
    <div class="wrapper">
        <src name="Grocery List"></src>
        <src name="Santa"></src>
        <src name="Menu"></src>
        <destination></destination>
    </div>
</template>

<script>
    import Src from "./source.vue";
    import Destination from './destination.vue';

    export default {
        components: {Src, Destination},
    }
</script>