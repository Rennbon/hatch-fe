<template>
    <div>
        <div>6</div>
        <van-button @click="next" type="primary">next</van-button>
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

</style>