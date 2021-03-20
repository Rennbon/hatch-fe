<template>
    <van-action-bar id="guide">
        <div class="guide-border">
            <div class="guide-how">How to Play?</div>
            <div class="guide-how-border">
                <div class="guide-content">To investors:</div>
                <div class="guide-content">1. 存ETH挖Fund治理币。</div>
                <div class="guide-content">2. 在创业项目列表中挑选并投资。</div>
                <div class="guide-content">3. 出售项目代币并帮助Fund治理币升值。</div>
                <div class="guide-content">4. 卖出Fund治理代币得到价值回报。</div>
                <button class="guide-bt" @click="next">How to Play bigger?</button>
            </div>
        </div>
    </van-action-bar>
</template>

<script>
    export default {
        name: "P2",
        methods: {
            next() {
                this.$emit('change', "3")
            }
        }
    }
</script>

<style scoped>
    #guide {
        position: absolute;
        width: calc(100vw);
        height: calc(100vh - 100px - 200px);
        padding-bottom: 200px;
        overflow: hidden;
        background: url("/img/2x/guide2.png") center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
</style>
