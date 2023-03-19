<!-- 子页面 ———— bucket列表 -->
<template>
  <div class="box">
    <TitleTip :title="state.title" :content="state.content"></TitleTip>
    <div class="btn">
      <el-button type="primary">创建Bucket</el-button>
      <el-input
        v-model="state.searchText"
        class="w-50 m-2"
        size="large"
        style="margin-left: 2%; margin-bottom: 10px; height: 34px"
        placeholder="Bucket名称"
        :suffix-icon="Search"
      />
    </div>
    <BucketTableVue class="bucketTable"></BucketTableVue>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import apiFun from "../../utils/api";
//引入面包屑和地板基本样式
import "../../style/subPage.scss";
import { reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import BucketTableVue from "../../components/BucketTable.vue";
import TitleTip from "../../components/TitleTip.vue";

const state = reactive({
  searchText: "",
  title: "Bucket列表",
  content: "统计 Bucket 合计数据，平均延迟 1~3 小时。不作为计量数据，仅作参考",
});
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0;
  width: 100%;
}
.btn {
  display: flex;
  flex-direction: row;
  margin-left: -20px;
}
.bucketTable {
  margin-left: -10px;
  width: 100%;
}
</style>