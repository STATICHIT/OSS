<!-- 创建accessKey弹窗 -->
<template>
    <el-dialog
    width="45%"
     title="创建AccessKey"
      append-to-body
       style="padding: 0px 15px;
       width: 34%;
       "
      >
      <template #default>
        <div class="box">
        <div class="look-box-msg">
            <el-icon color="rgb(255,203,3)"><InfoFilled /></el-icon>
            AccessKey ID以及AccessKey Secret将由系统自动生成。      
        </div>
        <div class="input">
        <span>存活时间</span>    
            <el-input-number
    v-model="survivalTime"
    class="mx-4"
    :min="1"
    style="width:70%"
    controls-position="right"
    @change="handleChange"
  /></div>
    </div>
      </template>
      <template #footer>
        <div style="flex: auto; justify-content: center">
        <el-button type="primary" @click="confirmClick"
          >确定</el-button
        >
      </div>
      </template>
      </el-dialog>
  </template>
  
  <script setup>
import { ElMessage } from "element-plus"
import { ref } from "vue"
import apiFun from "../../utils/api"

const emit = defineEmits(['createSecret'])
const prop = defineProps({
  objectId:{
    type:Number,
  }
})

  const survivalTime = ref(300)

  const confirmClick = () => {
    apiFun.object.accessKey.create(prop.objectId,survivalTime.value).then(res=>{
      console.log(res.data)
      emit('createSecret',res.data)
      ElMessage.success('操作成功！')
    })
}
  
  </script>
  
  <style scoped>
  .content-box{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      padding-bottom: 23px;
  }
  .container{
      display: flex;
      flex-direction: row;
  }
  .look-box-msg {
  background-color: #fff7d1;
  text-align: center;
  padding: 10px 5px;
}
.input{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: transparent;
    margin-top: 15px;
}
.input>span{
    color: #333;
    font-size: 13px;
    margin-top: 5px;
}
.box{
    display:flex;
  flex-direction: column;
}
  </style>