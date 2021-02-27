<template>
    <div>
        <div id="fund-info">
            <div id="fi-growth">
                <div>+10%</div>
                <div>6.7eth</div>
            </div>
            <div id="fi-desc">
                <div>123123 eth</div>
                <div>23232 investors</div>
                <div>56 startups</div>
                <div>6 funds</div>
            </div>
            <div id="fi-amount">
                <div>余额： {{ totalDeposit }} eth</div>
                <div>可提现： 2323 eth</div>
                <div>锁定量： 12313 eth</div>
            </div>
            <div id="fi-bts">
                <van-button type="info" @click="SubmitSaveETH">ETH存入</van-button>
                <van-button type="info">ETH提现</van-button>
                <van-button type="info">AAA提现</van-button>
                <van-button type="info">融资申请</van-button>
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
    import {defineComponent, inject, onMounted, ref} from "vue";
    import {ContractManager} from "@/chain/erc20";
    import {SubmitType} from "../../pgcommon/common";

    export default defineComponent({
        name: "Fund",
        components: {},
        setup(props, context) {
            const totalDeposit = ref("0")
            const fundsId = inject("funds", ref(""))
            onMounted(async () => {

                const abi = new ContractManager(fundsId.value)
                totalDeposit.value = await abi.TotalDeposit()
            })

            function SubmitSaveETH() {
                context.emit("submit", {
                    Type: SubmitType.Save,
                    To: fundsId
                })
            }

            return {
                totalDeposit,
                SubmitSaveETH,
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
