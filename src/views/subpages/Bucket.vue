<!-- 子页面 ———— bucket(包含子菜单及子内页) -->
<template>
  <div class="container">
    <div class="aside">
      <menuVue style="z-index:2"></menuVue>
      <router-view style="z-index:1"></router-view>
    </div>
  </div>
</template>

<script setup>
import menuVue from "../../components/InMenu.vue";
import "../../style/base.scss";
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
