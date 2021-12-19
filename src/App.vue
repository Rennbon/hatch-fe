<template>
    <router-view/>
</template>
<script lang="ts">
    import {defineComponent, provide} from "vue";
    import {WClient} from "@/chain/walletconnect";
    import {ContractManager} from "@/chain/erc20";

    window.onload = function () {
        document.addEventListener('touchstart', function (event) {
            if (event.touches.length > 1) {
                event.preventDefault()
            }
        })
        document.addEventListener('gesturestart', function (event) {
            event.preventDefault()
        })
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            let now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false)
    }

    export default defineComponent({
            name: "App",
            setup() {
                provide<WClient>("walletConnect", new WClient())
                provide<ContractManager>("abi", new ContractManager(String(process.env.VUE_APP_DREAM_MAKE)))
                provide<string>("makeDream", String(process.env.VUE_APP_DREAM_MAKE))
                provide<string>("account", "")
            }
        }
    )
</script>
<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100vh;

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
        color: #333;
        font-family: Arial;
    }

    .guide-border {
        background-image: linear-gradient(to right, #0575DF, #00EB60);
        height: 450px;
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        box-shadow: 0 0 28px rgba(0, 0, 0, .25), 0 0 28px rgba(0, 0, 0, .25);
        border-radius: 20px 20px 0 0;
        color: white;
        z-index: 5000;
    }

    .cell-group {
        padding: 0px 42px 0px 42px;
        width: 666px;
    }

    .guide-border-v2 {
        background-image: linear-gradient(to right, #0575DF, #00EB60);
        height: 450px;
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        box-shadow: 0 0 28px rgba(0, 0, 0, .25), 0 0 28px rgba(0, 0, 0, .25);
        border-radius: 20px 20px 0 0;
        color: white;
        z-index: 5000;
    }

    .guide-how {
        position: relative;
        top: 44px;
        left: 50px;
        text-align: left;

        font-size: 48px;
        color: white;

        font-weight: bold;
        line-height: 44px;

    }

    .guide-bt {
        z-index: 3000;
        background-color: #eeeeee;
        box-shadow: 0 0 28px rgba(0, 0, 0, .25), 0 0 28px rgba(0, 0, 0, .25);
        border-radius: 20px;
        height: 110px;
        width: 650px;
        border: 0;
        font-weight: bold;
        color: #666666;
        padding: 0;
        margin: 0;
        position: relative;
        top: 38px;
    }


    .guide-how-border {
        position: relative;
        top: 60px;
    }

    .guide-content {
        padding-left: 50px;
        text-align: left;
        font-weight: 500;
        color: white;
        top: 90px;
        left: 50px;
        font-size: 24px;
        line-height: 30px;

    }

    .dcf-1 {
        display: inline-block;
        background-color: #FF9900;
        color: #FFFF00;
        height: 30px;
        padding: 0;
        margin: 0;
        font-size: 20px;
        line-height: 30px;
    }

    .dcf-2 {
        display: inline-block;
        background-color: #FFFF00;
        color: #FF9900;
        height: 30px;
        padding: 0;
        margin: 0;
        font-size: 20px;
        line-height: 30px;
    }

    .dcf-3 {
        display: inline-block;
        height: 30px;
        padding: 0;
        margin: 0;
        font-size: 20px;
        line-height: 30px;
    }

    .divider {
        height: 20px;
        background-color: #BCBCBC;
    }

    .cell-line {
        border-bottom: 2px solid #F2F2F2;
    }

    .cell {
        width: 100%;
        line-height: 80px;
        height: 80px;
        display: inline-flex;
    }


    .cell-right {
        width: 180px;
        display: inline-block;
        height: 80px;
    }

    .cell-middle {
        width: 306px;
        display: inline-block;
        text-align: right;
        height: 80px;
    }

    .cell-left {
        width: 180px;
        display: inline-block;
        height: 80px;
    }


    .cell-title {
        font-size: 32px;
        font-family: Arial;
        color: #333333;
        line-height: 80px;
        text-align: left;
    }


    .cell-title-left {
        font-size: 24px;
        font-family: Arial;
        line-height: 80px;
        color: #333333;
        height: 80px;
        text-align: left;
    }

    .cell-title-right {
        font-size: 24px;
        font-family: Arial;
        line-height: 80px;
        color: #333333;
        height: 80px;
        padding-right: 10px;
        text-align: right;
    }

    .cell-label {
        font-size: 22px;
        color: #333333;
        text-align: left;
        font-family: Arial;
        height: 80px;
        line-height: 80px;
    }

    .cell-number {
        width: 246px;
        font-size: 24px;
        font-family: Arial;
        color: #333333;
        display: inline-block;
        text-align: right;
    }


    .cell-unit {
        width: 60px;
        font-size: 20px;
        text-align: center;
        display: inline-block;
        color: #BCBCBC;
    }

    .cell-button {
        height: 60px;
        width: 160px;
        border-radius: 48px;
        font-size: 24px;
        font-weight: bold;
        color: #333333;
        background-color: #FFCC00;
        border: 0;
        line-height: 24px;
        font-family: PingFangSC;
    }

    .question-o {
        text-align: right;
        padding-right: 20px;
        font-size: 48px;
        line-height: 80px;
        display: block;
        color: #aaa;
    }


    .cell-half {
        width: 50%;
    }

    .cell-half-label {
        height: 40px;
        font-size: 24px;
        text-align: left;
        line-height: 40px;
        font-weight: bold;
    }

    .cell-half-value {
        height: 40px;
        text-align: right;
        font-size: 24px;
        line-height: 40px;
        font-weight: bold;
    }

    .cell-large-half {
        width: 66%;
        height: 80px;
    }

    .cell-small-half {
        width: 33%;
        height: 80px;
        text-align: right;
    }

    .color-gray {
        color: #BCBCBC;
    }

    .color-black {
        color: #333;
    }

    .font-italic {
        font-style: italic
    }

    .token-unit {
        font-style: italic;
        font-size: 20px;
        color: #BCBCBC;
        font-family: Arial;
    }

    .cell-page-num {
        font-size: 20px;
    }
</style>
