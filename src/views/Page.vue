<template>
    <div>
        <NavBar ref="RefNavBar" @backPre="handlePreView"></NavBar>
        <component @changeView="handleChangeView" :is="currentPage" :jsonParams="pageParam.Args"></component>
        <Bottom @currentAccount="handleAccount" ref="RefWC"></Bottom>
    </div>
</template>

<script lang="ts">

    import Fund from "@/components/content/Fund.vue";
    import Project from "@/components/content/Project.vue";
    import Bottom from "@/components/bar/Bottom.vue";
    import NavBar from "@/components/bar/NavBar.vue";
    import Nav from "@/components/content/Nav.vue"
    import {defineComponent, onMounted, ref} from "vue";
    // eslint-disable-next-line no-unused-vars
    import {IPageParam} from "@/pgcommon/common";

    export default defineComponent({
        name: "Page",
        components: {
            NavBar,
            Bottom,
            Fund,
            Project,
            Nav
        },
        props: {},
        setup() {
            onMounted(() => {
                fnNavBar("DreamDAO-Nav")
            })
            const pMap = new Map<string, any>([
                ["Fund", Fund],
                ["Nav", Nav],
                ["Project", Project]
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
                Args: {

                },
            })

            function handleChangeView(p: IPageParam) {
                console.log("handleChangeView", p.Name)
                if (p.NewPage) {
                    preParams.push(pageParam.value as IPageParam)
                }
                if (pMap.has(p.Name)) {
                    currentPage.value = pMap.get(p.Name)
                    pageParam.value = p
                    fnNavBar(p.Title)
                }
            }


            function handlePreView(title: string) {
                console.log("handlePreView", title)
                let pre = preParams.pop()
                if (pre !== undefined) {
                    pre.NewPage = false
                    handleChangeView(pre)
                }
            }

            const currentAccount = ref("")

            function handleAccount(account: string) {
                console.log("current account ", account)
                currentAccount.value = account
            }

            const RefNavBar = ref()
            const fnNavBar = (title: string) => {
                RefNavBar.value.setTitle(title)
            }
            return {
                currentPage,
                pageParam,
                handleChangeView,
                handlePreView,
                RefNavBar,
                handleAccount,
            }
        }
    })

</script>

<style scoped>

</style>
