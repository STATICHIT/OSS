<template>
  <div class="wrap">
    <div class="title"><img src="../assets/仓库_仓储管理.png" alt=""> OSS对象存储平台</div>
    <div class="form">
      <div class="left">
        <video src="../assets/海浪浪花.mp4" muted loop autoplay></video>
      </div>
      <div class="right">
        <div class="right-con">
          <h1>账号登录</h1>
          <h3>用户名</h3>
          <input class="text" type="text" v-model="username"/>
          <h3>邮箱</h3>
          <input class="text" type="text" v-model="email"/>
          <h3>密码</h3>
          <input class="text" type="password" v-model="password"/>
          <input class="btn" type="button" @click="login" value="登 录" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import apiFun from '../utils/api';
import axios from 'axios';

export default {
  data(){
    return{
      username:"",
      email:"",
      password:"",
    }
  },
  methods:{
    login(){
      if(this.username == "" || this.password == ""){
        ElMessage.error("账号或密码不能为空");
      }else{
        alert("账号："+this.username+"密码："+this.password)
        apiFun.login({
          username:this.username,
          password:this.password,
        }).then((res)=>{
          if(res.success == false){
            ElMessage.error(res.msg)
          }else{
            var token = res.data;
            //把token放进store中
            // this.$store.commit("setToken", token);
            ElMessage.success("用户 “"+this.username+"” 登录成功");
            this.$router.push({path:'/main'})//跳转到主页面
          }
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overflow: hidden;
}

.wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/wallpaper1.jpg');
  background-size: 100% 100%;
}

.title{
  height: 50px;
  width: 1000px;
  font-size: 40px;
  position : absolute;
  top:50px;
  left:50px;
}

.title img{
  vertical-align: bottom; 
}
.form {
  width: 900px;
  height: 560px;
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
}

.left {
  width: 500px;
  height: 560px;
}

.left video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.right {
  width: 400px;
  height: 560px;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-con {
  width: 70%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

h1 {
  font-size: 26px;
  color: #70b4e3;
  font-weight: 400;
  padding-bottom: 10px;
}

h3 {
  font-size: 12px;
  font-weight: 400;
  color: #70b4e3;
  padding: 20px 0;
}

.text {
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid #70b4e3;
  color: #366ae6;
  background-color: rgba(0, 0, 0, 0);
}

.btn {
  width: 100%;
  height: 40px;
  border-radius: 20px;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  margin-top: 50px;
  background-image: linear-gradient(120deg, #18D4FF 0%, #DE0041 100%);
}

.btn:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
  
