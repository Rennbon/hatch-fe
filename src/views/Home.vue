<template>
    <div class="home">
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
