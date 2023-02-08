<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "app",
  //页面加载完成后将会执行mounted
  mounted(){
    this.$router.push('/login');//测试页面修改这里
  }
}
</script>

<style>

</style>