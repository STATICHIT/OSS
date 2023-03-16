<!-- bucket子页面 ———— 数据安全/服务器端加密-->
<template>
  <div class="box">
    <title-tip :title="title" :content="content"></title-tip>
  </div>
</template>

<script setup>
var title = "服务器端加密";
var content =
  "服务器端加密机制为静态数据提供保护。适合于对于文件存储有高安全性或者合规性要求的应用场景。例如，深度学习样本文件的存储、在线协作类文档数据的存储。";
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  padding: 10px;
  text-align: left;
}

</style>