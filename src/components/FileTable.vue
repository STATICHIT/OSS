<!-- 文件表格组件 -->
<template>
  <div style="position: relative;">
    <el-table
      highlight-current-row:true
      :row-height="500"
      class="table"
      :data="tableData"
      size="large"

      ref="multipleTableRef"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"
       width="55">
       </el-table-column>

      <el-table-column
        class-name="el-table-name"
        prop="name"
        label="文件名"
        width="190"
      >
        <template #default="scope">
          <FileIcon :fileName="scope.row.name" :isFolder="scope.row.isFolder" @click="$emit('toFile',scope.$index)"></FileIcon>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="文件大小"  :formatter="formatSize" />
      <el-table-column prop="capacity" label="存储类型" />
      <el-table-column prop="lastUpdateTime" label="更新时间" />
      <!-- 操作 -->
      <el-table-column
        label="操作"
      >
        <template #default="scope">
          <!-- 加其他操作按钮的插槽 -->
          <el-button
            @click="$emit('handleMsg',scope.$index)"
            type="text"
            size="small"
            width="250px"
            v-show="!scope.row.isFolder"
            >详情</el-button
          >
          <el-button
            @click="$emit('deleteFile',scope.$index)"
            text
            type="danger"
            style="margin-left: -2px;"
            size="small"
            >彻底删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;flex-direction: row;">
    <div class="btn-list">
      <el-button size="large" :disabled="btnDisabled">下载</el-button>
      <el-popconfirm
    width="220"
    confirm-button-text="确认"
    cancel-button-text="取消"
    icon-color="#626AEF"
    title="确认全部解冻吗？"
    @confirm="$emit('getThaw',multipleSelection.value)"
  >
    <template #reference>
      <el-button :disabled="btnDisabled" size="large">解冻</el-button>
    </template>
  </el-popconfirm>
      <el-button size="large" :disabled="btnDisabled" @click="$emit('addLabel')">标签</el-button>
      <el-button size="large" :disabled="btnDisabled" @click="$emit('showUpdateAcl')">设置读写权限</el-button>
      <el-popconfirm
    width="220"
    confirm-button-text="确认"
    cancel-button-text="取消"
    icon-color="#626AEF"
    title="确认全部删除吗？"
    @confirm="$emit('deleteMoreFile',multipleSelection.value)"
  >
    <template #reference>
      <el-button size="large" :disabled="btnDisabledDel" >彻底删除</el-button>
    </template>
  </el-popconfirm>
    </div>
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
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import apiFun from "../utils/api";
import FileIcon from "./FileIcon.vue";
import { computed } from "vue";
import router from "../router";
import { useRoute } from "vue-router";

const prop = defineProps({
  //文件对象列表
  tableData:{
    type:Array,
  default:()=>[],
},
  state:{
    type:Object,

  }
})


/* 文件大小数据格式化 */
function formatSize(row) {
  const size = row.size
  if (size === null) {
    return "未知";
  } else {
    return `${size}KB`;
  }
}

const multipleSelection = reactive([])
const multipleTableRef = ref()

const changePage = (val) => {
  $emit('getPage')
  prop.state.currentPage = val;
};
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
/* 禁用按钮 */
const btnDisabled = computed(()=>{
  if(!multipleSelection.value){
    return true;
  }else{
   if(multipleSelection.value.length==0){
     return true
   }else{
    const hasFolder = multipleSelection.value.some((item) => {
      return item.isFolder === true;
    })
    return hasFolder;
   }
  }
})
/* 禁用删除按钮 */
const btnDisabledDel = computed(()=>{
  if(!multipleSelection.value){
    return true;
  }else{
   if(multipleSelection.value.length==0){
     return true
   }else
   return false
  }
})
const toggleSelection = (rows) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value.clearSelection()
  }
}

</script>
<style scoped>

::v-deep .table th {
  background-color: #eff3f8;
}
::v-deep.table td{
  text-align: left;
}
.option-class {
  display: flex;
  flex-direction: row;
}
.el-table-link {
  color: #3299ff;
  text-decoration: none;
}
.btn-list {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 15px;
  margin-bottom: 20px;
}
.page {
  position: absolute;
  bottom: calc(100%-10px);
  right: 10px;
  margin-top: 20px;
}
.file-icon-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 35px;
}

.file-name {
  margin-left: 35px;
  font-size: 15px;
}
</style>
