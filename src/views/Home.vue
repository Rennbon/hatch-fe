<template>
    <div class="home">
        <Index></Index>
        <Bottom></Bottom>
    </div>
</template>

<script>
    //import WalletConnect from '../components/WalletConnect'
    import Bottom from "@/components/bar/Bottom";
    import Index from "@/components/Index";

    export default {
        name: 'Home',
        components: {
            // WalletConnect,
            Index,
            Bottom,
        },
    }
</script>
