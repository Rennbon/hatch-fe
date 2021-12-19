<template>
    <div id="com-border">
        <div class="cell-group">
            <div class="cell cell-line">
                <div class="cell-large-half  cell-title">{{ title }}</div>
                <div class="cell-small-half cell-title-left">{{ count }}</div>
            </div>
            <!--

                        <div class="cell cell-line">
                            <div class="member-left">
                                99999.
                            </div>
                            <div class="member-right">
                                0xB64E1E2fF1E13a01a34e303903Fba9E712184C79
                            </div>
                        </div>
                        <div class="cell cell-line">
                            <div class="member-left">
                                22123123
                            </div>
                            <div class="member-middle">
                                0xB64E1E...2184C79
                            </div>
                            <div class="member-right-2">
                                9999999.99
                                <i class="cell-unit">USDT</i>
                            </div>
                        </div>-->
            <div v-if="route===2">
                <div class="cell cell-line" :key="index" v-for="(log,index) in logs">
                    <div class="member-left">
                        {{ log.index }}.
                    </div>
                    <div class="member-right">
                        {{ log.address }}
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="cell cell-line" :key="index" v-for="(log,index) in logs">
                    <div class="member-left">
                        {{ log.index }}
                    </div>
                    <div class="member-middle">
                        {{ log.address }}
                    </div>
                    <div class="member-right-2">
                        {{ log.number }}
                        <i class="cell-unit">{{ symbol }}</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, inject, onMounted, reactive, ref} from "vue";
    // eslint-disable-next-line no-unused-vars
    import {convertAmountToCommon} from "@/chain/bignumber"
    import {ListType} from "@/pgcommon/common";
    import {BackendApi} from "@/chain/backendApi";

    interface LogList {
        index: number
        address: string
        number: string
    }

    interface Log {
        blockHeight: number
        txHash: string
        amount: string
        from: string
        sign: boolean
    }

    export default defineComponent({
        name: "List",
        methods: {
            convertAmountToCommon
        },
        setup() {
            const title = ref("")
            const count = ref(0)
            const listType = inject("listType", ref(4))
            const project = inject("project", ref(""))
            const funAddr = inject("fund", ref(""))
            const symbol = inject("listSymbol", ref(""))
            const reqList = reactive({
                pageIndex: 1,
                pageSize: 20,
                more: true,
            })

            const logs: LogList[] = reactive([])
            const total = ref(0)
            const route = ref(1)
            onMounted(async () => {
                getTitle()
                getLogs()
                console.log("list", listType, route.value)
            })

            function getTitle() {
                switch (listType.value as ListType) {
                    case ListType.Guarantor:
                        route.value = 2
                        title.value = "Guarantor List";
                        break
                    case ListType.GuaranteeLog:
                        route.value = 1
                        title.value = "Guaranty Records";
                        break
                    case ListType.InvestLog:
                        route.value = 1
                        title.value = "Investment Records";
                        break
                    case ListType.Investor:
                        route.value = 2
                        title.value = "Investor List";
                        break
                    case ListType.SellLog:
                        route.value = 1
                        title.value = "Selling Records";
                        break
                    default:
                        break
                }
            }

            function getLogs() {
                if (route.value === 1) {
                    getProjectMethodLogs()
                } else {
                    getProjectMembers()
                }
            }

            function getProjectMembers() {
                if (!reqList.more) {
                    return
                }
                BackendApi.getProjectMembers({
                    "methodNum": listType.value,
                    "project": project.value,
                    "fund": funAddr.value,
                    "pageIndex": reqList.pageIndex,
                    "pageSize": reqList.pageSize
                }).then(res => {
                    let arr = res.data.array
                    total.value = res.data.total
                    let len = arr.length
                    for (let i = 0; i < len; i++) {
                        let log = {
                            index: i + 1 + (reqList.pageIndex - 1) * reqList.pageSize,
                            address: arr[i],
                            number: "0",
                        } as LogList
                        logs.push(log)
                    }
                    if (len < reqList.pageSize) {
                        reqList.more = false
                    } else {
                        reqList.pageIndex += 1
                    }
                })
            }

            function getProjectMethodLogs() {
                if (!reqList.more) {
                    return
                }
                BackendApi.getProjectMethodLogs({
                    "methodNum": listType.value,
                    "project": project.value,
                    "fund": funAddr.value,
                    "pageIndex": reqList.pageIndex,
                    "pageSize": reqList.pageSize
                }).then(res => {
                    let arr = res.data.array
                    total.value = res.data.total
                    let len = arr.length
                    for (let i = 0; i < len; i++) {
                        let log = arr[i] as Log
                        logs.push(log2List(log))
                    }
                    if (len < reqList.pageSize) {
                        reqList.more = false
                    } else {
                        reqList.pageIndex += 1
                    }
                })
            }

            function log2List(log: Log): LogList {
                let list = {
                    index: log.blockHeight,
                    address: log.txHash.substr(0, 8) + "..." + log.txHash.substr(34, 8),
                    number: (log.sign ? "" : "-") + log.amount,
                } as LogList
                return list
            }

            return {
                title, count, logs, reqList, symbol, route
            }
        }

    })
</script>

<style scoped>
    .member-left {
        width: 90px;
        font-size: 20px;
        font-family: Arial;
        color: #333333;
        text-align: left;
    }

    .member-right {
        font-size: 20px;
        font-family: Arial;
        color: #333333;
        text-align: center;
    }

    .member-middle {
        width: 240px;
        font-size: 20px;
        font-family: Arial;
        color: #333333;
        text-align: center;
    }

    .member-right-2 {
        width: 336px;
        font-size: 20px;
        font-family: Arial;
        color: #333333;
        text-align: right;
    }
</style>
