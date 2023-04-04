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
<<<<<<< HEAD
          <el-button size="mini" type="primary" @click="createUser"
            ><el-icon><Plus /></el-icon>{{ "\xa0" }}创建用户</el-button
          >
          <el-button type="" @click="deleteUser"
            ><el-icon><Delete /></el-icon>{{ "\xa0" }}删除用户</el-button
          >
=======
          <el-button size="mini"  type="goon" @click="createUser"><el-icon><Plus /></el-icon>{{"\xa0"}}创建用户</el-button>
          <!-- <el-button type="" @click="deleteUser"><el-icon><Delete /></el-icon>{{"\xa0"}}删除用户</el-button> -->
>>>>>>> a5af8dfb07d7c3cc0b9818eebd3d285f06fcfcdf
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
                v-model="data.searchForm.name"
                placeholder="输入登录名、显示名、用户ID或AccessKey ID"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="search"
                ><el-icon><Search /></el-icon
              ></el-button>
            </el-form-item>
          </el-form>
        </div>
<<<<<<< HEAD
      </div>
      <div style="clear: both"></div>
      <div class="common-table">
        <el-table
          :data="data.tableData"
          stripe
          style="width: 98%"
          height="90%"
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
          <el-table-column
            type="selection"
            width="55"
            :selectable="selected"
          ></el-table-column>
          <el-table-column
            align="center"
            prop=""
            label="用户登录名称/显示名称"
            width="190"
          >
            <template #default="scope">
              <!-- <router-link to="/users/subUser" style="color:#2177b8;">{{ scope.row.userName }}</router-link> -->
              <p class="buttonText" href="#/users/subUser" target="_blank">
                {{ scope.row.username }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="beizhu"
            label="备注"
            width="120"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="type"
            label="同步类型"
            width="200"
          >
          </el-table-column>
          <!-- <el-table-column align="center" prop="" label="标签" width="200">
                <a><el-icon><PriceTag /></el-icon></a>
              </el-table-column> -->
          <el-table-column
            align="center"
            prop="updateTime"
            label="最后登录时间"
            width="150"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="createTime"
            label="创建时间"
            width="150"
          >
          </el-table-column>
          <!-- 自定义列 -->
          <el-table-column align="center" label="操作" >
                  <template #default="scope" >
                      <a class="buttonText" href="javascript:void(0)" target="_blank" style="color:red;" @click.prevent="handleDelete(scope.row)">
=======
    </div>
    <div style="clear: both;"></div>
    <div class="common-table">
      <el-table :data="data.tableData" stripe style="width: 98%" 
                height="90%" 
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
              <el-table-column align="left" prop="" label="用户登录名称/显示名称" width="250">
                  <template #default="scope">
                      <!-- <router-link to="/users/subUser" style="color:#2177b8;">{{ scope.row.userName }}</router-link> -->
                      <p class="buttonText" href="#/users/subUser" target="_blank">
                          {{ scope.row.userid }}
                      </p>
                      <p class="buttonText" href="#/users/subUser" target="_blank">
                          {{ scope.row.username }}
                      </p>
                  </template>
              </el-table-column>
              <el-table-column align="left" prop="beizhu" label="备注" width="200">
              </el-table-column>
              <el-table-column align="left" prop="type" label="同步类型" width="200">
              </el-table-column>
              <!-- <el-table-column align="left" prop="" label="标签" width="200">
                <a><el-icon><PriceTag /></el-icon></a>
              </el-table-column> -->
              <el-table-column align="left" prop="updateTime" label="最后登录时间" width="200">
              </el-table-column>
              <el-table-column  align="left" prop="createTime" label="创建时间" width="200">
              </el-table-column>
              <!-- 自定义列 -->
              <el-table-column align="left" label="操作" >
                  <template #default="scope" >
                      <a class="buttonText"  target="_blank" style="color:red;" @click.prevent="handleDelete(scope.row)">
>>>>>>> a5af8dfb07d7c3cc0b9818eebd3d285f06fcfcdf
                          删除
                      </a>
                      <!-- <el-button style="padding-right: 15px" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button> -->
                  </template>
              </el-table-column>
<<<<<<< HEAD
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
            <el-input
              style="width: 95%"
              v-model="input"
              placeholder="Please input"
            />
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button
                type="info"
                @click="submit"
                :disabled="disabled"
                style="width: 100px"
                >移入回收站</el-button
              >
              <el-button @click="closeDialog" style="width: 80px"
                >取 消</el-button
              >
            </span>
          </template>
        </el-dialog>
      </div>
=======
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
                  <p>您确定要将用户 element@8475738355324.cloudcan.com 移入回收站吗?</p>
                </div>
                <div class="tip2">
                  <p>用户移入回收站会导致:</p>
                  <div class="tip3" style="padding-left: 3%;">
                    <p>1.禁用用登录</p>
                    <p>2.接触MFA控制</p>
                    <p>3.移除用户权限</p>
                  </div>
                  <p>您可以到回收站彻底删除或回复用户身份,但以上已删除的信息不可恢复。</p>
                </div><br/>
                <p style="line-height:0.5;">如需删除该用户,请输入用户名称。</p><br/>
                <el-form
                        label-width="100px"
                        ref="formlabelref"
                        :rules="rules"
                        :inline="true"
                        :model="formlabel"
                        class="con-form"
                    >
                    <el-form-item prop="id" style="width: 100%">
                      <el-input style="width: 95%" v-model="formlabel.input" placeholder="请输入用户名称"/>
                    </el-form-item>  
                </el-form>
              </div>
              <template #footer>
                <span class="dialog-footer">
                  <el-button type="info" @click="submit" :disabled="disabled" style="width:100px;">移入回收站</el-button>
                  <el-button @click="closeDialog" style="width:80px;">取 消</el-button>
                </span>
              </template>
            </el-dialog>
        </div>
>>>>>>> a5af8dfb07d7c3cc0b9818eebd3d285f06fcfcdf
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
import apiFun from "../../utils/api";
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
  // 列表数据
  tableData: [],
  //表单是否打开
  dialogVisible: false,
  username: "",
  id: "",
  state: "",
  image: "",
  email: "",
  phone: "",
  // 搜索框表单
  searchForm: {
    name: "",
  },
  //分页
  total: 200, // 总条数
  currentPage: 1, // 当前页
  pageSize: 8,
<<<<<<< HEAD
});
let boolean1 = ref(true);
let boolean2 = ref(false);
const ruleFormRef = ref();
=======
})
const disabled = ref(false)
let rules= ref({
    id: [
    {
        required: true,
        message: '该项不能为空',
        trigger: 'blur',
    }
    ],
}) 
let formlabel = ref({
    input:'',
})
let boolean1 = ref(true)
let boolean2 = ref(false)
const ruleFormRef = ref()
>>>>>>> a5af8dfb07d7c3cc0b9818eebd3d285f06fcfcdf

