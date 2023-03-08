<template>
    <div class="layout">
      <el-container  class="container">
        <el-aside class="aside">
          <div class="head">
            <span>对象存储OSS</span>
          </div>
          <div class="line" />
          <el-menu
            background-color="#001529"
            text-color="#fff"
            :router="true"
            font-size:20px
            width:20px
          >
          <el-menu-item index="4">
          <span style="color: #A5ACB3;margin-left: 30px;">概览</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span style="color: #A5ACB3;margin-left: 30px;">bucket列表</span>
        </el-menu-item>
            <el-sub-menu index="3">
              <template #title>
                <img src="../assets/icon1.png" class="icon">
                <span>数据服务</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/category">数据复制</el-menu-item>
                <el-menu-item index="/good">数据导入</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon><FolderOpened /></el-icon>
                <span>资源管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/">子用户管理</el-menu-item>
                <el-menu-item index="/">标签管理</el-menu-item>
                <el-sub-menu index="1-4">
            <template #title>收藏路径</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-aside>
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
    background-color: #001529;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    border-bottom:1px solid rgb(180, 180, 180);
  }
  .icon{
    height: 20px;
    margin-left: 2px;
    margin-right: 10px;
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
    color: #415D9F;
    font-weight: 600;
    font-size: 26px;
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