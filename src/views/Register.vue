<template>
  <div>
    <div class="login-page">
      <div>
        <div class="login-box">
          <br />
          <p class="login-box-msg">
            Fill in the information here to register an account.
          </p>
        </div>
        <br /><br />
        <el-icon><User /></el-icon><span style="color: gray"> Username</span>

        <input
          type="text"
          class="form-control"
          name="username"
          placeholder="请设置用户名"
          required
          autofocus
        />

        <br /><br />
        <el-icon><Phone /></el-icon><span style="color: gray"> Phone</span>

        <input
          type="text"
          class="form-control"
          name="phone"
          placeholder="请输入您的电话"
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
        <br />
        <br />
        <span style="color: gray"> Confirm the password</span>

        <div class="help-block with-errors"></div>
        <input
          minlength="5"
          maxlength="20"
          type="password2"
          class="form-control"
          name="password"
          placeholder="请确认您的密码"
          required
          autocomplete="current-password"
        />

        <br /><br /><br />
        <br />
        <button class="login-btn" @click="register">注 册</button>
        <div>
          <router-link to="/login" class="back" style="text-decoration: none"
            ><span>回到登录页</span></router-link
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
      phone: "",
      password: "",
      password2: "",
    };
  },
  methods: {
    register() {
      //测试
      this.$router.push({ path: "/login" });

      //   //注册
      //   if (this.password != this.password2) {
      //     ElMessage.error("两次输入密码不相同");
      //   } else {
      //     if (
      //       this.username == "" ||
      //       this.password == "" ||
      //       this.password2 == "" ||
      //       this.phone == ""
      //       ) {
      //       ElMessage.error("请完整填写信息");
      //     }
      //     apiFun
      //       .enroll({
      //         username: this.username,
      //         password: this.password,
      //         phone: this.phone,
      //       })
      //       .then((res) => {
      //         if (res.flag == false) {
      //           ElMessage.error(res.data);
      //         } else {
      //           ElMessage.success(
      //               "注册成功，即将跳转至登录页"
      //           );
      //         }
      //       });
      //   }
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
  box-shadow: 0 3px 1px -2px rgb(199, 199, 199);
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

.back {
  font-style: 8px;
  color: #4e5e9b;
  position: absolute;
  bottom: 20px;
  left: 190px;
  background-color: white;
  text-align: center;
}
</style>