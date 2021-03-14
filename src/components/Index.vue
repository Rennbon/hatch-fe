<template>
    <div>
        <div id="blank-header"></div>
        <img id="logo" src="/img/2x/logo-b.png" alt=""/>
        <div id="name">Dream DAO</div>
        <div>
            <div class="content">The first</div>
            <div class="content">decentralized combinator</div>
            <div class="content">in the world</div>
        </div>
        <button id="info-bt" @click="toPage">不连接钱包直接阅览</button>
        <button id="guide-bt" @click="toP1">What is DreamDAO?</button>
    </div>
</template>

<script>
    export default {
        name: "Index",
        methods: {
            toP1() {
                this.$router.push({
                    name: 'Guide'
                })
            },
            toPage() {
                this.$router.push({
                    name: 'Page'
                })
            }
        },
    }
</script>

<style scoped>
    #blank-header {
        height: 84px;
        border-radius: 0 0 5px 5px;
        box-shadow: 0 0 7px rgba(0, 0, 0, .25), 0 0 7px rgba(0, 0, 0, .25)
    }

    #logo {
        margin-top: 120px;
        height: 120px;
    }

    #name {
        font-size: 24px;
        font-family: PingFangSC-Medium;
        font-weight: bold;
    }

    .content {
        font-size: 12px;
        font-family: Helvetica-Light;
        font-weight: bold;
        padding: 4px;
    }

    .content:nth-child(1) {
        margin-top: 32px;
    }

    #info-bt {
        margin-top: 60px;
        border: none;
        height: 38px;
        width: 311px;
        background-image: linear-gradient(to right, #0575DF, #00EB60);
        background-size: 100% 100%;
        color: white;
        font-size: 16px;
        font-family: "PingFang SB";
        font-weight: bold;
        border-radius: 5px;
    }

    #guide-bt {
        margin-top: 10px;
        border: none;
        height: 38px;
        width: 311px;
        background-color: #0575DF;
        color: white;
        font-size: 16px;
        font-family: "PingFang SB";
        border-radius: 5px;
        font-weight: bold;
    }
</style>
