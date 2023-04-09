<template>
  <div class="box">
    <title-tip :title="title" :content="content"></title-tip>
    <br />
    <hr />
    <br />
    <div>
      <h4>一.文件上传设置</h4>
      <br />
      <span class="key">图片自动压缩</span>
      <el-switch
        v-model="value1"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
        :active-icon="Check"
        :inactive-icon="Close"
      />
      <br />
      <br />
      <span class="key">视频自动压缩</span>
      <el-switch
        v-model="value2"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
        :active-icon="Check"
        :inactive-icon="Close"
      />
    </div>
    <br />
    <hr />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Check, Close } from "@element-plus/icons-vue";
const value1 = ref(true);
const value2 = ref(true);
const title = "其他设置";
const content =
  "您可以在此页面对当前Bucket进行一些基础的配置,例如上传文件（图片或视频）是否进行压缩操作等";
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  padding: 5px 15px;
  text-align: left;
}
/* 修改颜色 */
hr {
  border: 1px solid rgba(230, 230, 230, 0.39);
  width: 50%;
}

.key {
  margin-left: 30px;
}
</style>