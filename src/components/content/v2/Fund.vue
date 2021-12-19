<template>
    <div id="fund-border">
        <div id="fund-desc">
            <!--<div id="symbol">{{ MyFundToken.symbol }}</div>-->
            <div id="desc">Our main Ethereum CLI client. It is the entry point into the Ethereum network (main-, test-
                or private net), capable of running as a full node (default), archive node (retaining all historical
                state) or a light node (retrieving data live). It can be used by other processes as a gateway into the
                Ethereum network via JSON RPC endpoints exposed on top of HTTP, WebSocket and/or IPC transports. geth
                --help and the CLI page for command line options.
            </div>
        </div>

        <div class="cell-group">
            <div class="cell cell-line">
                <div class="cell-left cell-title">My USDT</div>
                <div class="cell-middle"></div>
                <div class="cell-right cell-title-right">{{ myUSDT.percent }} of poll</div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">Total balance:</div>
                <div class="cell-middle">

                    <div class="cell-number">{{ convertAmountToCommon(myUSDT.total) }}</div>
                    <i class="cell-unit">USDT</i></div>
                <div class="cell-right ">
                    <button class="cell-button" @click="SubmitSaveETH">Mining</button>
                </div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">Locked:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ convertAmountToCommon(myUSDT.locked) }}</div>
                    <i class="cell-unit">USDT</i></div>
                <div class="cell-right ">
                    <van-icon class="question-o" name="question-o"/>
                </div>
            </div>
            <div class="cell">
                <div class="cell-left cell-label">Withdrawable:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ convertAmountToCommon(myUSDT.withDrawable) }}</div>
                    <i class="cell-unit">USDT</i></div>
                <div class="cell-right ">
                    <button class="cell-button" @click="SubmitWithdrawETH">Withdraw</button>
                </div>
            </div>
        </div>
        <div class="divider"></div>

        <div class="cell-group">
            <div class="cell cell-line">
                <div class="cell-left cell-title">My FUN</div>
                <div class="cell-middle"></div>
                <div class="cell-right cell-title-right">{{ myFun.percent }} of total</div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">Total balance:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ convertAmountToCommon(myFun.total) }}</div>
                    <i class="cell-unit">{{ myFun.symbol }}</i></div>
                <div class="cell-right ">
                    <button class="cell-button">Deposit</button>
                </div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">Locked:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ convertAmountToCommon(myFun.locked) }}</div>
                    <i class="cell-unit">{{ myFun.symbol }}</i></div>
                <div class="cell-right ">
                    <van-icon class="question-o" name="question-o"/>
                </div>
            </div>
            <div class="cell">
                <div class="cell-left cell-label">Withdrawable:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ convertAmountToCommon(myFun.withDrawable) }}</div>
                    <i class="cell-unit">{{ myFun.symbol }}</i></div>
                <div class="cell-right ">
                    <button class="cell-button">Withdraw</button>
                </div>
            </div>
        </div>
        <div class="divider"></div>
        <div class="cell-group">
            <div class="cell cell-line">
                <div class="cell-left cell-title">About Fun</div>
                <div class="cell-middle"></div>
                <div class="cell-right cell-title-right"></div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">Capital Pool:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ aboutFun.capital }}</div>
                    <i class="cell-unit">USDT</i></div>
                <div class="cell-right ">
                    <van-icon class="question-o" name="question-o"/>
                </div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">Investors:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ aboutFun.investors }}</div>
                </div>
                <div class="cell-right ">
                    <van-icon class="question-o" name="question-o"/>
                </div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">Startups:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ aboutFun.startups }}</div>
                </div>
                <div class="cell-right ">
                    <button class="cell-button">Submit</button>
                </div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">Total Mined:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ aboutFun.totalDug }}</div>
                    <i class="cell-unit">FUN</i>
                </div>
                <div class="cell-right ">
                    <van-icon class="question-o" name="question-o"/>
                </div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">Destroyed:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ aboutFun.destroyed }}</div>
                    <i class="cell-unit">FUN</i>
                </div>
                <div class="cell-right ">
                    <van-icon class="question-o" name="question-o"/>
                </div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">Price:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ aboutFun.price }}</div>
                    <i class="cell-unit">USDT</i>
                </div>
                <div class="cell-right ">
                    <van-icon class="question-o" name="question-o"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, inject, onMounted, reactive, ref} from "vue";
    import {ContractManager} from "@/chain/erc20";
    // eslint-disable-next-line no-unused-vars
    import {IOperationSlot, SubmitType} from "@/pgcommon/common";
    // eslint-disable-next-line no-unused-vars
    import {WClient} from "@/chain/walletconnect";
    import {convertAmountToCommon, greaterThan, subtract} from "@/chain/bignumber"
    //import {BackendApi} from "@/chain/backendApi";
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
            subtract,
        },
        setup(props, context) {
            const wcli = inject<WClient>("walletConnect")
            const fundAddr = inject("fund", ref(""))

            const account = ref("")
            const Login = ref<boolean>(false)
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
                    account.value = wcli.state.address
                    if (account.value != "") {
                        Login.value = true
                        let myDeposit = await abi.MyDeposit(account.value)
                        myUSDT.total = myDeposit.All
                        myUSDT.locked = myDeposit.Lock
                        myUSDT.withDrawable = myDeposit.Unlock

                        let myFundToken = await abi.MyFundTokenAmount(account.value)
                        myFun.total = myFundToken.All
                        myFun.withDrawable = myFundToken.Unlock
                        myFun.symbol = myFundToken.Symbol
                        myFun.locked = subtract(myFun.total, myFun.withDrawable)

                        MyFundToken.withdraw = myFundToken.Withdraw
                        MyFundToken.all = myFundToken.All
                        MyFundToken.decimals = myFundToken.Decimals
                        MyFundToken.symbol = myFundToken.Symbol
                        MyFundToken.unlock = myFundToken.Unlock
                    }
                    let funInfo = await abi.FunInfo()
                    aboutFun.capital = funInfo.total
                    aboutFun.investors = funInfo.investors
                    aboutFun.startups = funInfo.startups
                    aboutFun.totalDug = funInfo.total
                    aboutFun.destroyed = funInfo.destroyed
                }
                console.log("login", Login.value)
            })
            const myUSDT = reactive({
                percent: "0%",
                total: "0",
                locked: "0",
                withDrawable: "0"
            })
            const myFun = reactive({
                percent: "0%",
                total: "0",
                locked: "0",
                withDrawable: "0",
                symbol: "FUN"
            })
            const aboutFun = reactive({
                capital: "0",
                investors: "0",
                startups: "0",
                totalDug: "0",
                destroyed: "0",
                price: "0",
            })

            const dailyFund = reactive({
                inc: "0",
                percent: "0%",
                color: "",
            })

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

            /* function dialog(p: IDialogSlot) {
                 context.emit("openDialog", p)
             }*/

            return {
                myUSDT, myFun, aboutFun,
                SubmitSaveETH,
                SubmitWithdrawETH,
                SubmitWithdrawToken,
                SubmitToProject,
                MyDeposit,
                MyFundToken,
                Login,
                dailyFund
            }
        }
    })

</script>

<style scoped>
    #fund-border {
        height: calc(100vh);
        overflow-y: scroll;
        overflow-x: hidden !important;
        width: 100%;
    }

    #fund-desc {
        height: 240px;
        width: 100%;
        position: relative;
        background-color: #eeeeee;
    }

    #symbol {
        position: absolute;
        height: 80px;
        font-size: 72px;
        color: #333333;
        width: 160px;
        padding: 10px 0px 0px 10px;
        border: 1px solid red;
    }


    #desc {
        position: absolute;
        padding: 10px 20px;
        font-size: 24px;
        width: 710px;
        height: 260px;
        word-break: break-word;
        overflow: hidden;
        text-align: left;
        font-family: arial;
    }

</style>
