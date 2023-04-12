<!-- 子页面 ———— 子用户管理 -->
<template>
  <div class="sub-main">
    <div id="now-page" v-if="boolean1 === true">
      <div class="info">
        <h1 class="info-name">子用户管理</h1>
        <p></p>
      </div>
      <div class="manage-header">
        <div class="manage">
          <el-button size="mini" type="goon" @click="createUser"
            ><el-icon><Plus /></el-icon>{{ "\xa0" }}创建用户</el-button
          >
          <!-- <el-button type="" @click="deleteUser"><el-icon><Delete /></el-icon>{{"\xa0"}}删除用户</el-button> -->
        </div>
        <!-- 搜索模块-->
        <div class="search">
          <el-form
            :model="searchForm"
            :rules="searchForm"
            ref="searchForm"
            :inline="true"
            class="frame"
          >
            <el-form-item style="margin-right: 17px">
              <el-input
                v-model="data.keyword"
                placeholder="输入登录名"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="search"
                ><el-icon><Search /></el-icon
              ></el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div style="clear: both"></div>
      <div class="common-table">
        <el-table
          :data="data.tableData"
          stripe
          style="width: 98%"
          height="90%"
          v-loading="loading"
          row-key="id"
          ref="multiTable"
          class="table"
          @select="selectChange"
          @select-all="selectAllChange"
          @selection-change="handleSelectsb"
          :expand-row-keys="expandRowKeys"
          :tree-props="{ children: 'children', hasChildren: 'haschildren' }"
        >
          <!-- 复选框 -->
          <!-- <el-table-column type="selection" width="55" :selectable="selected"></el-table-column> -->
          <el-table-column prop="" label="" width="20"> </el-table-column>
          <el-table-column
            align="left"
            prop=""
            label="子用户ID/显示名称"
            width="600"
          >
            <template #default="scope">
              <router-link
                to="/users/subUser"
                style="color: #2177b8; text-decoration: none"
                >{{ scope.row.id }}@1519673410209.cloudcan.com</router-link
              >
              <!-- <p class="buttonText" href="#/users/subUser" target="_blank">
                          {{ scope.row.id }}
                      </p> -->
              <p class="buttonText" href="#/users/subUser" target="_blank">
                {{ scope.row.username }}
              </p>
            </template>
          </el-table-column>
          <!-- <el-table-column align="left" prop="beizhu" label="备注" width="">
              </el-table-column> -->
          <!-- <el-table-column align="left" prop="" label="标签" width="200">
                <a><el-icon><PriceTag /></el-icon></a>
              </el-table-column> -->
          <el-table-column
            align="left"
            prop="updateTime"
            label="最近登录时间"
            width=""
          >
          </el-table-column>
          <el-table-column
            align="left"
            prop="createTime"
            label="创建时间"
            width=""
          >
          </el-table-column>
          <!-- 自定义列 -->
          <el-table-column align="left" label="操作" width="170">
            <template #default="scope">
              <a
                class="buttonText"
                target="_blank"
                style="color: red; cursor: pointer"
                @click.prevent="handleDelete(scope.row)"
              >
                删除
              </a>
              <!-- <el-button style="padding-right: 15px" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          class="page"
          layout="prev, pager, next"
          :total="data.total"
          :page-size="data.pageSize"
          :current-page="data.currentPage"
          @current-change="changePage"
        />
      </div>
      <div>
        <el-dialog
          v-model="data.dialogVisible"
          width="35%"
          align-center
          class="changBox"
          :before-close="closeDialog"
        >
          <template #title>
            <WarningFilled class="innerIcon" />
            <span class="innerTitle">删除用户</span>
          </template>
          <div class="innerBox" style="z-index: 100000">
            <div class="tip1">
              <p>
                您确定要将用户 element@8475738355324.cloudcan.com 移入回收站吗?
              </p>
            </div>
            <div class="tip2">
              <p>用户移入回收站会导致:</p>
              <div class="tip3" style="padding-left: 3%">
                <p>1.禁用用登录</p>
                <p>2.接触MFA控制</p>
                <p>3.移除用户权限</p>
              </div>
              <p>
                您可以到回收站彻底删除或回复用户身份,但以上已删除的信息不可恢复。
              </p>
            </div>
            <br />
            <p style="line-height: 0.5">如需删除该用户,请输入用户名称。</p>
            <br />
            <el-form
              label-width="100px"
              ref="ruleFormRef"
              :model="formlabel"
              :rules="rules"
              :inline="true"
              class="con-form"
            >
              <el-form-item prop="input" style="width: 100%">
                <el-input
                  style="width: 95%"
                  v-model="formlabel.input"
                  placeholder="请输入用户名称"
                />
              </el-form-item>
              <div class="del-but">
                <el-button
                  type="info"
                  @click="submit(ruleFormRef)"
                  :disabled="disabled"
                  style="width: 100px"
                  >移入回收站</el-button
                >
                <el-button @click="closeDialog" style="width: 80px"
                  >取 消</el-button
                >
              </div>
            </el-form>
          </div>
        </el-dialog>
      </div>
    </div>
    <div id="next-page" style="visibility: hidden" v-if="boolean2 === false">
      <router-view></router-view>
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
import axios from "axios";
import { ElMessageBox, ElMessage } from "element-plus";
import req from "../../utils/api";
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
const loading = ref(true)
/**
 * 数据部分
 */
