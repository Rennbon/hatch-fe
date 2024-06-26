<template>
    <van-action-sheet :round="false" :style="{'height':'200px'}" v-model:show="Show">
        <div id="title">{{ Title }}</div>
        <div id="neck"></div>
        <div id="content">
            <van-field id="input" label-class="label" v-model="Amount" label="金额"
                       type="number"
                       :rules="[{ pattern: /^([1-9]\d{0,9}|0)(\.\d{1,5})?$/, required:true, message: '格式不正确' }]"
                       placeholder="请输入金额"/>
            <div id="uint">单位: ETH</div>
            <van-button loading-type="spinner" @click="SubmitMethod">提交</van-button>
        </div>
    </van-action-sheet>
</template>
<script lang="ts">
    import {defineComponent, inject, onMounted, ref, watch} from "vue";
    // eslint-disable-next-line no-unused-vars
    import {IOperationSlot, SubmitType} from "@/pgcommon/common";
    // eslint-disable-next-line no-unused-vars
    import {WClient} from "@/chain/walletconnect";
    import {ContractManager} from "@/chain/erc20";
    import {Notify} from "vant";
    // eslint-disable-next-line no-unused-vars
    import {ITxData} from "@/chain/types";
    // @ts-ignore
    import useStore from "@/store";

    export default defineComponent({
        name: "Operation",
        setup() {
            const wcli = inject<WClient>('walletConnect')
            const Show = ref(false)
            const Title = ref("title")
            const To = ref("")
            const Amount = ref("")
            const Tips = ref("")
            const Limit = ref("")
            const store = useStore()
            const connected = ref(false)
            let abi: ContractManager
            const account = ref("")
            let param: IOperationSlot
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
            onMounted(async () => {
                if (wcli != undefined && wcli.state.connector?.session.connected) {
                    account.value = wcli.state.address
                }
            })

            function open(p: IOperationSlot) {
                param = p
                account.value = wcli!.state.address
                abi = new ContractManager(p.Fund)
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
                        Title.value = "投资"
                        break
                    case SubmitType.Guarantee:
                        Title.value = "担保"
                        break
                    case SubmitType.Sell:
                        Title.value = "卖出"
                        break
                    case SubmitType.DisGuarantee:
                        Title.value = "撤销担保"
                        break
                    case SubmitType.DisInvest:
                        Title.value = "撤销投资"
                        break
                    default:
                        break
                }
                console.log("tips", p.Tips)
                Tips.value = p.Tips === undefined || p.Tips === null ? "" : p.Tips
                Limit.value = p.Limit
                Show.value = true
            }

            async function SubmitMethod() {
                if (wcli != undefined && wcli.state.connector?.session.connected) {
                    account.value = wcli.state.address
                } else {
                    Notify("need connect the wallet first")
                    return
                }
                let tx: ITxData
                switch (param.Type) {
                    case SubmitType.Save:
                        tx = await abi.Deposit(account.value, Amount.value)
                        break;
                    case SubmitType.WithDraw:
                        tx = await abi.Withdraw(account.value, Amount.value)
                        break
                    case SubmitType.WithDrawFundToken:
                        tx = await abi.WithdrawFundToken(account.value, Amount.value)
                        break
                    case SubmitType.Sell:
                        tx = await abi.SellProject(account.value, param.Project, Amount.value)
                        break
                    case SubmitType.Guarantee:
                        tx = await abi.GuaranteeProject(account.value, param.Project, Amount.value)
                        break
                    case SubmitType.Invest:
                        tx = await abi.InvestProject(account.value, param.Project, Amount.value)
                        break
                    case SubmitType.DisGuarantee:
                        tx = await abi.DisGuaranteeProject(account.value, param.Project, Amount.value)
                        break
                    case SubmitType.DisInvest:
                        tx = await abi.DisInvestProject(account.value, param.Project, Amount.value)
                        break
                    default:
                        throw new Error("异常方法")
                }
                console.log("tx ", tx)
                wcli.state.connector.sendTransaction(tx)
                    .then(
                        () => {
                            Notify({type: 'success', message: '交易发送成功'});
                            Show.value = false
                        }
                    ).catch(res => {
                    console.log(res)
                    Notify(res)
                })
            }


            return {
                Show,
                Title,
                open,
                To,
                Tips,
                Amount,
                SubmitMethod
            }
        }
    })
</script>

<style scoped>

    #title {
        font-size: 44px;
        font-weight: bolder;
        height: 60px;
        padding: 10px;
    }

    #neck {
        height: 24px;
        background-color: #dddddd;
    }

    #content {
        height: 100px;
        padding: 5px;
        position: relative;
    }

    :deep(.van-button div) {
        color: #333333;
    }

    :deep(.van-button) {
        position: relative;
        margin-top: 60px;
        height: 60px;
        width: 160px;
        background-color: #FFCC00;
        border-radius: 48px;
        font-size: 24px;
        font-weight: bold;
        color: #333333 !important;
        line-height: 24px;
        border: 0px;
    }

    :deep(.van-cell) {
        width: 650px;
        border: 0px;
    }


    :deep(.van-field__label) {
        font-size: 32px;
        line-height: 50px;
        font-family: PingFangSC;
        font-weight: bold;
        margin-left: 20px;
    }

    #uint {
        position: absolute;
        top: 28px;
        right: 20px;
        font-size: 28px;
    }

    #tips {
        height: 60px;
        font-family: PingFangSC;
        position: relative;
        padding: 10px 50px;
    }

    #tips-title {
        font-size: 24px;
        position: absolute;
        top: 10px;
    }

    #tips-content {
        font-size: 20px;
        position: absolute;
        top: 44px;
        text-align: left;
    }
</style>
