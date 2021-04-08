<template>
    <div id="pro-main" class="infinite-list" v-infinite-scroll="getProjectLog" style="overflow:auto">
        <div id="pro-faker-div"></div>
        <div id="pro-info">
            <div id="pro-info-top">
                <div id="pro-info-fund-name">{{ projectInfo.fundName }}</div>
                <div id="pro-info-percent">{{ fundDaily.percent }}%</div>
                <div id="pro-info-inc">12.2322</div>
                <div id="pro-info-price" :style="{'color':boardCss.color}">{{ projectInfo.priceInc }}</div>
                <div id="pro-info-uint" :style="{'color':boardCss.color}"> ETH</div>
                <div id="pro-info-top-tr">
                    <div id="pro-info-top-tr-1" :class="boardCss.triangle"></div>
                    <div id="pro-info-top-tr-2"
                         :style="{'font-size':boardCss.fontSize,'position':'absolute','top':boardCss.top,'right':boardCss.right}">
                        {{ boardCss.status }}
                    </div>
                    <div v-if="boardCss.code===2"
                         style="color: white; position:absolute;
                         top:32px;  right: -12px;
                        font-family: PingFangSC;
                            font-weight: bold;
                            font-size: 18px;
                            transform: rotate(40deg);
                        ">但未达预期
                    </div>
                </div>
            </div>
            <div id="pro-info-web">{{ projectInfo.web }}</div>
            <div id="pro-info-token">{{ projectInfo.token }}</div>
            <div id="pro-info-btm" :style="{ 'background-image': boardCss.bg}">
                <div class="pro-info-left">
                    <div>
                        <div class="pro-info-title">Invest Price</div>
                        <div class="pro-info-val">{{ convertAmountToCommon(projectInfo.price) }} ETH</div>
                    </div>
                    <div>
                        <div class="pro-info-title">Target Price</div>
                        <div class="pro-info-val">{{ convertAmountToCommon(projectInfo.targetPrice) }} ETH</div>
                    </div>
                    <div>
                        <div class="pro-info-title"> Launch Block</div>
                        <div class="pro-info-val">{{ projectInfo.setupHeight }}</div>
                    </div>
                </div>
                <div class="pro-info-right">
                    <div>
                        <div class="pro-info-title">Soft-hard cap</div>
                        <div class="pro-info-val">
                            {{
                                convertAmountToCommon(projectInfo.softCap) + " - " + convertAmountToCommon(projectInfo.hardCap)
                            }}
                            ETH
                        </div>
                    </div>
                    <div>
                        <div class="pro-info-title">Guarantee</div>
                        <div class="pro-info-val">{{ projectInfo.guarantee }} ETH</div>
                    </div>
                    <div>
                        <div class="pro-info-title"> Launch Time</div>
                        <div class="pro-info-val">{{ projectInfo.deadline }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div id="pro-my">
            <div id="pro-my-title">持仓信息</div>
            <div id="pro-my-border">
                <div id="pro-my-position">
                    <div class="pro-my-title">持仓</div>
                    <div>{{ myPosition.position }}</div>
                </div>
                <div id="line0"></div>
                <div id="pro-my-time">
                    <div class="pro-my-title">投入时间</div>
                    <div class="pro-my-content">{{ myPosition.openTime }}</div>
                </div>
                <div id="pro-my-deadline">
                    <div class="pro-my-title">剩余时间</div>
                    <div class="pro-my-content">{{ projectInfo.deadline }}</div>
                </div>
                <div id="pro-my-value" class="pro-my-ticket">
                    <div class="pro-my-title">价值</div>
                    <div class="pro-my-content">{{ myPosition.value }} ETH</div>
                </div>
                <div class="pro-line" id="line1"></div>
                <div id="pro-my-profits" class="pro-my-ticket">
                    <div class="pro-my-title">盈利</div>
                    <div class="pro-my-content">{{ myPosition.profits }} ETH</div>
                </div>
                <div class="pro-line" id="line2"></div>
                <div id="pro-my-input" class="pro-my-ticket">
                    <div class="pro-my-title">投入成本</div>
                    <div class="pro-my-content">{{ myPosition.inputCost }} ETH</div>
                </div>
            </div>
        </div>
        <div style="margin:10px 0px">
            <button class="pro-my-bt" @click="SubmitGuarantee" v-if="buttons.guarantee" type="info">担保</button>
            <button class="pro-my-bt" @click="SubmitDisGuarantee" v-if="buttons.disGuarantee" type="info">撤销担保</button>
            <button class="pro-my-bt" @click="SubmitInvest" v-if="buttons.invest" type="info">投资</button>
            <button class="pro-my-bt" @click="SubmitDisInvest" v-if="buttons.disInvest" type="info">撤销投资</button>
            <button class="pro-my-bt" @click="SubmitSell" v-if="buttons.sell" type="info">卖出</button>
        </div>
        <div>
            <van-tabs v-model:active="active" color="#3682FF" @click="tabClick">
                <van-tab class="pro-logs-tab" name="invest" title="投资记录">
                    <div style="margin-top: 20px"></div>
                    <div v-if="projectLogs.length>0" class="pro-logs-border">
                        <div class="log-col" :key="index" v-for="(log,index) in projectLogs">
                            <img class="log-icon" src="/img/2x/logprefix.png"/>
                            <div class="log-token"> {{ log.from }}</div>
                            <div class="log-eth"> {{ convertAmountToCommon(log.amount) }} ETH</div>
                        </div>

                    </div>
                </van-tab>
                <van-tab class="pro-logs-tab" name="sell" title="卖出记录">
                    <div style="margin-top: 20px"></div>
                    <div v-if="projectLogs.length>0" class="pro-logs-border">
                        <div class="log-col" :key="index" v-for="(log,index) in projectLogs">
                            <img class="log-icon" src="/img/2x/logprefix.png"/>
                            <div class="log-token"> {{ log.from }}</div>
                            <div class="log-eth"> {{ convertAmountToCommon(log.amount) }} ETH</div>
                        </div>

                    </div>
                </van-tab>
                <van-tab class="pro-logs-tab" name="guarantee" title="担保记录">
                    <div style="margin-top: 20px"></div>
                    <div v-if="projectLogs.length>0" class="pro-logs-border">
                        <div class="log-col" :key="index" v-for="(log,index) in projectLogs">
                            <img class="log-icon" src="/img/2x/logprefix.png"/>
                            <div class="log-token"> {{ log.from }}</div>
                            <div class="log-eth"> {{ convertAmountToCommon(log.amount) }} ETH</div>
                        </div>

                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <div style="margin-bottom: 100px;"></div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, inject, onMounted, reactive, ref} from "vue";

    // eslint-disable-next-line no-unused-vars
    import {WClient} from "@/chain/walletconnect";
    import {ContractManager} from "@/chain/erc20";
    import {BackendApi} from "@/chain/backendApi";
    import {Dialog, Notify} from "vant";
    import {add, convertAmountToCommon, greaterThan} from "@/chain/bignumber"
    import {ApiManager} from "@/chain/api"
    // eslint-disable-next-line no-unused-vars
    import {IOperationSlot, ProjectStatus, SubmitType} from "../../pgcommon/common";

    interface ILog {
        id: number
        blockHeight: number
        from: string
        amount: string
    }

    interface BoardCss {
        bg: string
        triangle: string
        status: string
        fontSize: string
        top: string
        right: string
        code: number
        color: string
    }

    export default defineComponent({
        name: "Project",
        methods: {
            convertAmountToCommon
        },
        setup(props, context) {
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
                openTime: "0",
                effective: 0,
                dateAmount: 0,
                input: 0,
            })
            const projectInfo = reactive({
                name: "",
                token: "",
                stage: 0,
                price: "0",
                softCap: "0",
                hardCap: "",
                targetPrice: "",
                setupHeight: 0,
                deadline: "",
                guarantee: "0",
                web: "",
                whitePaper: "",
                fundName: "",
                status: 0,
                priceInc: "0"
            })
            const fundDaily = reactive({
                amount: "0",
                percent: "0",
            })

            const buttons = reactive({
                guarantee: false,
                disGuarantee: false,
                invest: false,
                disInvest: false,
                sell: false,
            })
            const boardCss = reactive({} as BoardCss)
            onMounted(async () => {
                await getProjectInfo()
                currentHeight.value = await ApiManager.GetBlockNumber()
                const abi = new ContractManager(fundAddr.value)
                if (wcli != undefined && wcli.state.connector?.session.connected) {
                    account.value = wcli.state.address
                    myPosition.guarantee = await abi.GuaranteeProjectValue(account.value, projectAddr.value)
                    myPosition.inputCost = await abi.InvestProjectValue(account.value, projectAddr.value)
                    myPosition.profits = await abi.InvestProjectIncome(account.value, projectAddr.value)
                    myPosition.value = add(myPosition.inputCost, myPosition.profits)
                    myPosition.position = await abi.InvestProjectTokenAmount(account.value, projectAddr.value)
                    await myFirstInput()
                }
                let proStatus = await abi.ProjectStatus(projectAddr.value)
                console.log("project status", proStatus)
                switch (proStatus) {
                    case ProjectStatus.Invest:
                        buttons.invest = true
                        if (greaterThan(myPosition.inputCost, 0)) {
                            buttons.disInvest = true
                        }
                        break
                    case ProjectStatus.GuaranteeAndInvest:
                        buttons.invest = true
                        buttons.guarantee = true
                        if (greaterThan(myPosition.guarantee, 0)) {
                            buttons.disGuarantee = true
                        }
                        if (greaterThan(myPosition.inputCost, 0)) {
                            buttons.disInvest = true
                        }
                        break
                    case ProjectStatus.Guarantee:
                        buttons.guarantee = true
                        if (greaterThan(myPosition.guarantee, 0)) {
                            buttons.disGuarantee = true
                        }
                        break
                    case ProjectStatus.End:
                    case ProjectStatus.FullQuota:
                        break
                    case ProjectStatus.Sell:
                        buttons.sell = true
                        break
                    default:
                        break
                }


                let cssRes = calcCss(projectInfo.status)
                boardCss.fontSize = cssRes.fontSize
                boardCss.triangle = cssRes.triangle
                boardCss.bg = cssRes.bg
                boardCss.status = cssRes.status
                boardCss.top = cssRes.top
                boardCss.right = cssRes.right
                boardCss.code = cssRes.code
                boardCss.color = cssRes.color
                getProjectLog()

                let period = projectInfo.setupHeight - currentHeight.value
                if (period < 0) {
                    projectInfo.deadline = "0"
                } else {
                    projectInfo.deadline = period + " (" + Math.floor(period * 12 / 60 / 60) + " hours)"
                }
                console.log(myPosition.guarantee)
            })


            function myFirstInput() {
                BackendApi.getProjectFirstMethodHeight({
                    "account": account.value,
                    "project": projectAddr.value,
                    "fund": fundAddr.value,
                }).then(res => {
                    let period = currentHeight.value - res.data.height
                    myPosition.openTime = period + " (" + Math.floor(period * 12 / 60 / 60 / 24) + " days)"
                }).catch(err => {
                    if (err.response.data === "empty data") {
                        console.log(err.response.data)
                    }
                })
            }

            function getProjectInfo() {
                BackendApi.getProjectInfo({
                    "account": account.value,
                    "project": projectAddr.value,
                    "fund": fundAddr.value,
                }).then(res => {
                    myPosition.input = res.data.myInputHeight
                    let one = res.data.one
                    projectInfo.name = one.name
                    projectInfo.token = one.token
                    projectInfo.stage = one.stage
                    /*// 1：guarantee 2:invest 3:over
                    switch (projectInfo.stage) {
                        case 1:
                            buttons.guarantee = true
                            break
                        case 2:
                            buttons.invest = true
                            break
                        default:
                            break
                    }*/
                    /*         if (buttons.invest && myPosition.inputCost != "0") {
                                 buttons.refund = true
                             }*/

                    projectInfo.price = one.price
                    projectInfo.softCap = one.softCap
                    projectInfo.hardCap = one.hardCap
                    projectInfo.setupHeight = one.setupHeight
                    console.log(projectInfo.setupHeight)
                    projectInfo.guarantee = one.guarantee
                    projectInfo.web = one.web
                    projectInfo.fundName = one.fundName
                    projectInfo.targetPrice = one.targetPrice
                    projectInfo.whitePaper = one.whitePaper
                    projectInfo.status = one.status
                    projectInfo.priceInc = one.priceInc
                    let daily = res.data.fundDaily
                    fundDaily.amount = daily.amount
                    fundDaily.percent = daily.percent
                }).catch(err => {
                        Notify({type: 'danger', message: err});
                    }
                )
            }


            function calcCss(status: Number): BoardCss {
                let obj = {} as BoardCss
                // NOTE: debug css
                //status = 1
                switch (status) {
                    case 0:
                        obj.status = "暂无评分"
                        obj.triangle = "custom-gray"
                        obj.fontSize = "24px"
                        obj.bg = "url('/img/2x/pro-bg-gray.png')"
                        obj.top = "30px"
                        obj.right = "-18px"
                        obj.code = 0
                        obj.color = "rgba(140, 140, 140, 0.3)"
                        break
                    case 1:
                        obj.status = "盈利"
                        obj.triangle = "custom-green"
                        obj.fontSize = "27px"
                        obj.bg = "url('/img/2x/pro-bg-green.png')"
                        obj.top = "20px"
                        obj.right = "6px"
                        obj.code = 1
                        obj.color = "#00EB60"
                        break
                    case 2:
                        // 盈利但未达预期
                        obj.status = "盈利"
                        obj.triangle = "custom-yellow"
                        obj.fontSize = "18px"
                        obj.bg = "url('/img/2x/pro-bg-yellow.png')"
                        obj.top = "16px"
                        obj.right = "-4px"
                        obj.code = 2
                        obj.color = "#FFD380"
                        break
                    case 3:
                        obj.status = "亏损"
                        obj.triangle = "custom-red"
                        obj.fontSize = "27px"
                        obj.bg = "url('/img/2x/pro-bg-red.png')"
                        obj.top = "20px"
                        obj.right = "6px"
                        obj.code = 3
                        obj.color = "#EC5A4C"
                        break
                    case 4:
                        obj.status = "违约"
                        obj.triangle = "custom-black"
                        obj.fontSize = "27px"
                        obj.bg = "url('/img/2x/pro-bg-black.png')"
                        obj.top = "20px"
                        obj.right = "6px"
                        obj.code = 4
                        obj.color = "rgb(140, 140, 140)"
                        break
                    default:
                        break
                }
                return obj
            }


            const reqLogRequest = reactive({
                pageIndex: 1,
                pageSize: 10,
                more: true,
                methodNum: 2,
            })
            const projectLogs: ILog[] = reactive([])

            function getProjectLog() {
                if (!reqLogRequest.more) {
                    return
                }
                BackendApi.getProjectMethodLogs({
                    "pageIndex": reqLogRequest.pageIndex,
                    "pageSize": reqLogRequest.pageSize,
                    "methodNum": reqLogRequest.methodNum,
                    "project": projectAddr.value,
                    "fund": fundAddr.value
                }).then(res => {
                    let arr = res.data.array
                    if (arr.length > 0) {
                        for (let i = 0; i < arr.length; i++) {
                            projectLogs.push(arr[i])
                        }
                        reqLogRequest.pageIndex++
                    } else {
                        reqLogRequest.more = false
                    }

                }).catch(err => {
                        Notify({type: 'danger', message: err});
                    }
                )
            }

            const active = ref(0);

            function SubmitGuarantee() {
                const params = {
                    Type: SubmitType.Guarantee,
                    Fund: fundAddr.value,
                    Project: projectAddr.value,
                } as IOperationSlot
                emit(params)
            }

            function SubmitInvest() {
                const params = {
                    Type: SubmitType.Invest,
                    Fund: fundAddr.value,
                    Project: projectAddr.value,
                } as IOperationSlot
                emit(params)
            }

            function SubmitDisGuarantee() {
                const params = {
                    Type: SubmitType.DisGuarantee,
                    Fund: fundAddr.value,
                    Project: projectAddr.value,
                } as IOperationSlot
                emit(params)
            }

            function SubmitDisInvest() {
                const params = {
                    Type: SubmitType.DisInvest,
                    Fund: fundAddr.value,
                    Project: projectAddr.value,
                } as IOperationSlot
                emit(params)
            }

            function SubmitSell() {
                const params = {
                    Type: SubmitType.Sell,
                    Fund: fundAddr.value,
                    Project: projectAddr.value,
                } as IOperationSlot
                emit(params)
            }

            function emit(p: IOperationSlot) {
                if (account.value === "") {
                    Dialog.alert({
                        title: '提示',
                        message: '需要连接钱包',
                    }).then(() => {
                        // on close
                    });
                    return
                }
                context.emit("openOperation", p)
            }


            const tabClick = (name: string) => {
                switch (name) {
                    case "invest":
                        reqLogRequest.methodNum = 2
                        break
                    case "sell":
                        reqLogRequest.methodNum = 3
                        break
                    default:
                        reqLogRequest.methodNum = 1
                        break
                }
                projectLogs.splice(0)
                reqLogRequest.pageIndex = 1
                reqLogRequest.more = true
                getProjectLog()
                console.log(name)
            }
            return {
                fundDaily, projectInfo, myPosition, currentHeight,
                getProjectLog, projectLogs,
                buttons, active, boardCss,
                SubmitGuarantee, SubmitInvest, SubmitDisGuarantee, SubmitDisInvest, SubmitSell,
                tabClick
            }

        }
    })
