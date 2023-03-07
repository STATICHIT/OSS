<!-- <template>
  <div class="table">
    <span class="head">对象存储OSS</span>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :router="true"
        style="background-color: #001529;"
      >
      <el-menu-item index="4">
          <span style="color: #A5ACB3;">概览</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span style="color: #A5ACB3;">bucket列表</span>
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>数据服务</span>
          </template>
            <el-menu-item index="1-1">数据复制</el-menu-item>
            <el-menu-item index="1-2">数据导入</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style>
.aside {
  width: 200px!important;
  background-color: #001529;
}
.table{
    width: 200px;
    background-color: #001529;
    min-height: 100vh;
}
.head{
    color: #415D9F;
    font-size: 26px;
    font-weight: 600;
    margin: 20px;
}
</style> -->
<template>
    <div class="layout">
      <el-container  class="container">
        <el-aside class="aside">
          <div class="head">
            <span>对象存储OSS</span>
          </div>
          <div class="line" />
          <el-menu
            background-color="#222832"
            text-color="#fff"
            :router="true"
          >
            <el-sub-menu index="1">
              <template #title>
                <span>{{shopStore.sname}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/"><el-icon><Odometer /></el-icon>首页</el-menu-item>
                <el-menu-item index="/add"><el-icon><Plus /></el-icon>添加商品</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
             <!-- <el-sub-menu index="2">
              <template #title>
                <span>首页配置</span>
              </template> -->
              <!-- <el-menu-item-group>
                <el-menu-item index="/swiper"><el-icon><Picture /></el-icon>轮播图配置</el-menu-item>
                <el-menu-item index="/hot"><el-icon><StarFilled /></el-icon>热销商品配置</el-menu-item>
                <el-menu-item index="/new"><el-icon><Sell /></el-icon>新品上线配置</el-menu-item>
                <el-menu-item index="/recommend"><el-icon><ShoppingCart /></el-icon>为你推荐配置</el-menu-item>
              </el-menu-item-group> -->
            <!-- </el-sub-menu> -->
            <el-sub-menu index="3">
              <template #title>
                <span>模块管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/category"><el-icon><Menu /></el-icon>分类管理</el-menu-item>
                <el-menu-item index="/good"><el-icon><Goods /></el-icon>商品管理</el-menu-item>
                <!-- <el-menu-item index="/guest"><el-icon><User /></el-icon>会员管理</el-menu-item> -->
                <el-menu-item index="/order"><el-icon><List /></el-icon>订单管理</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <span>系统管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/account"><el-icon><Lock /></el-icon>修改密码</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-container class="content">
          <Header />
          <div class="main">
            <router-view />
          </div>
          <Footer />
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
  </script>
  
  <style scoped>
  .layout {
    min-height: 100vh;
    background-color: #ffffff;
  }
  .container {
    height: 100vh;
  }
  .aside {
    width: 200px!important;
    background-color: #222832;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
  }
  .head > div {
    display: flex;
    align-items: center;
  }
  
  .head img {
    width: 80px;
    height: 80px;
  }
  .head span {
    font-size: 20px;
    color: #ffffff;
  }
  .line {
    border-top: 1px solid hsla(0,0%,100%,.05);
    border-bottom: 1px solid rgba(0,0,0,.2);
  }
  .content {
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    overflow: hidden;
  }
  .main {
    height: calc(100vh - 100px);
    overflow: auto;
    padding: 10px;
  }
  </style>
  
  <style>
    body {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }
    .el-menu {
      border-right: none!important;
    }
    .el-submenu {
      border-top: 1px solid hsla(0, 0%, 100%, .05);
      border-bottom: 1px solid rgba(0, 0, 0, .2);
    }
    .el-submenu:first-child {
      border-top: none;
    }
    .el-submenu [class^="el-icon-"] {
      vertical-align: -1px!important;
    }
    a {
      color: #409eff;
      text-decoration: none;
    }
    .el-pagination {
      text-align: center;
      margin-top: 20px;
    }
    .el-popper__arrow {
      display: none;
    }
  </style>