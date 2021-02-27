<template>
    <div>
        <div>5</div>
        <van-button @click="next" type="primary">next</van-button>
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

</style>