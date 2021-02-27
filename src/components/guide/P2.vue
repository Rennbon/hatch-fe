<template>
    <div>
        <div>2</div>
        <van-button @click="next" type="primary">next</van-button>
    </div>
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

</style>