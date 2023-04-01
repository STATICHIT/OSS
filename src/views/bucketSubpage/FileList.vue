<!-- bucket子页面 ———— 文件列表-->
<template>
  <div class="file-list">
    <TitleTip
      title="文件列表"
      content="对象（Object）是OSS存储数据的基本单元，也被称为OSS的文件。和传统的文件系统不同，Object没有文件目录层级结构的关系。"
    ></TitleTip>
    <div class="btn-list">
      <el-button type="primary" size="large">上传文件</el-button>
      <el-button type="warning" size="large" @click="newFileDialog = true"
        >新建目录</el-button
      >
      <el-input
        v-model="state.searchText"
        class="w-50 m-2"
        size="large"
        style="margin-left: 2%; max-width: 20%"
        placeholder="请输入文件名前缀匹配"
        :suffix-icon="Search"
      />
    </div>
    <FileTable
      :table-data="state.fileList"
      @toFile="goToFile"
      @handleMsg="goToFile"
      @deleteFile="deleteFile"
      class="fileTable"
      @updateCapacity = "updateCapacityDialog = true"
      @showUpdateAcl = "innerVisible = true"
      @addLabel = "showLabelVue = true"
    ></FileTable>
    
    <!-- 文件详情对话框 -->
    <el-dialog
      v-model="drawer"
      title="文件详情"
      width="50%"
      style="height: auto"
      align-center
    >
      <template #header>
        <h4 class="el-drawer-title">详情</h4>
      </template>
      <template #default>
        <div class="content-box">
          <!-- 预览 -->
          <div class="look-box" v-show="objectInfo.isImg == 1 || 2 && fileData.capacity=='标准存储' && fileData.fileStatus==0">
            <img
              style="height: 40%; width: 100%"
              v-show="objectInfo.isImg == 1"
              :src="objectInfo.src"
            />
            <video
              style="height: 40%; width: 100%"
              v-show="objectInfo.isImg == 2"
              :src="objectInfo.src"
              controls
              autoplay
            ></video>
          </div>
          <div class="look-box look-box-msg" v-show="fileData.capacity!='标准存储'||fileData.fileStatus!=0"><el-icon color="rgb(255,203,3)"><InfoFilled /></el-icon>该Object处于归档/冷归档存储/解冻中，无法对其进行预览和下载，请先对其进行解冻。</div>
          <div class="box-items">
            <span class="file-text">文件名</span>
            <div class="file-text-child">
              <span class="file-text-child">{{ fileData.name }}</span>
              <el-button type="text" size="small" @click="copyFilename"
                >复制文件名</el-button
              >
            </div>
          </div>
          <div class="box-items">
            <span class="file-text">过期时间(秒)</span>
            <el-input-number
              v-model="num"
              class="mx-4 file-text-child"
              :min="1"
              controls-position="right"
              @change="handleChange"
            />
          </div>
          <div class="box-items">
            <span class="file-text">ETag</span>
            <div class="file-text-child">
              <span class="file-text-child">{{ objectInfo.etag }}</span>
            </div>
          </div>
          <div class="box-items">
            <span class="file-text">状态</span>
            <div class="file-text-child">
              <span class="file-text-child" style="color: #0064c8;">{{ fileStatus }}</span>
            </div>
          </div>
          <div class="box-items">
            <span class="file-text">使用HTTPS</span>
            <el-switch class="file-text-child" v-model="useHttps" />
          </div>
          <div class="box-items">
            <span class="file-text">URL</span>
            <div class="file-text-child-type">
              <el-input
                style="width: 100%"
                type="textarea"
                v-model="objectInfo.url"
              />
              <el-button
                type="text"
                size="small"
                style="margin-left: 85%"
                @click="onCopy"
                >复制URL</el-button
              >
            </div>
          </div>
          <div class="box-items">
            <span class="file-text">文件ACL</span>
            <div class="file-text-child">
              <span>{{ fileData.objectAcl }}</span>
              <el-button type="text" size="small" @click="innerVisible = true"
                >设置读写权限</el-button
              >
            </div>
          </div>
          <div class="box-items">
            <span class="file-text">存储类型</span>
            <span class="file-text-child">{{ fileData.capacity }}</span>
          </div>
          <div class="box-items">
            <span class="file-text">更新时间</span>
            <span class="file-text-child">{{ fileData.lastUpdateTime }}</span>
          </div>
          <div class="box-items">
            <span class="file-text">服务器端加密</span>
            <span class="file-text-child">{{
              objectInfo.isPsw == 1 ? "有" : "无"
            }}</span>
          </div>
        </div>
        
      </template>
    </el-dialog>
    <!-- 设置读写权限 -->
    <el-dialog
          v-model="innerVisible"
          width="45%"
          title="设置读写权限"
          append-to-body
        >
          <el-form-item
            class="objectAcl-form"
            label="读写权限"
            prop="objectAcl"
          >
            <el-radio-group
              style="margin-left: 30px"
              v-model="fileData.objectAcl"
            >
              <el-radio border label="继承Bucket" />
              <el-radio border label="私有" />
              <el-radio border label="公共读" />
              <el-radio border label="公共读写" />
            </el-radio-group>
          </el-form-item>
          <el-alert type="info" :closable="false" class="input-msg-acl el-alert">
            <p v-show="fileData.objectAcl == '继承Bucket'">
              继承 Bucket：单个文件的读写权限以 Bucket 的读写权限为准。
            </p>
            <p v-show="fileData.objectAcl == '私有'">
              私有：对文件的所有访问操作需要进行身份验证。
            </p>
            <p v-show="fileData.objectAcl == '公共读'" class="objectAcl-text">
              公共读：对文件写操作需要进行身份验证；可以对文件进行匿名读。
            </p>
            <span
              v-show="fileData.objectAcl == '公共读写'"
              class="objectAcl-text"
              >公共读写：所有人都可以对文件进行读写操作。</span
            >
          </el-alert>
          <template #footer>
      <div style="flex: auto;justify-content: center;">
        <el-button size="large" type="primary" @click="confirmClickAcl">确定</el-button>
        <el-button size="large" @click="cancelClickAcl">取消</el-button>
      </div>
    </template>
          </el-dialog
        >
    <!-- 新建目录对话框 -->
    <el-dialog
      v-model="newFileDialog"
      width="45%"
      title="新建目录"
      append-to-body
    >
      <el-form-item class="objectAcl-form" label="新建目录名">
        <el-input
          style="margin-left: 30px"
          placeholder="请输入目录名"
          :max="260"
          v-model="state.newFolder.name"
        />
        <div class="newFile-text">
          <p>目录命名规范：</p>
          <p>1.不允许使用表情符，请使用符合要求的 UTF-8 字符；</p>
          <p>
            2./ 用于分割路径，可快速创建子目录，但不要以 / 或 \
            开头，不要出现连续的 /；
          </p>
          <p>3.不允许出现名为 .. 的子目录；</p>
          <p>4.总长度控制在 1~254 个字符。</p>
        </div>
      </el-form-item>
      <template #footer>
      <div style="flex: auto;justify-content: center;">
        <el-button size="large" type="primary" @click="confirmClick">确定</el-button>
        <el-button size="large" @click="cancelClick">取消</el-button>
      </div>
    </template>
    </el-dialog>
    <!-- 修改存储类型对话框 -->
    <el-dialog
      v-model="updateCapacityDialog"
      width="45%"
      title="修改存储类型"
      append-to-body
    >
    <template #default>
        <el-form
    label-width="120px"
    class="demo-ruleForm"
    size="large"
    status-icon
    label-position="left"
    style="font-weight: bold;"
  >
  <el-form-item class="update-capacity" style="white-space:nowrap" label="保留用户自定义元数据">
      <el-switch v-model="updateFileListData.reserveData"/>
    </el-form-item>

    <el-form-item class="update-capacity" label="存储类型">
      <el-radio-group  v-model="updateFileListData.capacity">
        <el-radio  label="标准存储" />
        <el-radio label="归档存储" />
      </el-radio-group>
    </el-form-item>
    <el-alert type="info" :closable="false" class="input-msg">
        <span v-show="updateFileListData.capacity=='标准存储'">标准：高可靠、高可用、高性能，数据会经常被访问到。</span>
        <span v-show="updateFileListData.capacity=='归档存储'">归档：数据长期存储、基本不访问，存储单价低于低频访问型。选择归档存储后，文件需要先解冻才能访问。</span>
        <span class="objectAcl-text">Bucket创建成功后,存储类型不支持变更</span>
      </el-alert>
    </el-form>
    </template>
      <template #footer>
      <div style="flex: auto;justify-content: center;">
        <el-button size="large" type="primary" @click="confirmClickCapacity">确定</el-button>
        <el-button size="large" @click="cancelClickCapacity">取消</el-button>
      </div>
    </template>
    </el-dialog>
    <!-- 添加标签对话框 -->
    <AddLabel v-model="showLabelVue" @cancelClick="showLabelVue=false" @confirmClick="addLabel"></AddLabel>
  </div>
