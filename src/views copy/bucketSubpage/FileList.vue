<!-- bucket子页面 ———— 文件列表-->
<template>
  <div class="file-list">
    <div class="titleTip">
    <h4 class="title">{{ title }}</h4>
    <el-popover
      class="more"
      placement="top-start"
      title="功能提示"
      :width="width"
      trigger="hover"
      :content="content"
    >
      <template #reference>
        <el-icon><Tickets /></el-icon>
      </template>
    </el-popover>
        <div class="btn-list">
      <el-button type="primary" size="large">上传文件</el-button>
      <el-button type="warning" size="large">新建目录</el-button>
      <el-button size="large">碎片管理</el-button>
      <el-button size="large" style="padding: 0 33px">授权</el-button>
      <el-input
        v-model="state.searchText"
        class="w-50 m-2"
        size="large"
        style="margin-left: 2%"
        placeholder="请输入文件名前缀匹配"
        :suffix-icon="Search"
      />
    </div>
  </div>
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { reactive } from "vue";
import TitleTip from "../../components/TitleTip.vue";

const state = reactive({
  title: "文件列表",
  content:
    "对象(Object)是OSS存储数据的基本单元,也被称为OSS的文件。和传统的文件系统不同,Object没有文件目录层级结构的关系。",
  searchText: "",
});
</script>

<style lang="scss" scoped>
.file-list {
  padding: 25px;
  display: flex;
  flex-direction: column;
}
.btn-list {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 20px;
}
.titleTip {
  margin-bottom: 10px;
}
.title {
  float: left;
  line-height: 15px;
  margin-right: 7px;
}
.more {
  float: left;
}
</style>
