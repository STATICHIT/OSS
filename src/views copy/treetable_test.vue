<template>
  <div>
    <uploader
      id="myUploader"
      browse_button="browse_button"
      chunk_size="4MB"
      :filters="{ prevent_duplicates: true }"
      :FilesAdded="filesAdded"
      @inputUploader="inputUploader"
      :ChunkUploaded="ChunkUploaded"
    />
    <el-button type="primary" id="browse_button">选择多个文件</el-button>
    <br />
    <el-table :data="tableData" style="width: 100%; margin: 10px 10px">
      <el-table-column label="文件名">
        <template v-slot="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大小">
        <template v-slot="scope">
          <span>{{ scope.row.size }} Byte</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template v-slot="scope">
          <span v-if="scope.row.status === -1">正在计算MD5</span>
          <span v-if="scope.row.status === 1">MD5计算完成，准备上传</span>
          <span v-if="scope.row.status === 4" style="color: brown"
            >上传失败</span
          >
          <span v-if="scope.row.status === 5" style="color: chartreuse"
            >已上传</span
          >
          <el-progress
            v-if="scope.row.status === 2"
            :text-inside="true"
            :stroke-width="20"
            :percentage="scope.row.percent"
          ></el-progress>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="danger" @click="deleteFile(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <br />
    <el-button type="danger" @click="uploadMyFiles">开始上传</el-button>
    <!-- <el-button type="danger" @click="up.start()">开始上传</el-button> -->
    <el-button type="danger" @click="mergeTest">请求合并测试</el-button>
  </div>
</template>

<script>
import FileMd5 from "../models/file-md5.js";
import Uploader from "../components/Uploader.vue";
import apiFun from "../utils/api";
import plupload from "plupload/js/plupload.full.min.js";
import { send } from "process";
export default {
  name: "BigFileUpload",
  data() {
    return {
      up: {},
      files: [],
      tableData: [],
      blockToken: "",
      myUploader: null,
    };
  },
  components: {
    uploader: Uploader,
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const preDo = {
        Init(up, info) {
          console.log(up);
          this.files = up.files;
        },
        UploadFile(up, file) {},
      };
      const innerMethod = {
        filesAdded(up, files) {
          files.forEach((f) => {
            f.status = -1;
            FileMd5(f.getNative(), (e, data) => {
              console.log("hash:", data.etag);
              f["etag"] = data.etag;
              f["chunks"] = data.chunks;
              f.status = 1;
            });
          });
        },
      };
      let prop = {
        runtimes: "html5",
        url: this.url,
        chunk_size: "4MB",
        headers: {},
        multipart: true,
        max_retries: 0,
        multi_selection: true,
        unique_names: false,
        file_data_name: "file",
        flash_swf_url: "plupload/js/Moxie.swf",
        silverlight_xap_url: "plupload/js/Moxie.xap",
        preinit: innerMethod,
        init: preDo,
        filters: { prevent_duplicates: true },
        multipart_params: { blockToken: "" },
      };
      let uploader = new plupload.Uploader(prop);
      uploader.init();
      this.myUploader = uploader;
      // uploader.start();
    },
    inputUploader(up) {
      this.up = up;
      this.files = up.files;
    },
    filesAdded(up, files) {
      console.log("一个文件被添加了");
      files.forEach((f) => {
        // f.status = -1; //MD5计算完成，准备上传
        f.status = -1; //MD5计算完成，准备上传
        this.tableData = [];
        this.files.forEach((e) => {
          this.tableData.push({
            name: e.name,
            size: e.size,
            status: e.status,
            id: e.id,
            percent: e.percent,
          });
        });
        //计算文件各个参数
        // FileMd5(f.getNative(), (e, data) => {
        //   console.log("hash:", data.etag);
        //   f["etag"] = data.etag;
        //   f["chunks"] = data.chunks;
        //   f.status = 1; //MD5计算完成，准备上传
        //   console.log("======================");
        //   console.log("成功来到这一步");
        //   console.log("mybucket:mybucket");
        //   console.log("fileName:" + f.name);
        //   console.log("etag:" + data.etag);
        //   console.log("size:" + data.size);
        //   console.log("======================");
        // 计算完需要发送上传的请求
        // apiFun.test
        //   .createChunkToken({
        //     mybucket: "mybucket",
        //     fileName: f.name,
        //     etag: data.etag,
        //     size: data.size,
        //   })
        //   .then((res) => {
        //     console.log(res);
        // up.setOption("multipart_params", {
        //   blockToken: "da6bd87f_76d9_4bb6_9333_cdf243d649ce",
        // });
        // up.setOption("url", "http://192.168.50.236:8021/object/append_file");

        //     this.blockToken = res.data.blockToken;
        //     //分片带上blockToken
        //     up.setOption("multipart_params", {
        //       blockToken: res.data.blockToken,
        //     });
        //修改分片方法对应的url
        // up.setOption(
        //   "url",
        //   "http://" +
        //     res.data.ip +
        //     ":" +
        //     res.data.port +
        //     "/object/append_file"
        // );
        // let url =
        //   "http://" +
        //   res.data.ip +
        //   ":" +
        //   res.data.port +
        //   "/object/append_file";
        //为每个文件设置地址
        // up.addFile(f, {
        //   url: url,
        //   // multipart_params: { blockToken: res.data.blockToken },
        // });
        // 为每个文件设置blockToken
        // f.blockToken=res.data.blockToken;
        // up.refresh();
        // console.log("!!!"+f.blockToken)
        // });
        // console.log("ok");
        // this.tableData = [];
        // this.files.forEach((e) => {
        //   this.tableData.push({
        //     name: e.name,
        //     size: e.size,
        //     status: e.status,
        //     id: e.id,
        //     percent: e.percent,
        // });
        // });
        // });
      });
    },
    uploadMyFiles() {
      this.files.forEach((f) => {
        console.log(" name: " + f.name);
        console.log("size:" + f.size);

        // 计算完需要发送上传的请求
        apiFun.test
          .createChunkToken({
            mybucket: "mybucket",
            fileName: "style.css",
            etag: "e1605c79e167b2a37ae3502c4f4df653",
            size: 4732,
          })
          .then((res) => {
            console.log(res);
            // //设置blockToken
            // up.setOption("multipart_params", {
            //   blockToken: res.data.blockToken,
            // });
            // //修改分片方法对应的url
            // up.setOption(
            //   "url",
            //   "http://" +
            //     res.data.ip +
            //     ":" +
            //     res.data.port +
            //     "/object/append_file"
            // );
          });

        //拿到B uploader实例
        this.myUploader.addFile(f, f.name);
        this.myUploader.setOption("multipart_params", {
          blockToken: "80c5e953_9783_43ab_a096_72992675b797",
        });
        this.myUploader.setOption(
          "url",
          "http://192.168.50.236:8021/object/append_file"
        );
        this.myUploader.start();
      });
    },
    mergeTest() {
      // 上传完合并的请求
      apiFun.test
        .mergefile({
          // blockToken: this.blockToken,
          blockToken: "80c5e953_9783_43ab_a096_72992675b797",
        })
        .then((res) => {
          console.log(res);
        });
    },
    deleteFile(id) {
      let file = this.up.getFile(id);
      this.up.removeFile(file);
    },
    ChunkUploaded(up, file, info) {
      console.log("接受返回");
    },
  },
};
</script>

<style scoped>
</style>

