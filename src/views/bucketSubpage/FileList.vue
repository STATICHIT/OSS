<!-- bucket子页面 ———— 文件列表-->
<template>
  <div class="file-list">
    <TitleTip
      title="文件列表"
      content="对象（Object）是OSS存储数据的基本单元，也被称为OSS的文件。和传统的文件系统不同，Object没有文件目录层级结构的关系。"
    ></TitleTip>
    <div class="btn-list">
      <el-button
        v-show="parentObjectId != null"
        size="large"
        style="margin-left: 12px"
        @click="returnParent"
        ><el-icon><ArrowLeftBold /></el-icon>&nbsp; /{{
          parentObjectName
        }}</el-button
      >
      <el-button type="primary" size="large" @click="uploadFiles()"
        >上传文件</el-button
      >
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
        @keyup.enter="Pre"
      />
    </div>
    <FileTable
      :table-data="state.fileList"
      @deleteMoreFile="deleteMoreFile"
      @toFile="goToFile"
      @deleteFile="deleteFile"
      @getThaw="getThaw"
      class="fileTable"
      v-loading="loading"
      @updateCapacity="updateCapacityDialog = true"
      @showUpdateAcl="innerVisible = true"
      @addLabel="labelPre"
      :state="page"
      @getPage="getPage"
      @preview="getFilePreview"
      @rename="objectRename"
    ></FileTable>
    <!-- 预览 -->
    <ObjectPreviewVue
      v-model="showPreview"
      :bucketName="bucketName"
      :objectInfo="state.objectInfo"
      :fileStatus="fileStatus"
      @close="showPreview = false"
    ></ObjectPreviewVue>
    <!-- 文件详情对话框 -->
    <el-dialog
      v-model="drawer"
      title="文件详情"
      width="50%"
      style="height: auto;
      padding:0 20px"
      align-center
    >
      <template #header>
        <h4 class="el-drawer-title">详情</h4>
      </template>
      <template #default>
        <div class="content-box">
          <div class="box-items">
            <span class="file-text">文件名</span>
            <div class="file-text-child">
              <span>{{ state.objectInfo.name }}</span>
              <el-button link type="primary" size="small" @click="copyFilename"
                >复制文件名</el-button
              ><el-button class="download-btn" type="primary" @click="download" :disabled="downloadBtn" >
      下载<el-icon><Download /></el-icon>
    </el-button>
            </div>
          </div>
          <div class="box-items">
            <span class="file-text">ETag</span>
            <div class="file-text-child">
              <span class="file-text-child">{{ state.objectInfo.etag }}</span>
            </div>
          </div>
          <div class="box-items">
            <span class="file-text">状态</span>
            <div class="file-text-child">
              <span class="file-text-child" style="color: #0064c8">{{
                fileStatus
              }}</span>
            </div>
          </div>
          <div class="box-items">
            <span class="file-text">文件ACL</span>
            <div class="file-text-child">
              <span>{{ aclComputed }}</span>
              <el-button link type="primary" size="small" @click="innerVisible = true"
                >设置读写权限</el-button
              >
            </div>
          </div>
          <div class="box-items">
            <span class="file-text">存储类型</span>
            <div class="file-text-child">
              <span>{{ storageLevelStatus }}</span>
              <!-- 当对象不为正常状态时，不能设置存储类型，只能解冻 -->
              <el-button
                v-show="fileStatus == '正常'"
                link type="primary"
                size="small"
                @click="updateCapacityDialog = true"
                >设置存储类型</el-button
              >
              <!-- 当对象不为正常状态时 -->
              <el-button
                v-show="
                  fileStatus == '已经归档' && state.objectInfo.storageLevel != 1
                "
                link type="primary"
                size="small"
                @click="unfreeze"
                >解冻</el-button
              >
            </div>
          </div>
          <div class="box-items">
            <span class="file-text">更新时间</span>
            <span class="file-text-child">{{ fileData.lastUpdateTime }}</span>
          </div>

          <div class="box-items">
            <span class="file-text">服务器端加密</span>
            <span class="file-text-child">{{
              state.objectInfo.isPsw == 1 ? "有" : "无"
            }}</span>
          </div>
          <div class="box-items">
            <span class="file-text">备份</span>
            <div class="file-text-child">
              <span v-show="state.objectInfo.isBackup" style="color: burlywood"
                >该对象为备份对象</span
              >
               <el-button
               link type="primary"
                size="small"
                v-show="!state.objectInfo.isBackup"
                @click="searchBackup"
                >查看备份</el-button
              >
              <el-button
              link type="primary"
                size="small"
                v-show="state.objectInfo.isBackup"
                @click="backupRecover"
                >复原</el-button
              >
             <el-button
                type="primary"
                size="small"
                style="margin-left: -12px"
                v-show="!state.objectInfo.isBackup"
                @click="openBackup = true"
                plain
                >点击备份</el-button
              >
            </div>
            <BackupVue
              @close="openBackup = false"
              :objectName="state.objectInfo.name"
              :bucketName="bucketName"
              v-model="openBackup"
            ></BackupVue>
          </div>
          <div class="secret">
            <div class="content">
              <span class="file-text" style="margin-top: 6px">AccessKey</span>
              <el-button type="primary" @click="isVisit = true">
                创建AccessKey
              </el-button>
            </div>
            <SecretTableVue
              style="width:100%"
              :secrets="accessKeys"
              :objectId="fileData.id"
            ></SecretTableVue>
            <CreateSecret
              v-model="isVisit"
              :objectId="fileData.id"
              @createSecret="createSecret"
            ></CreateSecret>
          </div>
        </div>
      </template>
    </el-dialog>
    <!-- 设置读写权限 -->
    <el-dialog
      v-model="innerVisible"
      width="60%"
      title="设置读写权限"
      append-to-body
    >
      <el-form-item class="objectAcl-form" label="读写权限">
        <el-radio-group
          style="margin-left: 30px"
          v-model="updateFileListData.objectAcl"
        >
          <el-radio border :label="6">继承Bukcet</el-radio>
          <el-radio border :label="5">私有</el-radio>
          <el-radio border :label="4">RAM读</el-radio>
          <el-radio border :label="3">公共读</el-radio>
          <el-radio border :label="2">RAM读写</el-radio>
          <el-radio border :label="1">公共读写</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-alert type="info" :closable="false" class="input-msg-acl el-alert">
        <p v-show="updateFileListData.objectAcl == 6">
          继承 Bucket：单个文件的读写权限以 Bucket 的读写权限为准。
        </p>
        <p v-show="updateFileListData.objectAcl == 5">
          私有：对文件的所有访问操作需要进行身份验证。
        </p>
        <p v-show="updateFileListData.objectAcl == 3" class="objectAcl-text">
          公共读：对文件写操作需要进行身份验证；可以对文件进行匿名读。
        </p>
        <span v-show="updateFileListData.objectAcl == 1" class="objectAcl-text"
          >公共读写：所有人都可以对文件进行读写操作。</span
        >
        <span v-show="updateFileListData.objectAcl == 2" class="objectAcl-text"
          >RAM读写:用户和子用户都可以对文件进行读写操作。</span
        >
        <span v-show="updateFileListData.objectAcl == 4" class="bucketAcl-text"
          >RAM读:只有该Bucket的拥有者与其子用户可以对文件进行写操作，任何人都可以对该文件进行读操作。</span
        >
      </el-alert>
      <template #footer>
        <div style="flex: auto; justify-content: center">
          <el-button size="large" type="primary" @click="confirmClickAcl"
            >确定</el-button
          >
          <el-button size="large" @click="cancelClickAcl">取消</el-button>
        </div>
      </template>
    </el-dialog>
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
          v-model="state.newFolderName"
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
        <div style="flex: auto; justify-content: center">
          <el-button size="large" type="primary" @click="confirmClick"
            >确定</el-button
          >
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
          style="font-weight: bold"
        >
          <el-form-item class="update-capacity" label="存储类型">
            <el-radio-group v-model="updateFileListData.storageLevel">
              <el-radio :label="1">标准存储</el-radio>
              <el-radio :label="2">归档存储</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-alert type="info" :closable="false" class="input-msg">
            <span v-show="updateFileListData.storageLevel == 1"
              >标准：高可靠、高可用、高性能，数据会经常被访问到。</span
            >
            <span v-show="updateFileListData.storageLevel == 2"
              >归档：数据长期存储、基本不访问，存储单价低于低频访问型。选择归档存储后，文件需要先解冻才能访问。</span
            >
          </el-alert>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto; justify-content: center">
          <el-button size="large" type="primary" @click="confirmClickCapacity"
            >确定</el-button
          >
          <el-button size="large" @click="cancelClickCapacity">取消</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 添加标签对话框 -->
    <addLabelVue
      v-model="openLabel"
      @cancelClick="openLabel = false"
      @confirmClick="addLabel"
      :labels="objectLabel"
    ></addLabelVue>
    <!-- 添加限制解冻警告对话框 -->
    <FileLimitThaw v-model="showLimitThaw"></FileLimitThaw>
  </div>
