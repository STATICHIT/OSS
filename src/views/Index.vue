<template>
  <div>
    <div class="index-main">
      <div class="index-left">
        <div class="index-auth-brand">CloudCan云罐</div>
        <h4 class="mt-0">让存储无限量</h4>
        <!-- 声明子路由占位符 -->
        <router-view></router-view>
      </div>
      <div class="index-right">
        <!--阴影层-->
        <div class="index-shade"></div>
        <div class="index-description">
          让数据与智慧更高效地流动。
          <br />
          CloudCan
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.index-main {
  position: relative;
  display: flex;
  min-height: 100vh;
  flex-direction: row;
  align-items: stretch;
  margin: 0;
}

.index-auth-brand {
  margin: 4rem 0 4rem;
  font-size: 26px;
  width: 325px;
}

.index-left {
  width: 20%;
  padding: 60px;
  text-align: left;
}
.index-right {
  width: 80%;
  padding: 6rem 3rem;
  flex: 1;
  position: relative;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  background: url(../assets/wallpaper.png) center;
  background-size: cover;
}
.index-description {
  color: aliceblue;
  position: absolute;
  margin: 0 auto;
  padding: 0 20px;
  bottom: 40px;
  left: 0;
  right: 0;
}
.index-shade {
  position: absolute;
  left: 0;
  right: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  margin-top: -6rem;
}
</style>