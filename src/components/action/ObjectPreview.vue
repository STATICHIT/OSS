<!-- 显示对象预览对话框 -->
<template>
    <el-dialog
    :show-close="false"
     style="background-color: transparent;border:0;
     box-shadow: none;
     margin-top: 1%;
     height: 100vh;
     display: flex;
  justify-content: center;
  align-items: center;"
     class="content-box"
      append-to-body
      >
      <div
            v-show="
              (objectInfo.ext == 2 || objectInfo.ext == 4) &&
              objectInfo.storageLevel == 1 &&
              fileStatus == '正常'
            "
            class="preview-box"
          >
            <img
              :src="src"
              v-if="objectInfo.ext == 4"
            />
            <video
              style="height: 40%; width: 100%"
              :src="src"
              v-if="objectInfo.ext == 2"
              controls
              autoplay
            ></video>
          <el-button class="close" @click="$emit('close')" type="info" circle ><el-icon><CloseBold /></el-icon> </el-button>
          </div>
          <div
            class="look-box-msg"
            v-show="
              objectInfo.storageLevel != 1 ||
              fileStatus != '正常' ||
              (objectInfo.ext != 2 && objectInfo.ext != 4) ||
              objectInfo.secret != null
            "
          >
            <el-icon color="rgb(255,203,3)"><InfoFilled /></el-icon
            >{{ objectInfoMsg }}
          </div>
          <div class="btnList">
</div>
      </el-dialog>
  </template>
  
  <script setup>
import { computed, ref } from "vue";


  const prop = defineProps({

    bucketName:{
        type:String,
    },
    objectInfo:{
        type:Object,
    },fileStatus:{
        type:String
    }
  })

  const src = ref('')

  const objectInfoMsg = computed(() => {
    if(prop.objectInfo!=null){
  if (prop.objectInfo.ext != 2 && prop.objectInfo.ext != 4) {
    return "该文件类型暂不支持预览和下载。";
  } else if (prop.objectInfo.storageLevel != 1 || prop.fileStatus != "正常") {
    return "该Object处于归档/归档中/解冻中，无法对其进行预览和下载。";
  } else if (prop.objectInfo.secret != null) {
    return "改Object已被加密，不能进行预览";
  }else {
    src.value=`http://192.168.50.236:5555/object/preview-image/${prop.bucketName}/${prop.objectInfo.name}`
  }
}
});
  </script>
  
  <style scoped>
.preview-box{
    display: flex;
  justify-content: center;
  align-items: center;
  max-height: 100vh;
}
.preview-box>img{
    object-fit:contain;
    max-height:100vh
}
  .container{
      display: flex;
      flex-direction: row;
  }
  .look-box-msg {
  background-color: #fff7d1;
  text-align: center;
  padding: 30px 10px;
}
.close{
    position:absolute;
    top:0%;
    right:0%;
}
.btnList{
    position:fixed;
    opacity: 0.7;
    bottom:50px;
    background-color: #4b4c53;
    width: 30%;
    left:30%;
}
  </style>