import { createApp } from 'vue'
import App from './App.vue'
// import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {createPinia} from 'pinia'
import router from './router/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './style.css'
import locale from 'element-plus/es/locale/lang/zh-cn'



//vue2才把apiFun对象赋值给vue的全局变量
/*
//把apiFun对象赋值给vue的全局变量
import apiFun from './utils/api.js';
Vue.config.productionTip = false;//阻止启动生产消息
Vue.prototype.$apiFun = apiFun;//全局使用$apiFun调用接口方法
*/

const app = createApp(App) // 生成 Vue 实例 app

app.use(router)
// app.use(store)
app.use(ElementPlus)
app.use(createPinia())

app.mount('#app')
//全局导入icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.config.globalProperties.$http = axios



  axios.defaults.baseURL = 'http://101.35.43.156:8080';//后端开发环境地址

app.use({locale}).mount('#app')
>>>>>>> Stashed changes
