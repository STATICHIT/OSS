<template>
  <div class="container">
    <headerVue style="z-index: 9"></headerVue>
    <div class="aside">
      <menuVue style="z-index: 10"></menuVue>
      <div class="box" :style="style">
        <!-- 面包屑导航 -->
        <BreadCrumb />
        <router-view class="subPage" style="z-index: 10"></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import headerVue from "../components/Header.vue";
import menuVue from "../components/Menu.vue";
import "../style/base.scss";
import "../style/subPage.scss";
import { useRoute } from "vue-router";
import { reactive, watchEffect } from "vue";

const style = reactive({
  background: "#eff1f7",
});

const route = useRoute();

watchEffect(() => {
  if (route.path === "/dataScreen") {
    style.background = "#eff1f7";
  } else {
    style.background = "#ffffff";
  }
});
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  position: relative;
  padding: 30px;
  height: 900px;
}
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
.subPage {
  width: 100%;
  height: 100%;
}
</style>