</template>

<script setup>
import { Search, Tickets } from "@element-plus/icons-vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import FileTable from "../../components/FileTable.vue";
import TitleTip from "../../components/TitleTip.vue";
import router from "../../router";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRoute } from "vue-router";
import FileLimitThaw from "../../components/action/FileLimitThaw.vue";
import apiFun from "../../utils/api";
import SecretTableVue from "../../components/secretTable.vue";
import CreateSecret from "../../components/action/createSecret.vue";
import BackupVue from "../../components/action/Backup.vue";
import addLabelVue from "../../components/action/addLabel.vue";
import qs from "qs"; //转json数据工具包
import ObjectPreviewVue from "../../components/action/ObjectPreview.vue";

var index = ref({}); //获取的文件下标
let fileData = reactive({}); //选择的文件的普通数据
const updateFileList = reactive([
  /* 更改的文件列表 */
]);
const route = useRoute();
var query = route.query;
var bucketName = query["bucketName"];
var parentObjectId = query["parentObjectId"];
var parentObjectName = query["parentObjectName"];
const innerVisible = ref(false); //设置文件读写权限对话框
//0为普通文件，1为图片文件，2为视频文件
const drawer = ref(false); //文件详情对话框
const openLabel = ref(false);
const newFileDialog = ref(false); //新建目录对话框
const useHttps = ref(true); //使用https
const updateCapacityDialog = ref(false); //修改存储类型对话框
const isVisit = ref(false);
const showLimitThaw = ref(false); //限制解冻警告对话框
const showPreview = ref(false); //显示预览
const objectLabel = reactive([]); //标签
const openBackup = ref(false);
let tagObjectName = ref("");
const secretList = ref([]);
const loading = ref(true)
function labelPre(index) {
  tagObjectName = state.fileList[index].name;
  if (tagObjectName != "") {
    apiFun.object.tag.get(bucketName, tagObjectName).then((res) => {
      objectLabel.value = res.data;
      openLabel.value = true;
    });
  }
}
onMounted(() => {
  Pre();
});

