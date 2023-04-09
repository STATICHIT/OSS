import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
//element-plus图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './style.css'
import axios from 'axios'
// import "../mock/index.js"
import locale from 'element-plus/lib/locale/lang/zh-cn';


//全局组件
import TitleTip from './components/TitleTip.vue'
import * as buffer from "buffer"

if(typeof(window ).global === "undefined"){
  (window).grobal = window;
}
if(typeof(window).Buffer ==="undefined"){
  (window).Buffer = buffer.Buffer;
}

// 生成 Vue 实例 app
const app = createApp(App)

app.use(router)
app.use(ElementPlus,{locale})
app.use(createPinia())
// app.use(VideoPlayer)

app.component('title-tip',TitleTip)

//全局导入icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.config.globalProperties.$http = axios

//挂载到Vue根实例
app.mount('#app')
