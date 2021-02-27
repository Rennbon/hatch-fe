<template>
    <div>
        <van-nav-bar
                :title="curTitle"
                left-text="返回"
                right-text="按钮"
                @click-right="showPopup"
                @click-left="back"
                left-arrow
        >
        </van-nav-bar>
        <van-popup v-model:show="display" teleport="body" :style="{height:'100%',width:'40%'}" position="right">
            <van-cell @click="toHomePage">HomePage</van-cell>
            <van-cell>创建基金</van-cell>
            <van-cell>使用指南</van-cell>
            <van-cell>白皮书</van-cell>
            <van-cell>联系我们</van-cell>
        </van-popup>

    </div>
</template>

<script lang="ts">
    import {defineComponent, ref} from "vue";
    import {useRouter} from "vue-router"

    export default defineComponent({
        name: "NavBar",
        props:{

        },
        setup(props, context) {
            const curTitle = ref("")
            const display = ref(false)
            const router = useRouter()

            function setTitle(title:string) {
                curTitle.value = title
            }


            function showPopup() {
                display.value = true
            }

            function toHomePage() {
                router.push({
                    name: 'Home'
                })
            }

            function back() {
                console.log("back",curTitle.value)
                context.emit("backPre", curTitle.value)
            }

            return {
                setTitle,
                showPopup,
                toHomePage,
                back,
                curTitle,
                display
            }
        }
    })

</script>

<style scoped>

</style>
