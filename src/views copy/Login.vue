<template>
  <div>
    <div>
      <br />
      <p>Welcome , please login to your account.</p>
      <br /><br />

      <!-- 账号框 -->
      <el-icon><User /></el-icon><span style="color: gray"> Username</span>
      <input
        v-model="username"
        type="text"
        class="fontStyle"
        name="username"
        placeholder="请输入您的账号"
        required
        autofocus
      />
      <br />
      <br />

      <!-- 密码框 -->
      <el-icon><Lock /></el-icon><span style="color: gray"> Password</span>
      <input
        v-model="password"
        show-password
        minlength="5"
        maxlength="20"
        type="password"
        class="fontStyle"
        name="password"
        placeholder="请输入您的密码"
        required
        autocomplete="current-password"
      />

      <br /><br /><br />
      <div style="display: flex">
        <!-- 记住密码 -->
        <div style="width: 270px">
          <input id="remember" type="checkbox" />
          <span> Remember me</span>
        </div>
        <!-- 注册 -->
        <div class="register">
          <router-link to="/register" style="text-decoration: none"
            ><span>注册新账号</span></router-link
          >
        </div>
      </div>
      <br />
      <!-- 登录 -->
      <button class="login-btn" @click="login">
        登 录
        <el-icon><Right /></el-icon>
      </button>

      <!-- ram -->
      <div>
        <router-link to="/ramLogin" class="ram" style="text-decoration: none"
          ><span>RAM账户登录</span></router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import router from "../router/index";
import apiFun from "../utils/api";

const username = ref("");
const email = ref("");
const password = ref("");

let login = () => {
  ElMessage.success("登录成功");
  router.push("/home");
  //登录
  // if(this.username == "" || this.password == ""){
  //   ElMessage.error("账号或密码不能为空");
  // }else{
  //   alert("账号："+this.username+"密码："+this.password)
  //   apiFun.login({
  //     username:this.username,
  //     password:this.password,
  //   }).then((res)=>{
  //     if(res.success == false){
  //       ElMessage.error(res.msg)
  //     }else{
  //       var token = res.data;
  //       //把token放进store中
  //       // this.$store.commit("setToken", token);
  //       ElMessage.success("用户 “"+this.username+"” 登录成功");
  //       this.$router.push({path:'/main'})//跳转到主页面
  //     }
  //   })
  // }
};
</script>

<style lang="scss" scoped>
.login-btn {
  width: 350px;
  height: 34px;
  color: white;
  border-style: none;
  border-radius: 2px;
  background-color: #586cb1;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #4e5e9b;
  box-shadow: 0 3px 1px -2px rgb(104, 103, 103);
}

.fontStyle {
  width: 330px;
  height: 36px;
  padding: 0 10px;
  border-color: rgba(228, 227, 227, 0.719);
  outline: none;
  border: none;
  border-bottom: 1px solid #626364;
}

.fontStyle:hover {
  box-shadow: 0 3px 1px -2px rgb(104, 103, 103);
}

.ram {
  font-style: 8px;
  color: #4e5e9b;
  position: absolute;
  bottom: 20px;
  left: 180px;
  background-color: white;
  text-align: center;
}
</style>
