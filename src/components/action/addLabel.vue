<template>
  <el-dialog width="45%" title="标签" append-to-body style="padding: 0px 15px">
    <template #default>
      <el-alert type="info" :closable="false" class="input-msg-acl el-alert">
        <el-icon class="icon-text"><InfoFilled /></el-icon
        ><span class="el-alert-span"
          >您可以对 Object 设置标签，并根据 Object
          标签，进行生命周期管理。</span
        >
      </el-alert>
      <div class="content-box">
        <div class="title">
          <span style="margin-left: -5%">键</span>
          <span style="margin-left: -18%">值</span>
        </div>
        <div
          v-for="(label, index) in state.labels"
          :key="index"
          class="label-input"
        >
          <el-input v-model="label.key" />
          <el-input v-model="label.value" />
          <el-button type="danger" @click="deleteLabel(index)">删除</el-button>
        </div>
      </div>
      <el-button type="primary" :disabled = "addInput"
       @click="addLabel(index)" 
        >添加</el-button>
    </template>
    <template #footer>
      <div style="flex: auto; justify-content: center">
        <el-button size="large" type="primary" @click="$emit('confirmClick',state.labels)"
          >确定</el-button
        >
        <el-button size="large" @click="$emit('cancelClick')">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive } from "vue";

const prop = defineProps({

});

const state = reactive({
  /* 标签数组 */
  labels: [
    {
      key: "",
      value: "",
    },
  ],
});

const addInput = computed(()=>{
    console.log(state.labels[state.labels.length-1])
    if(state.labels[state.labels.length-1].key==''||state.labels[state.labels.length-1].value==''){
        return true;
    }
    else return false
})

const deleteLabel = (index) => {
  /* 删除标签 */
  state.labels.splice(index, 1);
};
const addLabel = (index) => {
  /* 添加标签 */
  state.labels.push({ key: "", value: "" });
};

</script>

<style scoped>
.icon-text {
  color: #0064c8;
  margin-right: 10px;
  height: 7px;
}
.content-box {
  font-weight: bold;
  margin-bottom: 25px;
}
.el-alert-span {
  font-size: 14px;
  color: #333;
}
.el-alert {
  background-color: #eff3f8;
  display: flex;
  flex-direction: row;
  margin-bottom: 5%;
}

.title {
  margin-bottom: 13px;
  display: flex;
  margin-left: -10%;
  flex-direction: row;
  justify-content: space-around;
}
.label-input {
  display: flex;
  flex-direction: row;
  gap: 65px;
  margin-bottom: 15px;
}
</style>
