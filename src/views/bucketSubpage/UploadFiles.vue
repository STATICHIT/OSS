<template>
  <div class="preBox">
    <div class="box">
      <!--上传到-->
      <div>
        <div>
          <span class="littleTitle">上传到</span>
          <el-radio-group v-model="radio" class="ml-4">
            <el-radio label="1" size="large">当前目录</el-radio>
            <el-radio label="2" size="large">指定目录</el-radio>
          </el-radio-group>
        </div>
        <br />

        <div>
          <span class="littleTitle"></span>
          <span v-if="disabled">{{ curpath }}</span>
          <!-- 指定目录框 -->
          <div class="afterPath" v-if="!disabled">
            <el-input v-model="afterPath" maxlength="256" show-word-limit>
              <template #prepend>{{ curpath }}</template>
            </el-input>
          </div>
          <br /><br />
          <!-- 提示 -->
          <div v-if="!disabled" class="tip2">
            <span>目录命名规范：</span><br />
            <span class="tip"
              >1.不允许使用表情符，请使用符合要求的 UTF-8 字符；</span
            ><br />
            <span class="tip"
              >2.&nbsp;<span style="color: red; background-color: #f2f2f2"
                >&nbsp;/&nbsp;</span
              >&nbsp;用于分割路径，可快速创建子目录，但不要以&nbsp;<span
                style="color: red; background-color: #f2f2f2"
                >&nbsp;/&nbsp;</span
              >&nbsp;或&nbsp;<span style="color: red; background-color: #f2f2f2"
                >&nbsp;\&nbsp;</span
              >&nbsp;开头，不要出现连续的&nbsp;<span
                style="color: red; background-color: #f2f2f2"
                >&nbsp;/&nbsp;</span
              >&nbsp;；</span
            ><br />
            <span class="tip"
              >3.不允许出现名为&nbsp;<span
                style="color: red; background-color: #f2f2f2"
                >&nbsp;..&nbsp;</span
              >&nbsp;的子目录；</span
            ><br />
          </div>
        </div>
      </div>
      <br />

      <!-- 文件ACL -->
      <div>
        <span class="littleTitle2">文件 ACL</span>
        <div class="radio-group">
          <div class="mb-2 flex items-center text-sm">
            <el-radio-group v-model="fileAcl" class="ml-4">
              <el-radio label="0" size="large">继承 Bucket</el-radio>
              <el-radio label="1" size="large">公共读写</el-radio>
              <el-radio label="2" size="large">RAM读写</el-radio>
              <el-radio label="3" size="large">公共读</el-radio>
              <el-radio label="4" size="large">RAM读</el-radio>
              <el-radio label="5" size="large">私有</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <br />

      <!-- 待上传文件 -->
      <div>
        <span class="littleTitle" style="vertical-align: top">待上传文件</span>
        <div class="myUpload">
          <el-upload
            class="upload-demo"
            drag
            :before-upload="beforeUpload"
            multiple
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">将目录或多个文件拖捷到此进行扫描</div>
            <template #tip>
              <div class="el-upload__tip">
                文件命名规范: 1.用 UTF-8 编码 2.区分大小写 3.长度必须在 1~1023
                字节之间 4.不能以/或者字符开头
              </div>
            </template>
          </el-upload>
          <br />
          <el-button type="primary" @click="fackBtn">扫描文件</el-button>
          <input
            type="file"
            id="fileInput"
            class="fileInput"
            multiple
            v-on:change="handleFileSelect($event)"
          />
          <br />
          <el-table
            :data="tableData"
            style="width: 100%; margin: 10px 10px"
            empty-text="没有文件"
          >
            <el-table-column label="文件名">
              <template v-slot="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="大小">
              <template v-slot="scope">
                <span>{{ scope.row.size }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template v-slot="scope">
                <span v-if="scope.row.status === -1">正在准备上传</span
                ><!--正在计算MD5-->
                <span v-if="scope.row.status === 1">已准备上传</span
                ><!--MD5计算完成，准备上传-->
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
        </div>
      </div>
      <br />

      <!-- 高级选项 -->
      <div>
        <span class="littleTitle">高级选项</span>
        <el-icon v-if="highSetting" @click="highSetting = false"
          ><ArrowDown
        /></el-icon>
        <el-icon v-if="!highSetting" @click="highSetting = true"
          ><ArrowUp
        /></el-icon>
        <div v-if="!highSetting" class="highSettingdetail">
          <div>
            <span class="littleTitle3">存储类型</span>
            <div class="radio-group">
              <div class="mb-2 flex items-center text-sm">
                <el-radio-group v-model="storageType" class="ml-4">
                  <el-radio label="0" size="large">继承 Bucket</el-radio>
                  <el-radio label="1" size="large">标准存储</el-radio>
                  <el-radio label="2" size="large">RAM归档存储</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div>
              <span class="littleTitle3">服务器端加密方式</span>
              <div class="radio-group">
                <div class="mb-2 flex items-center text-sm">
                  <el-radio-group v-model="secret" class="ml-4">
                    <el-radio label="0" size="large">继承 Bucket</el-radio>
                    <el-radio label="1" size="large">SM4加密</el-radio>
                    <el-radio label="2" size="large">无加密</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作选项组 -->
    <div class="btnGroup">
      <el-button type="danger" @click="uploadMyFiles">开始上传</el-button>
      <el-button @click="cancelUpload">取消上传</el-button>
    </div>
  </div>
</template>

<script>
import FileMd5 from "../../models/file-md5.js";
import apiFun from "../../utils/api";
import axios from "axios";
export default {
  data() {
    return {
      bucketName: "", //当前bucket名
      parentObjectId: "", //所在文件夹的Id
      tableData: [], //上传列表
      curpath: "mybucket/", //当前目录
      disabled: true,
      radio: "1", //上传到
      afterPath: "", //指定目录
      fileAcl: "0", //文件ACL
      highSetting: true, //开关高级选项
      storageType: "0", //存储类型
      secret: "0", //服务器端加密方式
    };
  },
  watch: {
    radio: function (radio, preradio) {
      console.log(radio);
      console.log(preradio);
      if (radio == "1") {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.bucketName = this.$route.query.bucketName;
      this.parentObjectId=this.$route.query.parentObjectId;
    },
    fackBtn() {
      document.getElementById("fileInput").click();
    },
    //文件上传调用的方法
    beforeUpload(file) {
      this.addFile(file);
    },
    //选择文件
    handleFileSelect(e) {
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i]; //这里的file是文件类型的
        this.addFile(file);
      }
    },
    //添加文件到列表,并计算其基础属性
    addFile(file) {
      const id = this.uuidv4(); // 生成唯一 ID
      let size = (file.size / 1024).toFixed(2); //Byte转KB并四舍五入到3位小数
      size = size < 1024 ? size + " KB" : (size / 1024).toFixed(2) + " MB";
      this.tableData.push({
        id: id,
        name: file.name,
        size: size,
        status: -1, // 表示正在计算 MD5
        percent: 0, // 进度百分比
        xhr: null, // XMLHttpRequest 对象
      });
      this.computeMd5(file, id); // 计算 MD5
    },
    //生成id
    uuidv4() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    //计算md5
    computeMd5(file, id) {
      // 计算 MD5
      FileMd5(file, (err, data) => {
        if (err) {
          this.updateTableData(
            id,
            {
              status: 4, // 计算 MD5 失败
            },
            null
          );
        } else {
          file["etag"] = data.etag;
          file["chunks"] = data.chunks;
          file["id"] = id;
          this.updateTableData(id, {
            status: 1, // 计算 MD5 完成，准备上传
            etag: data.etag,
            chunks: data.chunks,
            blockToken: data.blockToken,
            file: file, //文件本身
          });
        }
      });
    },
    //更新文件上传列表
    updateTableData(id, newData) {
      const index = this.tableData.findIndex((file) => file.id === id);
      if (index !== -1) {
        this.tableData.splice(
          index,
          1,
          Object.assign({}, this.tableData[index], newData)
        );
      }
      return true;
    },
    //删除上传列表中的文件
    deleteFile(id) {
      const index = this.tableData.findIndex((file) => file.id === id);
      if (index !== -1) {
        const file = this.tableData[index]; //这个file是object类型的，只是列表中的一项
        if (file.status === 2) {
          // 如果文件正在上传，则中断上传
          file.xhr.abort();
        }
        this.tableData.splice(index, 1);
      }
    },
    //上传文件
    async uploadFile(file) {
      const promises = [];
      const bucketName = this.bucketName;
      console.log("afterPath:",this.afterPath)
      let objectName = this.afterPath + file.name;
      let parentObjectId = this.parentObjectId; //当前所在目录id
      let objectAcl = this.fileAcl == "0" ? "" : this.fileAcl; //对象acl

      // 打印调试
      console.log("bucketName    :", bucketName);
      console.log("objectName    :", objectName);
      console.log("parentObjectId:", parentObjectId);
      console.log("objectAcl     :", objectAcl);

      let blockToken, ip, port;
      // 申请上传并获取上传令牌

      if (file.size < 5 * 1024 * 1024) {
        console.log("我小于5MB~~~~~~~~~~~");
        //文件大小小于5MB
        this.updateTableData(file.id, {
          status: 2,
          percent: 0,
        });
        const formData = new FormData();
        formData.append("file", file);
        const res0 = await axios.put(
          "http://192.168.50.236:8080/ossObject/putSmallObject?bucketName=" +
            bucketName +
            "&objectName=" +
            objectName +
            "&etag=" +
            file["etag"] +
            "&parentObjectId=" +
            parentObjectId +
            "&objectAcl=" +
            objectAcl,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log(res0);
        if (res0.data.code === 200) {
          this.updateTableData(file.id, {
            percent: 100,
          });
          setTimeout(() => {
            // 定时器回调函数中重新启用按钮
            this.updateTableData(file.id, {
              status: 5, // 已上传
            });
          }, 500);
        } else {
          this.updateTableData(file.id, {
            status: 4, // 上传失败
          });
        }
      } else {
        //文件大小大于5MB
        console.log("我大于5MB！！！！！！！！！");
        const res = await apiFun.file.createChunkToken({
          bucketName: bucketName,
          objectName: objectName,
          etag: file["etag"],
          size: file.size,
          chunks: file["chunks"],
          parentObjectId: parentObjectId,
          objectAcl: objectAcl,
        });
        const exist = res.data.exist;
        console.log(res);
        // console.log(exist);
        if (exist) {
          //如果文件已经存在，直接秒传
          console.log(file);
          console.log(file.id);

          this.updateTableData(file.id, {
            status: 2, //开始上传
          });
          setTimeout(() => {
            this.updateTableData(file.id, {
              status: 2,
              percent: 100,
            });
          }, 500);
          console.log("1");
          setTimeout(() => {
            // 定时器回调函数中重新启用按钮
            this.updateTableData(file.id, {
              status: 5, // 计算 MD5 完成，准备上传
            });
          }, 600);
          return;
        } else {
          blockToken = res.data.blockToken;
          ip = res.data.ip;
          port = res.data.port;
          this.updateTableData(file.id, {
            status: 2,
          });
        }
        // 分片上传
        const count = file["chunks"];
        for (let i = 0; i < count; i++) {
          console.log("正在上传第", i + 1, "片");
          let percent = Math.floor((i / count) * 100);
          this.updateTableData(file.id, {
            percent: percent,
          });
          const chunkSize = 4194304; // 即4MB 即 4 * 1024 * 1024
          const start = i * chunkSize;
          const end = Math.min(start + chunkSize, file.size);
          const chunk = file.slice(start, end);
          const formData = new FormData();
          formData.append("file", chunk);
          const promise = axios.post(
            `http://${ip}:${port}/object/append_file?chunk=${i}&blockToken=${blockToken}&bucketName=${bucketName}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          promises.push(promise);
        }

        // 等待所有分片上传完成
        await Promise.all(promises);

        // 合并分片
        await apiFun.file
          .mergefile({
            bucketName: bucketName,
            blockToken: blockToken,
          })
          .then((res) => {
            console.log(res);
            if (res.code === 200) {
              this.updateTableData(file.id, {
                percent: 100,
              });
              setTimeout(() => {
                // 定时器回调函数中重新启用按钮
                this.updateTableData(file.id, {
                  status: 5, // 已上传
                });
              }, 500);
            } else {
              this.updateTableData(file.id, {
                status: 4, // 上传失败
              });
            }
          });
      }
    },

    //点击【开始上传】按钮
    async uploadMyFiles() {
      this.tableData.forEach((f) => {
        if (f.status === 1) {
          const file = f.file; //获取到该列指向的文件本身
          this.uploadFile(file);
        }
      });
    },
    //点击【取消上传】按钮
    cancelUpload() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.preBox {
  width: 100%;
}
.box {
  width: 100%;
  height: 780px;
  padding: 30px 30px;
  text-align: left;
  overflow: auto;
}
.btnGroup {
  border-top: 1px solid rgba(189, 187, 187, 0.452);
  padding: 15px 30px;
  text-align: left;
}
.fileInput {
  display: none;
}

.afterPath {
  width: 80%;
  display: inline-block;
}

.tip {
  display: inline-block;
  margin-top: 5px;
  margin-left: 10px;
}
.highSettingdetail {
  margin-left: 170px;
}

.littleTitle {
  display: inline-block;
  width: 100px;
  font-weight: bold;
  margin-right: 70px;
}

.littleTitle2 {
  display: inline-block;
  width: 100px;
  font-weight: bold;
}

.littleTitle3 {
  font-size: 13px;
  display: inline-block;
  width: 120px;
  font-weight: bold;
}

.myUpload {
  display: inline-block;
  width: 1000px;
}
.tip2 {
  margin-left: 170px;
  color: gray;
  font-size: 13px;
}
.radio-group {
  display: inline-block;
  margin-left: 70px;
}
</style>
