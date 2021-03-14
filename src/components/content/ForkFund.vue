<template>
    <div>
        <van-form>
            <van-field
                    v-model="fund.symbol"
                    name="symbol"
                    label="基金名称"
                    placeholder="ERC20合约地址（42位长度）"
                    :rules="[{ required:true, message:'请填写ERC20合约地址'}]"
            />
            <van-field
                    v-model="fund.desc"
                    name="desc"
                    label="介绍"
                    :rules="[{ }]"
                    readonly/>
            <van-field
                    v-model="fund.unitProduction"
                    name="unitProduction"
                    label="单位块高生产数"
                    placeholder="单位：ETH"
                    :rules="[{ required:true, message: '售价填写不正确' }]"
            />
            <van-field
                    v-model="fund.halfLife"
                    type="number"
                    name="halfLife"
                    label="减半周期区块数"
                    placeholder="单位：ETH"
                    :rules="[{  required:true, message: '软顶填写不正确' }]"
            />
            <van-field
                    v-model="fund.fundAmount"
                    type="number"
                    name="fundAmount"
                    label="基金治理币总数"
                    placeholder="单位：ETH"
                    :rules="[{ required:true,  message: '请填写硬顶' }]"
            />
            <van-field
                    v-model="fund.minerEfficiency"
                    type="number"
                    name="minerEfficiency"
                    label="担保挖矿效率"
                    placeholder="单位：ETH"
                    :rules="[{ required:true,  message: '请填写目标价格' }]"
            />
            <van-field
                    v-model="fund.guaranteeCommissionPercent"
                    type="guaranteeCommissionPercent"
                    name="percent"
                    label="担保佣金比例"
                    placeholder="必填，单位：ETH区块高度"
                    :rules="[{pattern:/^[1-9]\d*$/,required:true,  message: '请填写上架时间' }]"
            />
            <van-field
                    v-model="fund.financingPeriod"
                    name="financingPeriod"
                    model-value="保持2.1万个ETH区块"
                    label="融资持续区块数"
                    :rules="[{ }]"
                    readonly
            />
            <van-field
                    v-model="fund.investmentProtection"
                    name="Web"
                    label="投资额保护区块数"
                    placeholder="选填"
                    :rules="[{ }]"
            />
            <van-field
                    v-model="fund.keepHeight"
                    name="keepHeight"
                    label="保价持续区块数"
                    placeholder="选填"
                    :rules="[{ }]"
            />
            <van-field
                    v-model="fund.donatePercent"
                    name="donatePercent"
                    label="盈利捐赠DreamDAI比例"
                    placeholder="选填"
                    :rules="[{ }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" @click="createProject" native-type="submit">提交</van-button>
            </div>
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
            const fund = reactive({
                symbol: "",
                desc: "",
                unitProduction: 0,
                halfLife: 0,
                fundAmount: "0",
                minerEfficiency: 0,
                guaranteeCommissionPercent: 0,
                financingPeriod: 0,
                investmentProtection: 0,
                donatePercent: 1,
                keepHeight: 0,

            })
            onMounted(() => {
                if (wcli === undefined) {
                    return
                }
                account.value = wcli.state.address
            })

            // todo: 实现forkFund，目前是假的
            async function ForkFund() {
                let params = {} as IForkFundParam
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

            return {
                fund,
                ForkFund
            }
        }
    })
</script>

<style scoped>

</style>
