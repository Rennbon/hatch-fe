<template>
    <van-action-bar id="guide">
        <div class="guide-border">
            <div class="guide-how">How to startups get money?</div>
            <div class="guide-how-border">
                <div class="guide-content">To startups:</div>
                <div class="guide-content">1. 提交项目信息。</div>
                <div class="guide-content">2. 拿到投资款，开始工作。</div>
                <div class="guide-content">3. 达到目标价，得到好评，未达到目标价，得到差评。</div>
                <button class="guide-bt" @click="next">How do investors make money?</button>
            </div>
        </div>
    </van-action-bar>
</template>

<script>
    export default {
        name: "P4",
        methods: {
            next() {
                this.$emit('change', "5")
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
        background: url("/img/2x/guide4.png") center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
</style>
