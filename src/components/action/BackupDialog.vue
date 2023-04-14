<!-- 查看备份对象列表 -->
<template>
      <el-dialog
    width="45%"
     title="备份列表"
      append-to-body
      >
      <template #default>
  <div style="padding: 10px 20px;">
    <el-table
      highlight-current-row:true
      :row-height="500"
      class="table"
      :data="prop.tableData"
      size="large"
    >
      <el-table-column
        class-name="el-table-name"
        prop="objectName"
        label="备份文件名"
        style="color: cornflowerblue;"
      >
      </el-table-column>
      <el-table-column prop="bucketName" label="所处bucket" />
      <!-- <el-table-column prop="size" label="文件大小" :formatter="formatSize" /> -->
      <el-table-column prop="createTime" label="创建时间" />
      <!-- 操作 -->
      <el-table-column
        label="操作"
      >
        <template #default="scope">
          <!-- 加其他操作按钮的插槽 -->
          <el-button
            link
            type="primary"
            size="small"
            @click="BackupReserve(scope.$index)"
            >复原</el-button
          >
          <el-button
            @click="$emit('deleteFile',scope.$index)"
            link
            type="danger"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import apiFun from "../../utils/api";

const route = useRoute()
const query = route.query
const bucketName = query['bucketName']
const prop = defineProps({
  targetFile:{
    type:String
  },
  tableData:{
    type:Array,
    default:()=>[]
  }
})

const emit = defineEmits(['close'])

// onMounted(()=>{
//   pre()
// })

// const state = reactive({
//   tableData:[]
// })

// const pre = () => {

// }
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
/* 复原 */
function BackupReserve(index){
  let objectName = prop.tableData[index].objectName
  console.log(bucketName)
  apiFun.object.backupRecoveryObject(prop.tableData[index].bucketName,objectName).then(res=>{
    if(res.code==200){
      ElMessage.success('操作成功！')
      emit('close')
    }else{
      ElMessage.error(res.msg)
    }
  })
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
}.table{
  width: 1000px;
}
</style>
