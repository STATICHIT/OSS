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
          <el-radio label="1" size="large">SM4</el-radio>
          <el-radio label="0" size="large">无加密</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="state" v-if="!changing">{{ curSecret }}</div>
    <br />
    <el-button plain class="btn1" @click="change" v-if="!changing"
      >设置</el-button
    >
    <div v-if="changing">
      <el-button plain class="btn1" @click="save">保存</el-button>
      <el-button plain type="info" class="btn2" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import apiFun from "../../utils/api";
const route = useRoute();
const query = route.query;
const bucketName = query["bucketName"];
const title = "服务器端加密";
const content =
  "服务器端加密机制为静态数据提供保护。适合于对于文件存储有高安全性或者合规性要求的应用场景。例如，深度学习样本文件的存储、在线协作类文档数据的存储。";

var secret = ref("");
var curSecret = ref("SM4加密"); //SM4加密 无加密两种状态

var changing = ref(false);
var radio = ref("1");

onMounted(() => {
  init();
});

let init = () => {
  apiFun.bucket.get(bucketName).then((res) => {
    console.log(res);
    secret.value = res.data.secret;
    if (secret.value == "0") {
      radio.value = "0";
    } else {
      radio.value = "1";
    }
  });
};

// 设置按钮点击事件
let change = () => {
  changing.value = true;
};

// 保存修改按钮点击事件
let save = () => {
  const bucketName = query["bucketName"];
  if (radio.value == "1") {
    apiFun.bucket.updateSecret(bucketName, 1).then((res) => {
      console.log(res);
      secret.value = "1";
      changing.value = false;
      ElMessage.success("已开启SM4服务端加密");
    });
  } else {
    apiFun.bucket.updateSecret(bucketName, "").then((res) => {
      console.log(res);
      secret.value = "0";
      changing.value = false;
      ElMessage.success("已关闭服务端加密");
    });
  }
};

let cancel = () => {
  changing.value = false;
  if (secret.value == "0") {
    radio.value = "0";
  } else {
    radio.value = "1";
  }
};

// 对secret进行监听
watch(
  () => secret.value,
  (secret, preSecret) => {
    if (secret == "1") {
      curSecret.value = "SM4加密";
    } else if (secret == "0") {
      curSecret.value = "无加密";
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