/* 解冻一个对象 */
const unfreeze = () => {
  ElMessageBox.confirm(`确定解冻该文件吗?`, {
    type: "Warning",
  })
    .then(() => {
      apiFun.object.unfreeze(bucketName, state.objectInfo.name).then((res) => {
        console.log(res);
        ElMessage.success("操作成功！");
        drawer.value = false;
      });
    })
    .catch(() => {});
};
/* 重名名 */
const objectRename = (msg) => {
  let index = msg['index']
  let newName = msg['newName']
  state.fileList[index].name=newName
}
/* 查看备份 */
const searchBackup = () => {

}
const backupRecover = () => {
  ElMessageBox.confirm(`确定复原该对象吗?`, {
    type: "Warning",
  })
    .then(() => {
      console.log(state.objectInfo.name);
      apiFun.object
        .backupRecoveryObject(bucketName, state.objectInfo.name)
        .then((res) => {
          console.log(res);
          ElMessage.success("操作成功！");
          drawer.value = false;
        });
    })
    .catch(() => {});
};
const parentObject = ref({})//父级对象
const page = reactive({
  total: 200, // 总条数
  currentPage: 1, // 当前页
  pageSize: 8, //一页的数据量
});

const createSecret = (secretList) => {
  getAccessKeys(secretList);
  isVisit.value = false;
};

