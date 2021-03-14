<template>
    <div class="dm-body">
        <div id="bg"></div>
        <div id="dm-pods">
            <div class="dm-pod">
                <div class="dm-container" @click="toFund(MDToken,'DreamDAO-Fund')">
                    <div>DreamDAO</div>
                    <div>{{ convertAmountToCommon(dreamDao.amount) }}</div>
                    <div>ETH</div>
                </div>
                <div class="dm-container" @click="toFund('fx1231231a','MyFund-Fund')">
                    <div>Fund</div>
                    <div>ABE</div>
                    <div>+10%</div>
                    <div>1299999 ETH</div>
                </div>
                <div class="dm-container" @click="toProject('px12312301','MyProject-Fund')">
                    <div>AAA</div>
                    <div>9.6</div>
                    <div>ETH</div>
                    <div>盈利</div>
                    <div>DreamDAO</div>
                </div>
                <div class="dm-container">

                </div>
            </div>
            <van-divider dashed>other Funds</van-divider>
            <div class="dm-pod">
                <div class="dm-container">

                </div>
                <div class="dm-container">

                </div>
                <div class="dm-container">

                </div>
                <div class="dm-container">

                </div>
            </div>
            <van-divider dashed>other Startup</van-divider>
            <div class="dm-pod">
                <div class="dm-container" :key="index" v-for="(pro,index) in otherProjects"
                     @click="toProject(pro)">
                    {{ pro.fundName }}
                    {{ pro.name }}
                    {{ pro.price }}
                    {{ pro.status }}
                </div>
            </div>
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

    interface Project {
        token: string
        name: string
        price: string
        fundName: string
        fundToken: string

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

            const myProjects: Project[] = []
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


            const otherProjects: Project[] = []

            function getOtherProjects() {
                BackendApi.getOtherProjects({
                    "account": account.value,
                    "offset": reqOtherProjects.offset
                }).then(res => {
                    let projectLen = res.data.array.length
                    for (let i = 0; i < projectLen; i++) {
                        let proTmp = res.data.array[i]
                        otherProjects.push(proTmp)
                    }
                    if (projectLen == 0) {
                        reqOtherProjects.more = false
                    }
                    reqOtherProjects.offset += projectLen
                    console.log("load other projects over")
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
                otherProjects
            }
        }
    })

</script>

<style scoped>
    .dm-body {
        position: relative;
    }

    #bg {
        position: absolute;
        width: 100%;
        height: 64px;
        background-color: #3682FF;
        z-index: 500;
    }

    #dm-pods{
        position: relative;
        top: 16px;
        z-index: 600;
        height: calc(100vh - 166px);
        overflow: scroll;
    }

    .dm-pod {
        background-color: white;
        border-radius: 10px;
        width: 330px;
        box-shadow: 0 0 7px rgba(0, 0, 0, .25), 0 0 7px rgba(0, 0, 0, .25);
        padding: 20px 30px;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

    }

    .dm-container {
        margin: calc((100% - 276px) / 6);
        width: 90px;
        height: 90px;
        border: 1px solid black;
    }

</style>
