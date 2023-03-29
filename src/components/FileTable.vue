<!-- 文件表格组件 -->
<template>
  <div style="position: relative;">
    <el-table
      highlight-current-row:true
      :row-height="500"
      class="table"
      :data="tableData"
      size="large"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

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
      <el-table-column prop="size" label="文件大小" />
      <el-table-column prop="capacity" label="存储类型" />
      <el-table-column prop="lastUpdateTime" label="更新时间" />
      <!-- 操作 -->
      <el-table-column
        label="操作"
      >
        <template #default="scope">
          <!-- 加其他操作按钮的插槽 -->
          <el-button
            v-if="!tableData.isFolder"
            @click="$emit('handleMsg',scope.$index)"
            type="text"
            style="margin-left: -5%"
            size="small"
            width="250px"
            >详情</el-button
          >
          <el-button
          v-if="!tableData.isFolder"
            @click="$emit('deleteFile',scope.$index)"
            text
            type="danger"
            size="small"
            >彻底删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;flex-direction: row;">
    <div class="btn-list">
      <el-button size="large">下载</el-button>
      <el-popconfirm
    width="220"
    confirm-button-text="确认"
    cancel-button-text="取消"
    :icon="InfoFilled"
    icon-color="#626AEF"
    title="确认全部解冻吗？"
  >
    <template #reference>
      <el-button size="large" @click="$emit('getThaw')">解冻</el-button>
    </template>
  </el-popconfirm>
      <el-button size="large" @click="$emit('addLabel')">标签</el-button>
      <el-button size="large" @click="$emit('updateCapacity')">修改存储类型</el-button>
      <el-button size="large" @click="$emit('showUpdateAcl')">设置读写权限</el-button>
      <el-popconfirm
    width="220"
    confirm-button-text="确认"
    cancel-button-text="取消"
    :icon="InfoFilled"
    icon-color="#626AEF"
    title="确认全部删除吗？"
  >
    <template #reference>
      <el-button size="large" @click="$emit('deleteMoreFile')">彻底删除</el-button>
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
import { onMounted, reactive, ref } from "vue";
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
// parentObjectId:{
//   type:Number,
// },
})
const multipleSelection = reactive([])
const multipleTableRef = ref()

const state = reactive({
  total: 200, // 总条数
  currentPage: 1, // 当前页
  pageSize: 8, //一页的数据量
});

const changePage = (val) => {
  state.currentPage = val;
};
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
const toggleSelection = (rows) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value.clearSelection()
  }
}

onMounted(()=>{
  getPre()
})

const route = useRoute()
const parentObjectId = route.query['id']//路由参数获取objectId
const parentObjectName = route.query['name']

/* 对象列表加载 */
function getPre(){
  /* 如果没有父级文件夹 */
  if(parentObjectId==null){

  }
  /* 如果有父级文件夹 */
  else{
    prop.tableData.shift({name:parentObjectName})
    console.log(prop.tableData);
  }
}

</script>
<style scoped>

::v-deep .table th {
  background-color: #eff3f8;
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
