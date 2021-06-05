<template>
    <div>
        <div class="inbox" :key="idx" v-for="(inbox,idx) in inboxes">
            <div class="cell">{{ inbox.msg }}</div>
        </div>
    </div>
</template>


<script lang="ts">
    import {defineComponent, onMounted, reactive} from "vue";
    // @ts-ignore
    import useStore from '../../store/index.js'
    import {BackendApi} from "@/chain/backendApi";

    interface Inbox {
        id: number
        account: string
        txHash: string
        method: number
        blockHeight: number
        succeed: boolean
        msg: string
    }

    export default defineComponent({
        name: "Inbox",
        //props, context
        setup() {
            const store = useStore()
            onMounted(async () => {
                reqInboxes.account = store.state.account
                getInboxes()
            })
            const reqInboxes = reactive({
                account: "",
                pageIndex: 1,
                pageSize: 20,
                more: true,
            })
            const inboxes: Inbox[] = reactive([])

            function getInboxes() {
                if (!reqInboxes.more) {
                    return
                }
                BackendApi.getInboxes({
                    "account": reqInboxes.account,
                    "pageIndex": reqInboxes.pageIndex,
                    "pageSize": reqInboxes.pageSize
                }).then(res => {
                    let arr = res.data.array
                    let len = arr.length
                    for (let i = 0; i < len; i++) {
                        let inbox = arr[i] as Inbox
                        inbox.msg = msgBuild(inbox)
                        inboxes.push(inbox)
                    }
                    if (len < reqInboxes.pageSize) {
                        reqInboxes.more = false
                    } else {
                        reqInboxes.pageIndex += 1
                    }
                })
            }

            /*            MethodCreateFund    MethodCode = 1
                        MethodSetProject    MethodCode = 2
                        MethodDiscussion    MethodCode = 3
                        MethodInvestment    MethodCode = 4
                        MethodGuarantee     MethodCode = 5
                        MethodSellProject   MethodCode = 6
                        MethodDeposit       MethodCode = 7
                        MethodWithdraw      MethodCode = 8
                        MethodDisGuarantee  MethodCode = 9
                        MethodDisInvestment MethodCode = 10*/
            function msgBuild(inbox: Inbox): string {
                let msg = inbox.txHash + '\t' + inbox.blockHeight + '\t'

                switch (inbox.method) {
                    case 1:
                        msg += "创建基金"
                        break
                    case 2:
                        msg += "创建项目"
                        break
                    case 3:
                        msg += "发表评论"
                        break
                    case 4:
                        msg += "投资项目"
                        break
                    case 5:
                        msg += "担保项目"
                        break
                    case 6:
                        msg += "出售项目"
                        break
                    case 7:
                        msg += "基金存入"
                        break
                    case 8:
                        msg += "撤销担保"
                        break
                    case 9:
                        msg += "撤销投资"
                        break
                    case 10:
                        msg += "异常信息"
                        break
                }
                if (inbox.succeed) {
                    msg += "成功"
                } else {
                    msg += "失败"
                }
                return msg
            }

            return {
                inboxes,
                getInboxes
            }
        }
    })

</script>

<style scoped>
    .inbox {
        font-size: 20px;
        padding-left: 20px;
        padding-right: 20px;
        border-top: 1px solid gray;
    }

    .cell {
        overflow: scroll;
        text-align: left;
    }
</style>
