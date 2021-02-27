<template>
    <div @click="jumpTo" class="container-border">
        <div class="container-ticker">{{ num }}</div>
        <div>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Ticker",
        props: {
            tag: {type: String}
        },
        data() {
            return {
                num: 10,
            }
        },
        mounted() {
            this.countdown()
        },
        methods: {
            jumpTo(){
                this.$emit('change', this.tag)
            },
            countdown() {
                if (this.num - 1 === 0) {
                    this.$emit('destory', this.tag)
                    return
                }
                this.num--
                const that = this
                setTimeout(function () {
                    that.countdown()
                }, 1000)
            }
        }
    }
</script>

<style scoped>
    .container-ticker {
        height: 10px;
        width: 10px;
        font-size: 10px;
    }
</style>