<template>
    <div>
        <div>1</div>
        <van-button @click="next" type="primary">next</van-button>
    </div>
</template>

<script>
    export default {
        name: "P1",
        methods:{
            next(){
                this.$emit('change', "2")
            }
        }
    }
</script>

<style scoped>

</style>