<template>
    <div>
        <div class="dm-body">
            <div class="dm-pod">
                <div class="dm-container" @click="toFund(fundsToken,'DreamDAO-Fund')">
                    <div>DreamDAO</div>
                    <div>{{ dreamDao.amount }}</div>
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
                <div class="dm-container">

                </div>
                <div class="dm-container">

                </div>
                <div class="dm-container">

                </div>
                <div class="dm-container">

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Notify} from "vant";
    import {defineComponent, inject, onMounted, reactive} from "vue";
    // eslint-disable-next-line no-unused-vars
    import {IFundArgs, IPageParam} from "../../pgcommon/common";
    import {BackendApi} from "../../chain/backendApi";
    // eslint-disable-next-line no-unused-vars
    import {WClient} from "../../chain/walletconnect";

    class ReqMyPage {
        account: string
        sign: number
        offset: number
        more: boolean

        constructor(acc: string, sign: number, off: number) {
            this.account = acc
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
        name: string
        price: string
        fundName: string
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
        setup(props, context) {
            const fundsToken = inject<string>("fundsToken", "")
            const wcli = inject<WClient>("walletConnect")
            const reqMyPage: ReqMyPage = new ReqMyPage("", 0, 0)

            const myFunds: Funds[] = []
            const dreamDao = reactive({amount: "0"})
            //const myFunds = reactive({list: []})

            const myProjects: Project[] = []
            onMounted(() => {
                if (wcli != undefined) {
                    reqMyPage.account = wcli.state.address
                    getMyPage()
                }
                console.log("load nav")
            })

            function getMyPage() {
                if (!reqMyPage.more) {
                    return
                }
                BackendApi.getMyPage(
                    {
                        "account": reqMyPage.account,
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

            function toProject(proAddr: string, proName: string) {
                let p: IPageParam = {
                    Name: "Project",
                    Title: proName,
                    Args: {},
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
                dreamDao,
                fundsToken
            }
        }
    })

</script>

<style scoped>
    .dm-pod {
        padding: 20px 30px;
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

    .dm-body {
        height: calc(100vh - 46px - 50px);
        border: 1px solid red;
        overflow: scroll;
    }
</style>
