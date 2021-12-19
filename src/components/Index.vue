<template>
    <div>
        <div id="blank-header"></div>
        <img id="logo" src="/img/2x/logo-b.png" alt=""/>
        <div id="name">Dream DAO</div>
        <div>
            <div class="content">The First</div>
            <div class="content">Decentralized Incubator</div>
            <div class="content">in the World</div>
        </div>
        <button id="info-bt" @click="toPage">{{ btLabel }}</button>
        <button id="guide-bt" @click="toP1">What is DreamDAO?</button>
    </div>
</template>åå

<script lang="ts">
    import {defineComponent, inject, onMounted, ref} from "vue";
    // eslint-disable-next-line no-unused-vars
    import {WClient} from "@/chain/walletconnect";


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
            const btLabel = ref("不连接钱包直接阅览")
            const wcli = inject<WClient>("walletConnect")
            onMounted(() => {
                if (wcli != undefined && wcli.state.connector != null && wcli.state.connector.session != null) {
                    if (wcli.state.connector.session.connected) {
                        btLabel.value = "阅览"
                    }
                }
            })
            return {
                btLabel
            }
        }
    })
</script>

<style scoped>
    /*    #blank-header {
            height: 84px;
            border-radius: 0 0 10px 10px;
            box-shadow: 0 0 14px rgba(0, 0, 0, .25), 0 0 14px rgba(0, 0, 0, .25)
        }*/

    #logo {
        margin-top: 240px;
        height: 240px;
    }

    #name {
        font-size: 24px;
        font-family: PingFangSC-Medium;
        font-weight: bold;
    }

    .content {
        font-size: 24px;
        font-family: Helvetica-Light;
        font-weight: bold;
        padding: 8px;
    }

    .content:nth-child(1) {
        margin-top: 65px;
    }

    #info-bt {
        margin-top: 120px;
        border: none;
        height: 75px;
        width: 625px;
        background-image: linear-gradient(to right, #0575DF, #00EB60);
        background-size: 100% 100%;
        color: white;
        font-size: 32px;
        font-family: "PingFang SB";
        font-weight: bold;
        border-radius: 10px;
    }

    #guide-bt {
        margin-top: 20px;
        border: none;
        height: 75px;
        width: 625px;
        background-color: #0575DF;
        color: white;
        font-size: 32px;
        font-family: "PingFang SB";
        border-radius: 10px;
        font-weight: bold;
    }
</style>
