<!-- bucket子页面 ———— 数据安全/服务器端加密-->
<template>
  <div class="box">
    <title-tip :title="title" :content="content"></title-tip>
    <span
      >OSS支持服务器端加密功能。上传文件（Object）时，OSS对收到的文件进行加密，再将得到的加密文件持久化保存；下载文件时，OSS自动将加密文件解密后返回给用户，并在返回的HTTP请求Header中，声明该文件进行了服务器端加密。</span
    >
    <br /><br /><br />
    <span><b>服务端加密：</b></span>
    <div class="radio-group" v-if="changing">
      <div class="mb-2 flex items-center text-sm">
        <el-radio-group v-model="radio" class="ml-4">
          <el-radio label="1" size="large">开启</el-radio>
          <el-radio label="2" size="large">关闭</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="state" v-if="!changing">{{ isHide }}</div>
    <br />
    <el-button plain class="btn1" @click="change" v-if="!changing"
      >设置</el-button
    >
    <div v-if="changing">
      <el-button plain class="btn1" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";
const title = "服务器端加密";
const content =
  "服务器端加密机制为静态数据提供保护。适合于对于文件存储有高安全性或者合规性要求的应用场景。例如，深度学习样本文件的存储、在线协作类文档数据的存储。";
var isHide = ref("已开启"); //未开启 已开启两种状态
var changing = ref(false);
var radio = ref("1");

let change = () => {
  changing.value = true;
};

let save = () => {
  changing.value = false;
  if (radio.value == "1") {
    ElMessage.success("已开启服务端加密");
  } else {
    ElMessage.success("已关闭服务端加密");
  }
};

// 对单选框进行监听
watch(
  () => radio.value,
  (radio, prevradio) => {
    if (radio == "1") {
      isHide.value = "已开启";
    } else if (radio == "2") {
      isHide.value = "未开启";
    }
  }
);
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  padding: 5px 15px;
  text-align: left;
}
span {
  font-size: 12px;
  color: gray;
}
.state {
  display: inline-block;
  margin-left: 70px;
  font-size: 13px;
  color: black;
}
.radio-group {
  display: inline-block;
  margin-left: 70px;
}
.btn1 {
  margin-top: 30px;
  margin-left: 140px;
  width: 80px;
}
.btn2 {
  margin-top: 30px;
  width: 80px;
}
</style>