<template>
    <div>
        <van-form @failed="onFailed">
            <van-field
                    v-model="ProjectInfo.Token"
                    name="Token"
                    label="合约地址"
                    placeholder="ERC20合约地址（42位长度）"
                    @change="getERC20TokenSymbol"
                    :rules="[{ pattern:ERC20Pattern, required: true ,message:'请填写ERC20合约地址'}]"
            />
            <van-field
                    v-model="ProjectInfo.Symbol"
                    label="简称" readonly/>
            <van-field
                    v-model="ProjectInfo.SellPrice"
                    type="number"
                    name="SellPrice"
                    label="售价"
                    placeholder="单位：ETH"
                    :rules="[{ pattern:AmountPattern, required: true, message: '请填写售价' }]"
            />
            <van-field
                    v-model="ProjectInfo.SoftCap"
                    type="number"
                    name="SoftCap"
                    label="软顶"
                    placeholder="单位：ETH"
                    :rules="[{ pattern:AmountPattern, required: true, message: '请填写软顶' }]"
            />
            <van-field
                    v-model="ProjectInfo.HardCap"
                    type="number"
                    name="HardCap"
                    label="硬顶"
                    placeholder="单位：ETH"
                    :rules="[{ pattern:AmountPattern, required: true, message: '请填写硬顶' }]"
            />
            <van-field
                    v-model="ProjectInfo.TargetPrice"
                    type="number"
                    name="TargetPrice"
                    label="目标价格"
                    placeholder="单位：ETH"
                    :rules="[{ pattern:AmountPattern, required: true, message: '请填写目标价格' }]"
            />
            <van-field
                    v-model="ProjectInfo.SetupHeight"
                    type="digit"
                    name="SetupHeight"
                    label="上架时间"
                    placeholder="必填，单位：ETH区块高度"
                    :rules="[{pattern:/^[1-9]\d*$/, required: true, message: '请填写上架时间' }]"
            />
            <van-field
                    label="保价终止"
                    model-value="保持2.1万个ETH区块"
                    readonly
            />
            <van-field
                    v-model="ProjectInfo.Web"
                    name="Web"
                    label="官网网址"
                    placeholder="选填"
            />
            <van-field
                    v-model="ProjectInfo.WhitePaper"
                    name="WhitePaper"
                    label="白皮书"
                    placeholder="选填"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script lang="ts">

    import {defineComponent, reactive} from "vue";
    import {Contract, ethers} from "ethers";
    import {Abi} from "../../chain/abis";


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
                Web: "",
            })
            const AmountPattern = /^([1-9]\d{0,9}|0)(\.\d{1,5})?$/
            const ERC20Pattern = /^0x[0-9a-fA-F]{40}$/
            const provider = new ethers.providers.JsonRpcProvider(String(process.env.VUE_APP_CHAIN_URL))

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


            return {
                onFailed,
                ProjectInfo,
                AmountPattern,
                ERC20Pattern,
                getERC20TokenSymbol
            }
        }
    })
</script>

<style scoped>

</style>
