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
            provide<string>("makeDream", String(process.env.VUE_APP_DREAM_MAKE))
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

    div {
        color: #666666;
    }

    .guide-border {
        background-image: linear-gradient(to right, #0575DF, #00EB60);
        height: 520px;
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        box-shadow: 0 0 28px rgba(0, 0, 0, .25), 0 0 28px rgba(0, 0, 0, .25);
        border-radius: 20px 20px 0 0 ;
        color: white;
    }

    .guide-bt {
        margin-top: 38px;
        z-index: 3000;
        color: white;
        background-color: #eeeeee;
        box-shadow: 0 0 28px rgba(0, 0, 0, .25), 0 0 28px rgba(0, 0, 0, .25);
        border-radius: 20px;
        height: 110px;
        width: 650px;
        border: 0;
        color: #666666;
    }

    .guide-how {
        font-size: 48px;
        color: white;
        position: absolute;
        left: 50px;
        top: 44px;
        font-weight: bold;

    }

    .guide-how-border {
        position: absolute;
        top: 110px;
        left: 50px;
    }

    .guide-content {
        text-align: left;
        font-weight: 500;
        color: white;
        top: 90px;
        left: 50px;
        font-size: 24px;
        line-height: 30px;
    }
</style>
