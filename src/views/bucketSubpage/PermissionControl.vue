<!-- bucket子页面 ———— 权限控制(包含读写权限和Bucket授权策略)-->
<template>
  <el-scrollbar height="840px">
    <div class="box">
      <div class="board1">
        <div><b>欢迎使用权限控制</b></div>
        <br />
        <span style="color: gray"
          >默认情况下，为保证存储在云罐中的数据的安全性，OSS资源（包括Bucket和Object）默认为私有权限，只有资源拥有者或者
          被授权的用户允许访问，如果要授权第三方用户访问或使用自己的OSS资源，您可任意通过多种权限控制策略向他人授予资源的特定权限。
        </span>
      </div>
      <div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          @select="handleSelect"
        >
          <el-menu-item index="1">读写权限</el-menu-item>
          <el-menu-item index="2">Bucket 授权策略</el-menu-item>
        </el-menu>
      </div>
      <!-- 读写权限 -->
      <div class="box1" v-if="now">
        <span style="color: gray"
          >OSS提供Bucket级别的权限访问控制。Bucket目前有三种访问权限：public-read-write，public-read和private，对于private资源，需要获得授权才能访问。关于授权管理，可参考权限控制
          。对于一个已经存在的Bucket，只有它的创建者可以通过OSS的PutBucketAcl接口修改该Bucket的权限。</span
        >
        <br /><br /><br />
        <span><b>Bucket ACL</b></span>
        <div class="radio-group">
          <div class="mb-2 flex items-center text-sm">
            <el-radio-group v-model="radio" class="ml-4" :disabled="disabled">
              <el-radio label="1" size="large">私有</el-radio>
              <el-radio label="2" size="large">公共读</el-radio>
              <el-radio label="3" size="large">公共读写</el-radio>
              <el-radio label="4" size="large">RAM读</el-radio>
              <el-radio label="5" size="large">RAM读写</el-radio>
            </el-radio-group>
          </div>
        </div>

        <br />
        <el-button plain class="btn1" @click="change" v-if="!changing"
          >设置</el-button
        >
        <div v-if="changing">
          <el-button plain class="btn1" @click="save">保存</el-button>
        </div>
      </div>
      <!-- Bucket授权策略 -->
      <div class="box2" v-if="!now">
        <span style="color: gray">
          Bucket Policy是云罐推出的针对Bucket的授权策略，您可以通过Bucket
          Policy授权其他用户访问您指定的OSS资源。
        </span>
        <br /><br />
        <div class="tip1">
          <span>⚠ 权限列表的展示有延迟，将在设置成功15分钟内更新。</span>
        </div>
        <br />
        <el-button class="btn3" type="primary" @click="addBucket"
          >新增授权</el-button
        >
        <!-- 权限表格 -->
        <div>
          <el-table
            ref="multipleTableRef"
            :data="filterTableData"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column label="授权资源" prop="date" />
            <el-table-column label="授权操作" prop="name" />
            <el-table-column label="授权用户" prop="address" />
            <el-table-column align="right">
              <template #header>
                <el-input
                  v-model="search"
                  size="small"
                  placeholder="Type to search"
                />
              </template>
              <template #default="scope">
                <el-button
                  size="small"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-popconfirm
                  width="220"
                  cancel-button-text="取消"
                  confirm-button-text="确定"
                  title="确定要删除这条授权策略吗？"
                >
                  <template #reference>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            class="page"
            layout="prev, pager, next"
            :total="state.total"
            :page-size="state.pageSize"
            :current-page="state.currentPage"
            @current-change="changePage"
          />
        </div>
      </div>

      <!-- 新增授权策略 -->
      <div class="addBox">
        <el-dialog
          v-model="centerDialogVisible"
          :title="nowTitle"
          width="30%"
          align-center
          class="changBox"
        >
          <div class="innerBox" style="z-index: 100000">
            <div>
              <!--授权资源-->
              <span class="littleTitle">授权资源</span>
              <el-button plain>整个 Bucket</el-button>
              <el-button plain>指定资源</el-button>
            </div>

            <div>
              <!--资源路径-->
              <span class="littleTitle">资源路径</span>
              <span>当前Bucket名称 /</span>&nbsp;
              <el-input style="width:57%" v-model="path" />
            </div>

            <div>
              <!-- 授权用户 -->
              <span class="littleTitle">授权用户</span>
              
            </div>

            <!--子账号-->
            <div class="m-4">
              <el-select
                v-model="value1"
                multiple
                placeholder="Select"
                style="width: 95%"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>

            <div class="littleTitle">保留周期</div>
            <el-input
              style="width: 95%"
              v-model="input"
              placeholder="Please input"
            />
            <br />
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" @click="save2"> 确定 </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { reactive } from "vue";
import { computed, ref } from "vue";
import { ElMessage } from "element-plus";
//横向导航当前选中（1为读写权限；2为Bucket授权策略）
const activeIndex = ref("1");
//now为当前显示子页
const now = ref(true);
//横向导航选择与子页面显示的绑定
const handleSelect = (key, keyPath) => {
  console.log(key);
  if (key == "1") {
    now.value = true;
  } else {
    now.value = false;
  }
};
//是否正在编辑读写权限
var changing = ref(false);
//控制读写权限单选框的可编辑性
var disabled = ref(true);
//当前单选框选择
var radio = ref("1");

