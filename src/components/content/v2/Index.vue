<template>
    <div>
        <div>
            <div class="content">The first</div>
            <div class="content">decentralized combinator</div>
            <div class="content">in the world</div>
        </div>
        <div id="idx-numbers">
            <div class="idx-kv">
                <span class="idx-key">{{ numbers.amount }}</span>
                <i class="idx-val">USDT</i>
            </div>
            <div class="idx-kv">
                <span class="idx-key">{{ numbers.investors }}</span>
                <i class="idx-val">Investors</i>
            </div>
            <div class="idx-kv">
                <span class="idx-key">{{ numbers.startups }}</span>
                <i class="idx-val">Startups</i>
            </div>
        </div>
        <button id="info-bt" @click="toPage">GO></button>
        <div id="guide-bt" @click="toP1">What is Hatch?</div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, inject, onMounted, reactive} from "vue";
    // eslint-disable-next-line no-unused-vars
    import {ContractManager} from "@/chain/erc20";


    export default defineComponent({
        name: "Index",
        methods: {
            toP1() {
                this.$router.push({
                    name: 'Guide'
                })
            },
            toPage() {
                this.$router.push({
                    name: 'Page'
                })
            }
        },
        setup() {
            const abi = inject<ContractManager>("abi", new ContractManager(""))
            const numbers = reactive({
                amount: "0",
                investors: "0",
                startups: "0"
            })
            onMounted(async () => {
                let projectCount = await abi.CountProjects()
                let investors = await abi.CountInvests()
                let amount = await abi.TotalDeposit()
                numbers.startups = projectCount
                numbers.investors = investors
                numbers.amount = amount

            })
            return {
                numbers
            }
        }
    })
</script>

<style scoped>
    .content {
        font-size: 52px;
        font-family: "Times New Roman";
        font-weight: bold;
        padding: 2px;
        color: #333333;
    }

    .content:nth-child(1) {
        margin-top: 65px;
    }

    #idx-numbers {
        margin-top: 140px;
        position: relative;
    }

    .idx-kv {
        position: relative;
        height: 60px;
    }

    .idx-key {
        font-family: PingFangSC;
        font-weight: bold;
        font-size: 36px;
        color: #333333;
        position: absolute;
        right: 320px;
    }

    .idx-val {
        color: #BCBCBC;
        font-family: PingFangSC;
        font-weight: bold;
        font-size: 20px;
        position: absolute;
        top: 10px;
        left: 480px;
    }

    #info-bt {
        margin-top: 120px;
        border: none;
        height: 60px;
        width: 400px;
        background-color: #FFCC00;
        color: #333333;
        font-size: 32px;
        font-family: "PingFang SB";
        font-weight: bold;
        border-radius: 48px;
    }

    #guide-bt {
        margin-top: 20px;
        color: #333333;
        font-size: 24px;
        font-family: "PingFang";
        text-decoration: underline;

    }
</style>
