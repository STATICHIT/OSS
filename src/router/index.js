import { createRouter, createWebHashHistory, useRouter, useRoute } from 'vue-router'

const routes = [
  //   { path: '/', component: () => import('../views/home.vue') },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {path: '/', redirect: '/login',},
    {
      path: '/login',
      component: () => import('../views/login.vue')
    }
  ]
})

/*
//设置路由守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    // 如果路径是 /login 则正常执行
    next()
  } else {
    // 如果不是 /login，判断是否有 to ken
    if (!localStorage.getItem('user')) {
      // 如果没有，则跳至登录页面
      next({ path: '/login' })
    } else {
      // 否则继续执行
      next()
    }
  }
})
*/


export default router