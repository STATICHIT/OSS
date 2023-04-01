<!-- 文件图标组件，根据不同文件后缀名显示不同图标 -->
<template>
  <div class="file-icon-content">
    <img :src="fileIcon" />   
<el-button
link
type="primary"
class="file-name"

@click="toFile"
      >{{ fileName }}</el-button
    >
  </div>
</template>

<script setup>
import { computed } from "vue";
import router from "../router";

const prop = defineProps({
  //文件名
  fileName: {
    type: String,
    default: "img.txt",
  },
  //是否为文件夹，1为是，0为否
  isFolder:{
    type:Number,
    default:false
  },
});
const fileIcon = computed(() => {
  let icon = "";
  console.log(prop.isFolder)
  if(prop.isFolder==true){
    icon="src/assets/file-icon/folder.png";
  }
  else {
    console.log(111)
  const fileAfter = prop.fileName.split(".").pop();
  console.log(fileAfter)
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

console.log(fileIcon.value);

</script>

<style scoped>
.file-icon-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height:35px
}

.file-name{
  margin-left: 20px;
  font-size: 15px;
}
</style>
