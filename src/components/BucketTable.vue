``<template  >
    <div style="position: relative;">
  <el-table :data="state.tableData" class="bucketTable"
  highlight-current-row:true
  :header-row-class-name="'table-header-row'">
    <el-table-column prop="name" label="Bucket名称" width="210" />
    <el-table-column prop="storageLevel" label="存储类型"  />
    <el-table-column prop="capacity+'MB'" label="容量"  />
    <el-table-column prop="versionControl" label="版本控制" />
    <el-table-column prop="encryption" label="加密存储" />
    <el-table-column prop="watermark" label="图片水印" />
    <el-table-column prop="bucketAcl" label="读写权限ACL" />
    <el-table-column prop="updateTime" label="最后更新时间" />
  </el-table>
  <el-pagination
      background
      class="page"
      layout="prev, pager, next"
      :total="state.total"
      :page-size="state.pageSize"
      :current-page="state.currentPage"
      @current-change="changePage"
    />
</div>
</template>
<script setup>
import { reactive } from "vue";
import apiFun from "../utils/api";
import Mock from 'mockjs'

 const state = reactive({
   tableData:[],
   total: 200, // 总条数
   currentPage: 1, // 当前页
   pageSize: 8,
});



defineProps({
    bucketList:Object
})

const changePage = (val) => {
  state.currentPage = val
}

</script>
<style scoped>
.bucketTable{
    width: 1200px;
    margin-left: 10px;
}
/* .bucketTable:first-line{
    background-color: aqua;
} */
.table-header-row>th{
  background-color: #cbdef4;
}
::v-deep .bucketTable th{
    background-color: #EFF3F8;
}
.page{
  position: absolute;
  bottom: calc(100%-10px);
  right: 10px;
  margin-top: 20px;
}
</style>
