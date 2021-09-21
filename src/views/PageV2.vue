<template>
    <div id="main">
        <NavBar ref="RefNavBar" @changeView="handleChangeView" @backPre="handlePreView"></NavBar>
        <component @openOperation="handleOpenOperation"
                   @openDialog="handleOpenDialog"
                   @changeView="handleChangeView" :is="currentPage"
                   :jsonParams="pageParam.Args"></component>
        <Operation ref="RefOperation"></Operation>
        <Dialog ref="RefDialog"></Dialog>
        <Bottom></Bottom>
    </div>
</template>

<script lang="ts">
    import Fund from "@/components/content/v2/Fund.vue";
    import Project from "@/components/content/v2/Project.vue";
    import NavBar from "@/components/bar/v2/NavBar.vue";
    import Nav from "@/components/content/v2/Nav.vue"
    import CreateProject from "@/components/content/CreateProject.vue"
    import {defineComponent, onMounted, provide, ref} from "vue";
    // eslint-disable-next-line no-unused-vars
    import {IDialogSlot, IFundArgs, IOperationSlot, IPageParam, IProjectArgs} from "@/pgcommon/common";
    import Operation from "@/components/bar/v2/Operation.vue"
    import ForkFund from "@/components/content/ForkFund.vue"
    import Inbox from "@/components/content/Inbox.vue"
    import Dialog from "@/components/bar/Dialog.vue"


    export default defineComponent({
        name: "PageV2",
        components: {
            Dialog,
            Operation,
            NavBar,
            Fund,
            Project,
            Nav,
            CreateProject,
            ForkFund,
            Inbox
        },
        props: {},
        setup() {
            onMounted(() => {
                fnNavBar("DreamDAO-Nav", 0)
                console.log("load page")
            })
            const curFundId = ref("")
            provide("fund", curFundId)
            const curProjectId = ref("")
            provide("project", curProjectId)


            // unified scheduling
            const pMap = new Map<string, any>([
                ["Fund", Fund],
                ["Nav", Nav],
                ["Project", Project],
                ["CreateProject", CreateProject],
                ["ForkFund", ForkFund],
                ["Inbox", Inbox]
            ])
            const currentPage = ref<any>(Nav)
            const preParams: IPageParam[] = [{
                Name: "Nav",
                Title: "DreamDAO-Nav",
                Args: {},
            }]
            const pageParam = ref<IPageParam>({
                Name: "Nav",
                Title: "DreamDAO-Nav",
                Args: {},
            })

            function handleChangeView(p: IPageParam) {
                console.log("handleChangeView", p.Name)
                if (p.NewPage) {
                    preParams.push(pageParam.value as IPageParam)
                }
                if (pMap.has(p.Name)) {
                    provideValue(p)
                    currentPage.value = pMap.get(p.Name)
                    pageParam.value = p
                    let barStyle = 0
                    switch (p.Name) {
                        case "Nav":
                            barStyle = 0;
                            break
                        case "Fund":
                        case "Project":
                            barStyle = 1;
                            break
                        default:
                            break
                    }
                    fnNavBar(p.Title, barStyle)
                }
            }

            function provideValue(p: IPageParam) {
                switch (p.Name) {
                    case "Fund":
                        curFundId.value = (p.Args as IFundArgs).FundAddress
                        break
                    case "Project":
                        curFundId.value = (p.Args as IProjectArgs).FundAddress
                        curProjectId.value = (p.Args as IProjectArgs).ProjectAddress
                        break
                    default:
                        break;
                }
            }

            // page content scheduler
            function handlePreView(title: string) {
                console.log("handlePreView", title)
                let pre = preParams.pop()
                if (pre !== undefined) {
                    pre.NewPage = false
                    handleChangeView(pre)
                }
            }

            const RefNavBar = ref()
            const fnNavBar = (title: string, barStyle: number) => {
                RefNavBar.value.setTitle(title, barStyle)
            }

            const RefOperation = ref()

            // submit scheduler
            function handleOpenOperation(p: IOperationSlot) {
                RefOperation.value.open(p)
            }

            const RefDialog = ref()

            function handleOpenDialog(p: IDialogSlot) {
                RefDialog.value.open(p)
            }

            return {
                currentPage,
                pageParam,
                handleChangeView,
                handlePreView,
                handleOpenOperation, RefOperation,
                handleOpenDialog, RefDialog,
                RefNavBar,
            }
        }
    })

</script>

<style scoped>
    #main {
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: fixed;
    }
</style>
