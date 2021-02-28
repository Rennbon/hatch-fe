<template>
    <div>
        <div id="fund-info">
            <div id="fi-growth">
                <div>+10%</div>
                <div>6.7eth</div>
            </div>
            <div id="fi-desc">
                <div>{{ FundsInfo.totalDeposit }} eth</div>
                <div>{{ FundsInfo.countUsers }} users</div>
                <div>{{ FundsInfo.countInvests }} investors</div>
                <div>{{ FundsInfo.countProjects }} startups</div>
                <div>{{ FundsInfo.countFunds }} funds</div>
                <div>{{ FundsInfo.totalFundsToken }} token</div>
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
        <div>
            <div>
                <div>AAAA</div>
                <div>123123</div>
                <van-button type="info">担保</van-button>
            </div>
            <div>
                <div>AAAA</div>
                <div>123123</div>
                <van-button type="info">担保</van-button>
            </div>
            <div>
                <div>AAAA</div>
                <div>123123</div>
                <van-button type="info">担保</van-button>
            </div>
            <div>
                <div>AAAA</div>
                <div>123123</div>
                <van-button type="info">担保</van-button>
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

    export default defineComponent({
        name: "Fund",
        components: {},
        methods: {
            convertAmountToCommon
        },
        setup(props, context) {
            const wcli = inject<WClient>("walletConnect")
            const FundsInfo = reactive({
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

            const fundsId = inject("funds", ref(""))
            onMounted(async () => {
                const abi = new ContractManager(fundsId.value)
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
                FundsInfo.totalDeposit = await abi.TotalDeposit()
                FundsInfo.countUsers = await abi.CountUsers()
                FundsInfo.countInvests = await abi.CountInvests()
                FundsInfo.countProjects = await abi.CountProjects()
                FundsInfo.totalFundsToken = await abi.TotalFundToken()

            })

            // create new project
            function toCreateProject() {
                let args: IFundArgs = {
                    FundAddress: fundsId.value,
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
                    Fund: fundsId.value,
                    Project: "",
                } as IOperationSlot
                emit(params)
            }

            function SubmitWithdrawETH() {
                const params = {
                    Type: SubmitType.WithDraw,
                    Fund: fundsId.value,
                    Project: "",
                    Limit: MyDeposit.unlock,
                } as IOperationSlot
                emit(params)
            }

            function SubmitWithdrawToken() {
                const params = {
                    Type: SubmitType.WithDrawFundToken,
                    Fund: fundsId.value,
                    Project: "",
                    Limit: MyDeposit.unlock,
                } as IOperationSlot
                emit(params)
            }

            function emit(p: IOperationSlot) {
                context.emit("submit", p)
            }

            return {
                FundsInfo,
                SubmitSaveETH,
                SubmitWithdrawETH,
                SubmitWithdrawToken,
                toCreateProject,
                MyDeposit,
                MyFundToken,
                Login
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
