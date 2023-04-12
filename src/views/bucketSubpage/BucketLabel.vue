<!-- bucket子页面 ———— Bucket配置/Bucket标签-->
<template>
  <div class="container">
    <div style="margin-left: 30px">
      <TitleTip :title="state.title" :content="state.content"></TitleTip>
      <div class="msg">
        <el-icon color="#6faefc"><InfoFilled /></el-icon>
        <span
          >创建bucket标签，请输入bucket标签的key和value值，请注意标签键不可重复</span
        >
      </div>
      <div class="tags">
        <span style="font-weight: bold">bucket标签</span>
        <div class="tag-title">
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-around;
            "
          >
            <span style="font-weight: bold">键</span>
            <span style="font-weight: bold">值</span>
          </div>

          <div
          v-loading="loading"
           class="tag-msg" v-if="!openSetting">
            <div
              class="tag-msg-span"
              v-for="label in state.labels"
              :key="label.id"
            >
              <span>{{ label.key }}</span>
              <span>{{ label.value }}</span>
            </div>
          </div>
          <div v-show="openSetting">
            <div
              v-for="(label, index) in state.labels"
              :key="index"
              class="tag-msg-span otherStyle"
            >
              <el-input style="margin-left: 7%" v-model="label.key" />
              <el-input style="margin-left: 7%" v-model="label.value" />
              <el-button
                link
                type="danger"
                style="margin-left: 2%"
                @click="deleteLabel(index)"
                ><el-icon><DeleteFilled /></el-icon
              ></el-button>
            </div>
          </div>
        </div>
      </div>
      <el-button
        v-show="!openSetting"
        @click="openSetting = true"
        type="primary"
        >设置标签</el-button
      >
      <div v-show="openSetting">
        <div class="content-box"></div>
        <el-button type="primary" :disabled="addInput" @click="addLabel"
          >添加</el-button
        >
        <div class="btn">
          <el-button type="primary" size="large" @click="confirmClick"
            >保存</el-button
          >
          <el-button size="large" @click="close">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import TitleTip from "../../components/TitleTip.vue";
import apiFun from "../../utils/api";

const loading = ref(true)
const route = useRoute()
const query = route.query
const bucketName = query['bucketName']
const state = reactive({
  title: "Bucket标签",
  content:
    "您可以通过存储空间（Bucket）的标签功能， 对Bucket进行分类管理。例如通过不同的标签来标记不同用途的Bucket，对拥有指定标签的Bucket设置访问权限等。",
  labels: [
    {
      id: 0,
      key: "sunsan",
      value: "1",
    },
  ],
});

 onMounted(()=>{
   pre()
 })
 function pre(){
  console.log(bucketName)
   apiFun.bucket.tag.getTags(bucketName).then(res=>{
    console.log(res)
     state.labels=res.data
     loading.value=false
   })
 }



const openSetting = ref(false);

const addInput = computed(() => {
  if (
    state.labels.length != 0 &&
    (state.labels[state.labels.length - 1].key == "" ||
      state.labels[state.labels.length - 1].value == "")
  ) {
    return true;
  } else return false;
});

/* 关闭 */
const close = () => {
  openSetting.value = false;
  location.reload;
};
/* 添加标签 */
const confirmClick = () => {
  let hash = {};
  let result = false;
  state.labels.forEach((item) => {
    if (hash[item.key]) {
      result = true;
    }
    hash[item.key] = true;
  });
  if (result == true) {
    ElMessage.error("请不要输入相同的key值！");
  } else if (
    state.labels[state.labels.length - 1].key == "" ||
    state.labels[state.labels.length - 1].value == ""
  ) {
    ElMessage.error("请输入标签值！");
  } else {
    console.log(state.labels)
     apiFun.bucket.tag.addTag({
       bucketName:bucketName,
       tags:state.labels
     }).then(res=>{
       console.log(res)
       if(res.code==200){
        ElMessage.success('操作成功！')
       openSetting.value=false
       }else{
        ElMessage.error(res.msg)
       }
     })
  }
};

const deleteLabel = (index) => {
  /* 删除标签 */
  state.labels.splice(index, 1);
};
const addLabel = (index) => {
  /* 添加标签 */
  console.log(state.labels);
  state.labels.push({ key: "", value: "" });
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  text-align: left;
  box-sizing: border-box;
}
.msg {
  background-color: #eff3f8;
  padding: 15px 30px;
  display: flex;
  flex-direction: row;
}
.msg > span {
  font-size: 14px;
  color: #333;
  margin-left: 5px;
}

.tags {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 30px;
}
.tag-title {
  width: 50%;
  display: flex;
  flex-direction: column;
}
.tag-msg {
  display: flex;
  flex-direction: column;
}
.tag-msg-span {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: -5px;
}
.btn {
  position: absolute;
  right: 5%;
  bottom: 10%;
  &:hover {
    background-color: transparent;
  }}
</style>
