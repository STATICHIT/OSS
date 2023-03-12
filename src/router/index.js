import { createRouter, createWebHistory, useRouter, useRoute } from 'vue-router'

//路由配置数组
const routes = [
  //   { path: '/', component: () => import('../views/home.vue') },
  { path: '/', redirect: '/home', },
  {
    // 登录注册底页
    path: '/index',
    component: () => import('../views/Index.vue'),
    redirect: '/login',
    children: [
      {
        // 登录模块
        path: '/login',
        component: () => import('../views/Login.vue')
      },
      {
        // 注册模块
        path: '/register',
        component: () => import('../views/Register.vue')
      },
      {
        // RAM用户登录模块
        path: '/ramLogin',
        component: () => import('../views/RamLogin.vue')
      }
    ]
  },
  {
    //客户端主页面(ls的主页框架写好之后可以直接连接这个链接)
    path: '/main',
    component: () => import('../views/Main.vue')
  },
  {
    //关于树形列表的测试
    path: '/test',
    component: () => import('../views/treetable_test.vue')
  },
  {
    //菜单控件
    path: '/menu',
    component: () => import('../components/menu.vue')
  },
  {
    //头部控件
    path: '/header',
    component: () => import('../components/header.vue')
  },
  {
    //主菜单
    path: '/menu',
    component: () => import('../components/Menu.vue')
  },
  {
    //bucket菜单
    path: '/inMenu',
    component: () => import('../components/InMenu.vue')
  },
  {
    //头部
    path: '/header',
    component: () => import('../components/Header.vue')
  },
  {
    //客户端底部
    path: '/home',
    component: () => import('../views/Home.vue'),
    redirect: '/dataScreen',
    children: [
      {
        //数据大屏
        path: '/dataScreen',
        component: () => import('../views/subpages/DataScreen.vue')
      },
    ]
  },
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