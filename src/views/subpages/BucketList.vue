<!-- 子页面 ———— bucket列表 -->
<template>
  <div class="box">
    <TitleTip :title="state.title" :content="state.content"></TitleTip>
    <div class="btn">
      <el-button type="primary" @click="drawer = !drawer">创建Bucket</el-button>
      <el-input
        v-model="state.searchText"
        class="w-50 m-2"
        size="large"
        style="margin-left: 2%; margin-bottom: 10px; height: 34px"
        placeholder="Bucket名称"
        :suffix-icon="Search"
      />
    </div>
    <BucketTableVue class="bucketTable"></BucketTableVue>
    <div style="z-index: 100000">
      <el-drawer
        v-model="drawer"
        title="I am the title"
        :direction="direction"
        :before-close="handleClose"
        size="40%"
      >
        <template #header>
          <h4 class="el-drawer-title">创建Bucket</h4>
        </template>
        <template #default>
          <div class="default-box">
            <el-form
              :model="state.newBucket"
              :rules="rules"
              label-width="120px"
              class="demo-ruleForm"
              size="large"
              status-icon
              label-position="left"
            >
              <el-form-item
                style="margin-left: -8px"
                label="Bucket名称"
                prop="name"
              >
                <el-input
                  placeholder="创建成功后将不可修改"
                  class="el-input"
                  v-model="state.newBucket.name"
                />
              </el-form-item>
              <el-form-item label="存储类型" prop="storageLevel">
                <el-radio-group v-model="state.newBucket.storageLevel">
                  <el-radio label="标准存储" />
                  <el-radio label="低频访问存储" />
                  <el-radio label="归档存储" />
                  <el-radio label="冷归档存储" />
                </el-radio-group>
              </el-form-item>
              <el-alert
                type="info"
                show-icon
                :closable="false"
                class="input-msg"
              >
                <span v-show="state.newBucket.storageLevel == '标准存储'"
                  >标准：高可靠、高可用、高性能，数据会经常被访问到。</span
                >
                <span v-show="state.newBucket.storageLevel == '低频访问存储'"
                  >低频访问：数据长期存储、较少访问，存储单价低于标准类型。</span
                >
                <span v-show="state.newBucket.storageLevel == '归档存储'"
                  >归档：数据长期存储、基本不访问，存储单价低于低频访问型。选择归档存储后，文件需要先解冻才能访问。</span
                >
                <span v-show="state.newBucket.storageLevel == '冷归档存储'"
                  >冷归档：数据长期存储、基本不访问，存储单价低于归档访问型。</span
                >
                <span class="bucketAcl-text"
                  >Bucket创建成功后,存储类型不支持变更</span
                >
              </el-alert>
              <el-form-item label="版本控制" prop="versionControl">
                <el-switch v-model="state.newBucket.versionControl" />
              </el-form-item>
              <el-alert
                type="info"
                show-icon
                :closable="false"
                class="input-msg"
              >
                <span
                  >开启版本控制后，针对数据的覆盖和删除操作将会以历史版本的形式保存下来，若不开启版本控制则数据删除或被覆盖将无法找回。</span
                >
                <span
                  v-show="state.newBucket.versionControl == true"
                  class="bucketAcl-text"
                  >开通该功能后，暂不支持关闭。</span
                >
                <span
                  v-show="!state.newBucket.versionControl"
                  class="bucketAcl-text"
                  >当前未开启版本控制功能，数据删除或被覆盖后将无法找回。</span
                >
              </el-alert>
              <el-form-item label="读写权限" prop="bucketAcl">
                <el-radio-group v-model="state.newBucket.bucketAcl">
                  <el-radio border label="私有" />
                  <el-radio border label="公共读" />
                  <el-radio border label="公共读写" />
                </el-radio-group>
              </el-form-item>
              <el-alert
                type="info"
                show-icon
                :closable="false"
                class="input-msg"
              >
                <p v-show="state.newBucket.bucketAcl == '私有'">
                  私有：对文件的所有访问操作需要进行身份验证。
                </p>
                <p
                  v-show="state.newBucket.bucketAcl == '公共读'"
                  class="bucketAcl-text"
                >
                  公共读：对文件写操作需要进行身份验证；可以对文件进行匿名读。
                </p>
                <span
                  v-show="state.newBucket.bucketAcl == '公共读写'"
                  class="bucketAcl-text"
                  >公共读写：所有人都可以对文件进行读写操作。</span
                >
              </el-alert>
              <el-form-item label="加密存储" prop="encryption">
                <el-switch v-model="state.newBucket.encryption" />
              </el-form-item>
            </el-form>
          </div>
        </template>
        <template #footer>
          <div style="flex: auto; justify-content: center">
            <el-button size="large" type="primary" @click="confirmClick"
              >确定</el-button
            >
            <el-button size="large" @click="cancelClick">取消</el-button>
          </div>
        </template>
      </el-drawer>
    </div>
  </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import apiFun from "../../utils/api";
//引入面包屑和地板基本样式
import "../../style/subPage.scss";
import { reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import BucketTableVue from "../../components/BucketTable.vue";
import TitleTip from "../../components/TitleTip.vue";
import router from "../../router";

const formSize = ref("default");

const direction = ref("rtl");
const drawer = ref(false);

function cancelClick() {
  drawer.value = false;
}

const rules = reactive({
  name: [
    { required: true, message: "请输入Bucket名称", trigger: "blur" },
    { min: 3, message: "请输入长度至少大于3的字符", trigger: "blur" },
  ],
});
function confirmClick() {
  ElMessageBox.confirm(`确定创建该Bucket吗?`)
    .then(() => {
      drawer.value = false;
      ElMessage.success("创建成功！");
      router.push({ path: "/bucket", query: { name: state.newBucket.name } });
    })
    .catch(() => {});
}
const state = reactive({
  searchText: "",
  title: "Bucket列表",
  content: "统计 Bucket 合计数据，平均延迟 1~3 小时。不作为计量数据，仅作参考",
  newBucket: {
    name: "bucket1",
    storageLevel: "标准存储",
    capacity: "476.12MB",
    versionControl: "已开启",
    encryption: "是",
    watermark: "有",
    bucketAcl: "私有",
    updateTime: "2023年03月19日 19:38",
  },
});
console.log(state.newBucket.versionControl);
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0;
  width: 100%;
}
.input-msg {
  margin-bottom: 6%;
  width: 82%;
  margin-left: 20%;
  margin-top: -2%;
}
::v-deep el-form el-form-item {
  height: 10%;
}
.bucketAcl-text {
  color: rgb(255, 106, 0);
}
.el-drawer-title {
  color: #333;
  margin-left: -80%;
  font-size: 18px;
}
.default-box {
  padding: 20px;
}

.btn {
  display: flex;
  flex-direction: row;
  margin-left: -20px;
  &:hover {
    background-color: transparent;
  }
}
.bucketTable {
  margin-left: -10px;
  width: 100%;
}
.el-input {
  width: 75%;
}
</style>