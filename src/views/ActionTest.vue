<!-- bucket子页面 ———— 临时测试页面-->
<template>
  <div class="box">
    <title-tip :title="title" :content="content"></title-tip>
    <br />
    <h1>该页面暂时用于测试</h1>
    <h3>增加bucket策略抽屉</h3>
    <addBucketPolicies></addBucketPolicies>
    <br><br><br>
    <el-button type="primary" style="margin-left: 16px" @click="goto">
      进入文件上传页面
    </el-button>
    <br><br><br>
    <el-button type="primary" style="margin-left: 16px" @click="goto2">
      进入图片压缩页面
    </el-button>
  </div>
</template>

<script setup>
import addBucketPolicies from "../components/action/addBucketPolicies.vue";
import router from "../router/index";
const title = "测试页面";
const content = "成员进行组件测试时可以在此编辑触发按钮";
let goto = () => {
  router.push("/test");
};

let goto2 = () => {
  router.push("/test2");
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  padding: 5px 15px;
  text-align: left;
}
</style>
