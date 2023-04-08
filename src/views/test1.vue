<template>
  <div>
    <input type="file" multiple v-on:change="handleFileSelect($event)" />

    <br />
    <el-table :data="tableData" style="width: 100%; margin: 10px 10px">
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
    <br />
    <el-button type="danger" @click="uploadMyFiles">开始上传</el-button>
  </div>
</template>

<script>
import FileMd5 from "../models/file-md5.js";
import apiFun from "../utils/api";
import axios from "axios";
export default {
  name: "BigFileUpload",
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    //选择文件
    handleFileSelect(e) {
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i]; //这里的file是文件类型的
        const id = this.uuidv4(); // 生成唯一 ID
        let size = (file.size / 1024).toFixed(2); //Byte转KB并四舍五入到3位小数
        if (size < 1024) {
          size = size + " KB";
          console.log("来这里了：", size);
        } else {
          size = (size / 1024).toFixed(2) + " MB";
          console.log("来这里咯：", size);
        }
        this.tableData.push({
          id: id,
          name: file.name,
          size: size,
          status: -1, // 表示正在计算 MD5
          percent: 0, // 进度百分比
          xhr: null, // XMLHttpRequest 对象
        });
        this.computeMd5(file, id); // 计算 MD5
      }
    },
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
          // console.log("etag::", data.etag);
          // console.log("size::", data.size);
          // console.log("chunks::", data.chunks);
          // console.log("blockToken::", data.blockToken);
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
    //删除文件
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
      let bucketName = "myBucket";
      let blockToken, ip, port;
      // 申请上传并获取上传令牌
      console.log(file.name);
      console.log(file["etag"]);
      console.log(file["chunks"]);
      console.log(file.size);

      if (file.size < 5 * 1024 * 1024) {
        console.log("我小于5MB~~~~~~~~~~~");
        //文件大小小于5MB
        this.updateTableData(file.id, {
          status: 2,
          percent: 0,
        });
        const formData = new FormData();
        formData.append("file", file);
        let parentObjectId = "";
        let objectAcl = "";
        const res0 = await axios.put(
          "http://192.168.50.236:8080/ossObject/putSmallObject?bucketName=" +
            bucketName +
            "&objectName=" +
            file.name +
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
        console.log("我大于5MB！！！！！！！！！");
        const res = await apiFun.file.createChunkToken({
          bucketName: bucketName,
          objectName: file.name,
          etag: file["etag"],
          size: file.size,
          chunks: file["chunks"],
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
        console.log(blockToken);
        console.log(ip);
        console.log(port);
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
          console.log("XXX");
          const file = f.file; //获取到该列指向的文件本身
          this.uploadFile(file);
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
