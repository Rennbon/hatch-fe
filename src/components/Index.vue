<template>
    <div>
        <div>DreamDAO</div>
        <div></div>
        <div>
            <van-button type="info" @click="toPage">不连接钱包直接阅览</van-button>
        </div>
        <div>
            <van-button @click="toP1" type="info">What is DreamDAO?</van-button>
        </div>
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

</style>
