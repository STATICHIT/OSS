import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/dist/index.css'
import {createPinia} from 'pinia'
import router from './router/index'


app.use(router)

app.use(createPinia())
app.config.globalProperties.$http = axios
createApp(App).mount('#app')
