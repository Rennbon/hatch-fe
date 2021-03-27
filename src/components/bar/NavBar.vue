<template>
    <div>
        <div id="nav-border-0" v-if="barStyle===0">
            <img id="logo" src="/img/2x/logo.png"/>
            <div id="name">Dream DAO</div>
            <img @click="showPopup" class="menu" src="/img/2x/menu-w.png"/>
        </div>
        <div :id="barStyle==1?'nav-border':'nav-border-0'" v-if="barStyle===1||barStyle==2">
            <img @click="back" :style="{'color':barStyle==2?'white':'#666666'}" id="back"
                 :src="barStyle==2?'/img/2x/arrow-w.png':'/img/2x/arrow-left.png'"/>
            <img @click="showPopup" :style="{'color':barStyle==2?'white':'#666666'}"
                 class="menu"
                 :src="barStyle==2?'/img/2x/menu-w.png':'/img/2x/menu.png'"/>
            <div id="title" :style="{'color':barStyle==2?'white':'#666666'}" >{{ curTitle }}</div>
        </div>

        <van-popup v-model:show="display" teleport="body" id="right-menu"
                   :style="{
                        height:'100%',width:'73%','z-index':'20000',
                        'overflow':'hidden',
                        'border-radius':'0 0 0 20px',  'background-color':'#3682FF'
                    }"
                   position="right">
            <div id="right-menu-head">
                <div id="right-menu-title">Menu</div>
            </div>
            <div id="menu-body">
                <div class="menu-cell" @click="toHomePage">
                    <img class="menu-cell-img" src="/img/2x/menu-1.png"/>
                    <div class="menu-cell-font">HomePage</div>
                </div>
                <div class="menu-cell" @click="toForkFund">
                    <img class="menu-cell-img" src="/img/2x/menu-2.png"/>
                    <div class="menu-cell-font">创建基金</div>
                </div>
                <div class="menu-cell">
                    <img class="menu-cell-img" src="/img/2x/menu-3.png"/>
                    <div class="menu-cell-font">使用指南</div>
                </div>
                <div class="menu-cell">
                    <img class="menu-cell-img" src="/img/2x/menu-4.png"/>
                    <div class="menu-cell-font">白皮书</div>
                </div>
                <div class="menu-cell">
                    <img class="menu-cell-img" src="/img/2x/menu-5.png"/>
                    <div class="menu-cell-font">Github</div>
                </div>
                <div class="menu-cell">
                    <img class="menu-cell-img" src="/img/2x/menu-6.png"/>
                    <div class="menu-cell-font">联系我们</div>
                </div>
            </div>
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
            // 0:logo blue 1:white 2:blue
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
        z-index: 10000;
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

    #right-menu {
        border-radius: 20px;
        background-color: #3682FF;
    }

    #right-menu-head {
        height: 116px;
        position: relative;
    }

    #right-menu-title {
        color: white;
        font-size: 36px;
        font-family: Helvetica;
        font-weight: 400;
        position: relative;
        top: 50px;
        left: 66px;
    }

    #menu-body {
        background-color: white;
        border-radius: 20px 20px 0 0;
        height: 100%;
    }


    .menu-cell {
        height: 110px;
        width: 100%;
        border-bottom: 2px solid #cccccc;
        position: relative;
    }

    .menu-cell:nth-last-child(1) {
        border: none;
    }

    .menu-cell-img {
        height: 48px;
        width: 48px;
        position: absolute;
        left: 66px;
        top: 31px;
    }

    .menu-cell-font {
        font-size: 32px;
        font-family: PingFangSC;
        font-weight: 400;
        position: absolute;
        left: 146px;
        top: 38px;
    }
</style>
