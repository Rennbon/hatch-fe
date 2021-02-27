<template>
    <div>
        <NavBar :title="title"></NavBar>
        <div id="tmp-container">
            <div class="container-border">
                <div>DreamDAO</div>
                <div>1000.23</div>
                <div>eth</div>
            </div>
            <template :key="index" v-for="(t,index) in tickers">
                <component @change="choose" @destory="handleDestroy" :ref="t.tag" :tag="t.tag" :is="t.tmp">
                    <template v-slot:content>
                        {{ t.content }}
                    </template>
                </component>
            </template>
        </div>
        <component :is="currentView" @change="choose"></component>
    </div>
</template>
<script>
    import P1 from "@/components/guide/P1.vue"
    import P2 from "@/components/guide/P2.vue"
    import P3 from "@/components/guide/P3.vue"
    import P4 from "@/components/guide/P4.vue"
    import P5 from "@/components/guide/P5.vue"
    import P6 from "@/components/guide/P6.vue"
    import P7 from "@/components/guide/P7.vue"
    import Ticker from "@/components/guide/Ticker.vue"
    import {Notify} from "vant";
    import NavBar from "@/components/bar/NavBar";

    export default {
        name: 'Guide',
        components: {
            P1,
            P2,
            P3,
            P4,
            P5,
            P6,
            P7,
            Ticker,
            NavBar
        },
        data() {
            return {
                title:"使用指南",
                currentView: P1,
                currentIndex: '1',
                tickers: [],

            }
        },
        methods: {
            appendPrevBlock(index) {
                this.tickers.push(
                    {
                        tmp: 'Ticker',
                        content: index,
                        tag: index
                    }
                )
            },
            handleDestroy(tag) {
                console.log(tag)
                this.tickers.splice(0, 1)
            },
            choose(index) {
                Notify({type: 'success', message: index});
                this.appendPrevBlock(index)
                switch (index) {
                    case '1':
                        this.currentIndex = '1'
                        this.currentView = P1;
                        break
                    case '2':
                        this.currentIndex = '2'
                        this.currentView = P2;
                        break
                    case '3':
                        this.currentIndex = '3'
                        this.currentView = P3;
                        break
                    case '4':
                        this.currentIndex = '4'
                        this.currentView = P4;
                        break
                    case '5':
                        this.currentIndex = '5'
                        this.currentView = P5;
                        break
                    case '6':
                        this.currentIndex = '6'
                        this.currentView = P6;
                        break
                    default :
                        this.currentIndex = '7'
                        this.currentView = P7;
                        break
                }
            }
        }
    }
</script>
<style scoped>
    #tmp-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin: 0px 20px;
    }

    .container-border {
        margin: calc((100% - 276px) / 6);
        height: 90px;
        width: 90px;
        border: 1px solid black;
    }

    .container-ticker {
        height: 10px;
        width: 10px;
        font-size: 10px;
    }
</style>
