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

      <!-- 小导航组件 -->
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

      <!-- 读写权限页 -->
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

      <!-- Bucket授权策略页 -->
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
        <el-button class="btn3" type="primary" @click="add"
          >新增授权</el-button
        >

        <!-- 权限表格 -->
        <div>
          <el-table
            ref="multipleTableRef"
            :data="filterTableData"
            style="width: 100%"
            :header-cell-style="{ background: '#eff1f7', color: '#606266' }"
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
          <!-- 分页 -->
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

      <!-- 新增授权策略抽屉 -->
      <div>
        <el-drawer v-model="drawer" direction="rtl" size="40%">
          <!-- 头部 -->
          <template #header>
            <h3 style="text-align: left">{{ nowTitle }}</h3>
          </template>
          <!-- 内容 -->
          <template #default>
            <div class="content">
              <div>
                <!--授权资源-->
                <span class="littleTitle">授权资源</span>
                <el-radio-group
                  v-model="radio1"
                  size="middle"
                  style="vertical-align: middle"
                >
                  <el-radio-button label="1">整个 Bucket</el-radio-button>
                  <el-radio-button label="2">指定资源</el-radio-button>
                </el-radio-group>
              </div>

              <br />

              <!--资源路径-->
              <div>
                <span class="littleTitle">资源路径</span>
                <span>当前Bucket名称 /</span>&nbsp;
                <span v-if="disabled1">*</span>
                <el-input v-if="!disabled1" style="width: 57%" v-model="path" />
                <br /><br />
                <div v-if="!disabled1" class="tip2">
                  <span>您可以将资源路径指定为整个Bucket、对象或者目录。</span>
                  <br />
                  <span
                    >当您给某个目录授权时，请使用通配符*结尾。如<span
                      style="color: red"
                      >bucketName/folderName/*</span
                    ></span
                  >
                </div>
              </div>

              <br />

              <!-- 授权用户 -->
              <div class="part2">
                <div class="leftPart">
                  <div class="littleTitle">授权用户</div>
                </div>
                <div class="rightPart">
                  <el-checkbox label="1" class="black"
                    >所有账号 (*)</el-checkbox
                  >
                  <br />
                  <el-checkbox label="2" class="black"> 子账号</el-checkbox>
                  <!--子账号-->
                  <div class="m-4 in2">
                    <el-select
                      v-model="value1"
                      multiple
                      placeholder="Select"
                      style="width: 478px"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </div>
                  <br />
                  <el-checkbox label="3" class="black">其他账号</el-checkbox>
                  <br />
                  <el-input
                    class="textarea"
                    v-model="textarea"
                    :rows="4"
                    type="textarea"
                    placeholder="请输入对应账号或子账号的ID 或者以am：sts 开头的临时授权用户。可以授权给多个用户，每行一个"
                    style="width: 550px"
                  />
                </div>
              </div>

              <!-- 授权操作 -->
              <div class="part2">
                <div class="littleTitle">授权用户</div>
                <div class="radio-group">
                  <div class="mb-2 flex items-center text-sm">
                    <el-radio-group v-model="radio" class="ml-4">
                      <el-radio
                        label="1"
                        size="large"
                        border
                        style="margin-bottom: 20px"
                        >只读（不包括ListObject操作）</el-radio
                      >
                      <el-radio
                        label="2"
                        size="large"
                        border
                        style="margin-bottom: 20px"
                        >只读（包括ListObject操作）</el-radio
                      >
                      <el-radio label="3" size="large" border>读/写</el-radio>
                      <el-radio label="4" size="large" border
                        >完全控制</el-radio
                      >
                      <el-radio label="5" size="large" border
                        >拒绝访问</el-radio
                      >
                    </el-radio-group>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <!-- 尾部 -->
          <template #footer>
            <div style="flex: auto">
              <el-button @click="cancelClick">取消</el-button>
              <el-button type="primary" @click="confirmClick">保存</el-button>
            </div>
          </template>
        </el-drawer>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { reactive, computed, ref,watch } from "vue";
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
//读写权限单选框当前选择
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
  nowTitle.value == "编辑授权";
  drawer.value = true;
};

//子项删除按钮点击方法
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

const radio1 = ref("1");
const disabled1 = ref(true);
const drawer = ref(false);

//当前单选框选择
var radio = ref("1");

//新增按钮点击事件
function add() {
  nowTitle.value == "新增授权";
  drawer.value = true;
}

function cancelClick() {
  drawer.value = false;
}

function confirmClick() {
  drawer.value = false;
  if (nowTitle.value == "新增授权") {
    ElMessage.success("新增成功");
  } else if (nowTitle.value == "编辑授权") {
    ElMessage.success == "编辑成功";
  }
}

const checkList = ref(["selected and disabled", "Option A"]);
const textarea = ref("");

// 对时限输入框进行监听
watch(
  () => radio1.value,
  (radio1, prevradio1) => {
    if (radio1 == "1") {
      disabled1.value = true;
    } else {
      disabled1.value = false;
    }
  }
);
</script>

<style lang="scss" scoped>
.box {
  width: 98%;
  height: 100%;
  padding: 5px 15px;
  text-align: left;
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

.box2 {
  padding: 10px;
  width: 95%;
}

.btn3 {
  width: 90px;
  height: 40px;
  font-size: 15px;
  margin-bottom: 10px;
}

.tip1 {
  padding: 8px;
  border-radius: 5px;
  background-color: rgba(196, 218, 250, 0.253);
}

.tip2 {
  margin-left: 80px;
  color: gray;
  font-size: 13px;
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

//@at-root
.content {
  text-align: left;
}

.in2 {
  display: inline-block;
}

.part2 {
  height: 100px;
  margin-bottom: 120px;
}
.leftPart {
  float: left;
  margin-top: 5px;
}
.rightPart {
  float: left;
  width: 85%;
}

.black {
  color: black;
}
.textarea {
  margin-left: 22px;
}

.radio-group {
  display: inline-block;
  margin-left: 70px;
}
</style>