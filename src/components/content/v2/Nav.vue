<template>
    <div id="dm-body">
        <div id="base-fund" @click="toFund(MDToken,'DreamDAO')">
            <div id="base-fund-name">Hatch-Tech</div>
            <div id="base-fund-percent" :style="{'color': fundInfo.color}">{{ fundInfo.percent }}</div>
            <div id="base-fund-inc" :style="{'color': fundInfo.color}">{{ fundInfo.inc }} USDT</div>
            <div id="base-mining">Mining</div>
            <div id="base-line">
                <div class="base-raw">
                    <span class="base-key">Capital Pool:</span>
                    <span class="base-val">{{ convertAmountToCommon(fundInfo.amount) }} USDT</span>
                </div>
                <div class="base-raw">
                    <span class="base-key">Total Wallets:</span>
                    <span class="base-val">{{ fundInfo.capital }}</span>
                </div>
            </div>
        </div>
        <div v-if="account!=''" class="divider-title">- - - My - - -</div>
        <div class="dm-pods" v-if="account!=''">
            <div class="dm-pod">
                <div class="dm-container" :style="{'background-color':pro.contentBGColor}" :key="index"
                     @click="toProject(pro)"
                     v-for="(pro,index) in myProjects">
                    <div class="dm-container-header"
                         :style="{'color': pro.headerColor,'background-color':pro.headerBGColor}">{{ pro.header }}
                    </div>
                    <div class="dm-container-name"
                         :style="{'color': pro.contentColor,'background-color':pro.contentBGColor}">{{ pro.name }}
                    </div>
                    <div class="dm-container-num"
                         :style="{'color': pro.contentColor,'background-color':pro.contentBGColor}">{{ pro.numTag }}
                    </div>
                    <div class="dm-container-uint"
                         :style="{'color': pro.contentColor,'background-color':pro.contentBGColor}">USDT
                    </div>
                    <div class="dm-container-footer">
                        <span class="dcf-1" :style="{'width': pro.step1 }">{{ pro.step1 }}</span>
                        <span class="dcf-2"
                              :style="{'width': pro.step2 }">{{ pro.step2 === '0%' ? '' : pro.step2 }}</span>
                        <span class="dcf-3"
                              :style="{'width': pro.step3,'color':pro.footerColor,'background-color':pro.footerBGColor}">{{
                                pro.footer === '' ? '\u00a0' : pro.footer
                            }}</span>
                    </div>
                </div>
                <div class="dm-container" v-if="reqMyPage.more" @click="getMyPage">
                    <div class="more">More
                    </div>
                </div>
            </div>
        </div>
        <div class="divider-title" v-if="account!=''">- - - Others - - -</div>
        <div class="dm-pods">
            <div class="dm-pod">
                <div class="dm-container" :key="index" :style="{'background-color':pro.contentBGColor}"
                     @click="toProject(pro)" v-for="(pro,index) in otherProjects">
                    <div class="dm-container-header"
                         :style="{'color': pro.headerColor,'background-color':pro.headerBGColor}">{{ pro.header }}
                    </div>
                    <div class="dm-container-name"
                         :style="{'color': pro.contentColor,'background-color':pro.contentBGColor}">{{ pro.name }}
                    </div>
                    <div class="dm-container-num"
                         :style="{'color': pro.contentColor,'background-color':pro.contentBGColor}">{{ pro.numTag }}
                    </div>
                    <div class="dm-container-uint"
                         :style="{'color': pro.contentColor,'background-color':pro.contentBGColor}">USDT
                    </div>
                    <div class="dm-container-footer">
                        <span class="dcf-1" :style="{'width': pro.step1 }">{{ pro.step1 }}</span>
                        <span class="dcf-2"
                              :style="{'width': pro.step2 }">{{ pro.step2 === '0%' ? '' : pro.step2 }}</span>
                        <span class="dcf-3"
                              :style="{'width': pro.step3,'color':pro.footerColor,'background-color':pro.footerBGColor}">{{
                                pro.footer === '' ? '\u00a0' : pro.footer
                            }}</span>
                    </div>
                </div>
                <div class="dm-container" v-if="reqOtherProjects.moreIcon" @click="getOtherProjects">
                    <div class="more">More
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Notify} from "vant";
    import {defineComponent, inject, onMounted, reactive, ref} from "vue";
    // eslint-disable-next-line no-unused-vars
    import {IFundArgs, IPageParam, IProjectArgs} from "@/pgcommon/common";
    import {BackendApi} from "@/chain/backendApi";
    // eslint-disable-next-line no-unused-vars
    import {WClient} from "@/chain/walletconnect";
    // eslint-disable-next-line no-unused-vars
    import {convertAmountToCommon, GetPercent, greaterThan} from "@/chain/bignumber"
    import {ContractManager} from "@/chain/erc20";
    // @ts-ignore
    import useStore from "@/store";
    import {ApiManager} from "@/chain/api";


    class ReqMyPage {
        offset: number
        more: boolean

        constructor(sign: number, off: number) {
            this.offset = off
            this.more = true
        }
    }

    interface Funds {
        name: string
        amount: string
        percent: string
        increment: string
        token: string
        color: string
    }

    interface ContainCss {
        status: string
        font: string
        bg: string
    }

    interface Project {
        token: string
        name: string
        price: string
        fundName: string
        fundToken: string
        headerFont: string
        headerColor: string
        headerBGColor: string
        contentBGColor: string
        contentColor: string
        minus: boolean
        footer: string
        footerColor: string
        footerBGColor: string
        //0:none
        //1: Profitable
        //2: Profitable but not on target
        //3: loss
        //4: break the contract
        header: string
        preStep: boolean
        step1: string // percent soft cap
        step2: string // percent hard cap
        step3: string
        numTag: string
        leftNum: string
        rightNum: string
    }

    interface ProjectOutput {
        token: string
        fundToken: string
        fundName: string
        name: string
        symbol: string
        softCap: string
        hardCap: string
        guarantee: string
        setupHeight: number
        targetPrice: string
        price: string
        minus: boolean
        status: number
    }


    export default defineComponent({
        name: "Nav",
        props: {},
        methods: {
            convertAmountToCommon,
            greaterThan
        },
        setup(props, context) {
            const store = useStore()
            const account = ref("")
            const wcli = inject<WClient>("walletConnect")
            const currentHeight = ref(0)
            const abi = inject<ContractManager>("abi", new ContractManager(""))
            const MDToken = inject<string>("makeDream", "")
            const fundInfo = reactive({
                percent: "0%",
                amount: "0",
                capital: "0",
                investors: "0",
                inc: "0",
                color: ""
            })

            const myProjects: Project[] = reactive([])
            onMounted(async () => {
                console.log("block number",await ApiManager.GetBlockNumber())
                if (wcli != undefined && store.state.connected) {
                    await wcli.walletConnectInit()
                    account.value = wcli.state.address
                    getMyPage()
                }
                fundInfo.capital = await abi.CountUsers()
                fundInfo.investors = await abi.CountInvests()
                fundInfo.amount = await abi.TotalDeposit()


                getFundIncrement()
                getOtherProjects()
                console.log("load nav", account)
            })

            function getFundIncrement() {
                BackendApi.getFundIncrement({
                        "fundToken": MDToken
                    }
                ).then(res => {
                    fundInfo.percent = res.data.percent + "%"
                    fundInfo.inc = res.data.increment
                    fundInfo.amount = res.data.amount
                    if (fundInfo.inc === "0" || fundInfo.inc === "") {
                        fundInfo.color = "#666666"
                        fundInfo.inc = "0"
                    } else if (greaterThan(fundInfo.inc, 0)) {
                        fundInfo.color = "#00EB60"
                    } else {
                        fundInfo.color = "#EC5A4C"
                    }
                })
            }

            const reqMyPage: ReqMyPage = reactive(new ReqMyPage(0, 0))

            function getMyPage() {
                if (!reqMyPage.more) {
                    return
                }
                BackendApi.getMyPageV2(
                    {
                        "account": account.value,
                        "offset": reqMyPage.offset
                    }).then(res => {
                        let projectLen = res.data.array.length
                        for (let i = 0; i < projectLen; i++) {
                            let proTmp: ProjectOutput = res.data.array[i]
                            //0:none
                            //1: Profitable
                            //2: Profitable but not on target
                            //3: loss
                            //4: break the contract
                            let cc = calcProject(proTmp, currentHeight.value)
                            myProjects.push(cc)
                        }
                        if (reqMyPage.offset === 0 && projectLen < 8) {
                            reqMyPage.more = false
                        } else if (reqMyPage.offset > 0 && projectLen < 9) {
                            reqMyPage.more = false
                        }
                        reqMyPage.offset += projectLen
                        console.log("myProject len", otherProjects.length)
                    }
                ).catch(err => {
                    Notify({type: 'danger', message: err});
                })
            }


            const reqOtherProjects = reactive({
                offset: 0,
                more: true,
                moreIcon: false
            })

            function calcProject(pro: ProjectOutput, currentHeight: number): Project {
                let tmp: Project = {
                    token: pro.token,
                    name: pro.name,
                    price: pro.price,
                    fundToken: pro.fundToken,
                    fundName: pro.fundName,
                    minus: pro.minus,
                    numTag: convertAmountToCommon(pro.price),
                    step3: "100%",
                    step1: "0%",
                    step2: "0%",
                    footer: ""

                } as Project
                console.log(pro.status, pro.token)
                switch (pro.status) {
                    case 0: {
                        tmp.preStep = true
                        let guaranteeMinus = greaterThan(pro.guarantee, 0)
                        if (guaranteeMinus === true) {
                            let percent = GetPercent(pro.guarantee, pro.hardCap)
                            if (greaterThan(pro.guarantee, pro.softCap)) {
                                let softPercent = GetPercent(pro.softCap, pro.hardCap)
                                tmp.step1 = softPercent + "%"
                                tmp.step2 = (percent - softPercent) + "%"
                            } else {
                                tmp.step1 = percent + "%"

                            }
                            tmp.step3 = (100 - percent) + "%"
                            if (percent < 25) {
                                tmp.footer = percent + "%"
                            }

                        } else {
                            tmp.footer = "0%"
                        }
                        console.log(currentHeight, tmp.token, tmp.step1, tmp.step2, tmp.step3)
                        tmp.footerBGColor = "#E4E4E4"
                        tmp.footerColor = "#FF9900"
                        tmp.preStep = true
                        tmp.headerBGColor = '#FF9900'
                        tmp.headerColor = '#FFFF00'
                        if (greaterThan(currentHeight, pro.setupHeight)) {
                            tmp.header = "Waiting List";
                        } else {

                            if (guaranteeMinus) {
                                tmp.header = "Ongoing"
                                tmp.headerColor = '#FF9900'
                                tmp.headerBGColor = '#FFFF00'
                            } else {
                                tmp.header = "To be guaranteed"
                            }
                        }
                        tmp.numTag = convertAmountToCommon(pro.softCap) + '/' + convertAmountToCommon(pro.hardCap)
                        break
                    }
                    case 1:
                        tmp.header = "盈利";
                        tmp.price = pro.price
                        tmp.contentBGColor = '#008000'
                        tmp.headerColor = '#333333'
                        tmp.headerBGColor = '#008000'
                        tmp.footerBGColor = "#008000"
                        tmp.footerColor = "#333333"
                        break
                    case 2:
                        tmp.header = "未达预期";
                        tmp.price = pro.price
                        tmp.contentBGColor = '#FFFF00'
                        tmp.headerColor = '#333333'
                        tmp.headerBGColor = '#FFFF00'
                        tmp.footerBGColor = "#FFFF00"
                        tmp.footerColor = "#333333"
                        break
                    case 3:
                        tmp.header = "亏损";
                        tmp.price = pro.price
                        tmp.contentBGColor = '#FF0000'
                        tmp.headerColor = '#333333'
                        tmp.headerBGColor = '#FF0000'
                        tmp.footerBGColor = "#FF0000"
                        tmp.footerColor = "#333333"
                        break
                    case 4:
                        tmp.header = "违约";
                        tmp.price = pro.price
                        tmp.contentBGColor = '#000000'
                        tmp.contentColor = "#FFFFFF"
                        tmp.headerColor = '#FFFFFF'
                        tmp.headerBGColor = '#000000'
                        tmp.footerBGColor = "#000000"
                        tmp.footerColor = "#FFFFFF"

                        break
                    default:
                        break
                }
                if (pro.status > 0) {
                    tmp.footer = "Trust HatchDAO"
                    tmp.footerColor = '#BCBCBC'
                }
                return tmp
            }


            const otherProjects: Project[] = reactive([])

            function getOtherProjects() {
                BackendApi.getOtherProjectsV2({
                    "account": account.value,
                    "offset": reqOtherProjects.offset
                }).then(res => {
                    let projectLen = res.data.array.length
                    for (let i = 0; i < projectLen; i++) {
                        let proTmp = res.data.array[i]
                        //0:none
                        //1: Profitable
                        //2: Profitable but not on target
                        //3: loss
                        //4: break the contract
                        let cc = calcProject(proTmp, currentHeight.value)
                        otherProjects.push(cc)
                    }
                    if (reqOtherProjects.offset === 0 && projectLen < 8) {
                        reqOtherProjects.more = false
                    } else if (reqOtherProjects.offset > 0 && projectLen < 9) {
                        reqOtherProjects.more = false
                    } else {
                        reqOtherProjects.moreIcon = true
                    }
                    reqOtherProjects.offset += projectLen
                    console.log("otherProject len", otherProjects.length)
                }).catch(err => {
                        Notify({type: 'danger', message: err});
                    }
                )
            }

            function toFund(fundAddr: string, fundName: string) {
                let args: IFundArgs = {
                    FundAddress: fundAddr,
                }
                let p: IPageParam = {
                    Name: "Fund",
                    Title: fundName,
                    Args: args,
                    NewPage: true,
                }
                changeView(p)
            }

            function toProject(pro: Project) {
                let args: IProjectArgs = {
                    ProjectAddress: pro.token,
                    FundAddress: pro.fundToken,
                }
                let p: IPageParam = {
                    Name: "Project",
                    Title: pro.name,
                    Args: args,
                    NewPage: true,
                }
                changeView(p)
            }

            function changeView(p: IPageParam) {
                context.emit("changeView", p)
            }

            return {
                account,
                toFund,
                toProject,
                getMyPage, getOtherProjects,
                fundInfo,
                MDToken,
                otherProjects, myProjects,
                reqOtherProjects, reqMyPage,
            }
        }
    })

