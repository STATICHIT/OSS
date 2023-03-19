<!-- 子页面 ———— bucket列表 -->
<template>
  <div>
    <div class="box" style="display: flex;flex-direction: column;align-items: flex-start; width: 100%;">
      <p class="header-text">Bucket列表</p>
      <p class="header-text-after">统计 Bucket 合计数据，平均延迟 1~3 小时。不作为计量数据，仅作参考</p>
      <div class="btn">
        <el-button type="primary">创建Bucket</el-button>
        <el-input
      v-model="state.searchText"
      class="w-50 m-2"
      size="large"
      style="margin-left: 2%;
      margin-bottom: 10px;
      height:34px"
      placeholder="Bucket名称"
      :suffix-icon="Search"
    />
      </div>
      <BucketTableVue></BucketTableVue>
      </div>
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

const state = reactive({
  searchText:''
})

</script>

<style lang="scss" scoped>

.btn{
  display: flex;
  flex-direction: row;
  margin-left: -17px;
 
}
</style>