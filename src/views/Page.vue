<template>
    <div>
        <NavBar ref="RefNavBar" @backPre="handlePreView"></NavBar>
        <component @submit="handleOpenOperation" @changeView="handleChangeView" :is="currentPage"
                   :jsonParams="pageParam.Args"></component>
        <Operation ref="RefOperation"></Operation>
        <Bottom></Bottom>
    </div>
</template>

<script lang="ts">

    import Fund from "@/components/content/Fund.vue";
    import Project from "@/components/content/Project.vue";
    import Bottom from "@/components/bar/Bottom.vue";
    import NavBar from "@/components/bar/NavBar.vue";
    import Nav from "@/components/content/Nav.vue"
    import CreateProject from "@/components/content/CreateProject.vue"
    import {defineComponent, onMounted, provide, ref} from "vue";
    // eslint-disable-next-line no-unused-vars
    import {IFundArgs, IOperationSlot, IPageParam} from "@/pgcommon/common";
    import Operation from "@/components/bar/Operation.vue"

    export default defineComponent({
        name: "Page",
        components: {
            Operation,
            NavBar,
            Bottom,
            Fund,
            Project,
            Nav,
            CreateProject
        },
        props: {},
        setup() {
            onMounted(() => {
                fnNavBar("DreamDAO-Nav")
                console.log("load page")
            })
            const pMap = new Map<string, any>([
                ["Fund", Fund],
                ["Nav", Nav],
                ["Project", Project],
                ["CreateProject", CreateProject]
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
                    fnNavBar(p.Title)
                }
            }

            function provideValue(p: IPageParam) {
                switch (p.Name) {
                    case "Fund":
                        curFundsId.value = (p.Args as IFundArgs).FundAddress

                        break
                    case "Project":
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
            const fnNavBar = (title: string) => {
                RefNavBar.value.setTitle(title)
            }

            const RefOperation = ref()

            // submit scheduler
            function handleOpenOperation(p: IOperationSlot) {
                RefOperation.value.open(p)
            }

            const curFundsId = ref("")
            provide("funds", curFundsId)

            return {
                currentPage,
                pageParam,
                handleChangeView,
                handlePreView,
                handleOpenOperation,
                RefNavBar,
                RefOperation
            }
        }
    })

</script>

<style scoped>

</style>
