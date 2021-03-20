<template>
    <van-action-sheet :round="false" :style="{'height':'300px'}" v-model:show="Show">
        <div id="title">{{ Title }}</div>
        <div id="neck"></div>
        <div id="content">
            <van-field id="input" label-class="label" v-model="Amount" label="金额"
                       type="number"
                       :rules="[{ pattern: /^([1-9]\d{0,9}|0)(\.\d{1,5})?$/, required:true, message: '格式不正确' }]"
                       placeholder="请输入金额"/>
            <div id="uint">单位: ETH</div>
            <button id="op-bt" @click="SubmitMethod">提交</button>
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
            const wcli = inject<WClient>('walletConnect')
            const Show = ref(false)
            const Title = ref("title")
            const To = ref("")
            const Amount = ref("")

            let abi: ContractManager
            const account = ref("")
            let param: IOperationSlot

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
                        break
                    default:
                        break
                }
                Show.value = true
            }

            async function SubmitMethod() {
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

    #op-bt {
        position: relative;
        margin-top: 20px;
        height: 75px;
        width: 625px;
        background-color: #0575DF;
        border: 0px;
        color: white;
        font-size: 40px;
        font-family: PingFangSC;
        font-weight: bold;
        border-radius: 10px;
    }

    /deep/ .van-cell {
        width: 650px;
        border: 0px;
    }


    /deep/ .van-field__label {
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
</style>
