/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-19 15:53:44
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-03-19 20:19:31
 * @FilePath: \OSS\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
import "../mock/index.js"
import locale from 'element-plus/lib/locale/lang/zh-cn';


//全局组件
import TitleTip from './components/TitleTip.vue'

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
