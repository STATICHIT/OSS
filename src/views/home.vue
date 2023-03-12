<template>
  <div class="container">
    <headerVue style="z-index:2"></headerVue>
    <div class="aside">
      <menuVue style="z-index:3"></menuVue>
      <router-view style="z-index:1"></router-view>
    </div>
  </div>
</template>

<script setup>
import headerVue from "../components/header.vue";
import menuVue from "../components/menu.vue";
import "../style/base.scss";
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
