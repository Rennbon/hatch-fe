<template>
    <van-action-sheet :round="false" id="op-border" v-model:show="Show">
        <div id="title">{{ Title }}</div>
        <div>
            <van-cell-group id="content">
                <van-field v-model="Amount" label="金额" placeholder="请输入金额"/>
            </van-cell-group>
            <van-button width="80px;" type="primary" @click="Submit">提交</van-button>
        </div>
    </van-action-sheet>
</template>
<script lang="ts">
    import {defineComponent, inject, ref} from "vue";
    // eslint-disable-next-line no-unused-vars
    import {IOperationSlot, SubmitType} from "../../pgcommon/common";
    // eslint-disable-next-line no-unused-vars
    import {WClient} from "../../chain/walletconnect";
    import {ContractManager} from "../../chain/erc20";
    import {Notify} from "vant";
    // eslint-disable-next-line no-unused-vars
    import {ITxData} from "@/chain/types";

    export default defineComponent({
        name: "Operation",
        setup() {
            const Show = ref(false)
            const Title = ref("")
            const To = ref("")
            const Amount = ref("")
            const wcli = inject<WClient>('walletConnect')
            let methodType: SubmitType
            let abi: ContractManager
            const account = ref("")

            function open(p: IOperationSlot) {
                account.value = wcli!.state.address
                abi = new ContractManager(p.Fund)
                methodType = p.Type
                switch (p.Type) {
                    case SubmitType.Save:
                        Title.value = "ETH存入"
                        break
                    case SubmitType.WithDraw:
                        Title.value = "ETH提现"
                        break
                    case SubmitType.WithDrawFundToken:
                        Title.value = "基金币提现"
                        break
                    case SubmitType.Invest:
                    default:
                        break
                }
                Show.value = true
            }

            async function Submit() {
                let tx: ITxData
                switch (methodType) {
                    case SubmitType.Save:
                        tx = await abi.Deposit(account.value, Amount.value)
                        break;
                    case SubmitType.WithDraw:
                        tx = await abi.Withdraw(account.value, Amount.value)
                        break
                    case SubmitType.WithDrawFundToken:
                        tx = await abi.WithdrawFundToken(account.value, Amount.value)
                        break
                    default:
                        throw new Error("异常方法")
                }
                console.log("tx ", tx)
                wcli!.state.connector!.sendTransaction(tx)
                    .then(
                        () => {
                            Notify({type: 'success', message: '交易发送成功'});
                            Show.value = false
                        }
                    ).catch(res => {
                    Notify(res)
                })
            }

            return {
                Show,
                Title,
                open,
                To,
                Amount,
                Submit
            }
        }
    })
</script>

<style scoped>
    #title {
        font-size: 18px;
        height: 40px;
        padding: 10px;
    }

    #content {
        height: 60px;
        padding: 5px;
    }

    #op-border {
        height: 200px;
        border: 1px solid red;
    }
</style>