/* 将map转化为对象 */
const getAccessKeys = (secretList) => {
  accessKeys.value.length = 0;
  for (let item of Object.keys(secretList)) {
    let accessKey = JSON.parse(secretList[item]);
    accessKeys.value.push({
      id: item,
      creationTime: accessKey.creationTime,
      survivalTime: accessKey.survivalTime,
    });
    console.log(accessKeys);
  }
};
/* 打开文件预览 */
const getFilePreview = (index) => {
  fileData = state.fileList[index];
  let name = state.fileList[index].name;
  showPreview.value = true;
  console.log(showPreview.value);
  apiFun.object.getStatus(name, bucketName).then((res) => {
    console.log(res);
    fileStatus.value = res.data.stateStr;
  });
  apiFun.object.getInfo(name, bucketName).then((res) => {
    console.log(res);
    state.objectInfo = res.data;
  });
};

/* 打开文件或文件夹 */
const goToFile = (index) => {
  fileData = state.fileList[index];
  let name = state.fileList[index].name;
  if (fileData.isFolder == true) {
    /* 当点击对象为文件时跳转进入文件夹，设置路由参数为点击文件夹的id */
    router.replace({
      path: "/fileList",
      query: { bucketName:bucketName,parentObjectId: fileData.id, parentObjectName: fileData.name },
    });
    parentObjectName=fileData.name
    parentObjectId=fileData.id
    parentObject.value=fileData
    Pre()
  } else {
    console.log(bucketName)
    apiFun.object.getStatus(name, bucketName).then((res) => {
      fileStatus.value = res.data.stateStr;
    });
    apiFun.object.getInfo(name, bucketName).then((res) => {
      state.objectInfo = res.data;
      updateFileListData.value.storageLevel = res.data.storageLevel;
      updateFileListData.value.objectAcl = res.data.objectAcl;
      console.log(updateFileListData.value);
      console.log(state.objectInfo);
      drawer.value = true;
    });
    apiFun.object.accessKey.get(fileData.id).then((res) => {
      secretList.value = res.data;
      getAccessKeys(secretList.value);
    });
  }
};
const Pre = () => {
  console.log(parentObjectId)
  if (bucketName != null) {
    apiFun.object
      .objectList(
        bucketName,
        state.searchText,
        page.currentPage,
        page.pageSize,
        parentObjectId
      )
      .then((res) => {
        if(res.code==200){
        console.log(res)
        page.total = res.data.totalCount;
        state.fileList = res.data.rows;
        const items = [];
        for (let i = 0; i < state.fileList.length; i++) {
          if (state.fileList[i].isFolder) {
            items.push(state.fileList[i]);
            state.fileList.splice(i, 1);
            i--;
          }
        }
        state.fileList.unshift(...items);
      }else ElMessage.error(res.msg)
      });
      loading.value=false
  }
};
/* 翻页 */
const getPage = () => {
  Pre();
};
// /* 文件状态 */
// const fileStatus = computed(() => {
//   switch (fileData.fileStatus) {
//     case 0:
//       return "正常";
//     case 1:
//       return "解冻中";
//     case 2:
//       return "归档中";
//     case 3:
//       return "已经归档";
//   }
// });
/* 返回上一级 */
const returnParent = () => {
  console.log(parentObject.value.parent)
  if(parentObject.value.parent!=null){
 router.push({path:'/fileList',query:{
   bucketName:bucketName,
   parentObjectId:parentData.id,
   parentObjectName:parentData.name
   }})
   parentObjectId=parentData.id
   parentObjectName=parentData.name
   Pre()
}else{
  router.push({path:'/fileList',query:{
    bucketName:bucketName,
  }})
  parentObjectId=null
  parentObjectName=null
  Pre()
}
};

/* 文件解冻 */
const getThaw = (objectList) => {
  objectList.forEach((item) => {
    /* 只有当选中的所有文件状态为归档时 */
    if (item.fileStatus != 3) {
      showLimitThaw.value = true;
      return;
    } else {

    }
  });
};

