<template>
    <div id="fund-border">
        <div id="fund-desc">
            <div id="symbol">{{ MyFundToken.symbol }}</div>
            <div id="desc">
                目前没这个描述字段
            </div>
        </div>

        <div class="cell-group">
            <div class="cell cell-line">
                <div class="cell-left cell-title">My USDT</div>
                <div class="cell-middle"></div>
                <div class="cell-right cell-title-left">{{ myUSDT.percent }} of poll</div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">Total balance:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ myUSDT.all }}</div>
                    <i class="cell-unit">USDT</i></div>
                <div class="cell-right ">
                    <button class="cell-button" @click="SubmitSaveETH">Deposit</button>
                </div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">Locked:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ myUSDT.lock }}</div>
                    <i class="cell-unit">USDT</i></div>
                <div class="cell-right ">
                    <van-icon name="question-o"/>
                </div>
            </div>
            <div class="cell">
                <div class="cell-left cell-label">Withdrawable:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ myUSDT.withDrawable }}</div>
                    <i class="cell-unit">USDT</i></div>
                <div class="cell-right ">
                    <button class="cell-button"  @click="SubmitWithdrawETH">Withdraw</button>
                </div>
            </div>
        </div>
        <div class="divider"></div>

        <div class="cell-group">
            <div class="cell cell-line">
                <div class="cell-left cell-title">My FUN</div>
                <div class="cell-middle"></div>
                <div class="cell-right cell-title-left">{{ my2VC.percent }} of total</div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">Total balance:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ my2VC.total }}</div>
                    <i class="cell-unit">USDT</i></div>
                <div class="cell-right ">
                    <button class="cell-button">Deposit</button>
                </div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">Locked:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ my2VC.locked }}</div>
                    <i class="cell-unit">USDT</i></div>
                <div class="cell-right ">
                    <van-icon name="question-o"/>
                </div>
            </div>
            <div class="cell">
                <div class="cell-left cell-label">Withdrawable:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ my2VC.withDrawable }}</div>
                    <i class="cell-unit">USDT</i></div>
                <div class="cell-right ">
                    <button class="cell-button">Withdraw</button>
                </div>
            </div>
        </div>
        <div class="divider"></div>
        <div class="cell-group">
            <div class="cell cell-line">
                <div class="cell-left cell-title">About 2VC</div>
                <div class="cell-middle"></div>
                <div class="cell-right cell-title-left"></div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">Capital Pool:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ about2VC.capital }}</div>
                    <i class="cell-unit">USDT</i></div>
                <div class="cell-right ">
                    <van-icon name="question-o"/>
                </div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">Investors:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ about2VC.investors }}</div>
                </div>
                <div class="cell-right ">
                    <van-icon name="question-o"/>
                </div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">Startups:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ about2VC.startups }}</div>
                </div>
                <div class="cell-right ">
                    <button class="cell-button">Submit</button>
                </div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">Total 2VC dug:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ about2VC.totalDug }}</div>
                    <i class="cell-unit">2VC</i>
                </div>
                <div class="cell-right ">
                    <van-icon name="question-o"/>
                </div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">Destroyed:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ about2VC.destroyed }}</div>
                    <i class="cell-unit">2VC</i>
                </div>
                <div class="cell-right ">
                    <van-icon name="question-o"/>
                </div>
            </div>
            <div class="cell cell-line">
                <div class="cell-left cell-label">2VC Price:</div>
                <div class="cell-middle">
                    <div class="cell-number">{{ about2VC.price }}</div>
                    <i class="cell-unit">USDT</i>
                </div>
                <div class="cell-right ">
                    <van-icon name="question-o"/>
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
    import {convertAmountToCommon, greaterThan} from "@/chain/bignumber"
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
        },
        setup(props, context) {
            const wcli = inject<WClient>("walletConnect")
            const fundAddr = inject("fund", ref(""))

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

            })
            const myUSDT = reactive({
                percent: "0%",
                total: "0",
                locked: "0",
                withDrawable: "0"
            })
            const my2VC = reactive({
                percent: "0%",
                total: "0",
                locked: "0",
                withDrawable: "0"
            })
            const about2VC = reactive({
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
                myUSDT, my2VC, about2VC,
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
    }

    #desc {
        position: absolute;
        left: 160px;
        top: 50px;
        font-size: 24px;
        width: 570px;
        height: 220px;
        word-break: break-word;
        overflow: hidden;
        text-align: left;
    }

    .divider {
        height: 20px;
        background-color: #BCBCBC;
    }

    .cell-line {
        border-bottom: 2px solid #cccccc;
    }

    .cell {
        width: 666px;
        margin-left: 42px;
        line-height: 80px;
    }

    .cell-right {
        width: 180px;
        display: inline-block;
        height: 80px;
    }

    .cell-middle {
        width: 306px;
        display: inline-block;
        text-align: right;
        height: 80px;
    }

    .cell-left {
        width: 180px;
        display: inline-block;
        height: 80px;
    }

    .cell-title {
        font-size: 32px;
        font-family: Arial;
        color: #333333;
        line-height: 80px;
        text-align: left;
    }

    .cell-title-left {
        font-size: 24px;
        font-family: Arial;
        line-height: 80px;
        color: #333333;
        height: 80px;
        text-align: left;
    }

    .cell-label {
        font-size: 24px;
        color: #333333;
        text-align: left;
        font-family: Arial;
        height: 80px;
        line-height: 80px;
    }

    .cell-number {
        width: 256px;
        font-size: 24px;
        font-family: Arial;
        color: #333333;
        display: inline-block;
        text-align: right;
    }

    .cell-unit {
        width: 50px;
        font-size: 20px;
        text-align: center;
        display: inline-block;
        color: #BCBCBC;
    }

    .cell-button {
        height: 60px;
        padding: 20px;
        border-radius: 48px;
        font-size: 24px;
        font-weight: bold;
        color: #333333;
        background-color: #FFCC00;
        border: 0;
        line-height: 24px;
    }

</style>
