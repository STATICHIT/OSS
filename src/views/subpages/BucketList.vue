<!-- 子页面 ———— bucket列表 -->
<template>
  <div class="box">
    <TitleTip :title="state.title" :content="state.content"></TitleTip>
    <div class="btn">
      <el-button type="primary" @click="drawer = !drawer">创建Bucket</el-button>
      <el-input
        v-model="state.searchText"
        class="w-50 m-2 search-input"
        size="large"
        placeholder="Bucket名称"
        :suffix-icon="Search"
        @keyup.enter="search"
      />
    </div>
    <BucketTableVue
      ref="childComponentRef"
      class="bucketTable"
      :searchText="state.searchText"
    ></BucketTableVue>
    <el-drawer
      v-model="drawer"
      title="I am the title"
      :direction="direction"
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
            style="font-weight: bold"
          >
            <el-form-item
              style="margin-left: -8px"
              label="Bucket名称"
              prop="bucketName"
            >
              <el-input
                placeholder="创建成功后将不可修改"
                class="el-input"
                v-model="state.newBucket.bucketName"
              />
            </el-form-item>
            <el-form-item label="存储类型" prop="storageLevel">
              <el-radio-group v-model="state.newBucket.storageLevel">
                <el-radio :label="1">标准存储</el-radio>
                <el-radio :label="2">归档存储</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-alert type="info" :closable="false" class="input-msg">
              <span v-show="state.newBucket.storageLevel == 1"
                >标准：高可靠、高可用、高性能，数据会经常被访问到。</span
              >
              <span v-show="state.newBucket.storageLevel == 2"
                >归档：数据长期存储、基本不访问，存储单价低于低频访问型。选择归档存储后，文件需要先解冻才能访问。</span
              >
              <span class="bucketAcl-text"
                >Bucket创建成功后,存储类型不支持变更</span
              >
            </el-alert>
            <el-form-item label="读写权限" prop="bucketAcl">
              <el-radio-group v-model="state.newBucket.bucketAcl">
                <div
                  style="
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                  "
                >
                  <el-radio border :label="5">私有</el-radio>
                  <el-radio border :label="4">RAM读</el-radio>
                  <el-radio border :label="3">公共读</el-radio>
                </div>
                <el-radio border :label="2" style="margin-top: 10px"
                  >RAM读写</el-radio
                >
                <el-radio border :label="1" style="margin-top: 10px"
                  >公共读写</el-radio
                >
              </el-radio-group>
            </el-form-item>
            <el-alert type="info" :closable="false" class="input-msg">
              <p v-show="state.newBucket.bucketAcl == 5">
                私有：对文件的所有访问操作需要进行身份验证。
              </p>
              <p v-show="state.newBucket.bucketAcl == 3">
                公共读：对文件写操作需要进行身份验证；可以对文件进行匿名读。
              </p>
              <span
                v-show="state.newBucket.bucketAcl == 1"
                class="bucketAcl-text"
                >公共读写：所有人都可以对文件进行读写操作。</span
              >
              <span
                v-show="state.newBucket.bucketAcl == 2"
                class="bucketAcl-text"
                >RAM读写:用户和子用户都可以对该Bucket内的文件进行读写操作。</span
              >
              <span v-show="state.newBucket.bucketAcl == 4"
                >RAM读:只有该Bucket的拥有者与其子用户可以对该Bucket内的文件进行写操作，任何人都可以对该Bucket中的文件进行读操作。</span
              >
            </el-alert>
            <el-form-item label="加密方式">
              <el-radio-group v-model="state.newBucket.secret">
                <el-radio :label="null">无加密</el-radio>
                <el-radio :label="1">SM4加密</el-radio>
              </el-radio-group>
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
</template>

<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import apiFun from "../../utils/api";
//引入面包屑和地板基本样式
import "../../style/subPage.scss";
import { onMounted, reactive, ref } from "vue";
import { Present, Search } from "@element-plus/icons-vue";
import BucketTableVue from "../../components/BucketTable.vue";
import TitleTip from "../../components/TitleTip.vue";
import router from "../../router";
import { localSet } from "../../utils";
const childComponentRef = ref(null);

const formSize = ref("default");

const direction = ref("rtl");
const drawer = ref(false);

function cancelClick() {
  drawer.value = false;
}

const rules = reactive({
  bucketName: [
    { required: true, message: "请输入Bucket名称", trigger: "blur" },
    { min: 3, message: "请输入长度至少大于3的字符", trigger: "blur" },
  ],
});

function search() {
  // 获取子组件实例
  const childComponent = childComponentRef.value;
  // 调用子组件方法
  childComponent.Pre();
}

function confirmClick() {
  ElMessageBox.confirm(`确定创建该Bucket吗?`)
    .then(() => {
      drawer.value = false;
      state.newBucket.createTime = new Date();
      state.newBucket.updateTime = new Date();
      console.log(state.newBucket);
      apiFun.bucket.create(state.newBucket).then((res) => {
        console.log(res);
      });
      ElMessage.success("创建成功！");
      location.reload();
    })
    .catch(() => {});
}

const state = reactive({
  searchText: "",
  title: "Bucket列表",
  content: "统计 Bucket 合计数据，平均延迟 1~3 小时。不作为计量数据，仅作参考",
  newBucket: {
    bucketName: "",
    storageLevel: 1,
    secret: null,
    bucketAcl: 1,
    createTime: "",
    updateTime: "",
  },
});
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0;
  // width: 100%;
}
.input-msg{
  margin-bottom: 6%;
  width: 82%;
  margin-left: 21.5%;
  margin-top: -2%;
  text-align: left;
  font-weight: lighter;
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
.search-input {
  margin-left: 2%;
  margin-bottom: 13px;
  height: 34px;
  margin-top: -1px;
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
  width: 98%;
}
.el-input {
  width: 75%;
}
</style>