const deleteFile = (index) => {
  //删除文件
  ElMessageBox.confirm(`确定删除该对象吗?`, {
    type: "Warning",
  })
    .then(() => {
      apiFun.object
        .delete(bucketName, state.fileList[index].name)
        .then((res) => {
          state.fileList.splice(index, 1);
          ElMessage.success("操作成功！");
        });
    })
    .catch(() => {});
};
const handleChange = (value) => {
  console.log(value);
};
function cancelClick() {
  newFileDialog.value = false;
}
/* 下载文件 */
const download = () => {
  const xhr = new XMLHttpRequest(); 
  let src =`http://192.168.50.236:5555/object/preview-image/${bucketName}/${state.objectInfo.name}`
  console.log(src)
    xhr.open('GET', src, true); 
    xhr.responseType = 'blob'; 
    xhr.onload = function() { 
 const blob = new Blob([this.response], 
            { type: 'application/octet-stream' }); 
        const link = document.createElement('a'); 
        link.href = window.URL.createObjectURL(blob); 
        link.download = src.split('/').pop(); 
        document.body.appendChild(link);
        link.click(); 
}; 
xhr.send();
}
function uploadFiles() {
  console.log("1:", bucketName);
  console.log("1:", parentObjectId);
  console.log("2:", parentObjectName);
  //上传文件
  router.push({
    path: "/uploadFiles",
    query: {
      bucketName: bucketName,
      parentObjectId: parentObjectId,
      parentObjectName: parentObjectName,
    },
  });
}

function confirmClick() {
  //创建目录
  if (state.newFolderName == "") {
    ElMessage.error("目录名不能为空！");
  } else {
    ElMessageBox.confirm(`确定创建该目录吗?`)
      .then(() => {
        let str = state.newFolderName+'/'
        const regExp = /^(?!\/)(?!.*[\uD800-\uDFFF]).+\/$/;
        console.log(regExp.test(str));
        if (regExp.test(str)) {
          apiFun.object.add(bucketName, str, parentObjectId).then((res) => {
            console.log(res);
            if (res.code == 200) {
              newFileDialog.value = false;
              ElMessage.success("创建成功！");
              Pre();
            } else {
              ElMessage.error("请不要输入相同的目录名！");
            }
          });
        } else {
          ElMessage.error("请输入正确格式！");
        }
      })
      .catch(() => {});
  }
}
/* 禁用下载按钮 */
const downloadBtn = computed(()=>{
  console.log(fileStatus.value)
  if(state.objectInfo.storageLevel != 1 || fileStatus.value != "正常"){
    return true;
  }else return false;
})
function cancelClickAcl() {
  innerVisible.value = false;
}
function confirmClickAcl() {
  //设置存储类型
  console.log(state.objectInfo.name + updateFileListData.value.objectAcl);
  apiFun.object
    .updateAcl(
      bucketName,
      state.objectInfo.name,
      updateFileListData.value.objectAcl
    )
    .then((res) => {
      console.log(res);
      if (res.code == 200) {
        ElMessage.success("设置成功！");
        innerVisible.value = false;
        drawer.value = false;
      }
    });
}
function cancelClickCapacity() {
  updateCapacityDialog.value = false;
}
function confirmClickCapacity() {
  //设置存储类型
  updateCapacityDialog.value = false;
  /* 当设置的存储类型为归档时 */
  console.log(updateFileListData.value.storageLevel);
  if (updateFileListData.value.storageLevel == 2) {
    apiFun.object.freeze(bucketName, state.objectInfo.name).then((res) => {
      console.log(res);
      if(res.code==200){
        ElMessage.success("操作成功！");
  updateCapacityDialog.value = false;
  drawer.value = false;
      }else{
        ElMessage.error(res.msg)
      }
    });
  }
 

  // router.push({path:'/bucket',query:{name:state.newBucket.name}})
}
const addLabel = (labels) => {
  /* 添加标签 */
  let hash = {};
  let result = false;
  labels.forEach((item) => {
    if (hash[item.key]) {
      result = true;
    }
    hash[item.key] = true;
  });
  if (result == true) {
    ElMessage.error("请不要输入相同的key值！");
  } else if (
    labels[labels.length - 1].key == "" ||
    labels[labels.length - 1].value == ""
  ) {
    ElMessage.error("请输入标签值！");
  } else {
    apiFun.object.tag
      .add({
        bucketName: bucketName,
        objectName: tagObjectName,
        objectTags: labels,
      })
      .then((res) => {
        ElMessage.success("操作成功！");
        openLabel.value = false;
      });
  }
};

