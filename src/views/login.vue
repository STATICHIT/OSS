<template>
  <div>
    <div class="login-page">
      <div>
        <div class="login-box">
          <br />
          <p class="login-box-msg">Welcome , please login to your account.</p>
        </div>
        <br /><br />
        <el-icon><User /></el-icon><span style="color: gray"> Username</span>

        <input
          type="text"
          class="form-control"
          name="username"
          placeholder="请输入您的账号"
          required
          autofocus
        />
        <br />
        <br />
        <el-icon><Lock /></el-icon><span style="color: gray"> Password</span>

        <div class="help-block with-errors"></div>
        <input
          minlength="5"
          maxlength="20"
          type="password"
          class="form-control"
          name="password"
          placeholder="请输入您的密码"
          required
          autocomplete="current-password"
        />

        <br /><br /><br />
        <div class="text-left">
          <div class="remember">
            <input id="remember" name="remember" type="checkbox" />
            <span> Remember me</span>
          </div>
          <div class="register">
            <router-link to="/register" style="text-decoration: none"
              ><span>注册新账号</span></router-link
            >
          </div>
        </div>
        <br />
        <button class="login-btn" @click="login">
          登 录
          <el-icon><Right /></el-icon>
        </button>
        <div>
          <router-link to="/ramLogin" class="ram" style="text-decoration: none"
            ><span>RAM账户登录</span></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import apiFun from "../utils/api";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      //测试
      this.$router.push({ path: "/test2" });

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
    },
  },
};
</script>

<style lang="scss" scoped>
.login-btn {
  color: white;
  border-style: none;
  width: 350px;
  padding: 0.54rem 1.2rem !important;
  height: 34px;
  line-height: 1.2;
  border-radius: 0.2rem;
  background-color: #586cb1;
  cursor: pointer;
  box-shadow: 0 3px 1px -2px rgb(209, 208, 208);
}
.form-control {
  width: 330px;
  height: 36px;
  padding: 0 10px;
  border-color: rgba(228, 227, 227, 0.719);
  outline: none;
  border: none;
  border-bottom: 1px solid #626364;
}

.form-control:hover {
  box-shadow: 0 3px 1px -2px rgb(104, 103, 103);
}

.login-btn:hover {
  background-color: #4e5e9b;
  box-shadow: 0 3px 1px -2px rgb(104, 103, 103);
}
.text-left {
  display: flex;
}

.text-left .remember {
  width: 100%;
}

.text-left .register {
  width: 100px;
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
