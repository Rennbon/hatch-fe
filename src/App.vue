<template>
    <router-view/>
</template>
<script lang="ts">
    import {defineComponent, provide} from "vue";
    import {WClient} from "@/chain/walletconnect";
    import {ContractManager} from "@/chain/erc20";

    export default defineComponent({
        name: "App",
        setup() {
            provide<WClient>("walletConnect", new WClient())
            provide<ContractManager>("abi", new ContractManager(String(process.env.VUE_APP_DREAM_MAKE)))
            provide<string>("fundsToken", String(process.env.VUE_APP_DREAM_MAKE))
        }
    })
</script>
<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
