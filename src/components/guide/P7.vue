<template>
    <div id="guide">
        <div class="guide-border">
            <div class="guide-how">Create my fund</div>
            <div class="guide-how-border">
                <div class="guide-content">To KOL:</div>
                <div class="guide-content">1. 我们非常欢迎通过Fork创业新基金。</div>
                <div class="guide-content">2. 该功能仅开放给有足够多资金的用户。</div>
                <div class="guide-content">3. 作为基金创建者需要承担发展重任。</div>
                <div class="guide-content">4. 若您有足够经验，开始体验新世界吧。</div>
                <button>start>>></button>
                <button class="guide-bt" @click="next">No, thanks?</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "P7",
        methods: {
            next() {
                this.$emit('change', "1")
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
