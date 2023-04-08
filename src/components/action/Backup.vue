<!-- 备份文件对话框 -->
<template>
    <el-dialog
    width="45%"
     title="对象备份"
      append-to-body
      >
      <template #default>
        <div class="box">
            <div class="input"><span>源Bucket</span>
      <el-select disabled v-model="props.bucketName" size="large" style="width: 70%;">
      </el-select></div>
            <div class="input"><span>目标Bucket</span>
      <el-select v-model="state.targetBucketName" size="large" style="width: 70%;" placeholder="请选择你要备份到的目标bucket">
        <el-option v-for="bucket in state.bucketList" :key="bucket.name" :label="bucket.name" :value="bucket.name"/>
      </el-select></div>
      <div class="input"><span>新建文件名</span>
    
      <el-input v-model="state.newObjectName" placeholder="请输入备份的对象名" size="large" style="width: 70%;" />
    </div>
    
    </div>
      </template>
      <template #footer>
        <div style="flex: auto; justify-content: center">
        <el-button type="primary" @click="confirmClick"
          >确定</el-button
        >
        <el-button @click="$emit('close')">取消</el-button>
      </div>
      </template>
      </el-dialog>
  </template>
  
  <script setup>
import { Present } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue"
import apiFun from "../../utils/api";

const emit = defineEmits(['close'])

const props = defineProps({
    objectName:{
        type:String,
        default:''
    },
    bucketName:{
        type:String,
        default:''
    }
})

const state = reactive({
    bucketList:[],
    targetBucketName:'',
    newObjectName:props.objectName,
})
function confirmClick(){
    if(state.targetBucketName==''){
        ElMessage.error('请选择目标Bucket!')
    }else {
        console.log(props.objectName+props.bucketName)
        apiFun.object.backupObject(props.bucketName,props.objectName,state.targetBucketName,state.newObjectName).then(res=>{
            console.log(res)
            if(res.code!=200){
            ElMessage.success('操作成功！')
            emit('close')
            }else {
                ElMessage.error('备份失败！')
            }
        })
    }
}

onMounted(()=>{
    pre()
})

function pre(){
apiFun.bucket.getList(1,200,'').then((res)=>{
   if(res.code==200){
    console.log(res)
    state.bucketList=res.data.rows
    state.bucketList.forEach((item,index)=>{
        if(item.name==props.bucketName){
            state.bucketList.splice(index,1)
            return
        }
    })
   }
   else
   ElMessage.error(res.msg)
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
}
.box{
    display:flex;
  flex-direction: column;
}
.input>span{
    color: #333;
    font-size: 15px;
    margin-top: 5px;
}
  </style>