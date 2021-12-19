<template>
    <div>
        <div id="nav-border-0">
            <div v-if="barStyle==0" id="nav-logo">🐣</div>
            <img v-if="barStyle==1" @click="back" id="back"
                 src="/img/2x/arrow-left.png"/>
            <div id="nav-name">{{ curTitle }}</div>
            <div id="nav-wallet">
                <div v-if="connected">
                    <div class="nav-wallet-cnt" @click="disconnect">{{ accountFormat(account) }}</div>
                </div>
                <div v-else>
                    <div @click="connectWallet" class="nav-wallet-cnt">Not connected</div>
                </div>
            </div>
            <van-icon @click="showPopup" class="menu" name="weapp-nav"/>
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
                <div v-if="connected" class="menu-cell" @click="toInbox">
                    <img class="menu-cell-img" src="/img/2x/menu-1.png"/>
                    <div class="menu-cell-font">消息</div>
                </div>
                <div class="menu-cell" @click="toHomePage">
                    <img class="menu-cell-img" src="/img/2x/menu-1.png"/>
                    <div class="menu-cell-font">HomePage</div>
                </div>
                <div v-show="false" class="menu-cell" @click="toForkFund">
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
                <div class="menu-cell">
                    <div class="menu-cell-font" @click="toProject">项目</div>
                </div>
                <div class="menu-cell">
                    <div class="menu-cell-font" @click="toCreateProject">创建项目</div>
                </div>
            </div>

        </van-popup>
    </div>
</template>

<script lang="ts">
    import {defineComponent, inject, onMounted, ref, watch} from "vue";
    import {useRouter} from "vue-router"
    // eslint-disable-next-line no-unused-vars
    import {IFundArgs, IPageArgs, IPageParam, IProjectArgs} from "@/pgcommon/common";
    // @ts-ignore
    import useStore from "@/store/index";
    // eslint-disable-next-line no-unused-vars
    import {WClient} from "@/chain/walletconnect";
    import {Dialog} from "vant";

    export default defineComponent({
        name: "NavBar",
        props: {},
        setup(props, context) {
            const wcli = inject<WClient>('walletConnect')
            const curTitle = ref("Hatch.Tech")
            // 0:logo blue 1:white 2:blue
            const barStyle = ref(0)
            const display = ref(false)
            const router = useRouter()
            const store = useStore()
            const connected = ref(false)
            const account = ref("")
            watch(
                (): boolean => {
                    return store.state.connected
                },
                (conn) => {
                    // 当otherName中的 firstName或者lastName发生变化时，都会进入这个函数
                    connected.value = conn
                    account.value = store.state.account
                    console.log(1, account)
                }
            )
            onMounted(() => {
                connected.value = store.state.connected
                account.value = store.state.account
            })


            async function connectWallet() {
                if (wcli === undefined) {
                    throw new Error("出错了")
                }
                await wcli.walletConnectInit()
                if (wcli.state.connector?.session.connected) {
                    store.commit("updateConnected", true)
                    connected.value = wcli.state.connected
                    account.value = wcli.state.address
                    console.log(2, account)
                }
            }

            function disconnect() {
                Dialog.confirm({
                    message: 'disconnect wallet',
                })
                    .then(() => {
                        console.log("click disconnect")
                        wcli!.killSession()
                        connected.value = false
                    })
                    .catch(() => {
                        // on cancel
                    });

            }

            function accountFormat(account: string) {
                return account.substring(0, 5) + '...' + account.substring(38)
            }

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

            function toInbox() {
                let args: IPageArgs = {}
                let p: IPageParam = {
                    Name: "List",
                    Title: "消息",
                    Args: args,
                    NewPage: true,
                }
                changeView(p)
                display.value = false
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

            function toCreateProject() {
                let args: IFundArgs = {
                    FundAddress: "",
                }
                let p: IPageParam = {
                    Name: "CreateProject",
                    Title: "Startup Submit",
                    Args: args,
                    NewPage: true,
                }
                changeView(p)
                display.value = false
            }

            function toProject() {
                let args: IProjectArgs = {
                    ProjectAddress: "pro.token",
                    FundAddress: "fund",
                }
                let p: IPageParam = {
                    Name: "Project",
                    Title: "项目",
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
                toHomePage, toForkFund, toInbox, toProject, toCreateProject,
                connected,
                back,
                barStyle,
                curTitle,
                display, account,
                connectWallet, disconnect, accountFormat
            }
        }
    })

</script>

<style scoped>
    #nav-border-0 {
        z-index: 10000;
        position: relative;
        height: 100px;
        background-color: #FFCC00;
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

    #nav-logo {
        position: absolute;
        left: 20px;
        top: 20px;
        height: 50px;
    }


    #nav-name {
        font-size: 28px;
        font-family: PingFangSC-Semibold, sans-serif;
        color: #333333;
        position: absolute;
        left: 120px;
        top: 30px;
    }

    #nav-wallet {
        width: 240px;
        height: 60px;
        border-radius: 30px;
        background-color: #FFFF00;
        color: #333333;
        font-size: 24px;
        font-family: PingFangSC;
        position: absolute;
        left: 390px;
        top: 20px;
    }

    .nav-wallet-cnt {
        line-height: 60px;
        text-align: center;
        font-size: 24px;
        font-family: PingFangSC;
        font-weight: bold;

    }

    .menu {
        position: absolute;
        top: 32px;
        right: 38px;
        z-index: 1000;
        height: 36px;
    }

    #right-menu {
        border-radius: 20px;
        background-color: #333333;
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
