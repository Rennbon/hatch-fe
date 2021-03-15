<template>
    <div id="guide">
        <div class="guide-border">
            <div class="guide-how">How do investors make money?</div>
            <div class="guide-how-border">
                <div class="guide-content">To investors:</div>
                <div class="guide-content">1. 投资的项目的代币价格是否达到目标。</div>
                <div class="guide-content">2. 若达到则卖出代币，本金自动返还。</div>
                <div class="guide-content">3. 若未达到目标，可以选择从担保金中退回本金。</div>
                <div class="guide-content">4. 若盈利，则小部分奖励给基金创始人。</div>
                <button class="guide-bt" @click="next">Why startups wanna to capitalized from DreamDAO?</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "P5",
        methods: {
            next() {
                this.$emit('change', "6")
            }
        }
    }
</script>

<style scoped>
    #guide {
        position: absolute;
        width: calc(100vw);
        height: calc(100vh - 100px);
        background: url("/img/2x/guide5.png") center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
</style>
