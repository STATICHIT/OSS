<template>
  <div class="header">
    <img src="../assets/user.png">
    <span style="color: #535353;">sunsan</span>
    <el-button type="primary" link>退出</el-button>
  </div>
</template>

<script setup>

</script>

<style>
.header{
    height: 70px;
    width: 100%;
    border-bottom: 1.5px solid rgb(180, 180, 180);
    display:flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
    padding: 20px;
}
.header img{
    border-radius: 50%;
    height: 32px;
    border: 1px solid rgb(211, 211, 211);
    margin-right: 10px;
}
.header span{
    /* color: rgb(89, 89, 89); */
    font-size: 14px;
    margin-right: 10px;
}
</style>