<template>
    <van-dialog v-model:show="show">
        <div id="dialog-body">
            <div id="title">{{ title }}</div>
            <div id="content">
                {{ content }}
            </div>
            <!--
                    <button id="bt" @click="ok">融资申请</button>
            -->
        </div>
    </van-dialog>
</template>

<script lang="ts">
    import {defineComponent, ref} from "vue";
    // eslint-disable-next-line no-unused-vars
    import {IDialogSlot} from "../../pgcommon/common";

    export default defineComponent({
            name: "dialog",
            setup() {
                const show = ref(false)
                const title = ref("标题")
                const content = ref("")

                function open(p: IDialogSlot) {
                    title.value = p.Title
                    show.value = true
                    content.value = p.Content
                }

                function ok() {
                    show.value = false
                }

                return {
                    ok,
                    open,
                    show, title, content
                }
            }

        }
    )
</script>

<style scoped>
    #content {
        font-family: PingFangSC;
        font-size: 30px;
        color: #666666;
        padding: 20px;
    }

    #dialog-body {
        padding: 10px;
    }

    #title {
        height: 50px;
        font-size: 34px;
        font-family: PingFangSC;
        font-weight: bold;
        color: #666666;
    }
</style>
