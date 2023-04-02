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
    <el-button type="primary" id="browse_button2">选择多个文件2</el-button>
    <el-button type="primary" id="browse_button3">选择多个文件3</el-button>
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
    <el-button type="danger" @click="up2.start()"
      >新upLoader开始上传2</el-button
    >
    <!-- <el-button type="danger" @click="mergeTest">请求合并测试</el-button> -->
  </div>
</template>

<script>
import FileMd5 from "../models/file-md5.js";
import Uploader from "../components/Uploader.vue";
import apiFun from "../utils/api";
import plupload from "plupload/js/plupload.full.min.js";
export default {
  name: "BigFileUpload",
  data() {
    return {
      up: {},
      up2: {},
      files: [],
      tableData: [],
    };
  },
  components: {
    uploader: Uploader,
  },
  mounted() {
    //预尝试用这个new的uploader来上传文件
    var uploader = new plupload.Uploader({
      runtimes: "html5,flash,silverlight,html4",
      browse_button: "browse_button3", // 上传按钮ID
      url: "http://192.168.50.236:8021/object/append_file", // 上传URL地址
      multipart_params: { blockToken: "a7caf8dc_2b23_4a7a_a281_99eb898bd25f" },
      init: {
        // 初始化完成后的回调函数
        PostInit: function () {
          console.log("init success");
          // uploader.addFile(f, f.name);
          // uploader.bind("FilesAdded", function (up, files) {
          //   // 所有文件都添加完成后尝试启动上传
          //   if (uploader.files.length === files.length) {
          //     console.log("XXXXXXXXXXXXXXXXXXXXXXXXX");
          //     uploader.start();
          //   }
          // });
        },
      },
      FilesAdded: function (up, files) {
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
      beforeUpload: function (up, files) {
        console.log("我正要被上传");
      },
      // UploadProgress：会在文件上传过程中不断触发，可以用此事件来显示上传进度
      UploadProgress: function (up, file) {
        // let filePercent = document
        //   .getElementById(file.id)
        //   .getElementsByTagName("b")[0];
        // filePercent.innerHTML = `<span>文件上传进度:${file.percent}%</span>`;
        console.log("文件上传进度:", file.percent);
      },
      FileUploaded: function (up, file, responseObject) {
        //   // 上传完合并的请求
        //   apiFun.test
        //     .mergefile({
        //       blockToken: token,
        //     })
        //     .then((res) => {
        //       console.log(res);
        //     });
        console.log("分片上传完成", responseObject.response); //打印出后台返回前端的信息
      },
      Error: function (up, err) {
        console.log("Error " + err.code + ":" + err.message);
      },
    });
    uploader.init(); // 调用init()方法进行初始化
    this.up2 = uploader;
  },
  methods: {
    getUploader(token, file, url) {
      console.log("111");
      const preInitMethod = {
        Init(up, info) {
          console.log("=====================");
          console.log(up);
          // this.files = file;
          up.addFile(f, f.name);
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
        fileUploaded(up, file, info) {
          // 上传完合并的请求
          apiFun.test
            .mergefile({
              blockToken: token,
            })
            .then((res) => {
              console.log(res);
            });
        },
        FileUploaded(up, file, info) {
          console.log("服务器返回的信息对象服务器返回的文本:" + info.response); //返回了true
        },
      };
      let prop = {
        runtimes: "html5,flash,silverlight,html4",
        browse_button: "browse_button2",
        url: url,
        chunk_size: "4MB",
        headers: {},
        multipart: true,
        max_retries: 0,
        multi_selection: true,
        unique_names: false,
        file_data_name: "file",
        flash_swf_url: "plupload/js/Moxie.swf",
        silverlight_xap_url: "plupload/js/Moxie.xap",
        preinit: preInitMethod,
        init: innerMethod,
        filters: { prevent_duplicates: true },
        // multipart_params: { blockToken: token },
      };
      let uploader = new plupload.Uploader(prop);
      uploader.init();
      console.log("1==", uploader);
      //添加进入文件
      uploader.files[0] = file;
      // uploader.addFile(file,file.name);
      console.log("1==", uploader);
      console.log("222");
      uploader.start();
      console.log("2==", uploader);
      console.log("333");
      return uploader;
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
        // 计算文件各个参数
        FileMd5(f.getNative(), (e, data) => {
          // console.log("hash:", data.etag);
          f["etag"] = data.etag;
          f["chunks"] = data.chunks;
          // f.status = 1; //MD5计算完成，准备上传
          // console.log("======================");
          // console.log("成功来到这一步");
          // console.log("mybucket:mybucket");
          // console.log("fileName:" + f.name);
          // console.log("etag:" + data.etag);
          // console.log("size:" + data.size);
          // console.log("======================");
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
        });
      });
    },
    uploadMyFiles() {
      this.files.forEach((f) => {
        // 计算完需要发送上传的请求
        apiFun.test
          .createChunkToken({
            mybucket: "mybucket",
            fileName: f.name,
            etag: f.etag,
            size: f.size,
          })
          .then((res) => {
            console.log(res);
            let url =
              "http://" +
              res.data.ip +
              ":" +
              res.data.port +
              "/object/append_file";
            let token = res.data.blockToken;

            var uploader = new plupload.Uploader({
              runtimes: "html5,flash,silverlight,html4",
              browse_button: "browse_button3", // 上传按钮ID
              url: url, // 上传URL地址
              chunk_size: "4MB",
              filters: {
                max_file_size: "10mb",
                mime_types: [
                  { title: "Image files", extensions: "jpg,gif,png" },
                  { title: "Zip files", extensions: "zip" },
                ],
              },
              multipart_params: { blockToken: token },
              init: {
                // 初始化完成后的回调函数
                PostInit: function () {
                  console.log("init success");
                  uploader.addFile(f, f.name);
                  uploader.setOption("multipart_params", {
                    blockToken: token,
                  }); //设置附加参数
                  // uploader.bind("FilesAdded", function (up, files) {
                  //   // 所有文件都添加完成后尝试启动上传
                  //   if (uploader.files.length === files.length) {
                  //     console.log("XXXXXXXXXXXXXXXXXXXXXXXXX");
                  //     uploader.start();
                  //   }
                  // });
                },
              },
              FilesAdded: function (up, files) {
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
              beforeUpload: function (up, files) {
                console.log("我正要被上传");
              },
              // UploadProgress：会在文件上传过程中不断触发，可以用此事件来显示上传进度
              UploadProgress: function (up, file) {
                // let filePercent = document
                //   .getElementById(file.id)
                //   .getElementsByTagName("b")[0];
                // filePercent.innerHTML = `<span>文件上传进度:${file.percent}%</span>`;
                console.log("文件上传进度:", file.percent);
              },
              FileUploaded: function (up, file, responseObject) {
                //   // 上传完合并的请求
                //   apiFun.test
                //     .mergefile({
                //       blockToken: token,
                //     })
                //     .then((res) => {
                //       console.log(res);
                //     });
                console.log("分片上传完成", responseObject.response); //打印出后台返回前端的信息
              },
              Error: function (up, err) {
                console.log("Error " + err.code + ":" + err.message);
              },
            });
            uploader.init(); // 调用init()方法进行初始化
            // uploader.start();
            this.up2 = uploader;
            console.log(uploader);

            //       //拿到B uploader实例
            //       // let myUploader = this.getUploader(res.data.blockToken, f, url);
            //       var uploader = new plupload.Uploader({
            //         runtimes: "html5,flash,silverlight,html4",
            //         browse_button: "pickfiles",
            //         container: document.getElementById("browse_button2"),
            //         url: url,
            //         filters: {
            //           max_file_size: "10mb",
            //           mime_types: [
            //             { title: "Image files", extensions: "jpg,gif,png" },
            //             { title: "Zip files", extensions: "zip" },
            //           ],
            //         },
            //         multipart_params: { blockToken: token },
            //         // init: {
            //         //   // PostInit：当Init事件发生后触发
            //         //   PostInit: function () {
            //         //     console.log("=====================");
            //         //     // document.getElementById("uploadfiles").onclick = function () {
            //         //     //   console.log("!!!!!!!!!!!!!!!!!");
            //         //     //   uploader.addFile(f, f.name);
            //         //     //   uploader.setOption("multipart_params", {
            //         //     //     blockToken: token,
            //         //     //   }); //设置附加参数
            //         //     //   uploader.start();
            //         //     //   return true;
            //         //     // };
            //         //   },
            //           // // FilesAdded：当文件添加到上传队列后触发，up = uploader为当前的plupload实例对象，files为触发此事件的文件对象
            //           // FilesAdded: function (up, files) {
            //           //   files.forEach((f) => {
            //           //     f.status = -1;
            //           //     FileMd5(f.getNative(), (e, data) => {
            //           //       console.log("hash:", data.etag);
            //           //       f["etag"] = data.etag;
            //           //       f["chunks"] = data.chunks;
            //           //       f.status = 1;
            //           //     });
            //           //   });
            //           // },
            //           // // UploadFile：当上传队列中某一个文件开始上传后触发
            //           // UploadFile: function (up, files) {},
            //           // // UploadProgress：会在文件上传过程中不断触发，可以用此事件来显示上传进度
            //           // // UploadProgress: function (up, file) {
            //           // //   let filePercent = document
            //           // //     .getElementById(file.id)
            //           // //     .getElementsByTagName("b")[0];
            //           // //   filePercent.innerHTML = `<span>文件上传进度:${file.percent}%</span>`;
            //           // // },
            //           // // FileUploaded：当队列中的某一个文件上传完成后触发
            //           // // UploadProgress: function(up, file) {
            //           // // },
            //           // FileUploaded: function (up, file, responseObject) {
            //           //   // 上传完合并的请求
            //           //   apiFun.test
            //           //     .mergefile({
            //           //       blockToken: token,
            //           //     })
            //           //     .then((res) => {
            //           //       console.log(res);
            //           //     });
            //           //   console.log("分片上传完成", responseObject.response); //打印出后台返回前端的信息
            //           // },
            //           // // UploadComplete：当上传队列中所有文件都上传完成后触发
            //           // UploadComplete: function (up, files) {},
            //           // Error: function (up, err) {
            //           //   console.log("Error " + err.code + ":" + err.message);
            //           // },
            //         // },
            //       });
            //       uploader.bind("Init", function (up) {
            //         // 初始化完成时执行的代码
            //         console.log("=====================");
            //       });
            //       // 稍后进行初始化
            //       setTimeout(function () {
            //         uploader.init();
            //         console.log(uploader);
            //       }, 1000);

            //       // myUploader.start();
          });
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

