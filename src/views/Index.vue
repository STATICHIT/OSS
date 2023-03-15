<template>
  <div>
    <div class="main">
      <div class="left">
        <div class="auth-brand text-lg-left">CloudCan云罐</div>
        <h4 class="mt-0">让存储无限量</h4>
        <!-- 声明子路由占位符 -->
        <router-view></router-view>
      </div>
      <div class="right">
        <div class="content-front"></div>
        <div class="login-description">
          <p style="color: aliceblue">
            让数据与智慧更高效地流动。
            <br />  
            CloudCan
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  display: flex;
  min-height: 100vh;
  flex-direction: row;
  align-items: stretch;
  margin: 0;
}

.main .auth-brand {
  margin: 4rem 0 4rem;
  font-size: 26px;
  width: 325px;
}

.left {
  width: 350px;
  padding: 60px;
  text-align: left !important;
}
.right {
  padding: 6rem 3rem;
  flex: 1;
  position: relative;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center !important;
  background: url(../assets/wallpaper.png) center;
  background-size: cover;
}
.login-description {
  position: absolute;
  margin: 0 auto;
  padding: 0 1.75rem;
  bottom: 3rem;
  left: 0;
  right: 0;
}
.content-front {
  position: absolute;
  left: 0;
  right: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  margin-top: -6rem;
}
</style>