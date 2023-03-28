<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :accordion="true"
    @open="handleOpen"
    @close="handleClose"
    router="true"
  >
    <el-menu-item index="/overView" class="el-menu-font">
      <template #title>概览</template>
    </el-menu-item>
    <el-menu-item index="/fileList" class="el-menu-font">
      <template #title>文件列表</template>
    </el-menu-item>
    <el-menu-item index="/permissionControl" class="el-menu-font">
      <template #title>权限控制</template>
    </el-menu-item>
    <el-sub-menu index="4" class="text">
      <template #title>
        <span class="el-menu-font">数据安全</span>
      </template>
      <el-menu-item index="/retentionPolicies">保留策略</el-menu-item>
      <el-menu-item index="/serverSideEncryption">服务器端加密</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="6">
      <template #title>
        <span class="el-menu-font">数据处理</span>
      </template>
      <el-menu-item index="/imageProcessing"
        >图片处理</el-menu-item
      > </el-sub-menu
    ><el-sub-menu index="7" class="text">
      <template #title>
        <span class="el-menu-font">Bucket配置</span>
      </template>
      <el-menu-item index="bucketLabel">Bucket标签</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="deleteBucket" class="el-menu-font">
      <template #title>删除Bucket</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import "@/style/base.scss";
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
$primary-color: #6477b7;
$back-color: #f0f2f8;
$second-color: #f0f1f8;

.el-menu-vertical-demo {
  min-height: 87vh;
  min-width: 200px;
  max-width: 200px;
  position: relative;
  margin-left: -2.4%;
  border: 0;
  border-right: 1px solid #d3d4d5;
}
.el-menu-font {
  font-weight: bold;
  color: #4e4e4e;
}
</style>
