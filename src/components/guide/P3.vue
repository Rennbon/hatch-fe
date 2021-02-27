<template>
    <div>
        <div>3</div>
        <van-button @click="next" type="primary">next</van-button>
    </div>
</template>

<script>
    export default {
        name: "P3",
        methods: {
            next() {
                this.$emit('change', "4")
            }
        }
    }
</script>

<style scoped>

</style>