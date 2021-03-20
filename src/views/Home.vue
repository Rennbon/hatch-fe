<template>
    <div id="home">
        <Index></Index>
        <Bottom></Bottom>
    </div>
</template>

<script>
    import Bottom from "@/components/bar/Bottom";
    import Index from "@/components/Index";

    export default {
        name: 'Home',
        components: {
            Index,
            Bottom,
        },
    }
</script>
<style scoped>
    #home {
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: fixed;
    }
</style>