</script>

<style scoped>
    #dm-body {
        position: relative;
        height: calc(100vh - 300px);
        overflow-y: scroll;
        overflow-x: hidden;
        background-color: #F2F2F2;
        padding-bottom: 200px;
    }

    .divider-title {
        height: 30px;
        margin: 0px 10px;
        font-size: 20px;
        line-height: 60px;
        color: #797979;
        font-weight: bold;
    }

    #base-fund {
        position: relative;
        height: 260px;
        background-color: #F2F2F2;

    }

    #base-fund-name {
        position: relative;
        color: #333333;
        font-size: 54px;
        top: 28px;
        font-weight: bold;
    }

    #base-fund-percent {
        position: relative;
        height: 24px;
        font-size: 24px;
        line-height: 24px;
        top: 36px;
        font-family: PingFangSC;
        font-weight: bold;
    }

    #base-fund-inc {
        font-size: 24px;
        position: relative;
        top: 36px;
        font-family: PingFangSC;
        font-weight: 500;
    }

    #base-line {
        font-size: 24px;
        color: #333333;
        position: absolute;
        top: 180px;
        width: 100%;
    }

    .base-raw {
        position: relative;
        height: 32px;
    }

    .base-key {
        position: absolute;
        left: 40px;
    }

    .base-val {
        position: absolute;
        right: 40px;
    }

    #base-mining {
        width: 160px;
        height: 60px;
        background-color: #FFCC00;
        color: #333333;
        font-size: 24px;
        font-weight: bold;
        font-family: PingFangSC;
        border-radius: 48px;
        position: absolute;
        right: 40px;
        line-height: 60px;
        top: 110px;
    }

    .dm-pods {
        position: relative;
        top: 16px;
        z-index: 600;
    }

    .dm-pod {
        background-color: #F2F2F2;
        width: 100%;
        margin: auto;
        padding: 18px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .dm-container {
        margin: calc((100% - 636px) / 6);
        width: 200px;
        height: 200px;
        position: relative;
        background-color: #FFFFFF;
    }

    .dm-container-header {
        position: absolute;
        top: 0px;
        height: 30px;
        width: 100%;
        font-size: 20px;
        font-family: PingFangSC;
        background-color: #FFCC00;
        color: #FFFF00;
    }

    .dm-container-name {
        font-size: 56px;
        font-weight: bold;
        color: #333333;
        margin-top: 30px;
    }

    .dm-container-num {
        font-size: 20px;
        font-family: PingFangSC;
        font-weight: bold;
        color: #333333;
    }

    .dm-container-uint {
        font-size: 20px;
        font-family: PingFangSC;
        font-weight: bold;
        color: #333333;
    }


    .dm-container-footer {
        margin-top: 4px;
        height: 30px;
        width: 100%;
        font-size: 20px;
        font-family: PingFangSC;
    }

    .dcf-1 {
        display: inline-block;
        background-color: #FF9900;
        color: #FFFF00;
        height: 30px;
        padding: 0;
        margin: 0;
    }

    .dcf-2 {
        display: inline-block;
        background-color: #FFFF00;
        color: #FF9900;
        height: 30px;
        padding: 0;
        margin: 0;
    }

    .dcf-3 {
        display: inline-block;
        height: 30px;
        padding: 0;
        margin: 0;
    }


    .more {
        font-size: 26px;
        font-weight: bold;
        line-height: 180px;
        margin-right: 10px;
        color: #FF9900;
    }

</style>