//设置按钮点击方法
let change = () => {
  changing.value = true;
  disabled.value = false;
};

//保存按钮点击方法
let save = () => {
  changing.value = false;
  disabled.value = true;
  ElMessage.success("修改成功");
};

//
const centerDialogVisible = ref(true);

// 以下是表格数据（具体数据暂时是假的）
//搜索框内容字段以及搜索逻辑
const search = ref("");
const filterTableData = computed(() =>
  state.tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
//子项编辑按钮点击方法
const handleEdit = (index, row) => {
  console.log(index, row);
};

////子项删除按钮点击方法
const handleDelete = (index, row) => {
  console.log(index, row);
};

const state = reactive({
  //表格（fake）数据
  tableData: [
    {
      date: "bucket1",
      name: "只读",
      address: "*",
    },
    {
      date: "bucket2",
      name: "读/写",
      address: "AAAbc",
    },
    {
      date: "bucket3",
      name: "RAM读/写",
      address: "*",
    },
    {
      date: "bucket4",
      name: "RAM读",
      address: "abc,aaa,AAAbc",
    },
    {
      date: "bucket5",
      name: "私有",
      address: "*",
    },
    {
      date: "bucket6",
      name: "读/写",
      address: "AAAbc",
    },
    {
      date: "bucket7",
      name: "RAM读/写",
      address: "*",
    },
    {
      date: "bucket8",
      name: "RAM读",
      address: "abc,aaa,AAAbc",
    },
    {
      date: "bucket9",
      name: "私有",
      address: "*",
    },
  ],
  //分页
  total: 200, // 总条数
  currentPage: 1, // 当前页
  pageSize: 8,
});

//分页跳转
const changePage = (val) => {
  state.currentPage = val;
};

//新增按钮点击事件
const addBucket = () => {
  centerDialogVisible.value = true;
};

//确定按钮点击事件
const save2 = () => {
  centerDialogVisible.value = false;
  if (nowTitle.value == "新增授权") {
    ElMessage.success("新增成功");
  } else if (nowTitle.value == "编辑授权") {
    ElMessage.success == "编辑成功";
  }
};

//编辑/新增框字段
//当前操作标题
const nowTitle = ref("新增授权");
//子账号列表
const value1 = ref("Option1");
const options = [
  {
    value: "Option1",
    label: "子用户1",
  },
  {
    value: "Option2",
    label: "子用户2",
  },
  {
    value: "Option3",
    label: "子用户3",
  },
  {
    value: "Option4",
    label: "子用户4",
  },
  {
    value: "Option5",
    label: "子用户5",
  },
];
</script>

<style lang="scss" scoped>
.box {
  width: 98%;
  height: 100%;
  padding: 5px 15px;
  text-align: left;
}

.flex-grow {
  flex-grow: 1;
}
.board1 {
  width: 100%;
  height: 15%;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid rgba(196, 191, 191, 0.699);
  border-radius: 10px;
}

.box1 {
  padding: 10px;
}

.radio-group {
  display: inline-block;
  margin-left: 70px;
}
.btn1 {
  margin-top: 30px;
  margin-left: 160px;
  width: 80px;
}
.btn2 {
  margin-top: 30px;
  width: 80px;
}

.box2 {
  padding: 10px;
  width: 95%;
}

.btn3 {
  width: 90px;
  height: 40px;
  font-size: 15px;
}

.tip1 {
  padding: 8px;
  border-radius: 5px;
  background-color: rgba(196, 218, 250, 0.253);
}

.page {
  position: absolute;
  bottom: 30px;
  right: 130px;
  margin-top: 20px;
}

.littleTitle {
  font-weight: bold;
  margin-right: 20px;
}
</style>