</template>

<script setup>
import { Search, Tickets } from "@element-plus/icons-vue";
import { computed, onMounted, reactive, ref } from "vue";
import FileTable from "../../components/FileTable.vue";
import TitleTip from "../../components/TitleTip.vue";
import router from "../../router";
import { ElMessage, ElMessageBox } from "element-plus";
import AddLabel from "../../components/action/addLabel.vue";
import { useRoute } from "vue-router";

var index = ref(); //获取的文件下标
var fileData = reactive({}); //选择的文件的普通数据
const updateFileList = reactive([/* 更改的文件列表 */

])
const objectInfo = reactive({
  //选择的文件的元数据
  isImg: 2,
  src: "src/assets/海浪浪花.mp4",
  isPsw: "0",
  etag:'8276D07FA5E5728303D56301A9B55986',
  url: "https://picture-sunsan.oss-cn-hangzhou.aliyuncs.com/5%20%E5%87%BD%E6%95%B0%E7%BB%83%E4%B9%A0.xlsx?Expires=1679731122&OSSAccessKeyId=TMP.3KfWcA49z5jHTFsayA73uBsxF73CXqbjvyojha35jbiAkYagNc6LeQgPMDfYV9szsHSecZ5DN1xpgi3sMwFPNBVCScM2o7&Signature=kfRiFkW01nDzuWuhhD%2BGQkBKsis%3D",
});
const innerVisible = ref(false); //设置文件读写权限对话框
//0为普通文件，1为图片文件，2为视频文件
const drawer = ref(false); //文件详情对话框
const showLabelVue = ref(false)
const newFileDialog = ref(false); //新建目录对话框
const num = ref(300); //过期时间
const useHttps = ref(true); //使用https
const updateCapacityDialog = ref(false)//修改存储类型对话框
const updateFileListData = reactive({//将要更改的文件数据
      capacity: "标准存储",
      reserveData:1,//* 是否保留用户自定义元数据 */
      objectAcl: "私有",
})
const fileStatus = computed(()=>{
    switch(fileData.fileStatus){
      case 0:
        return '正常';
        case 1:
        return '解冻中';
        case 2:
        return '归档';
        case 3:
        return '已经归档';
    }
})
const deleteFile = (index) => {//删除文件夹
  state.fileList.splice(index,1)

}
const handleChange = (value) => {
  console.log(value);
};
function cancelClick() {
  newFileDialog.value = false
}
function confirmClick() {//创建目录
  ElMessageBox.confirm(`确定创建该目录吗?`)
    .then(() => {
      newFileDialog.value = false
      ElMessage.success('创建成功！')
      // router.push({path:'/bucket',query:{name:state.newBucket.name}})
    })
    .catch(() => {
    })
}

