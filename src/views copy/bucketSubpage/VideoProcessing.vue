<template>
  <div>
    <div class="box">
      <title-tip :title="this.title" :content="this.content"></title-tip>
      <!-- <div class="buttons">
        <el-button class="myBtn" @click="importImg" plain>选择视频</el-button>
        <el-button class="myBtn" @click="save" plain>保存更改</el-button>
      </div> -->
      <div>
        <img src="../../assets/tools.png" @click="deal" />
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
        "针对云罐中Bucket存储的视频文件（Object），您可以将视频文件下载到本地，在浏览器对视频进行处理，并删除原视频，上传新文件",
    };
  },
  methods: {
    deal() {
      window.open("https://123apps.com/cn/", '_blank')
      // window.location.href = "https://123apps.com/cn/";
    },
  },
};
</script>

<style lang="scss" scoped>
img{
  cursor: pointer;
}
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