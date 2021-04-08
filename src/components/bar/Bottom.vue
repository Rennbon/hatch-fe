<template>
    <van-action-bar id="wc-bar" :class="connectStatus===false?'':'wc-bar-color'">
        <div v-if="connectStatus===false" style="margin: auto" @click="connectWallet">
            <img id="wc-img" src="/img/2x/wallet-connect.png"/>
        </div>
        <div v-if="connectStatus" style="margin: auto">
            <div id="account">{{ account }}</div>
            <div id="balance">{{ balance }} ETH</div>
            <button id="disconnect" @click="disconnect">断开连接</button>


        </div>

    </van-action-bar>
</template>

<script lang="ts">
    import {defineComponent, inject, onMounted, ref, watch} from "vue";
    // @ts-ignore
    import useStore from '../../store/index.js'
    // eslint-disable-next-line no-unused-vars
    import {WClient} from "@/chain/walletconnect";

    interface wallet {
        account: string
        connected: boolean
        balance: string
    }

    export default defineComponent({
        name: "Bottom",
        setup() {
            const wcli = inject<WClient>('walletConnect')
            const account = ref("")
            const balance = ref("0")
            const connectStatus = ref(false)
            const store = useStore()
            //const cmgr: dreamManager.ContractManager = new dreamManager.ContractManager()

            watch(
                (): boolean => {
                    return store.state.connected
                },
                (conn) => {
                    // 当otherName中的 firstName或者lastName发生变化时，都会进入这个函数
                    connectStatus.value = conn
                    if (conn === true) {
                        balance.value = store.state.balance
                        account.value = store.state.account
                    }
                }

                /* [() => store.state],
                 (value) => {
                     let st = value as state
                     connectStatus.value = st.connected
                     account.value = st.account
                     balance.value = st.balance

                 }*/
            )
            onMounted(async () => {
                // when refresh reload walletconnect state
                if (store.state.connected && !connectStatus.value) {
                    await connectWallet()
                }
                if (wcli != undefined && wcli.state.connector?.session.connected) {
                    connectStatus.value = true
                    account.value = wcli.state.address
                    balance.value = wcli.state.asset
                }
            })

            async function connectWallet() {
                if (wcli === undefined) {
                    throw new Error("出错了")
                }
                await wcli.walletConnectInit()
                if (wcli.state.connector?.session.connected) {
                    store.commit("updateConnected", true)
                    account.value = wcli.state.address
                    balance.value = wcli.state.asset
                    connectStatus.value = wcli.state.connected
                }
            }

            function disconnect() {
                console.log("click disconnect")
                wcli!.killSession()
                connectStatus.value = false
                balance.value = "0"
            }

            /*async function stake(value: string) {
                const {connector} = wcli!.state;
                let tx = await cmgr.Stake(account.value, value)
                console.log(tx)
                if (!connector) {
                    Notify({type: 'warning', message: '连接已断开'});
                    return
                }
                connector.sendTransaction(tx).then(
                    () => {
                        Notify({type: 'success', message: '交易发送成功'});
                    }
                ).catch(res => {
                    Notify(res)
                })
            }*/

            return {
                connectWallet,
                disconnect,
                connectStatus,
                balance,
                account,
                //stake
            }

        }
    })
</script>

<style scoped>
    #wc-bar {
        height: 200px;
        border-radius: 20px 20px 0px 0px;
        box-shadow: 0 0 14px rgba(0, 0, 0, .25), 0 0 14px rgba(0, 0, 0, .25);
        position: absolute;
        z-index: 3000;
    }

    .wc-bar-color {
        background-image: linear-gradient(to bottom right, #0575DF, #00EB60);
    }

    #wc-img {
        height: 45px;
        width: 465px;
    }

    #account {
        position: relative;
        top: -48px;
        color: white;
        font-family: PingFangSC-Regular, sans-serif;
        font-size: 28px;
    }

    #balance {
        position: absolute;
        top: 96px;
        left: 48px;
        color: white;
        font-size: 48px;
        font-family: PingFangSC-Semibold, sans-serif;
    }

    #disconnect {
        position: absolute;
        top: 96px;
        right: 48px;
        font-family: PingFangSC-Semibold, sans-serif;
        font-size: 40px;
        background: #eeeeee;
        color: #666666;
        border: none;
        height: 65px;
        width: 245px;
        border-radius: 10px;
    }
</style>
