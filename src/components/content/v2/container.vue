<template>
    <div class="dm-container">
        <div v-if="false">
            <div class="dm-container-header">123123</div>
            <div class="dm-container-name">ABC</div>
            <div class="dm-container-num">12323 / 123123</div>
            <div class="dm-container-uint">USDT</div>
            <div class="dm-container-footer">
                <span class="dcf-1" style="width: 30%">50%</span>
                <span class="dcf-2" style="width: 30%">80%</span>
                <span class="dcf-3" style="width: 40%">20%</span>
            </div>
        </div>
        <div v-if="true">
            <div class="dm-container-header">盈利</div>
            <div class="dm-container-name">ABC</div>
            <div class="dm-container-num">1000</div>
            <div class="dm-container-uint">USDT</div>
            <div class="dm-container-footer">
                <span class="dcf-1" style="width: 30%">50%</span>
                <span class="dcf-2" style="width: 30%">80%</span>
                <span class="dcf-3" style="width: 40%">20%</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent,ref} from "vue";
    import {convertAmountToCommon, greaterThan} from "@/chain/bignumber";

    export default defineComponent({
        name: "container",
        props: {},
        setup(props, context) {
            const containerType = ref(0)


        }
    })
</script>

<style scoped>
    .dm-container {
        margin: calc((100% - 636px) / 6);
        width: 200px;
        height: 200px;
        position: relative;
        background-color: #FFFFFF;
    }

    .dm-container-header {
        position: absolute;
        top: 0px;
        height: 30px;
        width: 100%;
        font-size: 24px;
        font-family: PingFangSC;
        background-color: #FFCC00;
        color: #FFFF00;
    }

    .dm-container-name {
        font-size: 56px;
        font-weight: bold;
        color: #333333;
        margin-top: 30px;
    }

    .dm-container-num {
        font-size: 20px;
        font-family: PingFangSC;
        color: #333333;
    }

    .dm-container-uint {
        font-size: 20px;
        font-family: PingFangSC;
        color: #333333;
    }


    .dm-container-footer {
        position: absolute;
        bottom: 0px;
        height: 30px;
        width: 100%;
        font-size: 24px;
        font-family: PingFangSC;
    }


    .dcf-1 {
        display: inline-block;
        background-color: #FF9900;
        color: #FFFF00;

    }

    .dcf-2 {
        display: inline-block;
        background-color: #FFFF00;
        color: #FF9900;
    }

    .dcf-3 {
        display: inline-block;
        background-color: #E4E4E4;
        color: #FF9900;
    }


</style>
