<template>
    <div id="fund-border" class="infinite-list" v-infinite-scroll="getProjectsByFund" style="overflow:auto">
        <div id="fund-info">
            <div id="color-border" :style="{'background-color':dailyFund.color}">
                <img id="fund-bg" src="/img/2x/fund-bg.png"/>
                <div id="daily-percent">{{ dailyFund.percent }}</div>
                <div id="daily-inc">{{ dailyFund.inc }} ETH</div>
                <div id="cb-bottom">
                    <div class="cb-flex">
                        <div class="cb-flex-1">{{ FundInfo.totalDeposit }}</div>
                        <div class="cb-flex-2">ETH</div>
                    </div>
                    <div class="cb-flex">
                        <div class="cb-flex-1">{{ FundInfo.countInvests }}</div>
                        <div class="cb-flex-2">investors</div>
                    </div>
                    <div class="cb-flex">
                        <div class="cb-flex-1">{{ FundInfo.countProjects }}</div>
                        <div class="cb-flex-2">startups</div>
                    </div>
                    <div class="cb-flex">
                        <div class="cb-flex-1">{{ FundInfo.countFunds }}</div>
                        <div class="cb-flex-2">funds</div>
                    </div>
                </div>
            </div>
            <div id="fund-method">
                <div id="fund-owner">
                    <div id="fund-owner2">
                        <div id="fm-left">
                            <div class="fm-left-span">
                                <img class="fm-left-icon" src="/img/2x/ficon1.png">
                                <div class="fm-left-label">余&nbsp;&nbsp;&nbsp;额:</div>
                                <div class="fm-left-val">{{ convertAmountToCommon(MyDeposit.all) }} ETH</div>
                            </div>
                            <div class="fm-left-span">
                                <img class="fm-left-icon" src="/img/2x/ficon1.png">
                                <div class="fm-left-label">可提现:</div>
                                <div class="fm-left-val">{{ convertAmountToCommon(MyDeposit.unlock) }} ETH</div>
                            </div>
                            <div class="fm-left-span">
                                <img class="fm-left-icon" src="/img/2x/ficon1.png">
                                <div class="fm-left-label">锁定量:</div>
                                <div class="fm-left-val">{{ convertAmountToCommon(MyDeposit.lock) }} ETH</div>
                            </div>
                        </div>
                        <div id="fm-right">
                            <button @click="SubmitSaveETH">
                                <div class="bt-cnt">ETH存入</div>
                            </button>
                            <button @click="SubmitWithdrawETH">
                                <div class="bt-cnt">ETH提现</div>
                            </button>
                            <button @click="SubmitWithdrawToken">
                                <div class="bt-cnt">AAA提现</div>
                            </button>
                        </div>
                    </div>
                </div>
                <button id="invest-bt" @click="toCreateProject">融资申请</button>
            </div>
        </div>
        <div id="project-list">
            <div :key="index" class="infinite-list-item" @click="toProject(pro.token,pro.symbol)"
                 v-for="(pro,index) in projects">
                <div class="pro-border">
                    <div class="pro-line"></div>
                    <div class="pro-star"></div>
                    <div class="pro-name">
                        <div>{{ pro.name }}</div>
                    </div>
                    <div class="pro-info">
                        <div class="pro-info-left">
                            <div>
                                <div class="pro-info-title">Invest Price</div>
                                <div class="pro-info-val">{{ convertAmountToCommon(pro.price) }} ETH</div>
                            </div>
                            <div>
                                <div class="pro-info-title">Target Price</div>
                                <div class="pro-info-val">{{ convertAmountToCommon(pro.targetPrice) }} ETH</div>
                            </div>
                            <div>
                                <div class="pro-info-title">Launch Block</div>
                                <div class="pro-info-val">{{ pro.setupHeight }}</div>
                            </div>
                        </div>
                        <div class="pro-info-right">
                            <div>
                                <div class="pro-info-title">Soft-Hard Price</div>
                                <div class="pro-info-val"> {{
                                        convertAmountToCommon(pro.softCap) + " - " + convertAmountToCommon(pro.hardCap)
                                    }} ETH
                                </div>
                            </div>
                            <div>
                                <div class="pro-info-title">Guarantee</div>
                                <div class="pro-info-val">{{ convertAmountToCommon(pro.guarantee) }} ETH</div>
                            </div>
                            <div>
                                <div class="pro-info-title">Launch Time</div>
                                <div class="pro-info-val">{{ pro.deadline }}</div>
                            </div>
                        </div>
                        <div class="pro-info-border" :style="{'background-color':pro.stageColor}">
                            <div class="pro-info-bt">
                                {{ pro.stageFont }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--   <div id="fi-desc">
               <div>{{ FundInfo.countUsers }} users</div>
               <div>{{ FundInfo.countInvests }} investors</div>
               <div>{{ FundInfo.countProjects }} startups</div>
               <div>{{ FundInfo.countFunds }} funds</div>
               <div>{{ FundInfo.totalFundsToken }} token</div>
           </div>-->

        <!--<div id="fi-amount" v-if="Login">
            <div>余 额： {{ convertAmountToCommon(MyDeposit.all) }} {{ MyDeposit.symbol }}</div>
            <div>可提现： {{ convertAmountToCommon(MyDeposit.unlock) }} {{ MyDeposit.symbol }}</div>
            <div>锁定量： {{ MyDeposit.lock }} {{ MyDeposit.symbol }}</div>
        </div>-->

        <!--       <div id="fi-fund-token" v-if="Login">
                   <div>基金余额： {{ convertAmountToCommon(MyFundToken.all, MyFundToken.decimals) }}
                       {{ MyFundToken.symbol }}
                   </div>
                   <div>基金可提现： {{ convertAmountToCommon(MyFundToken.withdraw, MyFundToken.decimals) }}
                       {{ MyFundToken.symbol }}
                   </div>
                   <div>基金解锁数： {{ convertAmountToCommon(MyFundToken.unlock, MyFundToken.decimals) }}
                       {{ MyFundToken.symbol }}
                   </div>
               </div>-->


    </div>
</template>

<script lang="ts">
    import {defineComponent, inject, onMounted, reactive, ref} from "vue";
    import {ContractManager} from "@/chain/erc20";
    // eslint-disable-next-line no-unused-vars
    import {IDialogSlot, IFundArgs, IOperationSlot, IPageParam, IProjectArgs, SubmitType} from "../../pgcommon/common";
    // eslint-disable-next-line no-unused-vars
    import {WClient} from "@/chain/walletconnect";
    import {convertAmountToCommon, greaterThan} from "@/chain/bignumber"
    import {BackendApi} from "@/chain/backendApi";
    // eslint-disable-next-line no-unused-vars
    import {Notify} from "vant";

    interface Project {
        name: string
        symbol: string
        token: string
        stage: number
        stageFont: string
        stageColor: string
        price: string
        targetPrice: string
        softCap: string
        hardCap: string
        guarantee: string
        guaranteePercent: string // tmp
        setupHeight: number
        deadline: number //tmp = ( setupHeight - currentHeight ) * 10s
    }

    export default defineComponent({
        name: "Fund",
        components: {},
        methods: {
            convertAmountToCommon,
            greaterThan,
        },
        setup(props, context) {
            const wcli = inject<WClient>("walletConnect")
            const fundAddr = inject("fund", ref(""))
            const FundInfo = reactive({
                totalDeposit: "0",
                countUsers: "0",
                countInvests: "0",
                countProjects: "0",
                countFunds: "0",
                totalFundsToken: "0",
            })
            const account = ref("")
            const Login = ref(false)
            const MyDeposit = reactive({
                all: "0",
                unlock: "",
                lock: ""
            })
            const MyFundToken = reactive({
                all: "0",
                unlock: "0",
                withdraw: "0",
                decimals: 0,
                symbol: "",
            })


            onMounted(async () => {
                const abi = new ContractManager(fundAddr.value)
                if (wcli != undefined) {
                    Login.value = true
                    account.value = wcli.state.address
                    let myDeposit = await abi.MyDeposit(account.value)
                    let myFundToken = await abi.MyFundTokenAmount(account.value)
                    MyDeposit.all = myDeposit.All
                    MyDeposit.lock = myDeposit.Lock
                    MyDeposit.unlock = myDeposit.Unlock

                    MyFundToken.withdraw = myFundToken.Withdraw
                    MyFundToken.all = myFundToken.All
                    MyFundToken.decimals = myFundToken.Decimals
                    MyFundToken.symbol = myFundToken.Symbol
                    MyFundToken.unlock = myFundToken.Unlock

                }
                getProjectsByFund()
                FundInfo.totalDeposit = await abi.TotalDeposit()
                FundInfo.countUsers = await abi.CountUsers()
                FundInfo.countInvests = await abi.CountInvests()
                FundInfo.countProjects = await abi.CountProjects()
                FundInfo.totalFundsToken = await abi.TotalFundToken()
                getDailyFund()

            })


            const dailyFund = reactive({
                inc: "0",
                percent: "0%",
                color: "",
            })

            function getDailyFund() {
                BackendApi.getDailyFund({
                    "fund": fundAddr.value,
                }).then(res => {
                        dailyFund.inc = res.data.increment
                        dailyFund.percent = res.data.percent
                        if (dailyFund.inc === "0" || dailyFund.inc === "") {
                            dailyFund.color = "#666666"
                        } else if (greaterThan(dailyFund.inc, 0)) {
                            dailyFund.color = "#00EB60"
                        } else {
                            dailyFund.color = "#EC5A4C"
                        }
                    }
                ).catch(err => {
                    Notify({type: 'danger', message: err});
                })
            }

            // get
            const reqProjectsByFund = reactive({
                pageIndex: 1,
                pageSize: 5,
                more: true,
            })


            const projects: Project[] = reactive([])

            function getProjectsByFund() {
                if (reqProjectsByFund.more === false) {
                    return
                }
                BackendApi.getProjectsByFund({
                    "fund": fundAddr.value,
                    "pageIndex": reqProjectsByFund.pageIndex,
                    "pageSize": reqProjectsByFund.pageSize,
                }).then(res => {
                    let projectLen = res.data.array.length
                    for (let i = 0; i < projectLen; i++) {
                        let proTmp = res.data.array[i]
                        // 1:guarantee 2:invest 3:over
                        let stageFont = ""
                        let stageColor = ""
                        switch (proTmp.stage) {
                            case 1:
                            case 3:
                                stageFont = "担保"
                                // background-image: ;
                                stageColor = "#EC5A4C"
                                break
                            case 2:
                                stageFont = "投资"
                                stageColor = "#00EB60"
                                break
                            default:
                                stageFont = "结束"
                                stageColor = "#666666"
                                break
                        }
                        let p = {
                            name: proTmp.name,
                            symbol: proTmp.symbol,
                            token: proTmp.token,
                            stage: proTmp.stage,
                            stageFont: stageFont,
                            stageColor: stageColor,
                            price: proTmp.price === "" ? "0" : proTmp.price,
                            softCap: proTmp.softCap === "" ? "0" : proTmp.softCap,
                            hardCap: proTmp.hardCap === "" ? "0" : proTmp.hardCap,
                            guarantee: proTmp.guarantee === "" ? "0" : proTmp.guarantee,
                            guaranteePercent: "0", // tmp
                            targetPrice: proTmp.targetPrice === "" ? "0" : proTmp.targetPrice,
                            setupHeight: proTmp.setupHeight,
                            deadline: 0 //tmp = ( setupHeight - currentHeight ) * 10s
                        } as Project
                        projects.push(p)
                    }
                    if (projectLen === 0) {
                        reqProjectsByFund.more = false
                    }
                    reqProjectsByFund.pageIndex += 1
                    console.log("load other projects over")
                }).catch(err => {
                        Notify({type: 'danger', message: err});
                    }
                )
            }

            // create new project
            function toCreateProject() {
                if (!greaterThan(MyDeposit.all, 0)) {
                    dialog({
                        Title: "提示",
                        Content: '当前非fund成员，需要往fund中存入任意数量的ETH成为fund成员'
                    })
                    return
                }
                let args: IFundArgs = {
                    FundAddress: fundAddr.value,
                }
                let p: IPageParam = {
                    Name: "CreateProject",
                    Title: "融资申请",
                    Args: args,
                    NewPage: true,
                }
                context.emit("changeView", p)
            }

            function toProject(token: string, symbol: string) {
                let args: IProjectArgs = {
                    ProjectAddress: token,
                    FundAddress: fundAddr.value,
                }

                let p: IPageParam = {
                    Name: "Project",
                    Title: symbol,
                    Args: args,
                    NewPage: true,
                }
                context.emit("changeView", p)
            }

            // account fund method
            function SubmitSaveETH() {
                const params = {
                    Type: SubmitType.Save,
                    Fund: fundAddr.value,
                    Project: "",
                } as IOperationSlot
                emit(params)
            }

            function SubmitWithdrawETH() {
                let limit = convertAmountToCommon(MyDeposit.unlock)
                const params = {
                    Type: SubmitType.WithDraw,
                    Fund: fundAddr.value,
                    Project: "",
                    Limit: limit,
                    Tips: "最大可提现金额: " + limit + " ETH"
                } as IOperationSlot
                emit(params)
            }

            function SubmitWithdrawToken() {
                let limit = convertAmountToCommon(MyFundToken.unlock)
                const params = {
                    Type: SubmitType.WithDrawFundToken,
                    Fund: fundAddr.value,
                    Project: "",
                    Limit: limit,
                    Tips: "最大可提现金额: " + limit + " DreamDAO"
                } as IOperationSlot
                emit(params)
            }

            function SubmitToProject(p: Project) {
                let type = SubmitType.Guarantee
                // 1：guarantee 2:invest 3:over
                switch (p.stage) {
                    case 1:
                        type = SubmitType.Guarantee;
                        break
                    case 2:
                        type = SubmitType.Invest;
                        break
                    case 3:
                        Notify({type: 'danger', message: "不支持此种类型"});
                        return

                }

                let limit = "none"
                const params = {
                    Type: type,
                    Fund: fundAddr.value,
                    Project: p.token,
                    Limit: limit,
                } as IOperationSlot
                emit(params)
            }

            function emit(p: IOperationSlot) {
                context.emit("openOperation", p)
            }

            function dialog(p: IDialogSlot) {
                context.emit("openDialog", p)
            }

            return {
                FundInfo,
                SubmitSaveETH,
                SubmitWithdrawETH,
                SubmitWithdrawToken,
                SubmitToProject,
                reqProjectsByFund,
                getProjectsByFund,
                toCreateProject, toProject,
                MyDeposit,
                MyFundToken,
                Login,
                projects,
                dailyFund
            }
        }
    })

</script>

<style scoped>
    #fund-border {
        height: calc(100vh - 300px - 200px);
        overflow-y: scroll;
        overflow-x: hidden !important;
        width: 100%;
        padding-bottom: 200px;
    }

    #fund-info {
    }

    #color-border {
        position: relative;
        height: 274px;
    }

    #daily-percent {
        font-family: PingFangSC;
        font-size: 64px;
        color: white;
        position: relative;
        top: 26px;
    }

    #daily-inc {
        font-family: PingFangSC;
        font-size: 32px;
        color: white;
        position: relative;
        top: 18px;
    }

    #cb-bottom {
        position: absolute;
        width: 100%;
        height: 100px;
        bottom: 0px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding-left: 44px;
        padding-right: 44px;

    }

    .cb-flex {
        width: 165px;
        margin: 0;
        text-align: center;
    }

    .cb-flex-1 {
        font-family: PingFangSC;
        font-size: 24px;
        color: white;
        font-weight: bold;
        height: 24px;
    }

    .cb-flex-2 {
        height: 24px;
        font-family: PingFangSC;
        font-size: 24px;
        color: white;
        font-weight: bold;
    }

    #fund-bg {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
    }

    #fund-method {
        height: 304px;
    }

    #fund-owner {
        height: 222px;
        width: 660px;
        margin: auto;
        background: white;
        position: relative;
        border-radius: 40px;
        position: relative;
        top: -36px;
        box-shadow: 0px 6px 6px rgba(0, 0, 0, .1);
    }

    #fund-owner2 {
        background-image: url("/img/2x/fund-logo.png");
        background-size: 100% 100%;
        height: inherit;
        position: absolute;
        width: inherit;
    }

    #fm-left {
        width: 400px;
        margin-top: 36px;
        height: 150px;
    }

    .fm-left-span {
        height: 24px;
        position: relative;
        margin-bottom: 32px;
    }

    .fm-left-icon {
        width: 36px;
        position: absolute;
        left: 64px;
    }

    .fm-left-label {
        position: absolute;
        left: 110px;
        font-family: PingFangSC;
        font-size: 24px;
        top: 3px;
        margin-left: 3px;
    }

    .fm-left-val {
        font-family: PingFangSC;
        font-size: 24px;
        position: absolute;
        left: 200px;
        top: 3px;
        margin-left: 6px;
    }

    #fm-right {
        position: absolute;
        width: 200px;
        right: 32px;
        top: 24px;

    }

    #fm-right button {
        height: 42px;
        width: 200px;
        border: 0px;
        background: rgba(54, 128, 255, 0.1);
        color: #666666;
        font-size: 26px;
        font-family: PingFangSC;
        font-weight: 400;
        box-shadow: 0px 6px 6px rgba(0, 0, 0, .1);
        border-radius: 10px;
        margin-bottom: 10px;
    }

    #invest-bt {
        width: 660px;
        height: 80px;
        background-color: #3682FF;
        color: white;
        border: none;
        font-family: PingFangSC;
        font-size: 40px;
        border-radius: 10px;
    }

    .pro-border {
        height: 240px;
        width: 660px;
        margin: 20px auto;
        position: relative;
    }

    .pro-line {
        width: 2px;
        height: inherit;
        background-image: linear-gradient(to bottom, #cccccc 0%, #cccccc 50%, transparent 50%);
        background-size: 3px 18px;
        background-repeat: repeat;
    }

    .pro-star {
        position: absolute;
        background-image: url("/img/2x/star-r.png");
        top: 110px;
        left: -8px;
        height: 20px;
        width: 20px;
        background-size: 100% 100%;
    }

    .pro-name {
        font-family: PingFangSC;
        width: 110px;
        height: inherit;
        position: absolute;
        top: 99px;
        left: 10px;
        word-break: break-all;
        font-size: 30px;
        font-weight: 900;
        color: #3682FF;

    }

    .pro-info {
        position: absolute;
        right: 0px;
        top: 0px;
        width: 520px;
        height: 240px;
        border-radius: 40px;
        box-shadow: 0px 6px 6px rgba(0, 0, 0, .1);
    }

    .pro-info-left > div:nth-child(odd) {
        background-image: url("/img/2x/proba1.png");
        background-size: 100% 100%;
    }

    .pro-info-left > div:nth-child(even) {
        background-image: url("/img/2x/proba2.png");
        background-size: 100% 100%;
    }

    .pro-info-left {
        width: 200px;
        border: none;
    }

    .pro-info-right {
        width: 200px;
        position: absolute;
        top: 0px;
        left: 200px;
        border: none;
    }

    .pro-info-right > div:nth-child(even) {
        background-image: url("/img/2x/probb2.png");
        background-size: 100% 100%;
    }

    .pro-info-right > div:nth-child(odd) {
        background-image: url("/img/2x/probb1.png");
        background-size: 100% 100%;
    }

    .pro-info-title {
        padding-top: 10px;
        font-family: PingFangSC;
        color: #333333;
        width: 200px;
        font-size: 24px;
        font-weight: bold;
        height: 30px;
        text-align: left;
        padding-left: 30px;
    }

    .pro-info-val {
        font-family: PingFangSC;
        font-size: 20px;
        line-height: 12px;
        width: 200px;
        height: 32px;
        text-align: left;
        padding-top: 8px;
        padding-left: 30px;
        z-index: 100;
    }

    .pro-info-border {
        height: 100px;
        width: 100px;
        border-radius: 10px;
        position: absolute;
        top: 70px;
        right: 14px;
    }

    .pro-info-bt {
        background: url("/img/2x/bt-pro.png") no-repeat bottom;
        background-size: 100% auto;
        width: inherit;
        height: inherit;
        line-height: 100px;
        color: white;
        font-size: 40px;
        font-family: PingFangSC;
        border-radius: 10px;
        z-index: 200;
    }

    /* #project-list {
         height: calc(100vh - 878px);
         overflow: scroll;
     }*/
</style>
