<template>
    <div>
        <div class="container">
             <!-- <el-upload
                ref="upload"
                class="upload-demo"
                action="your-upload-url"
                drag
                multiple
                :http-request="httpRequestHandle"
                :auto-upload="false"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :on-error="handleError"
                :before-upload="beforeUpload"
                :on-exceed="handleExceed"
                :file-list="fileList">
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
            </el-upload> -->
        </div>
      <uploader
              browse_button="browse_button"
              :url="server_config+'/BigFile/'"
              chunk_size="2MB"
              :max_retries="3"
              :filters="{prevent_duplicates:true}"
              :FilesAdded="filesAdded"
              :BeforeUpload="beforeUpload"
              :Error="error"
              :UploadComplete="uploadComplete"
              @inputUploader="inputUploader"
            />
      <el-tag type="warning">自动重传三次</el-tag>
      <br/>
      <br/>
      <el-button type="primary" id="browse_button">选择多个文件</el-button>
      <br/>
      <el-table
        :data="tableData"
        style="width: 100%; margin: 10px 10px;">
        <el-table-column label="文件名">
          <template #default="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="大小">
          <template #default="scope">
            <span>{{scope.row.size}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <!-- <template #default="scope">
            <span v-if="scope.row.status === -1">正在计算MD5</span>
            <span v-if="scope.row.status === 1 && scope.row.percent === 0">MD5计算完成，准备上传</span>
            <span v-if="scope.row.status === 4" style="color: brown">上传失败</span>
            <span v-if="scope.row.status === 5" style="color: chartreuse">已上传</span>
            <el-progress v-if="scope.row.status === 2 || scope.row.status === 1 && scope.row.percent > 0" :text-inside="true" :stroke-width="20" :percentage="scope.row.percent"></el-progress>
          </template> -->
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="danger" @click="deleteFile(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br/>
      <el-button :disabled="uploading" type="danger" @click="uploadStart()">开始上传</el-button>
      <el-button :disabled="!uploading" type="warring" @click="uploadStop()">暂停上传</el-button>
    </div>
  </template>
  
  <script setup>
    import FileMd5 from '../utils/file-md5.js'
    import Uploader from './Uploader.vue'
    import { ref, watchEffect } from 'vue';
    const files = ref([]);
    const tableData = ref([]);
  
    watchEffect(() => {
        console.log("??????")
        tableData.value = files.value.map((e) => ({
            name: e.name,
            size: e.size,
            status: e.status,
            id: e.id,
            percent: e.percent,
        }));
    });
    // export default {
    //   name: "StopUpload",
    //   data() {
    //     return {
    //       server_config: 'http://localhost:8080',
    //       up: {},
    //       files:[],
    //       tableData: [],
    //       uploading: false
    //     }
    //   },
    //   components: {
    //     'uploader': Uploader
    //   },
    //   watch: {
    //     files: {
    //       handler() {
    //         this.tableData = [];
    //         this.files.forEach((e) => {
    //             console.log("??????")
    //             console.log(e.name)
    //           this.tableData.push({
    //             name: e.name,
    //             size: e.size,
    //             status: e.status,
    //             id: e.id,
    //             percent: e.percent
    //           });
    //         });
    //       },
    //       // deep: true,
    //       // immediate: true,
    //     },
    //     obj2: {
    //             handler (newVal, oldVal) {
    //             console.log('data变化了')
    //             console.log(newVal, oldVal)
    //             },
    //             deep: true
    //         }
    //   },
    //   methods: {
    //     inputUploader(up) {
    //     console.log(up)
    //       this.up = up;
    //       this.files = up.files;
    //     },
    //     filesAdded(up, files) {
    //       files.forEach((f) => {
    //         f.status = -1;
    //         FileMd5(f.getNative(), (e, md5) => {
    //           f["md5"] = md5;
    //           f.status = 1;
    //         });
    //       });
    //     },
    //     deleteFile(id) {
    //       let file = this.up.getFile(id);
    //       this.up.removeFile(file);
    //     },
    //     beforeUpload(up, file) {
    //       up.setOption("multipart_params", {"size":file.size,"md5":file.md5});
    //     },
    //     uploadStart() {
    //       this.uploading = true;
    //       this.up.start();
    //     },
    //     uploadStop() {
    //       this.uploading = false;
    //       this.up.stop();
    //     },
    //     error() {
    //       this.uploading = false;
    //     },
    //     uploadComplete() {
    //       this.uploading = false;
    //     }
    //   }
    // }
  </script>
  
  <style lang="scss" scoped>
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
  