import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
// @ts-ignore
import {store} from './store/index.js'


function setRem() {

    // 320 默认大小16px; 320px = 20rem ;每个元素px基础上/16
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    //得到html的Dom元素
    let htmlDom = document.getElementsByTagName('html')[0];
    //设置根元素字体大小

    console.log(htmlWidth)
    if ( htmlWidth >= 425){
        htmlDom.style.fontSize = htmlWidth / 20 + 'px';
    }else if ( htmlWidth >= 375){
        htmlDom.style.fontSize = htmlWidth / 19 + 'px';
    }else if (htmlWidth>=340){
        htmlDom.style.fontSize = htmlWidth / 18 + 'px';
    }else{
        htmlDom.style.fontSize = htmlWidth / 16 + 'px';
    }
}

setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
    setRem()
}


// @ts-ignore
const app = createApp(App)
app.use(Vant)
app.use(router)
app.use(store)
app.mount('#app')
