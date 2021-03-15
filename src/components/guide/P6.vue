<template>
    <div id="guide">
        <div class="guide-border">
            <div class="guide-how">What startups wanna to capitalized from DFund?</div>
            <div class="guide-how-border">
                <div class="guide-content">1. 创业者可以得到启动资金。</div>
                <div class="guide-content">2. 创业者可以成立第一个资金的社区。</div>
                <div class="guide-content">3. 创业者可以得到第一个评级报告。</div>
                <button class="guide-bt" @click="next">Sign in with Wallet Connect</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "P6",
        methods: {
            next() {
                this.$emit('change', "7")
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
