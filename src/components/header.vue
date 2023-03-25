<template>
  <div class="header">
    <div class="left"></div>
    <div style="margin-left: -80%">
      <span class="head-text">CloudCan云罐</span>
    </div>

    <div class="right">
      <el-popover
        placement="bottom"
        :width="320"
        trigger="click"
        popper-class="popper-user-box"
      >
        <template #reference>
          <div class="author" style="font-weight: bold">
            <img
              style="margin-top: 2px; margin-right: 5px"
              src="../assets/preAvatar.png"
              class="avatar-img"
            />
            <span style="margin-top: -5px">{{ username }}</span>
            <!-- <i class="icon el-icon-s-custom" /> -->
            <!-- <i class="el-icon-caret-bottom" /> -->
            <el-icon><CaretBottom /></el-icon>
          </div>
        </template>
        <div class="nickname">
          <p>昵称:{{ username }}</p>
          <p>账号:{{ id }}</p>
          <el-tag size="small" effect="dark" class="logout" @click="logout"
            >退出</el-tag
          >
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script setup>
import router from "../router/index";
import { ElMessage } from "element-plus";
import { ref, onMounted, reactive } from "vue";
import axios from "@/utils/axios";
import { localGet, localRemove } from "../utils";
import "@/style/base.scss";
const username = ref("STATICHIT");
const id = ref("1245377");

const back = () => {
  router.back();
};

const logout = () => {
  localRemove("token");
  ElMessage.success("已退出账号" + id);
  router.push("/index");
};
</script>

<style lang="scss" scoped>
$primary-color: #6477b7;
$second-color: #f0f1f8;
$back-color: #f0f2f8;

.header {
  height: 67px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 10px 10px 10px -4px rgba(0, 0, 0, 0.08);
}
.header .left .back {
  border: 1px solid #e9e9e9;
  padding: 5px;
  border-radius: 50%;
  margin-right: 5px;
  cursor: pointer;
  font-size: 10px;
}
.right > div > .icon {
  font-size: 18px;
  margin-right: 6px;
}

.head-text {
  color: $primary-color;
  font-weight: bold;
  font-size: 20px;
}
.author {
  margin-left: 10px;
  cursor: pointer;
}
</style>

<style>
.popper-user-box {
  background: url("https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png")
    50% 50% no-repeat !important;
  background-size: cover !important;
  border-radius: 0 !important;
}
.popper-user-box .nickname {
  position: relative;
  color: #ffffff;
}
.popper-user-box .nickname .logout {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
</style>