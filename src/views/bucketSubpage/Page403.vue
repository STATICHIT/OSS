<template>
  <div class="box">
    <div class="icon-return">
      <el-icon size="30" @click="back"><Back /></el-icon>
    </div>
    <br><br><br><br><br><br><br><br><br>
    <div class="tip">
      <br><br><br><br><br>
      <div>
        <img src="../../assets/icon.png" alt="" />
      </div>
      <h1>403</h1>
      <h2>抱歉，您暂无此权限</h2>
    </div>
  </div>
</template>

<script setup>
//额头返回键
const back = () => {
  history.go(-1);
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  text-align: center;
}
.tip {
  margin: 0 auto;
  width: 90%;
  height: 400px;
  background-color: rgba(236, 234, 234, 0.438);
}
.icon-return {
  line-height: inherit;
  width: 95px;
  position: relative;
  top: 28px;
  cursor: pointer;
  z-index: 999;
}
</style>