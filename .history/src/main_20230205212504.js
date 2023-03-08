import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/dist/index.css'
import {createPinia} from 'pinia'
import router from './router/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './style.css'
import locale from 'element-plus/es/locale/lang/zh-cn'


const app = createApp(App) // 生成 Vue 实例 app

app.use(router)

app.use(createPinia())
app.use(ElementPlus)

app.config.globalProperties.$http = axios



  axios.defaults.baseURL = 'http://101.35.43.156:8080';//后端开发环境地址

app.use(ElementPlus,{locale,El}).mount('#app')
