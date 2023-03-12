<!-- 子页面 ———— 标签管理 -->
<template>
  <div>
    <div class="box">
      <!-- 面包屑导航 -->
      <el-breadcrumb class="el-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/home' }">云罐</el-breadcrumb-item>
        <el-breadcrumb-item>标签管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import apiFun from "../../utils/api";
//引入面包屑和地板基本样式
import "../../style/subPage.scss";
export default {};
</script>

<style lang="scss" scoped>
</style>