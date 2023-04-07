<template>
  <div class="box">
    <title-tip :title="title" :content="content"></title-tip>
    <h1>1.用户可以选择是否对 图片 和 视频 进行上传前压缩</h1>
    <h1>2.用户可以在此页面选择是否收藏当前bucket</h1>
    <h1>3.再说</h1>

  </div>
</template>

<script setup>
const title = "Bucket配置";
const content =
  "服务器端加密机制为静态数据提供保护。适合于对于文件存储有高安全性或者合规性要求的应用场景。例如，深度学习样本文件的存储、在线协作类文档数据的存储。";
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  padding: 5px 15px;
  text-align: left;
}
</style>