function cancelClickAcl() {
  innerVisible.value = false
}
function confirmClickAcl() {//设置存储类型
      innerVisible.value = false
      ElMessage.success('设置成功！')
      // router.push({path:'/bucket',query:{name:state.newBucket.name}})
}
function cancelClickCapacity() {
  updateCapacityDialog.value = false
}
function confirmClickCapacity() {//设置存储类型
  updateCapacityDialog.value = false
      ElMessage.success('设置成功！')
      // router.push({path:'/bucket',query:{name:state.newBucket.name}})
}
const addLabel = (labels) => {/* 添加标签 */
  showLabelVue.value=false
  ElMessage.success('操作成功！')
  
}

const copyFilename = () => {
  navigator.clipboard.writeText(fileData.name).then(() => {
    ElMessage.success("复制成功!");
  });
};
const onCopy = () => {
  navigator.clipboard.writeText(objectInfo.url).then(() => {
    ElMessage.success("复制成功!");
  });
};

const state = reactive({
  title: "文件列表",
  content:
    "对象(Object)是OSS存储数据的基本单元,也被称为OSS的文件。和传统的文件系统不同,Object没有文件目录层级结构的关系。",
  searchText: "" /* 搜索框搜索内容 */,
  fileList: [
    /* 文件数据列表 */
    {
      id:1,
      name: "sunsan",
      size: 32.3,
      capacity: "标准存储",
      lastUpdateTime: "2021年3月21日",
      isFolder: true,
      objectAcl: "私有",
      fileStatus:0,
    },
    {
      id:2,
      name: "img01.txt",
      size: 32.3,
      capacity: "标准存储",
      lastUpdateTime: "2021年3月21日",
      isFolder: false,
      objectAcl: "私有",
      fileStatus:1,
    },
    {
      id:3,
      name: "img01.ppt",
      size: 32.3,
      capacity: "标准存储",
      lastUpdateTime: "2021年3月21日",
      isFolder: false,
      objectAcl: "私有",
      fileStatus:0,
    },
    {
      id:4,
      name: "img01.pdf",
      size: 32.3,
      capacity: "标准存储",
      lastUpdateTime: "2021年3月21日",
      isFolder: false,
      objectAcl: "私有",
      fileStatus:0,
    },
    {
      id:5,
      name: "img01.docx",
      size: 32.3,
      capacity: "标准存储",
      lastUpdateTime: "2021年3月21日",
      lastUpdater: false,
      objectAcl: "私有",
      fileStatus:0,
    },
    {
      id:6,
      name: "img01.xls",
      size: 32.3,
      capacity: "标准存储",
      lastUpdateTime: "2021年3月21日",
      isFolder: false,
      objectAcl: "私有",
      fileStatus:0,
    },
    {
      id:7,
      name: "img01.rar",
      size: 32.3,
      capacity: "标准存储",
      lastUpdateTime: "2021年3月21日",
      isFolder: false,
      objectAcl: "私有",
      fileStatus:0,
    },
    {
      id:8,
      name: "img01.mp4",
      size: 32.3,
      capacity: "标准存储",
      lastUpdateTime: "2021年3月21日",
      isFolder: false,
      objectAcl: "私有",
      fileStatus:0,
    },
  ],
  newFolder: {
    name: "",
  },
});



