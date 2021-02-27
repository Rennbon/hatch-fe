<template>
    <van-action-sheet :round="false" id="op-border" v-model:show="Show">
        <div id="title">{{ Title }}</div>
        <div>
            <van-cell-group id="content">
                <van-field v-model="value" label="金额" placeholder="请输入金额"/>
            </van-cell-group>
            <van-button width="80px;" type="primary" @click="submit">提交</van-button>
        </div>
    </van-action-sheet>
</template>
<script lang="ts">
    import {defineComponent, inject, ref} from "vue";
    // eslint-disable-next-line no-unused-vars
    import {IOperationSlot, SubmitType} from "../../pgcommon/common";
    // eslint-disable-next-line no-unused-vars
    import {WClient} from "../../chain/walletconnect";
    import {ContractManager} from "../../chain/erc20";
    import {Notify} from "vant";

    export default defineComponent({
        name: "Operation",
        setup() {
            const Show = ref(false)
            const Title = ref("")
            const To = ref("")
            const Amount = ref("")
            const wcli = inject<WClient>('walletConnect')
            let abi: ContractManager

            function open(p: IOperationSlot) {
                abi = new ContractManager(p.Funds)
                switch (p.Type) {
                    case SubmitType.Save:
                        Title.value = "存入"
                        break;
                    default:
                        break
                }
                Show.value = true
            }

            async function Submit() {
                let tx = await abi.Deposit(wcli!.state.address, Amount.value)
                wcli!.state.connector!.sendTransaction(tx)
                    .then(
                        () => {
                            Notify({type: 'success', message: '交易发送成功'});
                        }
                    ).catch(res => {
                    Notify(res)
                })
            }

            return {
                Show,
                Title,
                open,
                To,
                Amount,
                Submit
            }
        }
    })
</script>

<style scoped>
    #title {
        font-size: 18px;
        height: 40px;
        padding: 10px;
    }

    #content {
        height: 60px;
        padding: 5px;
    }

    #op-border {
        height: 200px;
        border: 1px solid red;
    }
</style>
