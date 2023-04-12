<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-19 20:46:34
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-04-08 18:40:14
 * @FilePath: \OSS\src\views\subpages\CreateUser.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="main">
    <div class="icon-return">
      <el-icon size="30" @click="back"><Back /></el-icon>
    </div>
    <div class="info">
      <h1 class="info-name">创建用户</h1>
    </div>
    <div class="content">
      <el-form
        label-width="100px"
        ref="formlabelref"
        :rules="rules"
        :inline="true"
        :model="formlabel"
        class="con-form"
      >
        <p class="con-title">用户账号信息</p>
        <el-form-item label="登录名称" prop="name" style="margin-left: -20px">
          <el-input v-model="formlabel.name" style="width: 350px"></el-input>
        </el-form-item>
        <br />
        <el-form-item
          label="登录密码"
          prop="password"
          style="margin-left: -20px"
        >
          <el-input
            show-password
            type="password"
            v-model="formlabel.password"
            style="width: 350px"
          ></el-input>
        </el-form-item>
        <el-form-item class="form-button">
          <el-button
            type="primary"
            @click="submit(formlabelref)"
            style="width: 80px"
            >确认</el-button
          >
          <el-button @click="reset" style="width: 80px">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  watchEffect,
  computed,
} from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import req from "../../utils/api";
const store = useStore(); //仓库
const route = useRoute(); //路由对象
const router = useRouter(); //路由实例

//数据部分
let formlabelref = reactive(null);
let formlabel = reactive({
  loginame: "",
  name: "",
  password: "",
});
const validatePass = (rule, value, callback) => {
  var passwordreg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}/;
  if (value === "") {
    callback(new Error("该项不能为空"));
  } else if (!passwordreg.test(value)) {
    callback(new Error("密码必须由数字、字母、特殊字符组合,请输入6-16位"));
  } else {
    callback();
  }
};
let rules = reactive({
  name: [
    {
      required: true,
      message: "该项不能为空",
      trigger: "blur",
    },
  ],
  password: [
    { validator: validatePass, trigger: "blur" },
    { required: true, message: "该项不能为空", trigger: "blur" },
  ],
});

const radio = ref("1"); //单选框
//确认
const submit = async (formEl) => {
  await formEl.validate((valid, fields) => {
    console.log(valid);
    if (valid) {
      // 验证成功
      let params = {
        username: formlabel.name,
        password: formlabel.password,
      };
      console.log(params);
      ElMessageBox.confirm("请核实填入信息, 选择是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          req.user
            .createRam(params)
            .then((res) => {
              console.log(res);
              if (res.code === 200) {
                ElMessage.success({
                  message: "创建成功!",
                });
                history.go(-1);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          ElMessage.info({
            message: "已取消",
          });
        });
    }
  });
};
//返回
const reset = () => {
  history.go(-1);
};
//绑定标签
const edit = () => {
  console.log("绑定标签");
};
//额头返回键
const back = () => {
  history.go(-1);
};
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
});
watchEffect(() => {});
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(formlabel),
});
</script>
<style scoped lang='scss'>
.main {
  .icon-return {
    line-height: inherit;
    width: 95px;
    position: relative;
    top: 28px;
    cursor: pointer;
    z-index: 999;
  }
  .info {
    position: relative;
    padding-left: 84px;
    top: -10px;
    padding-bottom: 20px;
    text-align: left;
    .info-name {
      color: #111;
      flex: 1;
      font-size: 28px;
      font-weight: 600;
      line-height: 40px;
      margin: 0;
    }
  }
  //表单
  .content {
    text-align: left;
    position: relative;
    padding-left: 30px;
    .con-title {
      padding-bottom: 4%;
      padding-top: 1%;
      font-size: 18px;
    }
    .con-form {
      margin: 0 auto;
      float: left;
      .form-button {
        position: relative;
        padding: 40% 50% 0 0;
      }
    }
  }
}
</style>