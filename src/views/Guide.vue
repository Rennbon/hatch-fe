<template>
    <div>
        <NavBar :title="title"></NavBar>
        <div id="guide-border">
            <div id="tmp-container">
                <div class="container-border">
                    <div id="dm-name">Dream DAO</div>
                    <div id="dm-amount">1000.23</div>
                    <div id="dm-unit">ETH</div>
                </div>
                <template :key="index" v-for="(t,index) in tickers">
                    <component @change="choose" @destory="handleDestroy" :ref="t.tag" :tag="t.tag" :is="t.tmp">
                        <template v-slot:content>
                            <div class="ticker-cnt" :style="{transform:`${t.translate}`}">{{ t.content }}</div>
                        </template>
                    </component>
                </template>
            </div>
            <component class="guide-cp" :is="currentView" @change="choose"></component>
        </div>
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
                title: "使用指南",
                currentView: P1,
                currentIndex: '1',
                tickers: [],


            }
        },
        methods: {
            appendPrevBlock(index) {
                let ct = this.getContent(index)
                let prvIndex = "1"
                let translate = "translate(-50%,25%)"
                switch (index) {
                    case '2':
                        translate = "translate(-50%,25%)"
                        prvIndex = '1';
                        break
                    case '3':
                        translate = "translate(-50%,85%)"
                        prvIndex = '2';
                        break
                    case '4':
                        translate = "translate(-50%,45%)"
                        prvIndex = '3';
                        break
                    case '5':
                        prvIndex = '4';
                        break
                    case '6':
                        prvIndex = '5';
                        break
                    case '7':
                        translate = "translate(-50%,5%)"
                        prvIndex = '6';
                        break
                    default :
                        translate = "translate(-50%,55%)"
                        prvIndex = '7';
                        break
                }
                this.tickers.push(
                    {
                        tmp: 'Ticker',
                        content: ct,
                        tag: prvIndex,
                        translate: translate,

                    }
                )
            },
            handleDestroy(tag) {
                console.log(tag)
                this.tickers.splice(0, 1)
            },
            getContent(index) {
                switch (index) {
                    case '2':
                        return "What is Dream DAO?"
                    case '3':
                        return "How to Play?"
                    case '4':
                        return "How to Play bigger?"
                    case '5':
                        return "How to startups get money?"
                    case '6':
                        return "How do investors make money?"
                    case '7':
                        return "What startups wanna to capitalized from DFund?"
                    default :
                        return "Create my fund"
                }
            },
            choose(index) {
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
    div {
        padding: 0;
        margin: 0;
    }

    #guide-border {
        position: relative;
        width: calc(100vw);
        height: calc(100vh - 100px);
        padding: 0px;
        margin: 0px;
    }

    #tmp-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        position: absolute;
        width: 100%;
        z-index: 1000;
    }


    .guide-cp {
        position: absolute;
    }

    .container-border {
        margin: calc((100% - 588px) / 6);
        height: 196px;
        width: 196px;
        border-radius: 20px 20px 20px 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .25), 0 0 10px rgba(0, 0, 0, .25);
    }

    #dm-name {
        font-family: Helvetica;
        font-size: 28px;
        font-weight: bold;
        margin-top: 36px;
    }

    #dm-amount {
        font-family: Helvetica;
        font-size: 24px;
        margin-top: 10px;
    }

    #dm-unit {
        font-family: Helvetica;
        font-size: 28px;
        margin-top: 10px;
    }

    .container-ticker {
        height: 10px;
        width: 10px;
        font-size: 10px;
    }

    .ticker-cnt {
        position: absolute;
        left: 50%; /* 定位父级的50% */
        top: 50%;
        font-size: 26px;
        padding: 4px;
        font-weight: bold;
        font-family: Helvetica;
        align-items: center;
    }

</style>
