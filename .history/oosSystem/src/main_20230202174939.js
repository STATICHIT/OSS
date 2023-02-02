import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/dist/index.css'
import {createPinia} from 'pinia'
import router from './router/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


app.use(router)

app.use(createPinia())

app.config.globalProperties.$http = axios

app.config.globalProperties.$filters = {
    orderMap(status) {
      return orderStatus[status] || '未知状态'
    },
    prefix(url) {
      if (url && url.startsWith('http')) {
        return url
      } else {
        url = `http://backend-api-02.newbee.ltd${url}`
        return url
      }
    }
  }

  axios.defaults.baseURL = 'http://localhost:8080';//后端开发环境地址

createApp(App).mount('#app')