const goToFile = (index) => {
  /* 打开文件或文件夹 */
  fileData = state.fileList[index];
  if (fileData.isFolder == true) {
    /* 当点击对象为文件时跳转进入文件夹，设置路由参数为点击文件夹的id */
    router.push({ path: "/fileList", query: { parentObjectId: fileData.id, parentObjectName: fileData.name } });
  } else {
    drawer.value = true;
  }
};
</script>

<style lang="scss" scoped>
.file-list {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 82%;
  padding-left: 15px;
  box-sizing: border-box;
}
.look-box-msg{
  background-color:#fff7d1;
  text-align: center;
  padding: 30px 10px;
}
.update-capacity{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 60px;
}
.objectAcl-form {
  font-weight: bold;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
.content-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0px 10px;
}
.btn-list {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 20px;
  margin-bottom: 20px;
}
.newFile-text {
  text-align: left;
  color: #808080;
  font-size: 12px;
  margin-left: 30px;
  font-weight:lighter;
  gap: -20px;
  margin-top: 15px;
}
.objectAcl-text {
  color: rgb(255, 106, 0);
}
.titleTip {
  margin-bottom: 10px;
}
.file-text-child-type {
  font-size: 13px;
  width: 70%;
  display: flex;
  flex-direction: column;
}
.file-text-child {
  font-size: 13px;
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.box-items {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  justify-content: space-between;
}
.title {
  float: left;
  line-height: 15px;
  margin-right: 7px;
}
.fileTable {
  width: 100%;
  box-sizing: border-box;
}
.more {
  float: left;
}
.input-msg {
  margin-bottom: 6%;
  margin-left: 26%;
  margin-top: -2%;
  text-align: left;
  width: 67%;
  font-weight:lighter
}
.input-msg-acl{
  margin-bottom: 6%;
  margin-left: 14.5%;
  margin-top: -2%;
  text-align: left;
  width: 71%;
  font-weight:lighter
}
.file-text {
  font-weight: bold;
  font-size: 13px;
  color: #5c5c5c;
}
</style>
