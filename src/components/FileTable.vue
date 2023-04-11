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
        width="300"
      >
        <template #default="scope">
          <FileIcon :fileName="scope.row.name" :index="scope.$index" :isFolder="scope.row.isFolder" @rename="rename" @toFile="$emit('toFile',scope.$index)"></FileIcon>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="文件大小"  :formatter="formatSize" />
      <el-table-column prop="lastUpdateTime" label="更新时间" />
      <!-- 操作 -->
      <el-table-column
        label="操作"
      >
        <template #default="scope">
          <!-- 加其他操作按钮的插槽 -->
          <el-button
            @click="$emit('toFile',scope.$index)"
            link
            type="primary"
            size="small"
            v-show="!scope.row.isFolder"
            >详情</el-button
          >
          <el-button
            @click="$emit('preview',scope.$index)"
            link
            type="primary"
            size="small"
            v-show="!scope.row.isFolder"
            >预览</el-button
          >
      <el-button link
       type="primary"
       size="small"
       v-show="!scope.row.isFolder"
       @click="$emit('addLabel',scope.$index)"
       >标签</el-button>
          <el-button
            @click="$emit('deleteFile',scope.$index)"
            link
            v-show="!scope.row.isFolder"
            type="danger"
            size="small"
            >删除</el-button
          >
          <el-button
            @click="$emit('deleteFile',scope.$index)"
            link
            v-show="scope.row.isFolder"
            style="margin-left: -2px;"
            type="danger"
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

const emit = defineEmits(['getPage','addLabel','toFile','preview','rename'])

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
const rename = (msg) => {
  let index = msg['index']
  let newName = msg['newName']
  console.log(index+newName+'111')
  emit('rename',{index:index,newName:newName})
}
/* 文件大小数据格式化 */
function formatSize(row) {
  let size = row.size
  if (size === null) {
    return "";
  } else {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }
  return `${size.toFixed(2)} ${units[index]}`;
  }
}

const multipleSelection = reactive([])
const multipleTableRef = ref()

const changePage = (val) => {
  prop.state.currentPage = val;
  emit('getPage')
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
