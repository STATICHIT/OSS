<!-- bucket子页面 ———— 文件管理/删除Bucket-->
<template>
  <div>
    <div>
      <el-dialog
        v-model="centerDialogVisible"
        title="删除Bucket"
        width="30%"
        align-center
      >
        <div style="z-index: 100000">
          <span class="littleTitle"
            >删除Bucket需要对Bucket内的资源进行检测，资源清空后才可删除。</span
          >
        </div>
        <br />
        <br />
        <img src="../../assets/delete.png" />
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="save" :disabled="disabled">
              确认删除
            </el-button>
            <el-button type="info" @click="cancel"> 取消 </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "../../router/index";
import { ElMessage } from "element-plus";
const centerDialogVisible = ref(true);
const disabled = ref(false);
let save = () => {
  centerDialogVisible.value = false;
  ElMessage.success("修改成功");
  router.push("/bucketList");
};
let cancel = () => {
  centerDialogVisible.value = false;
  router.push("/fileList");
};
</script>

<style lang="scss" scoped>
</style>