/* 读写权限数据格式化 */
const aclComputed = computed(() => {
  const acl = state.objectInfo.objectAcl;
  console.log(acl);
  if (acl === null) {
    return "未知";
  } else {
    if (acl == 1) {
      return "公共读写";
    } else if (acl == 2) {
      return "RAM读写";
    } else if (acl == 3) {
      return "公共读";
    } else if (acl == 4) {
      return "RAM读";
    } else if (acl == 5) {
      return "私有";
    } else if (acl == 6) {
      return "继承Bucket";
    }
  }
});

const copyFilename = () => {
  navigator.clipboard.writeText(state.objectInfo.name).then(() => {
    ElMessage.success("复制成功!");
  });
};

const fileStatus = ref("");
/* 批量删除 */
const deleteMoreFile = (fileList) => {
  const objectNameList = [];
  fileList.forEach((item) => {
    objectNameList.push(item.name);
  });
  console.log({
    objectNameListJson: JSON.stringify(objectNameList),
  });
  apiFun.object
    .deleteMore(bucketName, {
      objectNameListJson: JSON.stringify(objectNameList),
    })
    .then((res) => {
      console.log(res);
    });
  console.log(fileList);
  fileList.forEach((item) => {
    state.fileList.splice(item, 1);
  });
};
/* 存储类型格式化 */
const storageLevelStatus = computed(() => {
  const storageLevel = state.objectInfo.storageLevel;
  if (storageLevel === null) {
    return "未知";
  } else {
    if (storageLevel == 1) {
      return "标准存储";
    } else {
      return "归档存储";
    }
  }
});

const updateFileListData = ref({
  storageLevel: 1,
  objectAcl: 1,
}); /* 将要更改的文件数据 */

const state = reactive({
  title: "文件列表",
  content:
    "对象(Object)是OSS存储数据的基本单元,也被称为OSS的文件。和传统的文件系统不同,Object没有文件目录层级结构的关系。",
  searchText: "" /* 搜索框搜索内容 */,
  fileList: [],
  objectInfo: {
    bucketId: 0,
    createTime: "",
    etag: "",
    ext: 0,
    id: 0,
    isBackup: false,
    isFolder: false,
    lastUpdateTime: "",
    name: "",
    objectAcl: 5,
    parent: null,
    secret: null,
    size: 41549,
    storageLevel: 1,
  } /* 选择的文件元数据 */,
  /* 新建目录 */
  newFolderName: "",
});

const keyList = reactive([]);
let secrets = reactive({});
const accessKeys = ref([]);
</script>

<style lang="scss" scoped>
.file-list {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 84%;
  padding-left: 15px;
  box-sizing: border-box;
}
.update-capacity {
  display: flex;
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
  padding: 0px 15px 30px 15px;
}
.btn-list {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: -11px;
}
.newFile-text {
  text-align: left;
  color: #808080;
  font-size: 12px;
  margin-left: 30px;
  font-weight: lighter;
  gap: -20px;
  margin-top: 15px;
}
.objectAcl-text {
  color: rgb(255, 106, 0);
}
.titleTip {
  margin-bottom: 10px;
}
.content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.file-text-child-type {
  font-size: 13px;
  width: 70%;
  display: flex;
  flex-direction: column;
}
.secret {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 13px;
  margin-top: 20px;
}
.download-btn{
  position:absolute;
  right:20px;
  top:20px;
}
.file-text-child {
  font-size: 13px;
  width: 70%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
}
// .file-text-child > el-button {
//   margin-top: -7px;
// }
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
  font-weight: lighter;
}
.input-msg-acl {
  margin-bottom: 6%;
  margin-left: 10.5%;
  text-align: left;
  width: 82%;
  font-weight: lighter;
}
.file-text {
  font-weight: bold;
  font-size: 13px;
  color: #5c5c5c;
}
</style>
