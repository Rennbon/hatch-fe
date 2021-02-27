<template>
    <div>
        <div>7</div>
        <van-button @click="next" type="primary">next</van-button>
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

</style>