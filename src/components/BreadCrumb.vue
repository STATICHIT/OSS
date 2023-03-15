  <!-- 面包屑组件封装 -->
<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in list" :key="item.path">
      <router-link :to="item.path">{{ item.meta.title }}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  computed: { list: (vm) => vm.$route.matched },
};
</script>