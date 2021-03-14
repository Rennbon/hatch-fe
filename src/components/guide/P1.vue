<template>
    <div id="guide">
        <div class="guide-border">
            <div class="guide-how">What is Dream DAO?</div>
            <div class="guide-how-border">
                <div class="guide-content">To new player:</div>
                <div class="guide-content">1. 任何创业者都可以得到投资。</div>
                <div class="guide-content">2. Safe Invest: 任何人都可以安全投资</div>
                <div class="guide-content">3. Trust Rank: 创业者得到信任证明</div>
                <div class="guide-content">4. 投资人得到价值回报</div>
                <button class="guide-bt" @click="next">How to Play?</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "P1",
        methods: {
            next() {
                this.$emit('change', "2")
            }
        },
    }
</script>

<style scoped>
    #guide {
        position: absolute;
        width: calc(100vw);
        height: calc(100vh - 100px);
        background: url("/img/2x/guide1.png") center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
</style>
