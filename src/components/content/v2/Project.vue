<template>
    <div id="project-border">
        <div id="pro-dashboard">
            <div id="pro-h1">Ongoing</div>
            <div id="pro-h2">
                <div id="pro-h2-symbol">ABC</div>
                <div id="pro-h2-price">12.6/100</div>
                <i id="pro-h2-unit">USDT</i>
            </div>
            <div id="pro-process">
                <span class="dcf-1" :style="{'width': '50%' }">50%</span>
                <span class="dcf-2"
                      :style="{'width': '30%' }">80%</span>
                <span class="dcf-3"
                      :style="{'width': '20%'} "></span>
            </div>
            <div id="pro-button">
                <button class="pro-button-1" @click="SubmitGuarantee">Offer Guaranty</button>
                <button class="pro-button-1" @click="SubmitInvest">Invest</button>
                <button class="pro-button-1" @click="SubmitSell">Sell</button>
            </div>
        </div>
        <div id="pro-detail">
            <div class="cell-group">
                <div class="cell cell-line">
                    <div class="cell-large-half  cell-title">About This Startup</div>
                    <div class="cell-small-half cell-title-left">Details>></div>
                </div>
                <div class="cell cell-line">
                    <div class="cell-half">
                        <div class="cell-half-label">Status:</div>
                        <div class="cell-half-value">Ongoing</div>
                    </div>
                    <div class="cell-half">
                        <div class="cell-half-label">Token Price:</div>
                        <div class="cell-half-value">Not launched</div>
                    </div>
                </div>

                <div class="cell cell-line">
                    <div class="cell-half">
                        <div class="cell-half-label">Guarantee Offered:</div>
                        <div class="cell-half-value">{{ projectInfo.guarantee }} <span class="token-unit">USDT</span>
                            (20%)
                        </div>
                    </div>
                    <div class="cell-half">
                        <div class="cell-half-label">Invested:</div>
                        <div class="cell-half-value">150,000 <span class="token-unit">USDT</span> (15%)</div>
                    </div>
                </div>
                <div class="cell cell-line">
                    <div class="cell-half">
                        <div class="cell-half-label">Invest Price:</div>
                        <div class="cell-half-value">{{ convertAmountToCommon(projectInfo.price) }} <span
                                class="token-unit">USDT</span></div>
                    </div>
                    <div class="cell-half">
                        <div class="cell-half-label">Target Price:</div>
                        <div class="cell-half-value">{{ convertAmountToCommon(projectInfo.targetPrice) }} <span
                                class="token-unit">USDT</span></div>
                    </div>
                </div>
                <div class="cell cell-line">
                    <div class="cell-half">
                        <div class="cell-half-label">Soft Cap:</div>
                        <div class="cell-half-value">{{ convertAmountToCommon(projectInfo.softCap) }} <span
                                class="token-unit">USDT</span></div>
                    </div>
                    <div class="cell-half">
                        <div class="cell-half-label">Hard Cap:</div>
                        <div class="cell-half-value">{{ convertAmountToCommon(projectInfo.hardCap) }} <span
                                class="token-unit">USDT</span></div>
                    </div>
                </div>
                <div class="cell cell-line">
                    <div class="cell-half">
                        <div class="cell-half-label">Launch Block:</div>
                        <div class="cell-half-value">{{ projectInfo.setupHeight }}</div>
                    </div>
                    <div class="cell-half">
                        <div class="cell-half-label">Expected Launch Time:</div>
                        <div class="cell-half-value">{{ projectInfo.deadline }}</div>
                    </div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="cell-group">
                <div class="cell cell-line">
                    <div class="cell-large-half  cell-title">My hodl</div>
                    <div class="cell-small-half cell-title-left"></div>
                </div>
                <div class="cell cell-line">
                    <div class="cell-left cell-label">Position ABC:</div>
                    <div class="cell-middle">
                        <div class="cell-number">{{ myPosition.position }}</div>
                        <i class="cell-unit">USDT</i></div>
                    <div class="cell-right ">
                        <button class="cell-button">Invest More</button>
                    </div>
                </div>
                <div class="cell cell-line">
                    <div class="cell-left cell-label">Position Value:</div>
                    <div class="cell-middle">
                        <div class="cell-number">1,234,567,890.09</div>
                        <i class="cell-unit">USDT</i></div>
                    <div class="cell-right ">
                        <button class="cell-button">Refund</button>
                    </div>
                </div>
                <div class="cell cell-line">
                    <div class="cell-left cell-label">Current Profit:</div>
                    <div class="cell-middle">
                        <div class="cell-number">{{ myPosition.profits }}</div>
                        <i class="cell-unit">USDT</i></div>
                    <div class="cell-right ">
                        <button class="cell-button">Sell</button>
                    </div>
                </div>
                <div class="cell cell-line">
                    <div class="cell-left cell-label">Invest Time:</div>
                    <div class="cell-middle">
                        <div class="cell-number">{{ myPosition.openTime }}</div>
                    </div>
                    <div class="cell-right ">
                        <van-icon class="question-o" name="question-o"/>
                    </div>
                </div>
                <div class="cell">
                    <div class="cell-left cell-label">Time Remaining:</div>
                    <div class="cell-middle">
                        <div class="cell-number">{{ projectInfo.deadline }}</div>
                    </div>
                    <div class="cell-right ">
                        <van-icon class="question-o" name="question-o"/>
                    </div>
                </div>
            </div>

            <div class="divider"></div>

            <div class="cell-group">
                <div class="cell cell-line">
                    <div class="cell-large-half  cell-title">My Guaranty</div>
                    <div class="cell-small-half cell-title-left"></div>
                </div>
                <div class="cell cell-line">
                    <div class="cell-left cell-label">Offered Amount:</div>
                    <div class="cell-middle">
                        <div class="cell-number">{{ myPosition.guarantee }}</div>
                        <i class="cell-unit">USDT</i></div>
                    <div class="cell-right ">
                        <button class="cell-button">Add More</button>
                    </div>
                </div>
                <div class="cell cell-line">
                    <div class="cell-left cell-label">Locked:</div>
                    <div class="cell-middle">
                        <div class="cell-number">1,234,567,890.09</div>
                        <i class="cell-unit">USDT</i></div>
                    <div class="cell-right ">
                        <van-icon class="question-o" name="question-o"/>
                    </div>
                </div>
                <div class="cell ">
                    <div class="cell-left cell-label">Withdrawable:</div>
                    <div class="cell-middle">
                        <div class="cell-number">1,234,567,890.09</div>
                        <i class="cell-unit">USDT</i></div>
                    <div class="cell-right ">
                        <button class="cell-button">Withdraw</button>
                    </div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="cell-group">
                <div class="cell cell-line" @click="toList(4,'USDT')">
                    <div class="cell-large-half cell-label">Guarantor List</div>
                    <div class="cell-small-half cell-page-num">{{ counts.c1 }}></div>
                </div>
                <div class="cell cell-line" @click="toList(5,'USDT')">
                    <div class="cell-large-half cell-label">Investor List</div>
                    <div class="cell-small-half cell-page-num">{{ counts.c2 }}></div>
                </div>
                <div class="cell cell-line" @click="toList(1,'USDT')">
                    <div class="cell-large-half cell-label">Guaranty Records</div>
                    <div class="cell-small-half cell-page-num">{{ counts.c3 }}></div>
                </div>
                <div class="cell cell-line" @click="toList(2,'USDT')">
                    <div class="cell-large-half cell-label">Investment Records</div>
                    <div class="cell-small-half cell-page-num">{{ counts.c4 }}></div>
                </div>
                <div class="cell" @click="toList(3,projectInfo.symbol)">
                    <div class="cell-large-half cell-label">Selling Records</div>
                    <div class="cell-small-half cell-page-num">{{ counts.c5 }}></div>
                </div>
            </div>
            <div style="height: 100px"></div>
        </div>
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
    import {IList, IOperationSlot, IPageParam, ListType, ProjectStatus, SubmitType} from "@/pgcommon/common";

    interface ILog {
        id: number
        blockHeight: number
        from: string
        amount: string
        sign: boolean
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
                symbol: "",
                token: "",
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
            const abi = inject<ContractManager>("abi", new ContractManager(""))
            const boardCss = reactive({} as BoardCss)
            onMounted(async () => {
                await getProjectInfo()
                getCounts()
                currentHeight.value = await ApiManager.GetBlockNumber()
                if (wcli != undefined && wcli.state.connector?.session.connected) {
                    account.value = wcli.state.address
                    myPosition.guarantee = await abi.GuaranteeProjectValue(account.value, projectAddr.value)
                    myPosition.inputCost = await abi.InvestProjectValue(account.value, projectAddr.value)
                    myPosition.profits = await abi.InvestProjectIncome(account.value, projectAddr.value)
                    myPosition.value = add(myPosition.inputCost, myPosition.profits)
                    myPosition.position = await abi.InvestProjectTokenAmount(account.value, projectAddr.value)
                    await myFirstInput()
                }
                let proStage = await abi.ProjectStatus(projectAddr.value)
                console.log("project status", proStage)
                switch (proStage) {
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
                    projectInfo.symbol = one.symbol
                    projectInfo.name = one.name
                    projectInfo.token = one.token
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

            const counts = reactive(
                {
                    c1: 0,
                    c2: 0,
                    c3: 0,
                    c4: 0,
                    c5: 0,
                }
            )

            function getCounts() {
                BackendApi.getCounts({
                    "project": projectAddr.value,
                    "fund": fundAddr.value,
                }).then(res => {
                    counts.c1 = res.data.guarantorListCount
                    counts.c2 = res.data.investorListCount
                    counts.c3 = res.data.guarantyRecordsCount
                    counts.c4 = res.data.investmentRecordsCount
                    counts.c5 = res.data.sellingRecordsCount
                }).catch(err => {
                        Notify({type: 'danger', message: err});
                    }
                )
            }

            function toList(typ: number, symbol: string) {
                let args: IList = {
                    Type: typ as ListType,
                    Project: projectAddr.value,
                    Symbol: symbol
                }
                let p: IPageParam = {
                    Name: "List",
                    Title: projectInfo.name,
                    Args: args,
                    NewPage: true,
                }
                context.emit("changeView", p)
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


            /*const reqLogRequest = reactive({
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
            }*/

            const active = ref(0);

            function SubmitGuarantee() {
                const params = {
                    Type: SubmitType.Guarantee,
                    Fund: fundAddr.value,
                    Project: projectAddr.value,
                    Tips: ""
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


            /* const tabClick = (name: string) => {
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
             }*/
            return {
                fundDaily, projectInfo, myPosition, currentHeight,
                counts, toList,
                buttons, active, boardCss,
                SubmitGuarantee, SubmitInvest, SubmitDisGuarantee, SubmitDisInvest, SubmitSell,

            }

        }
    })
</script>

<style scoped>
    #project-border {
        height: calc(100vh);
        overflow-y: scroll;
        overflow-x: hidden !important;
        width: 100%;
    }

    #pro-dashboard {
        width: 100%;
    }

    #pro-h1 {
        width: 100%;
        height: 30px;
        font-size: 24px;
        color: #FFFF00;
        background-color: #FFCC00;
        font-weight: bold;
        line-height: 30px;
    }

    #pro-h2 {
        height: 140px;
        text-align: center;
        width: inherit;
    }

    #pro-h2-symbol {
        font-size: 56px;
        color: #333333;
        height: 70px
    }

    #pro-h2-price {
        font-size: 20px;
        color: #333333;
        height: 20px;
        line-height: 20px;
    }

    #pro-h2-unit {
        font-size: 20px;
        color: #BCBCBC;
        height: 20px;
        display: block;
    }

    #pro-process {
        height: 30px;
        width: inherit;
        line-height: 30px;
    }

    #pro-button {
        margin-top: 10px;
        height: 80px;
        width: inherit;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        background-color: #eeeeee;
    }

    .pro-button-1 {
        margin: 10px 20px;
        background-color: #FFCC00;
        color: #333333;
        font-size: 24px;
        border: none;
        border-radius: 48px;
        display: inline-block;
        height: 60px;
        font-weight: bold;
        padding: 14px 40px;
        line-height: 24px;
    }
</style>
