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
            <van-cell @click="toForkFund">创建基金</van-cell>
            <van-cell>使用指南</van-cell>
            <van-cell>白皮书</van-cell>
            <van-cell>联系我们</van-cell>
        </van-popup>

    </div>
</template>

<script lang="ts">
    import {defineComponent, ref} from "vue";
    import {useRouter} from "vue-router"
    // eslint-disable-next-line no-unused-vars
    import {IPageArgs, IPageParam} from "@/pgcommon/common";

    export default defineComponent({
        name: "NavBar",
        props: {},
        setup(props, context) {
            const curTitle = ref("")
            const display = ref(false)
            const router = useRouter()

            function setTitle(title: string) {
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

            function toForkFund() {
                let args: IPageArgs = {}
                let p: IPageParam = {
                    Name: "ForkFund",
                    Title: "创建基金会",
                    Args: args,
                    NewPage: true,
                }
                changeView(p)
                display.value = false
            }


            function back() {
                console.log("back", curTitle.value)
                context.emit("backPre", curTitle.value)
            }

            function changeView(p: IPageParam) {
                context.emit("changeView", p)
            }

            return {
                setTitle,
                showPopup,
                toHomePage,
                toForkFund,
                back,
                curTitle,
                display
            }
        }
    })

</script>

<style scoped>

</style>
