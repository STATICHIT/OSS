<!-- bucket子页面 ———— 数据处理/图片处理-->
<template>
  <div class="box">
    <title-tip :title="title" :content="content"></title-tip>
    <br />
    <h1>该页面暂时用于测试抽屉</h1>
    <h3>增加bucket策略抽屉</h3>
    <addBucketPolicies></addBucketPolicies>
    <h3>查看object详情策略</h3>
    <objctDetial></objctDetial>
  </div>
</template>

<script setup>
import addBucketPolicies from "../../components/action/addBucketPolicies.vue";
import objctDetial from "../../components/action/objectDetial.vue";
const title = "图片处理";
const content =
  "针对云罐内存储的图片文件（Object），您可以在GetObject请求中携带图片处理参数对图片文件进行处理。例如添加图片水印、转换格式等。";
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  padding: 5px 15px;
  text-align: left;
}
</style>