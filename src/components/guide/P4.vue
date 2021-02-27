<template>
    <div>
        <div>4</div>
        <van-button @click="next" type="primary">next</van-button>
    </div>
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

</style>