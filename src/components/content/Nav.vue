<template>
    <div id="dm-body">
        <div id="bg"></div>
        <div id="dm-pods">
            <div class="dm-pod">
                <div id="dm-container" @click="toFund(MDToken,'DreamDAO')">
                    <div class="fund-name">DreamDAO</div>
                    <div class="fund-percent" style="color: #00EB60">+10%</div>
                    <div class="fund-inc" style="color: #00EB60">0.123311</div>
                    <div class="fund-amount">{{ convertAmountToCommon(dreamDao.amount) }}</div>
                    <div class="fund-uint">ETH</div>
                </div>
                <div class="fund-container" @click="toFund('fx1231231a','MyFund-Fund')">
                    <div class="fund-src">Fund</div>
                    <div class="fund-name">ABE</div>
                    <div class="fund-percent" style="color: #EC5A4C">+10%</div>
                    <div class="fund-inc" style="color: #EC5A4C">0.123311</div>
                    <div class="fund-amount">1299999</div>
                    <div class="fund-uint">ETH</div>
                </div>
                <div class="fund-container" @click="toFund('fx1231231a','MyFund-Fund')">
                    <div class="fund-src">Fund</div>
                    <div class="fund-name">ABE</div>
                    <div class="fund-percent">+10%</div>
                    <div class="fund-inc">0.123311</div>
                    <div class="fund-amount">1299999</div>
                    <div class="fund-uint">ETH</div>
                </div>
                <div class="fund-container" @click="toFund('fx1231231a','MyFund-Fund')">
                    <div class="fund-src">Fund</div>
                    <div class="fund-name">ABE</div>
                    <div class="fund-percent">+10%</div>
                    <div class="fund-inc">0.123311</div>
                    <div class="fund-amount">1299999</div>
                    <div class="fund-uint">ETH</div>
                </div>

                <div class="fund-container"
                     :style="{'background-image' : pro.bg, 'background-size': '100% 100%'}"
                     :key="index" v-for="(pro,index) in myProjects"
                     @click="toProject(pro)">
                    <div class="pro-name"> {{ pro.name }}</div>
                    <div class="pro-price" :style="{'color':pro.font}">{{ convertAmountToCommon(pro.price) }}</div>
                    <div class="pro-uint">ETH</div>
                    <div class="pro-state" :style="{'color':pro.status==='违约'?'white':'#666666'}">{{ pro.status }}</div>
                    <div class="pro-fund">{{ pro.fundName }}DreamDAO</div>
                </div>

                <!-- <div class="fund-container dm-pro" @click="toProject('px12312301','MyProject-Fund')">
                     <div class="pro-name">AAA</div>
                     <div class="pro-price">9.6</div>
                     <div class="pro-uint">ETH</div>
                     <div class="pro-state">盈利</div>
                     <div class="pro-fund">DreamDAO</div>
                 </div>
                 <div class="fund-container dm-pro" @click="toProject('px12312301','MyProject-Fund')">
                     <div class="pro-name">AAA</div>
                     <div class="pro-price">9.6</div>
                     <div class="pro-uint">ETH</div>
                     <div class="pro-state">盈利</div>
                     <div class="pro-fund">DreamDAO</div>
                 </div>
                 <div class="fund-container dm-pro" @click="toProject('px12312301','MyProject-Fund')">
                     <div class="pro-name">AAA</div>
                     <div class="pro-price">9.6</div>
                     <div class="pro-uint">ETH</div>
                     <div class="pro-state">盈利</div>
                     <div class="pro-fund">DreamDAO</div>
                 </div>
                 <div class="fund-container dm-pro" @click="toProject('px12312301','MyProject-Fund')">
                     <div class="pro-name">AAA</div>
                     <div class="pro-price">9.6</div>
                     <div class="pro-uint">ETH</div>
                     <div class="pro-state">盈利</div>
                     <div class="pro-fund">DreamDAO</div>
                 </div>-->
                <div class="fund-container">
                    <div class="more">More
                        <van-icon class="more-icon" name="play"/>
                    </div>
                </div>
            </div>
            <van-divider dashed>other Funds</van-divider>
            <div class="dm-pod">
                <div class="fund-container" @click="toFund('fx1231231a','MyFund-Fund')">
                    <div class="fund-src">Fund</div>
                    <div class="fund-name">ABE</div>
                    <div class="fund-percent">+10%</div>
                    <div class="fund-inc">0.123311</div>
                    <div class="fund-amount">1299999</div>
                    <div class="fund-uint">ETH</div>
                </div>
                <div class="fund-container" @click="toFund('fx1231231a','MyFund-Fund')">
                    <div class="fund-src">Fund</div>
                    <div class="fund-name">ABE</div>
                    <div class="fund-percent">+10%</div>
                    <div class="fund-inc">0.123311</div>
                    <div class="fund-amount">1299999</div>
                    <div class="fund-uint">ETH</div>
                </div>
                <div class="fund-container" @click="toFund('fx1231231a','MyFund-Fund')">
                    <div class="fund-src">Fund</div>
                    <div class="fund-name">ABE</div>
                    <div class="fund-percent">+10%</div>
                    <div class="fund-inc">0.123311</div>
                    <div class="fund-amount">1299999</div>
                    <div class="fund-uint">ETH</div>
                </div>
                <div class="fund-container" @click="toFund('fx1231231a','MyFund-Fund')">
                    <div class="fund-src">Fund</div>
                    <div class="fund-name">ABE</div>
                    <div class="fund-percent">+10%</div>
                    <div class="fund-inc">0.123311</div>
                    <div class="fund-amount">1299999</div>
                    <div class="fund-uint">ETH</div>
                </div>
                <div class="fund-container" @click="toFund('fx1231231a','MyFund-Fund')">
                    <div class="fund-src">Fund</div>
                    <div class="fund-name">ABE</div>
                    <div class="fund-percent">+10%</div>
                    <div class="fund-inc">0.123311</div>
                    <div class="fund-amount">1299999</div>
                    <div class="fund-uint">ETH</div>
                </div>
                <div class="fund-container" @click="toFund('fx1231231a','MyFund-Fund')">
                    <div class="fund-src">Fund</div>
                    <div class="fund-name">ABE</div>
                    <div class="fund-percent">+10%</div>
                    <div class="fund-inc">0.123311</div>
                    <div class="fund-amount">1299999</div>
                    <div class="fund-uint">ETH</div>
                </div>
                <div class="fund-container" @click="toFund('fx1231231a','MyFund-Fund')">
                    <div class="fund-src">Fund</div>
                    <div class="fund-name">ABE</div>
                    <div class="fund-percent">+10%</div>
                    <div class="fund-inc">0.123311</div>
                    <div class="fund-amount">1299999</div>
                    <div class="fund-uint">ETH</div>
                </div>
                <div class="fund-container" @click="toFund('fx1231231a','MyFund-Fund')">
                    <div class="fund-src">Fund</div>
                    <div class="fund-name">ABE</div>
                    <div class="fund-percent">+10%</div>
                    <div class="fund-inc">0.123311</div>
                    <div class="fund-amount">1299999</div>
                    <div class="fund-uint">ETH</div>
                </div>
                <div class="fund-container">
                    <div class="more">More
                        <van-icon class="more-icon" name="play"/>
                    </div>
                </div>
            </div>
            <van-divider dashed>other Startup</van-divider>
            <div class="dm-pod">
                <div class="fund-container"
                     :style="{'background-image' : pro.bg, 'background-size': '100% 100%'}"
                     :key="index" v-for="(pro,index) in otherProjects"
                     @click="toProject(pro)">
                    <div class="pro-name"> {{ pro.name }}</div>
                    <div class="pro-price" :style="{'color':pro.font}">{{ convertAmountToCommon(pro.price) }}</div>
                    <div class="pro-uint">ETH</div>
                    <div class="pro-state" :style="{'color':pro.status==='违约'?'white':'#666666'}">{{ pro.status }}</div>
                    <div class="pro-fund">{{ pro.fundName }}DreamDAO</div>
                </div>
                <div class="fund-container" v-if="reqOtherProjects.more" @click="getOtherProjects">
                    <div class="more">More
                        <van-icon class="more-icon" name="play"/>
                    </div>
                </div>
            </div>
            <div style="height: 30px"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Notify} from "vant";
    import {defineComponent, inject, onMounted, reactive, ref} from "vue";
    // eslint-disable-next-line no-unused-vars
    import {IFundArgs, IPageParam, IProjectArgs} from "../../pgcommon/common";
    import {BackendApi} from "../../chain/backendApi";
    // eslint-disable-next-line no-unused-vars
    import {WClient} from "../../chain/walletconnect";
    import {convertAmountToCommon} from "@/chain/bignumber"

    class ReqMyPage {
        sign: number
        offset: number
        more: boolean

        constructor(sign: number, off: number) {
            this.sign = sign
            this.offset = off
            this.more = true
        }
    }

    interface Funds {
        name: string
        amount: string
        percent: number
        increment: string

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
        css: string

        //0:none
        //1: Profitable
        //2: Profitable but not on target
        //3: loss
        //4: break the contract
        status: string
    }


    export default defineComponent({
        name: "Nav",
        props: {},
        methods: {
            convertAmountToCommon
        },
        setup(props, context) {
            const account = ref("")
            const MDToken = inject<string>("makeDream", "")
            const wcli = inject<WClient>("walletConnect")


            const myFunds: Funds[] = []
            const dreamDao = reactive({amount: "0"})
            //const myFunds = reactive({list: []})

            const myProjects: Project[] = reactive([])
            onMounted(() => {
                if (wcli != undefined) {
                    account.value = wcli.state.address
                    getMyPage()
                    getOtherProjects()
                }

                console.log("load nav")
            })


            const reqMyPage: ReqMyPage = new ReqMyPage(0, 0)

            function getMyPage() {
                if (!reqMyPage.more) {
                    return
                }
                BackendApi.getMyPage(
                    {
                        "account": account.value,
                        "sign": reqMyPage.sign,
                        "offset": reqMyPage.offset
                    }).then(res => {
                    if (reqMyPage.sign === 0 && reqMyPage.offset == 0) {
                        dreamDao.amount = res.data.amount
                    }
                    let fundsLen = res.data.funds.length
                    let projectLen = res.data.projects.length
                    if (fundsLen === 0 && projectLen === 0) {
                        reqMyPage.more = false
                        return
                    }

                    if (reqMyPage.sign === 0) {
                        for (let i = 0; i < fundsLen; i++) {
                            let fundsTmp = res.data.funds[i]
                            myFunds.push(fundsTmp)
                        }
                        if (projectLen === 0) {
                            reqMyPage.offset += fundsLen
                        }
                    }
                    if (projectLen > 0) {
                        reqMyPage.sign = 1
                        reqMyPage.offset += projectLen
                        for (let i = 0; i < projectLen; i++) {
                            let proTmp = res.data.projects[i]
                            let cc = calcCss(proTmp.status)
                            proTmp.status = cc.status
                            proTmp.font = cc.font
                            proTmp.bg = cc.bg
                            myProjects.push(proTmp)
                        }
                    }
                }).catch(err => {
                    Notify({type: 'danger', message: err});
                })
            }

            const reqOtherProjects = reactive({
                offset: 0,
                more: true,
            })

            function calcCss(status: Number): ContainCss {
                let obj = {} as ContainCss
                switch (status) {
                    case 0:
                        obj.status = "暂无评分";
                        obj.font = "#666666"
                        obj.bg = "url('/img/2x/win-gray.png')"
                        break
                    case 1:
                        obj.status = "盈利";
                        obj.font = "#00EB60"
                        obj.bg = "url('/img/2x/win-green.png')"
                        break
                    case 2:
                        obj.status = "盈利但未达到预期";
                        obj.font = "#666666"
                        obj.bg = "url('/img/2x/win-yellow.png')"
                        break
                    case 3:
                        obj.status = "亏损";
                        obj.font = "#EC5A4C"
                        obj.bg = "url('/img/2x/win-red.png')"
                        break
                    case 4:
                        obj.status = "违约";
                        obj.font = "#666666"
                        obj.bg = "url('/img/2x/win-white.png')"
                        break
                    default:
                        break
                }
                return obj
            }

            const otherProjects: Project[] = reactive([])

            function getOtherProjects() {
                BackendApi.getOtherProjects({
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
                        let cc = calcCss(proTmp.status)
                        proTmp.status = cc.status
                        proTmp.font = cc.font
                        proTmp.bg = cc.bg
                        otherProjects.push(proTmp)
                    }
                    if (reqOtherProjects.offset === 0 && projectLen < 8) {
                        reqOtherProjects.more = false
                    } else if (reqOtherProjects.offset > 0 && projectLen < 9) {
                        reqOtherProjects.more = false
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
                toFund,
                toProject,
                getMyPage,
                getOtherProjects,
                dreamDao,
                MDToken,
                otherProjects, myProjects,
                reqOtherProjects
            }
        }
    })

</script>

<style scoped>
    #dm-body {
        position: relative;
        height: calc(100vh - 300px - 200px);
        overflow-y: scroll;
        overflow-x: hidden;
        padding-bottom: 200px;
    }

    #bg {
        position: absolute;
        width: 100%;
        height: 64px;
        background-color: #3682FF;
        z-index: 500;
    }

    #dm-pods {
        position: relative;
        top: 16px;
        z-index: 600;
    }

    .dm-pod {
        background-color: white;
        border-radius: 20px;
        width: 660px;
        box-shadow: 0 0 14px rgba(0, 0, 0, .25), 0 0 14px rgba(0, 0, 0, .25);
        padding: 10px 16px;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    #dm-container {
        margin: calc((100% - 540px) / 6);
        width: 180px;
        height: 180px;
        border-radius: 20px;
        box-shadow: 0 6px 10px rgba(0, 0, 0, .10);
        position: relative;
        background-image: url("/img/2x/win-dm.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: bottom;
    }

    .fund-container {
        margin: calc((100% - 540px) / 6);
        width: 180px;
        height: 180px;
        border-radius: 20px;
        box-shadow: 0 6px 10px rgba(0, 0, 0, .10);
        position: relative;
    }

    .dm-pro {
        background-image: url("/img/2x/win-gray.png");
        background-size: 100% 100%;
    }

    #dm-name {
        font-size: 30px;
        font-weight: bold;
        position: relative;
        top: 36px;
    }

    #dm-amount {
        font-size: 28px;
        position: relative;
        top: 60px;
    }

    #dm-uint {
        font-size: 18px;
        position: relative;
        top: 60px;
    }

    .fund-src {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 24px;
        font-weight: bold;
    }

    .fund-name {
        position: relative;
        font-size: 32px;
        top: 32px;
        font-weight: bold;
    }

    .fund-percent {
        font-size: 20px;
        position: relative;
        top: 28px;
        font-weight: 500;
    }

    .fund-inc {
        font-size: 20px;
        position: relative;
        top: 22px;
        font-weight: 500;
    }

    .fund-amount {
        font-size: 24px;
        position: relative;
        top: 20px;
    }

    .fund-uint {
        font-size: 18px;
        position: relative;
        top: 12px;
    }

    .pro-name {
        font-size: 32px;
        font-weight: bold;
        position: relative;
        top: 12px;

    }

    .pro-price {
        font-size: 36px;
        position: relative;
        top: 6px;
    }

    .pro-uint {
        font-size: 24px;
        position: relative;
        top: 0px;
    }

    .pro-state {
        font-size: 32px;
        position: relative;
    }

    .pro-fund {
        font-size: 16px;
        font-weight: bold;
        position: absolute;
        margin: 0 auto;
        bottom: 4px;
        left: 4px;
        writing-mode: vertical-lr;
    }

    .more {
        font-size: 36px;
        font-weight: bold;
        line-height: 180px;
        margin-right: 10px;
    }

    .more-icon {
        color: #666666;
        position: absolute;
        top: 70px;
        right: 14px;
    }
</style>
