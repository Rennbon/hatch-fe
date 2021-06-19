<template>
    <div id="home">
        <Index></Index>
        <Bottom></Bottom>
    </div>
</template>

<script lang="ts">
    import Bottom from "@/components/bar/Bottom.vue";
    import Index from "@/components/Index.vue";
    import {defineComponent} from "vue";

    export default defineComponent({
        name: 'HomeV2',
        components: {
            Index,
            Bottom,
        },

    })
</script>
<style scoped>
    #home {
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: fixed;
    }
</style>
