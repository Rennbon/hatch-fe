<template>
    <div id="home">
        <NavBar></NavBar>
        <Index></Index>
    </div>
</template>

<script lang="ts">
    import NavBar from "@/components/bar/v2/NavBar.vue";
    import Index from "@/components/content/v2/Index.vue";
    import {defineComponent} from "vue";

    export default defineComponent({
        name: 'HomeV2',
        components: {
            Index,
            NavBar,
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
