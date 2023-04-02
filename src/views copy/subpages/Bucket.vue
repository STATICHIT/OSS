<!-- 子页面 ———— bucket(包含子菜单及子内页) -->
<template>
  <div>
    <div class="container">
      <div class="aside">
        <menuVue style="z-index: 7"></menuVue>
        <router-view style="z-index: 60"></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import menuVue from "../../components/InMenu.vue";
import "../../style/base.scss";
import { ElMessage } from "element-plus";
import apiFun from "../../utils/api";
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.aside {
  display: flex;
  flex-direction: row;
}
</style>
