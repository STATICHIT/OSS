import { createRouter, createWebHistory ,useRouter,useRoute} from 'vue-router'

const routes = [
  { path: '/', component: () => import('../views/login.vue') },
  { path: '/home', component: () => import('../views/home.vue') },
  { path: '/good', component: () => import('../views/good.vue') },
  { path: '/order', component: () => import('../views/order.vue') },
  { path: '/add', component: () => import('../views/addGoods.vue') },
  { path: '/orderDetail', component: () => import('../views/orderDetail.vue') },
  { path: '/user', component: () => import('../views/user.vue') },
  { path: '/updateUser', component: () => import('../views/updateUser.vue') },
  { path: '/updateShop', component: () => import('../views/updateShop.vue') },




  




  
]

 
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    // 如果路径是 /login 则正常执行
    next()
  } else {
    // 如果不是 /login，判断是否有 token
    if (!localStorage.getItem('user')) {
      // 如果没有，则跳至登录页面
      next({ path: '/login' })
    } else {
      // 否则继续执行
      next()
    }
  }
})

export default router