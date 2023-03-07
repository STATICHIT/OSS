import { createRouter, createWebHistory, useRouter, useRoute } from 'vue-router'

//路由配置数组
const routes = [
  //   { path: '/', component: () => import('../views/home.vue') },
<<<<<<< HEAD
  { path: '/', redirect: '/index', },
  {
    path: '/index',
    component: () => import('../views/Index.vue'),
    redirect:'/login',
    children: [
      {
        path: '/login',
        component: () => import('../views/Login.vue')
      },
      {
        path: '/register',
        component: () => import('../views/Register.vue')
      },
      {
        path: '/ramLogin',
        component: () => import('../views/RamLogin.vue')
      }
    ]
  },
  {
    path: '/main',
    component: () => import('../views/Main.vue')
  },
  {
    path: '/test',
    component: () => import('../views/test.vue')
  }
=======
  // {path: '/', redirect: '/login',},
  {
    path: '/login',
    component: () => import('../views/login.vue')
  },
   { path: '/menu', component: () => import('../components/menu.vue') },
   { path: '/header', component: () => import('../components/header.vue') },
   { path: '/login', component: () => import('../views/login.vue') },
   { path: '/main', component: () => import('../views/main.vue') },
>>>>>>> d82874d (laqu)
]

//router指向的是大路由，配置路由和组件之间的应用关系
const router = createRouter({
  history: createWebHistory(),
  routes
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