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
    ]
  },
  {
    //关于上传文件的测试
    path: '/test',
    component: () => import('../views/test1.vue')
  },
  {
    //关于图片压缩的测试
    path: '/test2',
    component: () => import('../views/test2.vue')
  },
  {
    //关于视频压缩的测试
    path: '/test3',
    component: () => import('../views/test3.vue')
  },
  {
    //头部控件
    path: '/header',
    component: () => import('../components/Header.vue')
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
    //客户端底页
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
        //列表模板，列表都可以拿这个组件用，到时候统一更改样式
        path: '/tableModel',
        component: () => import('../components/TableModel.vue'),
        meta: { title: 'Bucket 列表' },
      },
      {
        //数据复制
        path: '/dataCopy',
        component: () => import('../views/subpages/DataCopy.vue'),
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
        path: '/sub',
        redirect: '/userManage',
        meta: { title: '资源管理', hidden: true },
        children: [
          {
            path: "/userManage",  //子用户管理
            component: () => import('../views/subpages/SubUserManage.vue'),
            meta: { title: '子用户管理' },
          }, {
            path: "/createUser",   //创建子用户
            component: () => import('../views/subpages/CreateUser.vue'),
            meta: {
              title: '创建子用户'
            },
          },
        ]
      },
      {
        //Bucket(包含子菜单及子内页)
        path: '/bucket',
        component: () => import('../views/subpages/Bucket.vue'),
        redirect: '/fileList',//初始显示在文件列表页面
        meta: { title: "bucketName" },
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
            //上传文件列表
            path: '/uploadFiles',
            component: () => import('../views/bucketSubpage/UploadFiles.vue'),
            meta: { title: '上传文件' },
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
            //视频处理
            path: '/videoProcessing',
            component: () => import('../views/bucketSubpage/VideoProcessing.vue'),
            meta: { title: '视频处理' }
          },
          {
            //Bucket其他设置
            path: '/bucketSetting',
            component: () => import('../views/bucketSubpage/BucketSetting.vue'),
            meta: { title: '其他设置' },
          },
          {
            //Bucket标签
            path: '/bucketLabel',
            component: () => import('../views/bucketSubpage/BucketLabel.vue'),
            meta: { title: 'Bucket标签' },
          },
          {
            //删除Bucket
            path: '/deleteBucket',
            component: () => import('../views/bucketSubpage/DeleteBucket.vue'),
            meta: { title: '删除Bucket' },
          },
          {
            //文件表格测试
            path: '/fileTable',
            component: () => import('../components/FileTable.vue'),
            meta: { title: '文件表格' },
          },
          {
            //操作测试页面
            path: '/actionTest',
            component: () => import('../views/ActionTest.vue')
          },
          {
            //文件图标
            path: '/fileIcon',
            component: () => import('../components/FileIcon.vue'),
          },
          {
            //碎片管理
            path: '/fragment',
            component: () => import('../views/bucketSubpage/Fragment.vue'),
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
    // 如果不是 /login，判断是否有 token
    if (!localStorage.getItem('token')) {
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