<!-- bucket子页面 ———— 文件列表-->
<template>
  <div>
    <div class="file-list">
      <div class="titleTip">
        <h4 class="title">{{ title }}</h4>
        <el-popover
          class="more"
          placement="top-start"
          title="功能提示"
          :width="width"
          trigger="hover"
          :content="content"
        >
          <template #reference>
            <el-icon><Tickets /></el-icon>
          </template>
        </el-popover>
        <div class="btn-list">
          <el-button type="primary" size="large">上传文件</el-button>
          <el-button type="warning" size="large">新建目录</el-button>
          <el-button size="large">碎片管理</el-button>
          <el-button size="large" style="padding: 0 33px">授权</el-button>
          <el-input
            v-model="state.searchText"
            class="w-50 m-2"
            size="large"
            style="margin-left: 2%"
            placeholder="请输入文件名前缀匹配"
            :suffix-icon="Search"
          />
        </div>
      </div>
    </div>
    <div>
      <div class="container">
        <el-upload
                action
                class="upload-demo"
                drag
                multiple
                :http-request="httpRequestHandle">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <el-icon size="36" style="color:#bbb5ac"><UploadFilled /></el-icon>
               将目录或多个文件拖拽到此进行扫描，或者
                <em>点击上传</em>
            </div><br/>
            <el-tag type="warning" >
              <el-icon><WarningFilled /></el-icon>
              注意：Bucket下若存在同名文件，将被上传的文件覆盖；添加的文件大小不能超4KB，大小超过4KB的文件，请使用命令行工具
              ossutil、OSS SDK或OSS API等方式，通过分片的方式进行上传文件操作。
            </el-tag>
            <!-- <template #tip>
                <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
            </template> -->
        </el-upload>
        <div>
          <el-table
              :data="tableData"
              style="width: 100%;"
              class=""
              >
              <el-table-column
                label="文件名">
                <template #default="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="大小">
                <template #default="scope">
                  <span>{{scope.row.size}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="状态">
                <template #default="scope">
                  <span v-if="scope.row.status === -1">正在计算MD5</span>
                  <span v-if="scope.row.status === 1 && scope.row.percent === 0">MD5计算完成，准备上传</span>
                  <span v-if="scope.row.status === 4" style="color: brown">上传失败</span>
                  <span v-if="scope.row.status === 5" style="color: chartreuse">已上传</span>
                  <el-progress v-if="scope.row.status === 2 || scope.row.status === 1 && scope.row.percent > 0" :text-inside="true" :stroke-width="20" :percentage="scope.row.percent"></el-progress>
                </template>   
              </el-table-column>
              <el-table-column
                label="操作">
                <template #default="scope">
                  <el-button type="danger" @click="deleteFile(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
        </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { reactive } from "vue";
import TitleTip from "../../components/TitleTip.vue";

const state = reactive({
  title: "文件列表",
  content:
    "对象(Object)是OSS存储数据的基本单元,也被称为OSS的文件。和传统的文件系统不同,Object没有文件目录层级结构的关系。",
  searchText: "",
});

</script>

<style lang="scss" scoped>
::v-deep .table th {
  background-color: #eff3f8;
}

.file-list {
  padding: 25px;
  display: flex;
  // flex-direction: column;
}
.btn-list {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 20px;
}
.titleTip {
  margin-bottom: 10px;
}
.title {
  float: left;
  line-height: 15px;
  margin-right: 7px;
}
.more {
  float: left;
}
.container{
  position: relative;
  width:1100px;
  .upload-demo{
    
    .el-upload__text{
      text-align: center;
    }
    .el-tag{
        margin-left: 150px;
        margin-right: 150px;
        white-space: normal;
        height: auto;
      }
  }
}
</style>
