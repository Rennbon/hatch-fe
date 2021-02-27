import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
// @ts-ignore
import {store} from './store/index.js'
// @ts-ignore
const app = createApp(App)
app.use(Vant)
app.use(router)
app.use(store)
app.mount('#app')