const data = reactive({
  // 列表数据
  tableData: [],
  //表单是否打开
  dialogVisible: false,
  keyname: "",
  username: "",
  id: "",
  state: "",
  image: "",
  email: "",
  phone: "",
  // 搜索框表单
  keyword: "",
  //分页
  total: 100, // 总条数
  currentPage: 1, // 当前页
  pageSize: 8,
});
const disabled = ref(false);
//自定义昵称校验规则
const checkeNickName = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("该项不能为空"));
  } else if (value !== data.keyname) {
    callback(new Error("输入信息与被删除用户不匹配!"));
  } else {
    callback();
  }
};
let ruleFormRef = ref(null);
let rules = ref({
  input: [
    { validator: checkeNickName, trigger: "blur" },
    { required: true, message: "该项不能为空", trigger: "blur" },
  ],
});
let formlabel = ref({
  input: "",
});
let boolean1 = ref(true);
let boolean2 = ref(false);

//重置
const resetForm = () => {
  ruleFormRef.value.resetFields();
};

//搜索
const search = async () => {
  console.log(data.keyword);
  initData();
};
//创建用户V
const createUser = async () => {
  // let divV = document.getElementById("now-page");
  // if(divV.style.visibility =="hidden"){
  //     divV.style.visibility ="visible";
  // }else{
  //   divV.style.visibility = "hidden";
  // }
  console.log(boolean1.value);
  console.log(boolean2.value);
  if (boolean1.value === true) {
    boolean1.value = false;
  } else {
    boolean1.value = true;
  }
  if (boolean2.value === true) {
    boolean2.value = false;
  } else {
    boolean2.value = true;
  }
  router.push("/createUser");
};
//批量删除用户
const deleteUser = async () => {
  console.log("都可以");
};

//获取子用户列表
const initData = () => {
  //写请求接口
  // axios.get( "/api/getSubUserList").then(res=>{
  //   console.log(res)
  //   console.log(res.data.data1.data.length)
  //   data.tableData = res.data.data1.data
  //   console.log(data.tableData)
  //   for(let i=0; i<res.data.data1.data.length; i++){
  //       // console.log(res.data.data.data[i].phone)
  //   }
  // }).catch(err =>{
  //   console.log(err)
  // })\

  console.log(data.currentPage);
  console.log(typeof data.pageSize);
  req.user
    .getSubUsers(data.keyword, data.currentPage, data.pageSize)
    .then((res) => {
      console.log(res);
      if (res.code === 200) {
        data.tableData = res.data.rows;
        data.total = res.data.totalCount;
        loading.value=false
      }
    })
    .catch((err) => {
      console.log(err);
      ElMessage.error("加载失败");
    });
};
//分页
const changePage = (val) => {
  data.currentPage = val;
  initData();
};

//删除
const handleDelete = (index) => {
  data.keyname = index.username;
  data.id = index.id;
  openForm();
};
// 打开表单
const openForm = () => {
  data.dialogVisible = true;
  console.log(data.dialogVisible);
};
// 关闭表单
const closeDialog = () => {
  data.dialogVisible = false;
  ruleFormRef.value.resetFields();
  formlabel.index = "";
};
//提交表单
const submit = async (formEl) => {
  await formEl.validate((valid, fields) => {
    console.log(valid);
    if (valid) {
      // 验证成功
      req.user
        .deleteSubUser(data.id)
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            ElMessage.success({
              message: "删除成功!",
            });
            initData();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      data.dialogVisible = false;
    }
  });
};
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  initData();
});
watchEffect(() => {});
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data),
  search,
});
</script>
<style lang="scss" scoped>
a:hover {
  text-decoration: underline;
}
::v-deep .table th {
  background-color: #eff3f8;
}

.sub-main {
  .info {
    position: relative;
    padding-left: 5px;
    text-align: left;
    .info-name {
      color: #111;
      flex: 1;
      font-size: 28px;
      font-weight: 600;
      line-height: 40px;
      margin: 0;
      padding: 0;
    }
  }

  .manage-header {
    display: flex;
    justify-content: space-between;
    // align-items: center;
    position: relative;
    top: 15px;
    padding-bottom: 20px;
    .manage {
      padding-left: 0%;
    }
    .search {
      // float: left;
      padding-left: 20%;
      .frame {
        .el-form-item {
          .el-input {
            width: 330px;
          }
          .el-select {
            width: 70px;
          }
        }
      }
    }
  }

  .common-table {
    // height: 85%;
    position: relative;

    .page {
      position: absolute;
      // bottom: calc(100%-10px);
      right: 20px;
      margin-top: 20px;
    }
  }

  .el-dialog p {
    text-align: left;
    line-height: 1.8;
    padding-left: 4%;
  }
  .innerBox {
    padding-top: 20px;
  }
  .con-form {
    padding-left: 4%;
  }
  .del-but {
    padding-left: 288px;
  }
  .el-dialog {
    .innerIcon {
      width: 1em;
      height: 1em;
      margin-right: 8px;
      color: #fed71a;
      text-align: left;
      position: absolute;
      left: 8%;
      top: 37px;
    }
    .innerTitle {
      position: absolute;
      left: 12%;
      top: 31px;
      font-size: 18px;
      font-weight: bold;
    }
  }
}

// 创建用户按钮
.el-button--goon.is-active,
.el-button--goon:active {
  background: #1497db;
  border-color: #1497db;
  color: #fff;
}

.el-button--goon:focus,
.el-button--goon:hover {
  background: #2177b8;
  border-color: #2177b8;
  color: #fff;
}

.el-button--goon {
  color: #fff;
  background-color: #1497db;
  border-color: #1497db;
}
</style>
