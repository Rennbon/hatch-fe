<template>
    <div id="ff-main">
        <van-form id="v-form" @failed="onFailed">
            <van-field
                    v-model="fund.symbol"
                    name="symbol"
                    label="基金名称"
                    label-width="100"
                    placeholder="请输入基金会名称"
                    :rules="[{ required:true, message:'必填'}]"
            />
            <van-field
                    v-model="fund.desc"
                    name="desc"
                    label="介绍"
                    placeholder="请输入基金会介绍"
                    :rules="[{ required:true, message:'必填'}]"
            />
            <van-divider content-position="left"
                         :style="{ color: '#3682FF', borderColor: '#3682FF', padding: '0 16px' }"
            >挖矿合约设置
            </van-divider>
            <van-field
                    v-model="fund.unitProduction"
                    type="digit"
                    name="unitProduction"
                    label="单位块高生产数"
                    placeholder="请输入单位块高生产数"
                    label-width="180"
                    :rules="[{ pattern:AmountPattern,required:true,  message: '必填（数字）' }]"
            />
            <van-field
                    v-model="fund.halfLife"
                    type="digit"
                    name="halfLife"
                    label="减半周期区块数"
                    label-width="180"
                    placeholder="请输入减半周期区块数"
                    :rules="[{pattern:/^[1-9]\d*$/,required:true,  message: '必填（大于0的整数）' }]"
            />
            <van-field
                    v-model="fund.fundAmount"
                    type="digit"
                    name="fundAmount"
                    label="基金治理币总数"
                    placeholder="请输入基金治理币总数"
                    label-width="180"
                    :rules="[{ pattern:AmountPattern,required:true,  message: '必填（数字）' }]"
            />
            <van-field
                    v-model="fund.minerEfficiency"
                    type="digit"
                    name="minerEfficiency"
                    label="担保挖矿效率"
                    placeholder="请输入担保挖矿效率"
                    label-width="180"
                    :rules="[{ pattern:AmountPattern,required:true,  message: '必填（数字）' }]"
            />
            <van-divider content-position="left"
                         :style="{ color: '#3682FF', borderColor: '#3682FF', padding: '0 16px' }"
            >担保合约设置
            </van-divider>
            <van-field
                    v-model="fund.guaranteeCommissionPercent"
                    name="guaranteeCommissionPercent"
                    type="digit"
                    label="担保佣金比例"
                    label-width="180"
                    placeholder="请输入担保佣金比例"
                    :rules="[{pattern:/^([1-9]|[1-9]\\d)$/,required:true,  message: '必填（1-99)' }]"
            />
            <van-divider content-position="left"
                         :style="{ color: '#3682FF', borderColor: '#3682FF', padding: '0 16px' }"
            >投资合约设置
            </van-divider>
            <van-field
                    v-model="fund.financingPeriod"
                    name="financingPeriod"
                    type="digit"
                    label="融资持续区块数"
                    placeholder="请输入融资持续区块数"
                    label-width="180"
                    :rules="[{pattern:/^[1-9]\d*$/,required:true,  message: '必填(大于0的整数)' }]"
            />
            <van-field
                    v-model="fund.investmentProtection"
                    name="investmentProtection"
                    label="投资额保护区块数"
                    type="digit"
                    placeholder="请输入投资额保护区块数"
                    label-width="180"
                    :rules="[{pattern:/^[1-9]\d*$/,required:true,  message: '必填(大于0的整数)' }]"
            />
            <van-divider content-position="left"
                         :style="{ color: '#3682FF', borderColor: '#3682FF', padding: '0 16px' }"
            >DAO合约设置
            </van-divider>
            <van-field
                    v-model="fund.keepHeight"
                    name="keepHeight"
                    label="保价持续区块数"
                    type="digit"
                    placeholder="请输入保价持续区块数"
                    label-width="200"
                    :rules="[{pattern:/^[1-9]\d*$/,required:true,  message: '必填(大于0的整数)' }]"
            />
            <van-field
                    v-model="fund.donatePercent"
                    name="donatePercent"
                    label="盈利捐赠DreamDAI比例"
                    type="digit"
                    placeholder="请输入盈利捐赠DreamDAI比例"
                    label-width="200"
                    :rules="[{pattern:/^([1-9]|[1-9]\\d)$/,required:true,  message: '必填(1-99)' }]"
            />
            <van-button id="bt" round block type="info"
                        @click="forkFund"
                        native-type="submit">提交</van-button>
        </van-form>
    </div>
</template>

<script lang="ts">
    import {defineComponent, inject, onMounted, reactive, ref} from "vue";
    // eslint-disable-next-line no-unused-vars
    import {WClient} from "@/chain/walletconnect";
    import {ContractManager} from "@/chain/erc20";
    // eslint-disable-next-line no-unused-vars
    import {IForkFundParam} from "@/pgcommon/common";
    import {Notify} from "vant";

    export default defineComponent({
        name: "ForkFund",
        setup() {
            const wcli = inject<WClient>("walletConnect")
            const abi = inject<ContractManager>("abi", new ContractManager())
            const account = ref("")
            const AmountPattern = /^([1-9]\d{0,9}|0)(\.\d{1,5})?$/
            const fund = reactive({
                symbol: "",// fund name
                desc: "", // introduction
                unitProduction: "", //  produce amount per block height
                halfLife: "",
                fundAmount: "", // total fund amount
                minerEfficiency: "", // miner efficiency
                guaranteeCommissionPercent: "",  //todo: not find in abi
                financingPeriod: "",
                investmentProtection: "",
                donatePercent: "1",
                keepHeight: "",

            })
            onMounted(() => {
                if (wcli === undefined) {
                    return
                }
                account.value = wcli.state.address
            })

            // todo: 实现forkFund，目前是假的
            async function ForkFund() {
                let params = {
                    From: account.value,
                    FundSymbols: fund.symbol,
                    FundIntroduction: fund.desc,
                    PerAmount: fund.unitProduction,
                    Durations: fund.halfLife,
                    TokenAmount: fund.fundAmount,
                    GuaranteeReward: fund.minerEfficiency,
                    GuaranteeFee: fund.guaranteeCommissionPercent,
                    ProjectTime: fund.financingPeriod,
                    InvestTime: fund.investmentProtection,
                    SellTime: fund.keepHeight,
                    DonateFee: fund.donatePercent,
                } as IForkFundParam
                let tx = await abi.ForkFund(params)
                wcli!.state.connector!.sendTransaction(tx).then(
                    () => {
                        Notify({type: 'success', message: '交易发送成功'});
                        //context.emit("backPre", "createProject")
                    }
                ).catch(res => {
                    Notify(res)
                })
            }
            const onFailed = (errorInfo: any) => {
                console.log('failed', errorInfo);
            };
            return {
                onFailed,
                fund,AmountPattern,
                ForkFund
            }
        }
    })
</script>

<style scoped>
    #ff-main {
        height: calc(100vh - 500px);
        padding-bottom: 300px;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    /deep/ .van-cell {

    }


    /deep/ .van-field__label {
        font-size: 28px;
        font-weight: bold;
        padding-left: 20px;
        height: 48px;
    }

    #bt {
        color: white !important;
        width: 620px;
        height: 80px;
        margin: auto;
        border: 0px;
        font-family: PingFangSC;
        font-weight: bold;
        background-color: #0575DF;
        border-radius: 10px;
        font-size: 40px;
        position: relative;
        top: 16px;
    }

    /deep/ .van-button__text {
        color: white;
    }
</style>
