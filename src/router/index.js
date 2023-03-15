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
    redirect: '/dataScreen',//初始显示在数据大屏页
    meta: { title: '云罐' },
    children: [
      {
        //数据大屏
        path: '/dataScreen',
        component: () => import('../views/subpages/DataScreen.vue'),
        meta: { title: '数据大屏' },
      },
      {
        //Bucket 列表
        path: '/bucketList',
        component: () => import('../views/subpages/BucketList.vue'),
        meta: { title: 'Bucket 列表' },
      },
      {
        //数据复制
        path: '/dataCopy',
        component: () => import('../views/subpages/dataCopy.vue'),
        meta: { title: '数据复制' },
      },
      {
        //数据导入
        path: '/dataImport',
        component: () => import('../views/subpages/DataImport.vue'),
        meta: { title: '数据导入' },
      },
      {
        //子用户管理
        path: '/subUserManage',
        component: () => import('../views/subpages/SubUserManage.vue'),
        meta: { title: '子用户管理' },
      },
      {
        //标签管理
        path: '/labelManage',
        component: () => import('../views/subpages/LabelManage.vue'),
        meta: { title: '标签管理' },
      },
      {
        //Bucket(包含子菜单及子内页)
        path: '/bucket',
        component: () => import('../views/subpages/Bucket.vue'),
        redirect: '/fileList',//初始显示在文件列表页面
        meta: { title: '当前Bucket名' },
        children: [
          {
            //概览
            path: '/overview',
            component: () => import('../views/bucketSubpage/Overview.vue'),
            meta: { title: '概览' },
          },
          {
            //文件列表
            path: '/fileList',
            component: () => import('../views/bucketSubpage/FileList.vue'),
            meta: { title: '文件列表' },
          },
          {
            //数据索引
            path: '/dataIndex',
            component: () => import('../views/bucketSubpage/DataIndex.vue'),
            meta: { title: '数据索引' },
          },
          {
            //权限控制
            path: '/permissionControl',
            component: () => import('../views/bucketSubpage/PermissionControl.vue'),
            meta: { title: '权限控制' },
          },
          {
            //保留策略
            path: '/retentionPolicies',
            component: () => import('../views/bucketSubpage/RetentionPolicies.vue'),
            meta: { title: '保留策略' },
          },
          {
            //服务器端加密
            path: '/serverSideEncryption',
            component: () => import('../views/bucketSubpage/ServerSideEncryption.vue'),
            meta: { title: '服务器端加密' },
          },
          {
            //图片处理
            path: '/imageProcessing',
            component: () => import('../views/bucketSubpage/ImageProcessing.vue'),
            meta: { title: '图片处理' },
          },
          {
            //Bucket标签
            path: '/bucketLabel',
            component: () => import('../views/bucketSubpage/BucketLabel.vue'),
            meta: { title: 'Bucket标签' },
          },
        ]
      }
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