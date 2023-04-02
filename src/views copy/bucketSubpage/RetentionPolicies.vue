<!-- bucket子页面 ———— 数据安全/保留策略-->
<template>
  <div class="box">
    <title-tip :title="title" :content="content"></title-tip>
    <span
      >云罐提供强合规策略，您可以针对存储空间（Bucket）设置基于时间的合规保留策略。在保留时间到期前，任何用户均无法删除Object以及策略。
    </span>
    <br /><br /><br />
    <el-row :gutter="20">
      <el-col :span="3"
        ><div class="grid-content ep-bg-purple" />
        <span class="key">策略类型</span>
      </el-col>
      <el-col :span="10"
        ><div class="grid-content ep-bg-purple" />
        <span class="value">基于时间的策略</span>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="20">
      <el-col :span="3"
        ><div class="grid-content ep-bg-purple" />
        <span class="key">保留周期</span>
      </el-col>
      <el-col :span="10"
        ><div class="grid-content ep-bg-purple" />
        <span class="value">{{ day }}天</span>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="20">
      <el-col :span="3"
        ><div class="grid-content ep-bg-purple" />
        <span class="key">状态</span>
      </el-col>
      <el-col :span="10"
        ><div class="grid-content ep-bg-purple" />
        <span class="value">已锁定</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3"><div class="grid-content ep-bg-purple" /> </el-col>
      <el-col :span="15"
        ><div class="grid-content ep-bg-purple" />
        <div class="tip">
          ⚠锁定保留策略后，Object在保留期内不允许删除、覆盖或修改。Object保护时间到期后，您可以对Object执行删除、覆盖或修改操作。
          当Bucket内所有Object保护时间到期后，您可以删除所有Object，然后删除Bucket，此时Bucket对应的保留策略也会删除。
        </div>
      </el-col>
    </el-row>
    <el-button plain class="btn1" @click="change">编辑</el-button>

    <!-- 编辑保留策略弹框 -->
    <div>
      <el-dialog
        v-model="centerDialogVisible"
        title="编辑"
        width="30%"
        align-center
        class="changBox"
      >
        <div class="innerBox" style="z-index: 100000">
          <div class="tip1">
            <span
              >⚠「基于时间的保留策略」被锁定后，您可以延长保留周期，但无法缩短保留周期。请合理设置保留策略。</span
            >
          </div>
          <div class="littleTitle">策略类型</div>
          <el-select
            v-model="value"
            disabled
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
          <div class="littleTitle">保留周期</div>
          <el-input
            style="width: 95%"
            v-model="input"
            placeholder="Please input"
          />
          <br />
          <span>修改后时间的取值必须大于原有时间，且小于25550。</span>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="save" :disabled="disabled">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";
import { ElMessage } from "element-plus";
const title = "保留策略";
const content =
  "云罐提供强合规策略，您可以针对存储空间（Bucket）设置基于时间的保留策略。当策略锁定后，您可以在Bucket中上传和读取文件（Object），但是在Object的保留时间到期之前，任何用户都无法删除Object和策略。Object的保留时间到期后，才可以删除Object，适用于金融、保险、医疗、证券、日志数据等保审查等场景。";
const centerDialogVisible = ref(false);
const day = ref(115);
const value = ref("Option1");
const input = ref(115);
const disabled = ref(true);

//保留策略类型选项
const options = [
  {
    value: "Option1",
    label: "基于时间的策略",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];

// 编辑按钮点击事件
let change = () => {
  centerDialogVisible.value = true;
};

// 确认修改按钮点击事件
let save = () => {
  centerDialogVisible.value = false;
  day.value = input.value;
  input.value = day.value;
  ElMessage.success("修改成功");
};

// 对时限输入框进行监听
watch(
  () => input.value,
  (input, previnput) => {
    if (input > day.value) {
      disabled.value = false;
    } else {
      disabled.value = true;
    }
  }
);
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  padding: 5px 15px;
  text-align: left;
}

span {
  font-size: 12px;
  color: gray;
}
.state {
  display: inline-block;
  margin-left: 70px;
  font-size: 13px;
  color: black;
}
.radio-group {
  display: inline-block;
  margin-left: 70px;
}

.tip {
  padding: 8px;
  border-radius: 5px;
  margin-top: 7px;
  background-color: rgba(157, 191, 241, 0.253);
}

.tip1 {
  padding: 8px;
  border-radius: 5px;
  background-color: rgba(248, 235, 51, 0.253);
  margin-bottom: 20px;
}

.btn1 {
  width: 80px;
  margin-top: 30px;
  margin-left: 12.5%;
}

.key {
  font-size: 14px;
  font-weight: 500;
  color: rgb(19, 19, 19);
}

.value {
  font-size: 13px;
  font-weight: 500;
  color: rgb(141, 140, 140);
}

.littleTitle {
  margin-top: 12px;
  margin-bottom: 3px;
}
</style>