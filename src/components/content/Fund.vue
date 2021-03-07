<template>
    <div>
        <div id="fund-info">
            <div id="fi-growth">
                <div>+10%</div>
                <div>6.7eth</div>
            </div>
            <div id="fi-desc">
                <div>{{ FundInfo.totalDeposit }} eth</div>
                <div>{{ FundInfo.countUsers }} users</div>
                <div>{{ FundInfo.countInvests }} investors</div>
                <div>{{ FundInfo.countProjects }} startups</div>
                <div>{{ FundInfo.countFunds }} funds</div>
                <div>{{ FundInfo.totalFundsToken }} token</div>
            </div>
            <div id="fi-amount" v-if="Login">
                <div>余额： {{ convertAmountToCommon(MyDeposit.all) }} {{ MyDeposit.symbol }}</div>
                <div>可提现： {{ convertAmountToCommon(MyDeposit.unlock) }} {{ MyDeposit.symbol }}</div>
                <div>锁定量： {{ MyDeposit.lock }} {{ MyDeposit.symbol }}</div>
            </div>

            <div id="fi-fund-token" v-if="Login">
                <div>基金余额： {{ convertAmountToCommon(MyFundToken.all, MyFundToken.decimals) }}
                    {{ MyFundToken.symbol }}
                </div>
                <div>基金可提现： {{ convertAmountToCommon(MyFundToken.withdraw, MyFundToken.decimals) }}
                    {{ MyFundToken.symbol }}
                </div>
                <div>基金解锁数： {{ convertAmountToCommon(MyFundToken.unlock, MyFundToken.decimals) }}
                    {{ MyFundToken.symbol }}
                </div>
            </div>
            <div id="fi-bts">
                <van-button type="info" @click="SubmitSaveETH">ETH存入</van-button>
                <van-button type="info" @click="SubmitWithdrawETH">ETH提现</van-button>
                <van-button type="info" @click="SubmitWithdrawToken">AAA提现</van-button>
                <van-button type="info" @click="toCreateProject">融资申请</van-button>
            </div>
        </div>
        <div class="project-list">
            <div :key="index" v-for="(pro,index) in projects">
                <div>{{ pro.name }}</div>
                <div>{{ pro.token }}</div>
                <van-button type="info" @click="SubmitToProject(pro)">{{ pro.stage }}</van-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, inject, onMounted, reactive, ref} from "vue";
    import {ContractManager} from "@/chain/erc20";
    // eslint-disable-next-line no-unused-vars
    import {IFundArgs, IOperationSlot, IPageParam, SubmitType} from "../../pgcommon/common";
    // eslint-disable-next-line no-unused-vars
    import {WClient} from "@/chain/walletconnect";
    import {convertAmountToCommon} from "@/chain/bignumber"
    import {BackendApi} from "@/chain/backendApi";
    import {Notify} from "vant";

    interface Project {
        name: string
        token: string
        stage: number
        price: string
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
            convertAmountToCommon
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


            })


            // get
            const reqProjectsByFund = reactive({
                pageIndex: 1,
                pageSize: 5,
                more: true,
            })


            const projects: Project[] = []

            function getProjectsByFund() {
                BackendApi.getProjectsByFund({
                    "fund": fundAddr.value,
                    "pageIndex": reqProjectsByFund.pageIndex,
                    "pageSize": reqProjectsByFund.pageSize,
                }).then(res => {
                    let projectLen = res.data.array.length
                    for (let i = 0; i < projectLen; i++) {
                        let proTmp = res.data.array[i]
                        let p = {
                            name: proTmp.name,
                            token: proTmp.token,
                            stage: proTmp.stage,
                            price: proTmp.price,
                            softCap: proTmp.softCap,
                            hardCap: proTmp.hardCap,
                            guarantee: proTmp.guarantee,
                            guaranteePercent: "0", // tmp
                            setupHeight: proTmp.setupHeight,
                            deadline: 0 //tmp = ( setupHeight - currentHeight ) * 10s
                        } as Project
                        projects.push(p)
                    }
                    if (projectLen == 0) {
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
                const params = {
                    Type: SubmitType.WithDraw,
                    Fund: fundAddr.value,
                    Project: "",
                    Limit: MyDeposit.unlock,
                } as IOperationSlot
                emit(params)
            }

            function SubmitWithdrawToken() {
                const params = {
                    Type: SubmitType.WithDrawFundToken,
                    Fund: fundAddr.value,
                    Project: "",
                    Limit: MyDeposit.unlock,
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

            return {
                FundInfo,
                SubmitSaveETH,
                SubmitWithdrawETH,
                SubmitWithdrawToken,
                SubmitToProject,
                toCreateProject,
                MyDeposit,
                MyFundToken,
                Login,
                projects
            }
        }
    })

</script>

<style scoped>
    #fund-info {
        height: 300px;
        border: 1px solid black;
    }
</style>
