<!-- 文件图标组件，根据不同文件后缀名显示不同图标 -->
<template>
  <div
  @mouseover="isVisit=true"
@mouseleave="isVisit=false"
   class="file-icon-content">
    <img :src="fileIcon" />   
<el-button
link
type="primary"
class="file-name"
@click="$emit('toFile')"
      >{{ fileName }}</el-button
    >
    <el-button v-show="isVisit" link type="info" @click="showDialogRename=true"> 
      <el-icon><EditPen /></el-icon>
    </el-button>
    <el-dialog
    width="45%"
     title="重命名"
      append-to-body
      v-model="showDialogRename"
      >
      <template #default>
        <el-form-item label="文件重命名">
        <el-input v-model="name" placeholder="请输入要更改的文件名" />
      </el-form-item>
      </template>
      <template #footer>
        <div style="flex: auto; justify-content: center">
        <el-button type="primary" @click="confirmClick"
          >确定</el-button
        >
        <el-button @click="close"
          >取消</el-button
        >
      </div>
      </template>
      </el-dialog>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import router from "../router";
import apiFun from "../utils/api";


const route = useRoute()
const query = route.query
const bucketName = query['bucketName']
const isVisit = ref(false)
const showDialogRename = ref(false)
const emit = defineEmits(['rename'])
const prop = defineProps({
  //文件名
  fileName: {
    type: String,
    default: "img.txt",
  },
  //是否为文件夹，1为是，0为否
  isFolder:{
    type:Boolean,
    default:false
  },
  index:{
    type:Number
  }
});

const confirmClick = () => {
  if(name.value==''){
    ElMessage.error('输入文件名不能为空！')
  }else {
  const newName = name.value +"."+prop.fileName.split(".").pop()
  apiFun.object.updateObjectName(bucketName,prop.fileName,newName).then(res=>{
    if(res.code==200){
    console.log(newName+prop.index)
    emit('rename',{newName:newName,index:prop.index})
    ElMessage.success('操作成功！')
    showDialogRename.value=false
    }else {
      ElMessage.error(res.msg)
    }
  })
}
}
const close = () => {
  showDialogRename.value=false
}
const name = ref('')
const fileIcon = computed(() => {
  let icon = "";
  if(prop.isFolder==true){
    icon="src/assets/file-icon/folder.png";
  }
  else {
  const fileAfter = prop.fileName.split(".").pop();
  switch (fileAfter) {
    case "pdf":
      icon = "src/assets/file-icon/pdf.png";
      break;
    case "doc":
    case "docx":
      icon = "src/assets/file-icon/word.png";
      break;
    case "xls":
    case "xlsx":
      icon = "src/assets/file-icon/excel.png";
      break;
    case "ppt":
    case "pptx":
      icon = "src/assets/file-icon/ppt.png";
      break;
    case "zip":
    case "rar":
    case "7z":
      icon = "src/assets/file-icon/rar.png";
      break;
    case "mp3":
    case "wav":
      icon = "src/assets/file-icon/mp3.png";
      break;
    case "mp4":
    case "avi":
      icon = "src/assets/file-icon/mp4.png";
      break;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "img":
      icon = "src/assets/file-icon/img.png";
      break;
    case "txt":
      icon = "src/assets/file-icon/txt.png";
    default:
      icon = "src/assets/file-icon/file.png";
  }
}
return icon;
});

</script>

<style scoped>
.file-icon-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height:35px;
  width:fit-content
}

.file-name{
  margin-left: 20px;
  font-size: 15px;
}
</style>
