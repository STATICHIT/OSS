<template>
  <div class="titleTip">
    <h3 class="title">{{ title }}</h3>
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
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  title: {
    type: String,
    default: "这是一个页面",
  },
  tip: {
    type: String,
    default: "功能提示", //还可以是功能介绍、应用场景、使用方法等
  },
  content: {
    type: String,
    default: "暂无设置",
  },
  width: {
    type: Number,
    default: 300,
  },
});
</script>

<style lang="scss" scoped>
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