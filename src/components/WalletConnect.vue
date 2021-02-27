<template>
    <div>
        <van-cell-group>
            <div>{{ address }}</div>
            <div>connect status: {{ connectStatus }}</div>
            <van-button type="primary" @click="disconnect">断开</van-button>
        </van-cell-group>
        <div>
            <van-button @click="sendMockTx" type="primary">sendMockTx</van-button>
        </div>
        <van-cell-group>
            <van-field v-model="stakeValue" label="stake" placeholder="stake value"/>
            <van-button @click="stake" type="primary">stake</van-button>
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="withDrawValue" label="withdraw" placeholder="stake value"/>
            <van-button @click="withDraw" type="primary">withdraw</van-button>
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="setProjectModel.token" label="token" placeholder="token"/>
            <van-field v-model="setProjectModel.sellPrice" label="sellPrice" placeholder="sellPrice"/>
            <van-field v-model="setProjectModel.softCap" label="softCap" placeholder="softCap"/>
            <van-field v-model="setProjectModel.hardCap" label="hardCap" placeholder="hardCap"/>
            <van-field v-model="setProjectModel.targetPrice" label="targetPrice" placeholder="targetPrice"/>
            <van-field v-model="setProjectModel.startNumber" label="startNumber" placeholder="startNumber"/>
            <van-button @click="setProject" type="primary">setProject</van-button>
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="sellMyProjectModel.token" label="token" placeholder="token"/>
            <van-field v-model="sellMyProjectModel.amount" label="amount" placeholder="amount"/>
            <van-button @click="sellMyProject" type="primary">sellMyProject</van-button>
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="guaranteeProjectModel.token" label="token" placeholder="token"/>
            <van-field v-model="guaranteeProjectModel.amount" label="amount" placeholder="amount"/>
            <van-button @click="guaranteeProject" type="primary">guaranteeProject</van-button>
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="investProjectModel.token" label="token" placeholder="token"/>
            <van-field v-model="investProjectModel.amount" label="amount" placeholder="amount"/>
            <van-button @click="investProject" type="primary">investProject</van-button>
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="unlockDreamModel.amount" label="amount" placeholder="amount"/>
            <van-button @click="unlockDream" type="primary">unlockDream</van-button>
        </van-cell-group>
        <van-action-bar>
            <div class="list" @click="ConnectWallet">
                <img class="list_logo" src="../assets/walletConnect.jpeg"/>
                <div class="list_desc">Wallet Connect</div>
            </div>
        </van-action-bar>
    </div>
</template>

<script lang="ts">
    import {defineComponent, ref,reactive} from 'vue'
    import {WClient} from '../chain/walletconnect'
    import {Notify} from "vant";
    import * as dreamManager from "../chain/erc20"

    export default defineComponent({
        name: "WalletConnect",
        setup() {
            const wcli: WClient = new WClient()
            const address = ref("")
            const connectStatus = ref(false)

            const contractManager = new dreamManager.ContractManager()

            function ConnectWallet() {
                console.log("click ConnectWallet status:", connectStatus.value)
                if (!connectStatus.value) {
                    console.log("connectWallet")
                    wcli.walletConnectInit(connectListen, addressListen)
                    address.value = wcli.state.address
                    console.log(address.value)
                }
            }

            function connectListen(state: boolean) {
                console.log("connectListen:", state)
                connectStatus.value = state
            }

            function addressListen(addr: string) {
                console.log("addressListen:", addr)
                address.value = addr
            }

            function sendMockTx() {
                console.log("click sendMockTx")
                wcli.sendMockTx().then(res => {
                        Notify({type: "success", message: res})
                    }
                ).catch()
            }

            function disconnect() {
                console.log("click disconnect")
                wcli.killSession()
                connectStatus.value = false
                address.value = ""
            }

            const stakeValue = ref("")

            async function stake() {
                const {connector, address} = wcli.state;
                let tx = await contractManager.Stake(address, stakeValue.value)
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

            const withDrawValue = ref("")

            async function withDraw() {
                const {connector, address} = wcli.state;
                let tx = await contractManager.Withdraw(address, withDrawValue.value)
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

            const setProjectModel = reactive({
                token:'',
                sellPrice:'',
                softCap:0,
                hardCap:0,
                targetPrice:0,
                startNumber:0,
            })
            async function setProject(){
            }
            const sellMyProjectModel = reactive({
                token:'',
                amount:''
            })
            async  function sellMyProject(){

            }
            const guaranteeProjectModel = reactive({
                token:'',
                amount:''
            })
            async  function guaranteeProject(){
            }

            const investProjectModel = reactive({
                token:'',
                amount:''
            })
            async function investProject(){

            }
            const unlockDreamModel = reactive({
                amount:''
            })
            async function unlockDream(){

            }
            return {
                ConnectWallet,
                sendMockTx,
                disconnect,
                address,
                connectStatus,
                stakeValue,
                stake,
                withDraw,
                withDrawValue,
                setProject,
                setProjectModel,
                sellMyProject,
                sellMyProjectModel,
                guaranteeProjectModel,
                guaranteeProject,
                investProjectModel,
                investProject,
                unlockDreamModel,
                unlockDream

            }
        },
    })
</script>

<style scoped>
    .list {
        position: relative;
        height: 40px;
        width: 55%;
        border: 1px solid #cccccc;
        margin: 0 auto;
        border-radius: 4px;
    }

    .list_logo {
        position: absolute;
        left: 10px;
        width: 36px;
        display: inline-block;
    }

    .list_desc {
        position: absolute;
        top: 0px;
        left: 60px;
        font-size: 14px;
        line-height: 40px;
    }

    .address {
        border: 1px solid black;
        height: 30px;
    }
</style>
