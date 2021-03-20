<template>
    <van-action-bar id="guide">
        <div class="guide-border">
            <div class="guide-how">How to Play bigger?</div>
            <div class="guide-how-border">
                <div class="guide-content">To big investors:</div>
                <div class="guide-content">1. 为项目担获得2倍挖矿效率。</div>
                <div class="guide-content">2. 当项目方未达目标，担保人将出现损失。</div>
                <div class="guide-content">3. 担保人会获得佣金奖励。</div>
                <button class="guide-bt" @click="next">How to startups get money?</button>
            </div>
        </div>
    </van-action-bar>
</template>

<script>
    export default {
        name: "P3",
        methods: {
            next() {
                this.$emit('change', "4")
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
        background: url("/img/2x/guide3.png") center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
</style>
