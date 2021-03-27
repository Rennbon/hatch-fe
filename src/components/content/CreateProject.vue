<template>
    <div id="cp-main">
        <van-form @failed="onFailed">
            <van-field
                    v-model="ProjectInfo.Token"
                    name="Token"
                    label="合约地址"
                    placeholder="ERC20合约地址（42位长度）"
                    @change="getERC20TokenSymbol"
                    :rules="[{ pattern: ERC20Pattern ,required:true, message:'请填写ERC20合约地址'}]"
            />
            <van-field
                    v-model="ProjectInfo.Symbol"
                    label="简称"
                    :rules="[{ }]"
                    readonly/>
            <van-field
                    v-model="ProjectInfo.SellPrice"
                    type="number"
                    name="SellPrice"
                    label="售价"
                    placeholder="单位：ETH"
                    :rules="[{ pattern:AmountPattern,required:true, message: '售价填写不正确' }]"
            />
            <van-field
                    v-model="ProjectInfo.SoftCap"
                    type="number"
                    name="SoftCap"
                    label="软顶"
                    placeholder="单位：ETH"
                    :rules="[{ pattern:AmountPattern, required:true, message: '软顶填写不正确' }]"
            />
            <van-field
                    v-model="ProjectInfo.HardCap"
                    type="number"
                    name="HardCap"
                    label="硬顶"
                    placeholder="单位：ETH"
                    :rules="[{ pattern:AmountPattern,required:true,  message: '请填写硬顶' }]"
            />
            <van-field
                    v-model="ProjectInfo.TargetPrice"
                    type="number"
                    name="TargetPrice"
                    label="目标价格"
                    placeholder="单位：ETH"
                    :rules="[{ pattern:AmountPattern,required:true,  message: '请填写目标价格' }]"
            />
            <van-field
                    v-model="ProjectInfo.SetupHeight"
                    type="digit"
                    name="SetupHeight"
                    label="上架时间"
                    placeholder="必填，单位：ETH区块高度"
                    :rules="[{pattern:/^[1-9]\d*$/,required:true,  message: '请填写上架时间' }]"
            />
            <van-field
                    label="保价终止"
                    model-value="保持2.1万个ETH区块"
                    :rules="[{ }]"
                    readonly
            />
            <van-field
                    v-model="ProjectInfo.Web"
                    name="Web"
                    label="官网网址"
                    placeholder="选填"
                    :rules="[{ }]"
            />
            <van-field
                    v-model="ProjectInfo.WhitePaper"
                    name="WhitePaper"
                    label="白皮书"
                    placeholder="选填"
                    :rules="[{ }]"
            />
            <div>
                <div class="warning">注意：</div>
                <div class="warning-content">
                    该融资申请不会经过任何人审核，仅当有投资人愿意承担风险为该项目提供担保，并且担保金额达到软顶之后，该项目会自动上架，并允许其它投资人进行投资。
                    若您未在承诺的ETH区块时间完成上架Uniswap，或未达到承诺目标价格，则系统将自动将该项目评级为“违约”或“亏损”。
                    友善提醒，为避免DFund Trust Rank对您的项目造成不利影响，请务必详细了解规则。
                </div>
            </div>
            <div style="margin: 16px;">
                <van-button round block type="info" @click="createProject"
                            loading-type="spinner" native-type="submit">提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script lang="ts">

    import {defineComponent, inject, onMounted, reactive, ref} from "vue";
    import {Contract, ethers} from "ethers";
    import {Abi} from "../../chain/abis";
    // eslint-disable-next-line no-unused-vars
    import {WClient} from "@/chain/walletconnect";
    // eslint-disable-next-line no-unused-vars
    import {ContractManager} from "@/chain/erc20";
    // eslint-disable-next-line no-unused-vars
    import {ISetProjectParam} from "../../pgcommon/common";
    import {Notify} from "vant";


    export default defineComponent({
        name: "CreateProject",
        setup() {
            const ProjectInfo = reactive({
                Token: "",
                Symbol: "",
                SellPrice: "",
                SoftCap: "",
                HardCap: "",
                TargetPrice: "",
                SetupHeight: "",
                FundId: "",
                WhitePaper: "",
                Web: ""
            })
            const wcli = inject<WClient>('walletConnect')
            const fundAddr = inject("fund", ref(""))
            const AmountPattern = /^([1-9]\d{0,9}|0)(\.\d{1,5})?$/
            const ERC20Pattern = /^0x[0-9a-fA-F]{40}$/
            const provider = new ethers.providers.JsonRpcProvider(String(process.env.VUE_APP_CHAIN_URL))

            let abi: ContractManager
            onMounted(() => {
                abi = new ContractManager(fundAddr.value)
            })

            async function getERC20TokenSymbol() {
                if (ERC20Pattern.test(ProjectInfo.Token)) {
                    let tc = new Contract(ProjectInfo.Token, Abi.DreamToken, provider)
                    let symbol = await tc.functions.symbol()
                    ProjectInfo.Symbol = symbol
                }
            }

            const onFailed = (errorInfo: any) => {
                console.log('failed', errorInfo);
            };

            async function createProject() {
                let account = wcli!.state.address
                let params = {
                    From: account,
                    Token: ProjectInfo.Token,
                    SellPrice: ProjectInfo.SellPrice,
                    SoftCap: ProjectInfo.SoftCap,
                    HardCap: ProjectInfo.HardCap,
                    TargetPrice: ProjectInfo.TargetPrice,
                    SetupHeight: ProjectInfo.SetupHeight,
                    WhitePaper: ProjectInfo.WhitePaper,
                    Web: ProjectInfo.Web,
                } as ISetProjectParam

                let tx = await abi.SetProject(params)
                console.log(tx)
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
                onFailed,
                ProjectInfo,
                AmountPattern,
                ERC20Pattern,
                getERC20TokenSymbol,
                createProject
            }
        }
    })
</script>

<style scoped>
    /deep/ .van-cell {

    }

    /deep/ .van-field__label {
        font-size: 32px;
        font-weight: bold;
        padding-left: 20px;
        width: 360px;
        font-family: PingFangSC;
        width: 260px;
        height: 48px;
    }

    /deep/ .van-button__text {
        color: white;
        border: none;

    }

    /deep/ .van-button {
        border: none;
        border-radius: 10px;
        background-color: #3682FF;
        font-family: PingFangSC;
        font-size: 40px;
    }

    .warning {
        padding-top: 40px;
        font-family: PingFangSC;
        font-size: 20px;
        font-weight: bold;
        text-align: left;
        padding-left: 50px;
    }

    .warning-content {
        margin: auto;
        font-family: PingFangSC;
        font-size: 20px;
        width: 620px;
    }

    #cp-main {
        height: calc(100vh - 500px);
        padding-bottom: 200px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>
