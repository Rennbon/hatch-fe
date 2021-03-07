<template>
    <div>
        <div id="project-info">
            <div>FundName</div>
            <div>+10%</div>
            <div>16.29 ETH</div>
        </div>
        <div>
            <div>AAA</div>
            <div>9.6 ETH</div>
            <div>盈利</div>
        </div>
        <div>
            <div>token: 0xxxxx</div>
            <div>www.baidu.com</div>
            <div>白皮书</div>
        </div>
        <div>
            <div>invest Price:</div>
            <div>soft-hard cap:</div>
            <div>gaurantee:</div>
            <div>target price:</div>
            <div>launch block:</div>
            <div>launch time:</div>
        </div>
        <div>
            <div>持仓：</div>
            <div>投入成本：</div>
            <div>盈利：</div>
            <div>价值：</div>
            <div>投入时间：</div>
            <div>剩余时间：</div>

        </div>
        <div>
            <van-button type="info">投资</van-button>
        </div>
        <div>
            <div>0xasdadasd 10eth</div>
            <div>0xasdadasd 10eth</div>
            <div>0xasdadasd 10eth</div>

        </div>
        <div>
            <div>0xasdadasd 10eth</div>
            <div>0xasdadasd 10eth</div>
            <div>0xasdadasd 10eth</div>
            <div>0xasdadasd 10eth</div>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, inject, onMounted, reactive, ref} from "vue";
    // eslint-disable-next-line no-unused-vars
    import {WClient} from "@/chain/walletconnect";
    import {ContractManager} from "@/chain/erc20";
    import {BackendApi} from "@/chain/backendApi";
    import {Notify} from "vant";
    import {add} from "@/chain/bignumber"
    import {ApiManager} from "@/chain/api"

    export default defineComponent({
        name: "Project",
        setup() {
            const projectAddr = inject("project", ref(""))
            const fundAddr = inject("fund", ref(""))
            const wcli = inject<WClient>("walletConnect")
            const account = ref("")
            const currentHeight = ref(0)
            const myPosition = reactive({
                position: "0",
                guarantee: "0",
                inputCost: "0",
                profits: "0",
                profitsPercent: "0",
                value: "0",
                openTime: 0,
                effective: 0,
                dateAmount: 0,
                input: 0,
            })
            const projectInfo = reactive({
                name: "",
                stage: 0,
                price: "0",
                softCap: "0",
                hardCap: "",
                setupHeight: 0,
                guarantee: "0",
                web: "",
                whitePaper: "",
            })
            const fundDaily = reactive({
                amount: "0",
                percent: "0",
            })
            onMounted(async () => {
                currentHeight.value = await ApiManager.GetBlockNumber()
                const abi = new ContractManager(fundAddr.value)
                if (wcli != undefined) {
                    account.value = wcli.state.address
                    myPosition.guarantee = await abi.GuaranteeProjectValue(account.value, projectAddr.value)
                    myPosition.inputCost = await abi.InvestProjectValue(account.value, projectAddr.value)
                    myPosition.profits = await abi.InvestProjectIncome(account.value, projectAddr.value)
                    myPosition.value = add(myPosition.inputCost, myPosition.profits)
                    myPosition.position = await abi.InvestProjectTokenAmount(account.value, projectAddr.value)
                }
                getProjectInfo()
            })


            function getProjectInfo() {
                BackendApi.getProjectInfo({
                    "account": account.value,
                    "project": projectAddr.value,
                    "fund": fundAddr.value,
                }).then(res => {
                    myPosition.input = res.data.myInputHeight
                    let one = res.data.one
                    projectInfo.name = one.name
                    projectInfo.stage = one.stage
                    projectInfo.price = one.price
                    projectInfo.softCap = one.softCap
                    projectInfo.hardCap = one.hardCap
                    projectInfo.setupHeight = one.setupHeight
                    projectInfo.guarantee = one.guarantee
                    projectInfo.web = one.web
                    projectInfo.whitePaper = one.whitePaper

                    let daily = res.data.fundDaily
                    fundDaily.amount = daily.amount
                    fundDaily.percent = daily.percent
                    console.log("load other projects over")
                }).catch(err => {
                        Notify({type: 'danger', message: err});
                    }
                )
            }

        }
    })
</script>

<style scoped>

</style>
