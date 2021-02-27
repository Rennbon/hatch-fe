<template>
    <van-action-bar>
        <div v-if="connectStatus===false" class="wc-border" @click="connectWallet">
            <img id="wc_logo" src="../../assets/walletConnect.jpeg"/>
            <div id="wc_desc">Wallet Connect</div>
        </div>
        <div v-if="connectStatus" class="wc-border">
            <div>{{ account }}</div>
            <div>{{ balance }}</div>
        </div>
    </van-action-bar>
</template>

<script lang="ts">
    import {defineComponent, inject, onBeforeMount, ref} from "vue";
    // eslint-disable-next-line no-unused-vars
    import * as dreamManager from "@/chain/erc20";
    import {Notify} from "vant";
    // @ts-ignore
    import useStore from '../../store/index.js'
    // eslint-disable-next-line no-unused-vars
    import {WClient} from "@/chain/walletconnect";

    export default defineComponent({
        name: "Bottom",
        props: {},
        setup(props, context) {
            const account = ref("")
            const balance = ref("0")
            const connectStatus = ref(false)
            const store = useStore()
            const cmgr: dreamManager.ContractManager = new dreamManager.ContractManager()
            const wcli = inject<WClient>('walletConnect')

            onBeforeMount(async () => {
                // when refresh reload walletconnect state
                if (store.state.connected && !connectStatus.value) {
                    await connectWallet()
                }
                if (wcli != undefined && wcli.state.connector?.connected) {
                    connectStatus.value = true
                    account.value = wcli.state.address
                    balance.value = wcli.state.asset
                    currentAccount(account.value)
                }
            })

            async function connectWallet() {
                if (wcli === undefined) {
                    throw new Error("出错了")
                }
                await wcli.walletConnectInit()
                if (wcli.state.connected) {
                    store.commit("updateConnected", true)
                    currentAccount(account.value)
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

            async function stake(value: string) {
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
            }

            function currentAccount(acc: string) {
                context.emit("currentAccount", acc)
            }

            return {
                connectWallet,
                disconnect,
                connectStatus,
                balance,
                account,
                stake
            }

        }
    })
</script>

<style scoped>
    .wc-border {
        position: relative;
        height: 40px;
        width: 55%;
        border: 1px solid #cccccc;
        margin: 0 auto;
        border-radius: 4px;
    }

    #wc_logo {
        position: absolute;
        left: 10px;
        width: 36px;
        display: inline-block;
    }

    #wc_desc {
        position: absolute;
        top: 0px;
        left: 60px;
        font-size: 14px;
        line-height: 40px;
    }

</style>
