<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    style="
      min-height: 100vh;
      box-shadow: 10px 10px 10px -4px rgba(0, 0, 0, 0.1);
    "
  >
    <el-menu-item index="/data">
      <template #title>数据大屏</template>
    </el-menu-item>
    <el-menu-item index="/bucketList">
      <template #title>Bucket列表</template>
    </el-menu-item>
    <el-sub-menu index="/dataServer">
      <template #title>
        <span>数据服务</span>
      </template>
      <el-menu-item index="/dataCopy">数据复制</el-menu-item>
      <el-menu-item index="/dataInsert">数据导入</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="4">
      <template #title>
        <span>资源管理</span>
      </template>
      <el-menu-item index="/userManager">子用户管理</el-menu-item>
      <el-menu-item index="/tagManager">标签管理</el-menu-item>
      <el-sub-menu index="4-3">
        <template #title><span>收藏路径</span></template>
        <el-menu-item index="4-3-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <button class="open-btn" @click="isCollapse = !isCollapse">
      <el-icon class="open-icon" v-show="isCollapse"
        ><ArrowRightBold
      /></el-icon>
      <el-icon v-show="!isCollapse"
        ><ArrowLeftBold class="open-icon"
      /></el-icon>
    </button>
  </el-menu>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { ref } from "vue";
import {} from "../style/base.scss";

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
const isCollapse = ref(false);//设置主菜单收起/显示状态
</script>

<style lang="scss" scoped>
$primary-color: #6477b7;
$back-color: #f0f2f8;
$second-color: #f0f1f8;

.el-menu.el-menu-item {
  font-size: 10px;
}
.open-btn {
  border-radius: 0;
  width: 15px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid #dde0e6;
  // border-left: 0;
  background: #fff;
  height: 30px;
  position: absolute;
  bottom: 50vh;
  right: -15px;
  &:hover {
    background-color: $second-color;
  }
  transform: translateY(-50%);
  transition: right 0.3s ease-in-out;
}
.el-menu-vertical-demo.is-collapsed .open-btn {
  right: 170px;
}
.open-icon {
  color: #7e7e7e;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  // max-height: 918px;
}
.el-menu-vertical-demo.el-menu--collapse {
  width: 0px;
}
</style>
