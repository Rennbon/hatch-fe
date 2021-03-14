<template>
    <div>
        <div id="nav-border-0" v-if="barStyle===0">
            <img id="logo" src="/img/2x/logo.png"/>
            <div id="name">Dream DAO</div>
            <img @click="showPopup" class="menu" src="/img/2x/menu-w.png"/>
        </div>
        <div id="nav-border" v-if="barStyle===1">
            <img @click="back" id="back" src="/img/2x/arrow-left.png"/>
            <img @click="showPopup" class="menu" src="/img/2x/menu.png"/>
            <div id="title">{{ curTitle }}</div>
        </div>
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
            const barStyle = ref(0)
            const display = ref(false)
            const router = useRouter()

            function setTitle(title: string, style: number = 0) {
                curTitle.value = title
                barStyle.value = style
                console.log(style)
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
                barStyle,
                curTitle,
                display
            }
        }
    })

</script>

<style scoped>
    #nav-border {
        position: relative;
        height: 100px;
        border-radius: 0px 0px 10px 10px;
        box-shadow: 0 0 14px rgba(0, 0, 0, .25), 0 0 14px rgba(0, 0, 0, .25);
    }

    #nav-border-0 {
        position: relative;
        height: 100px;
        background-color: #3682FF;
    }

    #back {
        position: absolute;
        top: 28px;
        left: 38px;
        z-index: 1000;
        height: 36px;
    }

    #title {
        font-family: PingFangSC-Medium;
        color: #666666;
        font-size: 32px;
        position: relative;
        top: 28px;
    }

    #logo {
        position: absolute;
        left: 45px;
        top: 20px;
        height: 50px;
    }

    #name {
        font-size: 28px;
        font-family: PingFangSC-Semibold, sans-serif;
        color: white;
        position: absolute;
        left: 114px;
        top: 40px;
    }

    .menu {
        position: absolute;
        top: 28px;
        right: 38px;
        z-index: 1000;
        height: 36px;
    }
</style>
