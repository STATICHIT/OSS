<template>
  <div class="container">
    <headerVue></headerVue>
    <div class="aside">
      <menuVue></menuVue>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import headerVue from "../components/Header.vue";
import menuVue from "../components/Menu.vue";
import "@/style/base.scss";
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
