<template>
  <div class="table">
    <!-- <p style="color: #02305b;">对象存储OSS</p> -->
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
    background-color: #011528;
    min-height: 100vh;
}
</style>