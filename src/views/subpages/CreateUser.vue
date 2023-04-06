<template>
  <div class="main">
    <div class="icon-return" >
      <el-icon size="30" @click="back"><Back /></el-icon> 
    </div>
    <div class="info">
      <h1 class="info-name">创建用户</h1>
    </div>
    <div class="content">
      <p class="con-title">用户账号信息</p>
      <el-form
            label-width="100px"
            ref="formlabelref"
            :rules="rules"
            :inline="true"
            :model="formlabel"
            class="con-form"
        >
            <el-form-item label="登录名称" prop="name">
                <el-input v-model="formlabel.loginame" style="width: 350px;">
                  <template #suffix>
                    <span style="border: none;">@8475738355324.cloudcan.com</span>
                  </template>
                </el-input>
            </el-form-item>
            <el-form-item label="显示名称" prop="name">
                <el-input v-model="formlabel.name" style="width: 350px;" ></el-input>
            </el-form-item>
            <!-- <el-form-item label="标签"  prop="">
              <p>未绑定标签</p>{{"\xa0\xa0"}}
              <el-icon  @click="edit" style="cursor:pointer;"><EditPen /></el-icon>
            </el-form-item> -->
            <p class="con-title" >设置密码</p>
            <div class="mb-2 flex items-center text-sm ">
              <!-- <el-radio-group v-model="radio" class="ml-4 radio-container">
                <el-radio label="1" size="large">自动生成密码</el-radio>
                <el-radio label="2" size="large">自定义密码</el-radio>
              </el-radio-group> -->
            </div>
            <el-form-item label=""  prop="password" class="form-input" >
                <el-input v-model="formlabel.password" style="width: 250px;"></el-input>
            </el-form-item><br/>
            <el-form-item  class="form-button">
                <el-button type="primary" @click="submit" style="width: 80px;">确认</el-button>
                <el-button @click="reset" style="width: 80px;">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
    
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ElMessageBox,ElMessage } from 'element-plus';
import { Edit } from '@element-plus/icons-vue';
/**
* 仓库
*/
const store = useStore();
/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/
const data = reactive({
    from:{
      name:'',
      password:'',

    },
    
})
let formlabelref = ref()
let formlabel = ref({
    loginame:'',
    name: '',
    password: '',
})
let rules= ref({
    name: [
    {
        required: true,
        message: '该项不能为空',
        trigger: 'blur',
    }
    ],
    password: [
    {
        required: true,
        message: '该项不能为空',
        trigger: 'blur',
    },
    ],
}) 
const radio = ref('1') //单选框
//确认
const submit = () =>{
  console.log("确认")
  ElMessage.success("确认成功")
  history.go(-1) 
}
//返回
const reset = () =>{
  history.go(-1) 
}
//绑定标签
const edit = () =>{
  console.log("绑定标签")
}
//额头返回键
const back = () =>{
history.go(-1) 
}
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(()=>{
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped lang='scss'>
.main{
  // position:absolute;
  .icon-return{
    // font-size: 24px;
    line-height: inherit;
    width: 95px;
    position: relative;
    top:28px;
    cursor:pointer;
    z-index:999;
  }
  .info{
      position: relative;
      padding-left: 84px;
      top: -10px;
      text-align:left;
      .info-name{
          color: #111;
          flex: 1;
          font-size: 28px;
          font-weight: 600;
          line-height: 40px;
          margin: 0;
          padding: 0;

      }
  }

  //表单
  .content{
    position: relative;
    .con-title{
      padding-right: 86%;
      padding-bottom: 1%;
      padding-top: 1%;
      font-size:18px;
    }
    .con-form{
      margin:0 auto;
      float: left;
      .form-input{
        padding-right: 65%;
       
      }
      .form-button{
        // $width: 750px;
        // height: calc(100% - #{$width});
        // height:calc(100vh-123px);
        position: relative;
        padding: 30% 75% 0 0; 
      }
    }
    .radio-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start; /* 控制每个el-radio在垂直方向上的对齐方式 */
      padding-left: 3%;
      

    }
    
  }

}


</style>