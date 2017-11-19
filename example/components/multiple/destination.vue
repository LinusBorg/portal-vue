<template>
    <container type="destination">
        <h2>List<span v-if="showMultiple">s</span></h2>
        <button type="button" @click="toggleMultiple">Toggle Multiple</button>
        <portal-target name="lists" :multiple="showMultiple">

        </portal-target>
    </container>
</template>

<script>
    export default {
        data() {
            return {
                showMultiple: true,
            }
        },

        methods: {
            toggleMultiple() {
                this.showMultiple = !this.showMultiple;
            }
        }
    }
</script>