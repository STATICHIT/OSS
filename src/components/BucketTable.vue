<!-- Bucket列表 -->
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
      <el-table-column class-name="el-table-name" prop="name" label="Bucket名称">
        <template #default="{row}">
      <router-link :to="{ path: '/bucket', query: { bucketName: row.name } }" class="el-table-link">{{ row.name }}</router-link>
    </template>
      </el-table-column>
      <el-table-column prop="storageLevel"  label="存储类型" :formatter="formatStorageLevel"/>
      <el-table-column prop="secret" label="加密存储" :formatter="formatEncryption"/>
      <el-table-column prop="bucketAcl" label="读写权限ACL" :formatter="formatAcl" />
      <el-table-column prop="createTime" label="创建时间" width="200px"/>
      <el-table-column prop="updateTime" label="最后更新时间" width="200px"/>
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
import { onMounted, reactive } from "vue";
import apiFun from "../utils/api";
import { ElMessage } from "element-plus";

/* 存储类型数据格式化 */
function formatStorageLevel(row) {
  const storageLevel = row.storageLevel
  if (storageLevel === null) {
    return "未知";
  } else {
    if(storageLevel==1){
      return '标准存储'
    }
    else{
      return '归档存储'
    }
  }
}
/* 读写权限数据格式化 */
function formatAcl(row) {
  const acl = row.bucketAcl
  if (acl === null) {
    return "未知";
  } else {
    if(acl==1){
      return '公共读写'
    } else if(acl==2){
      return 'RAM读写'
    }else if(acl==3){
      return '公共读'
    }else if(acl==4){
      return 'RAM读'
    }else if(acl==5){
      return '私有'
    }
  }
}
/* 加密存储数据格式化 */
function formatEncryption(row){
  const acl = row.secret
  if (acl === null) {
    return "无加密";
  } else {
    if(acl==1){
      return 'SM4加密'
    } else if(acl==2){
      return 'AES256加密'
    }
  }
}
const state = reactive({
  tableData: [],
  total: 200, // 总条数
  currentPage: 1, // 当前页
  pageSize: 8,
});
const props = defineProps({
  searchText:{
    type:String,
    default:''
  }
});

onMounted(()=>{
  Pre()
})

function Pre(){
  if(props.searchText!=null){
  apiFun.bucket.getList(state.currentPage,state.pageSize,props.searchText).then((res)=>{
   if(res.code==200){
    console.log(res)
    state.tableData=res.data.rows
    state.total=res.data.totalCount
   }
   else
   ElMessage.error(res.msg)
  })
}
}

defineExpose({
Pre
})

const changePage = (val) => {
  state.currentPage = val;
 Pre()
}
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
