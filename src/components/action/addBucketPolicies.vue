<template>
  <el-button type="primary" style="margin-left: 16px" @click="add">
    新增授权
  </el-button>

  <el-button type="primary" style="margin-left: 16px" @click="edit">
    编辑授权
  </el-button>

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
            <el-checkbox label="1" class="black">所有账号 (*)</el-checkbox>
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
                <el-radio label="4" size="large" border>完全控制</el-radio>
                <el-radio label="5" size="large" border>拒绝访问</el-radio>
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
</template>

<script setup>
import { watch, ref } from "vue";
import { ElMessage } from "element-plus";

const radio1 = ref("1");
const disabled1 = ref(true);
const drawer = ref(false);
var nowTitle = ref("新增授权");
//当前单选框选择
var radio = ref("1");

function add() {
  nowTitle.value == "新增授权";
  drawer.value = true;
}

function edit() {
  nowTitle.value == "编辑授权";
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

const value1 = ref("1");
const options = [
  {
    value: "1",
    label: "子用户1",
  },
  {
    value: "2",
    label: "子用户2",
  },
  {
    value: "3",
    label: "子用户3",
  },
  {
    value: "4",
    label: "子用户4",
  },
  {
    value: "5",
    label: "子用户5",
  },
];

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
.content {
  text-align: left;
}

.littleTitle {
  font-weight: bold;
  margin-right: 20px;
}

.tip2 {
  margin-left: 80px;
  color: gray;
  font-size: 13px;
}
.in {
  margin-left: 80px;
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