</script>

<style scoped>
    #pro-main {
        position: relative;
        height: calc(100vh - 300px - 100px);
        overflow-y: scroll;
        overflow-x: hidden;
        padding-bottom: 100px;
    }

    #pro-faker-div {
        position: absolute;
        top: 0;
        height: 130px;
        width: 750px;
        background-color: #3682FF;
        border-radius: 0 0 10px 10px;
    }

    #pro-info {
        position: relative;
        height: 470px;
        width: 660px;
        margin: auto;
        border-radius: 40px;
        box-shadow: 0 3px 16px rgba(0, 0, 0, .10), 0 3px 16px rgba(0, 0, 0, .10);
        background: white;
    }

    #pro-info-top {
        width: inherit;
        height: 196px;
        position: relative;
    }

    #pro-info-top-tr {
        width: 196px;
        position: absolute;
        right: 29px;
        top: 0;
    }

    #pro-info-top-tr-1 {
        border-left: 120px solid transparent;
        border-bottom: 90px solid transparent;
        border-top-right-radius: 40px;
        position: absolute;
    }

    .custom-green {
        border: 106px solid #00EB60;
    }

    .custom-red {
        border: 106px solid #EC5A4C;
    }

    .custom-yellow {
        border: 106px solid #FFD380;
    }

    .custom-gray {
        border: 106px solid rgba(140, 140, 140, 0.3);
    }

    .custom-black {
        border: 106px solid rgb(140, 140, 140);
    }


    #pro-info-top-tr-2 {
        font-family: PingFangSC;
        font-weight: bold;
        color: white;
        transform: rotate(40deg);
        z-index: 100;
        position: absolute;
    }

    .custom-font1 {
        color: red;
        position: absolute;
        top: 30px;
        right: -10px;
    }

    .custom-font2 {
        position: absolute;
        top: 30px;
        right: -10px;

    }

    .custom-font3 {
        position: absolute;
        top: 30px;
        right: -10px;
    }

    #pro-info-fund-name {
        font-family: PingFangSC;
        font-size: 32px;
        font-weight: bold;
        position: absolute;
        top: 28px;
        left: 42px;
    }

    #pro-info-percent {
        font-weight: bold;
        font-family: PingFangSC;
        color: #00EB60;
        font-size: 38px;
        position: absolute;
        top: 86px;
        left: 42px;
    }

    #pro-info-inc {
        font-family: PingFangSC;
        font-size: 32px;
        color: #00EB60;
        position: absolute;
        top: 140px;
        left: 42px;
    }

    #pro-info-price {
        font-family: PingFangSC;
        font-size: 86px;
        font-weight: bold;
        position: relative;
        top: 82px;
        height: 112px;
    }

    #pro-info-uint {
        font-family: PingFangSC;
        font-size: 28px;
        font-weight: bold;
        position: absolute;
        top: 140px;
        right: 90px;
    }

    #pro-info-web {
        font-family: Helvetica;
        font-size: 28px;
        text-align: left;
        margin-top: 14px;
        padding-left: 42px;
        height: 32px;
        line-height: 12px;
    }

    #pro-info-token {
        font-family: PingFangSC;
        font-size: 22px;
        margin-top: 11px;
        line-height: 8px;
        height: 30px;
        text-align: left;
        padding-left: 42px;
    }

    #pro-info-btm {
        height: 188px;
        width: inherit;

        background-size: 100% 100%;
        position: relative;
    }

    .pro-info-left > div:nth-child(even) {
        background-image: url("/img/2x/pro-bg-r.png");
        background-size: 100% 100%;
    }

    .pro-info-left {
        width: 50%;
        border: none;
    }

    .pro-info-right {
        width: 50%;
        position: absolute;
        top: 0px;
        left: 330px;
        border: none;
    }

    .pro-info-right > div:nth-child(odd) {
        background-image: url("/img/2x/pro-bg-l.png");
        background-size: 100% 100%;
    }

    .pro-info-title {
        padding-top: 10px;
        font-family: PingFangSC;
        color: #333333;
        font-size: 24px;
        font-weight: bold;
        height: 24px;
        line-height: 12px;
        text-align: left;
        padding-left: 30px;
    }

    .pro-info-val {
        font-family: PingFangSC;
        font-size: 20px;
        line-height: 14px;
        height: 28px;
        text-align: left;

        padding-left: 30px;
        z-index: 100;
    }

    #pro-my {
        height: 410px;
        width: 660px;
        margin: auto;
    }

    #pro-my-title {
        height: 100px;
        font-size: 32px;
        font-family: PingFangSC;
        font-weight: bold;
        text-align: left;
        line-height: 94px;
        color: #3682FF;
    }

    #pro-my-border {
        position: relative;
        height: 300px;
        border-radius: 40px;
        box-shadow: 0 3px 16px rgba(0, 0, 0, .10), 0 3px 16px rgba(0, 0, 0, .10);
    }

    #pro-my-position {
        position: absolute;
        height: 160px;
        width: 300px;
    }

    #pro-my-position > div:nth-child(1) {
        position: absolute;
        left: 28px;
        top: 30px;
    }

    #pro-my-position > div:nth-child(2) {
        position: absolute;
        left: 56px;
        top: 80px;
        height: 40px;
        width: 160px;
        color: #666666;
        font-size: 40px;
        font-family: PingFangSC;
        text-align: left;
    }

    #pro-my-time {
        position: absolute;
        left: 300px;
        width: 360px;
        height: 70px;
    }

    #pro-my-time > div:nth-child(1) {
        position: absolute;
        left: 28px;
        top: 30px;
    }

    #pro-my-time > div:nth-child(2) {
        position: absolute;
        left: 180px;
        top: 36px;
        height: 40px;
        width: 160px;

    }

    .pro-my-title {
        height: 40px;
        width: 120px;
        border: 0px;
        background: rgba(54, 128, 255, 0.1);
        color: #666666;
        font-size: 26px;
        font-family: PingFangSC;
        font-weight: bold;
        border-radius: 10px;
    }

    .pro-my-content {
        color: #666666;
        font-size: 22px;
        font-family: PingFangSC;
        text-align: left;
    }

    #pro-my-deadline {
        position: absolute;
        left: 300px;
        top: 70px;
        width: 360px;
        height: 70px;
    }

    #pro-my-deadline > div:nth-child(1) {
        position: absolute;
        left: 28px;
        top: 30px;
    }

    #pro-my-deadline > div:nth-child(2) {
        position: absolute;
        left: 180px;
        top: 36px;
        height: 40px;
        width: 160px;

    }

    #pro-my-value {
        position: absolute;
        top: 160px;
        left: 20px;
        box-shadow: -5px 5px 10px -4px rgba(0, 0, 0, 0.15), 0px -5px 10px -5px rgba(0, 0, 0, 0.05);
    }

    #pro-my-value > div:nth-child(1) {
        position: absolute;
        left: 48px;
        top: 30px;
    }

    #pro-my-value > div:nth-child(2) {
        position: absolute;
        text-align: center;
        top: 78px;
        height: 40px;
        width: 220px;
    }

    #pro-my-profits {
        position: absolute;
        top: 160px;
        left: 230px;
        box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.15), 0px -5px 10px -5px rgba(0, 0, 0, 0.05);
    }

    #pro-my-profits > div:nth-child(1) {
        position: absolute;
        left: 48px;
        top: 30px;
    }

    #pro-my-profits > div:nth-child(2) {
        position: absolute;
        text-align: center;
        top: 78px;
        height: 40px;
        width: 220px;
    }

    .pro-my-ticket {
        width: 210px;
        height: 110px;
        border-radius: 10px;
    }

    .pro-my-ticket:first-of-type {

    }

    #pro-my-input {
        position: absolute;
        top: 160px;
        left: 440px;
        box-shadow: 5px 5px 10px -4px rgba(0, 0, 0, 0.15), 0px -5px 10px -5px rgba(0, 0, 0, 0.05);
    }

    #pro-my-input > div:nth-child(1) {
        position: absolute;
        left: 48px;
        top: 30px;
    }

    #pro-my-input > div:nth-child(2) {
        position: absolute;
        text-align: center;
        top: 78px;
        height: 40px;
        width: 220px;
    }

    .pro-line {
        width: 2px;
        height: 94px;
        background-image: linear-gradient(to bottom, black 0%, #cccccc 50%, transparent 50%);
        background-size: 3px 18px;
        background-repeat: repeat;
    }

    #line0 {
        position: absolute;
        top: 30px;
        left: 296px;
        width: 2px;
        height: 112px;
        background-image: linear-gradient(to bottom, black 0%, #cccccc 50%, transparent 50%);
        background-size: 3px 18px;
        background-repeat: repeat;
    }

    #line1 {
        position: absolute;
        left: 228px;
        top: 168px;
    }

    #line2 {
        position: absolute;
        left: 440px;
        top: 168px;
    }

    .pro-my-bt {
        margin-top: 18px;
        height: 80px;
        width: 660px;
        background-color: #3682FF;
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 40px;
        font-family: PingFangSC;
    }

    /deep/ .van-tab__text {
        font-family: PingFangSC;
        font-size: 32px;
    }

    .log-col {
        height: 32px;
        width: inherit;
        position: relative;
    }

    .log-icon {
        width: 14px;
        position: absolute;
        left: 20px;
        top: 7px;
    }

    .log-token {
        font-family: PingFang;
        font-size: 22px;
        position: absolute;
        left: 48px;

    }

    .log-eth {
        font-family: PingFang;
        font-size: 22px;
        position: absolute;
        left: 580px;
    }

    .pro-logs-border {
        width: 660px;
        padding-top: 20px;
        border-radius: 10px;
        box-shadow: 0 3px 16px rgba(0, 0, 0, .10), 0 3px 16px rgba(0, 0, 0, .10);
        margin: auto;
    }

</style>
