<!-- bucket子页面 ———— 文件管理/删除Bucket-->
<template>
  <div>
    <div>
      <!-- 删除确认弹框 -->
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
        <div v-if="ok">
          <img v-if="!allow" src="../../assets/nodelete.png" alt="" />
          <img v-if="allow" src="../../assets/delete.png" alt="" />
        </div>

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
import { onMounted, ref } from "vue";
import router from "../../router/index";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import apiFun from "../../utils/api";
const centerDialogVisible = ref(true);
const disabled = ref(true);
const route = useRoute();
const query = route.query;
const name = query["bucketName"];
const allow = ref();
const ok = ref(false);
onMounted(() => {
  Pre();
});

const Pre = () => {
  apiFun.object.objectList(name, "", 1, 1, "").then((res) => {
    console.log(res);
    if (res.data.rows.length === 0) {
      allow.value = true;
      disabled.value = false;
    } else {
      allow.value = false;
    }
    ok.value = true;
  });
};

let save = () => {
  apiFun.bucket.delete(name).then((res) => {
    console.log(res);
    centerDialogVisible.value = false;
    ElMessage.success("删除成功");
    router.push({ path: "/bucketList" });
  });
};
let cancel = () => {
  centerDialogVisible.value = false;
  router.push({ path: "/fileList", query: { bucketName: name } });
};
</script>

<style lang="scss" scoped>
img {
  width: 90%;
}
</style>