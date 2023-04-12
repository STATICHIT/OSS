<!-- accessKey表格 -->
<template>
  <div class="box">
    <el-table
      highlight-current-row:true
      :row-height="500"
      class="table"
      :data="secrets"
      size="large"
      ref="multipleTableRef"
    >
      <el-table-column prop="id" label="AccessKey ID"/>
      <el-table-column prop="survivalTime" label="存活时间(秒)"  />
      <el-table-column prop="creationTime" label="创建时间"/>
      <!-- 操作 -->
      <el-table-column
      width="120"
        label="操作">
        <template #default="scope">
          <!-- 加其他操作按钮的插槽 -->
          <el-button
            @click="deleteSecret(scope.$index)"
            text
            type="danger"
            style="margin-left: -1px;"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import CreateSecret from "./action/CreateSecret.vue";
import apiFun from "../utils/api";
import { ElMessage } from "element-plus";

const prop  =defineProps({
  secrets:{
    type:Array,
  },
  objectId:{
    type:Number,
  }
})

const accessKeys = ref([])

const secret = computed(()=>{
  console.log(prop.secrets)
  if(prop.secrets.length!=0){
  console.log(prop.secrets)
  for(let item of Object.keys(prop.secrets)){
    console.log(item)
  accessKeys.value.push({
    id:item,
    creationTime:prop.secrets[item].creationTime,
    survivalTime:prop.secrets[item].survivalTime
  })
  }
}
  return accessKeys
})

const deleteSecret = (index) => {
  console.log(index)
  let secret = prop.secrets[index]
  console.log(prop.secrets[index])
  prop.secrets.splice(index,1)
   apiFun.object.accessKey.delete({
     "accessKeyId": prop.objectId,
   "accessKeySecret": secret.id
   }).then(res=>{
     console.log(res)
     ElMessage.success('操作成功！')
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
.table{
    width: 1000px;
}
.box{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap:15px;
    text-align: left;
}

</style>