<template>
  <div>
    <div class="box">
      <title-tip :title="this.title" :content="this.content"></title-tip>
      <div class="buttons">
        <el-button class="myBtn" @click="importImg" plain>选择视频</el-button>
        <el-button class="myBtn" @click="save" plain>保存更改</el-button>
      </div>

      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      instance: null,
      title: "视频处理",
      content:
        "针对云罐中Bucket存储的视频文件（Object），您可以在浏览器对视频进行截取和合并，保存后修改后视频将覆盖原视频。",
    };
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  padding: 5px 15px;
  text-align: left;
}
.buttons {
  margin-bottom: 10px;
}
</style>