//重置
const resetForm = () => {
  ruleFormRef.value.resetFields();
};

//搜索
const search = async () => {
  console.log("都可以");
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
  axios
    .get("/api/getSubUserList")
    .then((res) => {
      console.log(res);
      console.log(res.data.data1.data.length);
      data.tableData = res.data.data1.data;
      console.log(data.tableData);
      for (let i = 0; i < res.data.data1.data.length; i++) {
        // console.log(res.data.data.data[i].phone)
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
//分页
const changePage = (val) => {
  state.currentPage = val;
};

//删除
const handleDelete = (index) => {
  console.log(index.id);
  let data = {
    id: index.id,
  };
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
};
//提交表单
const submit = () => {
  // 先重置
  // this.$refs.form.resetFields()
  // this.$refs[formRef].resetFields();
  // 后关闭
  data.dialogVisible = false;
  ElMessage.success("删除成功");
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
<<<<<<< HEAD
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
      .frame {
        .el-form-item {
          .el-input {
            width: 330px;
=======
        display: flex;
        justify-content: space-between;
        // align-items: center;
        position: relative;
        top:15px;
        padding-bottom: 20px;
        .manage{
          padding-left: 0%;
        }
        .search{
          // float: left;
          padding-left: 20%;
          .frame{
            .el-form-item {
              .el-input {
                width: 330px;
              }
              .el-select{
                width: 70px;
              }
            }
>>>>>>> a5af8dfb07d7c3cc0b9818eebd3d285f06fcfcdf
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
<<<<<<< HEAD
  .el-dialog {
    .innerIcon {
      width: 1em;
      height: 1em;
      margin-right: 8px;
=======
  .con-form{
    padding-left: 4%;
  }
  .el-dialog{
    .innerIcon{
      width: 1em; 
      height: 1em; 
      margin-right: 8px; 
>>>>>>> a5af8dfb07d7c3cc0b9818eebd3d285f06fcfcdf
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