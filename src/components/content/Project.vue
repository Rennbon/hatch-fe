<template>
    <div>
        <div id="project-info">
            <div>FundName</div>
            <div>{{ fundDaily.percent }}%</div>
            <div>{{ fundDaily.amount }} ETH</div>
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
            <div>invest Price:{{ projectInfo.price }}</div>
            <div>soft-hard cap:{{ projectInfo.softCap }}</div>
            <div>gaurantee:{{ projectInfo.guarantee }}</div>
            <div>target price:{{ projectInfo.targetPrice }}</div>
            <div>launch block:{{ projectInfo.setupHeight }}</div>
            <div>launch time:{{ projectInfo.deadline }}</div>
        </div>
        <div>
            <div>持仓：{{ myPosition.position }}</div>
            <div>投入成本：{{ myPosition.inputCost }}</div>
            <div>盈利：{{ myPosition.profits }}</div>
            <div>价值：{{ myPosition.value }}</div>
            <div>投入时间：{{ myPosition.openTime }}</div>
            <div>剩余时间：{{ projectInfo.deadline }}</div>

        </div>
        <div>
            <van-button v-if="buttons.guarantee" type="info">担保</van-button>
            <van-button v-if="buttons.invest" type="info">投资</van-button>
            <van-button v-if="buttons.refund" type="info">退出投资</van-button>
        </div>
        <div>
            <div>投资</div>
            <div :key="index" v-for="(log,index) in investLogs">
                <div>{{ log.id }}
                    {{ log.from }}
                    {{ log.amount }}
                </div>
            </div>
            <div>卖出</div>
            <div :key="index" v-for="(log,index) in sellLogs">
                <div>{{ log.id }}
                    {{ log.from }}
                    {{ log.amount }}
                </div>
            </div>

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

    interface ILog {
        id: number
        blockHeight: number
        from: string
        amount: string
    }

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
                targetPrice: "",
                setupHeight: 0,
                deadline: 0,
                guarantee: "0",
                web: "",
                whitePaper: "",
            })
            const fundDaily = reactive({
                amount: "0",
                percent: "0",
            })

            const buttons = reactive({
                guarantee: false,
                invest: false,
                refund: false,
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
                projectInfo.deadline = projectInfo.setupHeight - currentHeight.value
                if (projectInfo.deadline < 0) {
                    projectInfo.deadline = 0
                }
                getProjectSellLog()
                getProjectInvestLog()
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
                    // 1：guarantee 2:invest 3:over
                    switch (projectInfo.stage) {
                        case 1:
                            buttons.guarantee = true
                            break
                        case 2:
                            buttons.invest = true
                            break
                        default:
                            break
                    }
                    if (buttons.invest && myPosition.inputCost != "0") {
                        buttons.refund = true
                    }

                    projectInfo.price = one.price
                    projectInfo.softCap = one.softCap
                    projectInfo.hardCap = one.hardCap
                    projectInfo.setupHeight = one.setupHeight
                    projectInfo.guarantee = one.guarantee
                    projectInfo.web = one.web
                    projectInfo.targetPrice = one.targetPrice
                    projectInfo.whitePaper = one.whitePaper

                    let daily = res.data.fundDaily
                    fundDaily.amount = daily.amount
                    fundDaily.percent = daily.percent
                }).catch(err => {
                        Notify({type: 'danger', message: err});
                    }
                )
            }


            // sellLog start
            const reqSellLog = reactive({
                pageIndex: 1,
                pageSize: 10,
                more: true,
                methodNum: 3,
            })
            const sellLogs: ILog[] = []

            function getProjectSellLog() {
                if (!reqSellLog.more) {
                    return
                }
                BackendApi.getProjectMethodLogs({
                    "pageIndex": reqSellLog.pageIndex,
                    "pageSize": reqSellLog.pageSize,
                    "methodNum": reqSellLog.methodNum,
                    "project": projectAddr.value,
                    "fund": fundAddr.value
                }).then(res => {
                    if (res.data.array.length > 0) {
                        sellLogs.concat(res.data.array)
                        reqSellLog.pageIndex++
                    } else {
                        reqSellLog.more = false
                    }

                }).catch(err => {
                        Notify({type: 'danger', message: err});
                    }
                )
            }

            // invest log  start
            const reqInvestLog = reactive({
                pageIndex: 1,
                pageSize: 10,
                more: true,
                methodNum: 2,
            })
            const investLogs: ILog[] = []

            function getProjectInvestLog() {
                if (!reqInvestLog.more) {
                    return
                }
                BackendApi.getProjectMethodLogs({
                    "pageIndex": reqInvestLog.pageIndex,
                    "pageSize": reqInvestLog.pageSize,
                    "methodNum": reqInvestLog.methodNum,
                    "project": projectAddr.value,
                    "fund": fundAddr.value
                }).then(res => {
                    if (res.data.array.length > 0) {
                        investLogs.concat(res.data.array)
                        reqInvestLog.pageIndex++
                    } else {
                        reqInvestLog.more = false
                    }

                }).catch(err => {
                        Notify({type: 'danger', message: err});
                    }
                )
            }


            return {
                fundDaily, projectInfo, myPosition, currentHeight,
                sellLogs, investLogs,
                getProjectSellLog, getProjectInvestLog,
                buttons
            }

        }
    })
</script>

<style scoped>

</style>
