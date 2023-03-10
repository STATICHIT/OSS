<template>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :class="{'is-collapse':isCollapse}"
      :collapse="isCollapse"
      :accordion="true"
      @open="handleOpen"
      @close="handleClose"

      style="min-height: 100vh;
      position: relative;
      box-shadow: 10px 10px 10px -4px rgba(0, 0, 0, 0.08);
      "
    >
    <!-- <div>
        <span class="head" v-show="!isCollapse">CloudCan云罐</span>
    </div> -->
    <el-menu-item  index="/overView">
        <el-icon><icon-menu /></el-icon>
        <template #title>概览</template>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><FolderOpened /></el-icon>
          <span>文件管理</span>
        </template>
          <el-menu-item index="/fileList">文件列表</el-menu-item>
          <el-menu-item index="/dataIndex">数据索引</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3" class="text">
        <template #title>
          <el-icon><Key /></el-icon>
          <span>权限控制</span>
        </template>
          <el-menu-item index="/writeLimit">读写权限</el-menu-item>
          <el-menu-item index="/BucketLimit">Bucket授权策略</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4" class="text">
        <template #title>
          <el-icon><List /></el-icon>
          <span>数据安全</span>
        </template>
          <el-menu-item index="/reserve">保留策略</el-menu-item>
          <el-menu-item index="/serverPsw">服务器端加密</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="6">
        <template #title>
          <el-icon><TrendCharts /></el-icon>
          <span>数据处理</span>
        </template>
          <el-menu-item index="/imgManage">图片处理</el-menu-item>
      </el-sub-menu><el-sub-menu index="7" class="text">
        <template #title>
          <el-icon><Operation /></el-icon>
          <span>Bucket配置</span>
        </template>
          <el-menu-item index="bucketTag">Bucket标签</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="deleteBucket">
        <el-icon><DeleteFilled /></el-icon>
        <template #title>删除Bucket</template>
      </el-menu-item>
      <button class="open-btn" @click="isCollapse=!isCollapse"><el-icon class="open-icon" v-show="isCollapse"><ArrowRightBold /></el-icon>
        <el-icon class="open-icon" v-show="!isCollapse"><ArrowLeftBold /></el-icon></button>
    </el-menu>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
  } from '@element-plus/icons-vue'
  import '@/style/base.scss'
  const isCollapse = ref(true)
  const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
  }
  const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
  }
  </script>
  
  <style lang="scss" scoped>

  $primary-color: #6477B7;
$back-color: #F0F2F8;
$second-color:#F0F1F8;

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 160px;
  }
  .open-icon {
  color: #7e7e7e;
}
  .open-btn{
    border-radius: 0;
    width: 20px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 1px solid #dcdfe6;
    background:#fff;
    height: 30px;
    position: absolute;
  bottom: 50%;
  right: -20px;
  &:hover {
      background-color: $second-color;
    }
    transform: translateY(-50%);
  transition: right .3s ease-in-out;
  }
  .el-menu-vertical-demo.is-collapsed .open-btn {
  right: 180px;
}
  .head{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    color: $primary-color;
    font-weight: bold;
    left: 64px;
  }


  .el-icon{
    color: #333;
  }
  </style>