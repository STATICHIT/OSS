<!-- 文件列表组件 -->
<template  >
    <div style="position: relative;">
  <el-table :data="state.tableData" class="bucketTable"
  highlight-current-row:true
  height:100px
  :header-row-class-name="'table-header-row'">
  <el-table-column type="selection" width="55" />
  <el-icon><Files /></el-icon>
    <el-table-column prop="name" label="文件名" width="190" />
    <el-table-column prop="size" label="文件大小"  />
    <el-table-column prop="capacity" label="存储类型"  />
    <el-table-column prop="updateTime" label="更新时间" />
    <el-table-column class="operation" label="操作">
        <el-button text class="el-btn" size="small"
          >查看详情</el-button
        >
        <el-dropdown>
    <span class="el-dropdown-link">
        <el-icon class="el-icon"><MoreFilled /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>设置读写权限</el-dropdown-item>
        <el-dropdown-item>修改存储类型</el-dropdown-item>
        <el-dropdown-item>下载</el-dropdown-item>
        <el-dropdown-item>彻底删除</el-dropdown-item>
        <el-dropdown-item disabled>选取内容</el-dropdown-item>
        <el-dropdown-item divided>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
    </el-table-column>
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
   tableData:[{name:'img01.jpg',size:32.3,capacity:'标准存储',updateTime:'2021年3月21日'}],
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
.el-icon{
    transform: rotate(90deg);
    margin-top: 6px;
}

.table-header-row>th{
  background-color: #cbdef4;
}
::v-deep .table th {
  background-color: #eff3f8;
}
.page{
  position: absolute;
  bottom: calc(100%-10px);
  right: 10px;
  margin-top: 20px;
}
.el-btn{
    color: #0064cb;
    font-size: 14px;
    margin-left: -10px;
}
.operation{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>
