<!-- 子页面 ———— bucket(包含子菜单及子内页) -->
<template>
  <div class="box">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="el-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">云罐</el-breadcrumb-item>
      <el-breadcrumb-item>bucket</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="container">
      <div class="aside">
        <router-view style="z-index: 1"></router-view>
        <menuVue style="z-index: 2"></menuVue>
      </div>
    </div>
  </div>
</template>

<script setup>
import menuVue from "../../components/InMenu.vue";
import "../../style/base.scss";
import { ElMessage } from "element-plus";
import apiFun from "../../utils/api";
//引入面包屑和地板基本样式
import "../../style/subPage.scss";
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.aside {
  display: flex;
  flex-direction: row;
}
</style>
