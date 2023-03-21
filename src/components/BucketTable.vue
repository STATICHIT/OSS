<template  >
  <div style="position: relative;">
    <el-table
      :data="state.tableData"
      class="bucketTable"
      highlight-current-row:true
      :header-row-class-name="'table-header-row'"
      style="width:100%"
      size="large"
    >
      <el-table-column class-name="el-table-name" prop="name" label="Bucket名称" width="190" >
        <template #default="{row}">
      <router-link :to="{ path: '/bucket', query: { id: row.id } }" class="el-table-link">{{ row.name }}</router-link>
    </template>
      </el-table-column>
      <el-table-column prop="storageLevel"  label="存储类型" />
      <el-table-column prop="capacity" label="容量" />
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
import Mock from "mockjs";


const state = reactive({
  tableData: [
    {
      name: "bucket1",
      storageLevel: "标准存储1",
      capacity: "476.12MB",
      versionControl: "已开启",
      encryption: "是",
      watermark: "有",
      bucketAcl: "只读",
      updateTime: "2023年03月19日 19:38",
    },
    {
      name: "bucket1",
      storageLevel: "标准存储1",
      capacity: "476.12MB",
      versionControl: "已开启",
      encryption: "是",
      watermark: "有",
      bucketAcl: "只读",
      updateTime: "2023年03月19日 19:38",
    },
    {
      name: "bucket1",
      storageLevel: "标准存储1",
      capacity: "476.12MB",
      versionControl: "已开启",
      encryption: "是",
      watermark: "有",
      bucketAcl: "只读",
      updateTime: "2023年03月19日 19:38",
    },
    {
      name: "bucket1",
      storageLevel: "标准存储1",
      capacity: "476.12MB",
      versionControl: "已开启",
      encryption: "是",
      watermark: "有",
      bucketAcl: "只读",
      updateTime: "2023年03月19日 19:38",
    },
    {
      name: "bucket1",
      storageLevel: "标准存储1",
      capacity: "476.12MB",
      versionControl: "已开启",
      encryption: "是",
      watermark: "有",
      bucketAcl: "只读",
      updateTime: "2023年03月19日 19:38",
    },
    {
      name: "bucket1",
      storageLevel: "标准存储1",
      capacity: "476.12MB",
      versionControl: "已开启",
      encryption: "是",
      watermark: "有",
      bucketAcl: "只读",
      updateTime: "2023年03月19日 19:38",
    },
    {
      name: "bucket1",
      storageLevel: "标准存储1",
      capacity: "476.12MB",
      versionControl: "已开启",
      encryption: "是",
      watermark: "有",
      bucketAcl: "只读",
      updateTime: "2023年03月19日 19:38",
    },
  ],
  total: 200, // 总条数
  currentPage: 1, // 当前页
  pageSize: 7,
});

defineProps({
  bucketList: Object,
});

const changePage = (val) => {
  state.currentPage = val;
};
</script>
<style scoped>
.bucketTable {
  width: 1350px;
  margin-left: 10px;
}
/* .bucketTable:first-line{
    background-color: aqua;
} */

.el-table-link{
  color: #3299ff;
  text-decoration: none;
}
::v-deep .bucketTable th {
  background-color: #eff3f8;
}
::v-deep .el-table-name tr {
  color: #55aaff;
}
.page {
  position: absolute;
  bottom: calc(100%-10px);
  right: 10px;
  margin-top: 20px;
}
</style>
