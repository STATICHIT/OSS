<template>
  <div>
    <div class="box">
      <title-tip :title="this.title" :content="this.content"></title-tip>
      <div class="buttons">
        <el-button class="myBtn" @click="importImg" plain>选择图片</el-button>
        <el-button class="myBtn" @click="save" plain :disabled="could"
          >保存更改</el-button
        >
      </div>

      <!-- 图片处理组件 -->
      <div class="drawing-container">
        <div id="tui-image-editor"></div>
      </div>

      <!-- 选择图片抽屉组件 -->
      <div>
        <el-drawer v-model="drawer" direction="rtl" size="40%">
          <!-- 头部 -->
          <template #header>
            <h3 style="text-align: left">选择图片</h3>
          </template>
          <!-- 内容 -->
          <template #default>
            <h3>请选择您要进行处理的图片文件</h3>
            <div class="circle">
              <ul class="circle-ul">
                <li v-for="item of classList" :key="item.id" class="circle-li">
                  <div
                    v-on:click="changeList(item.id, item.coverImg)"
                    v-bind:class="{ changeBorder: item.id == a }"
                    value="change!"
                  >
                    <img
                      :src="item.coverImg"
                      style="width: 100px; height: 100px; padding-top: 5px"
                      alt
                    />
                    <div>{{ item.id }}</div>
                    <div class="topic-shade">
                      <div class="shade">
                        <img
                          src="../../assets/select.png"
                          style="width: 14px; height: 14px"
                          alt
                        />
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </template>
          <!-- 尾部 -->
          <template #footer>
            <div style="flex: auto">
              <el-button @click="cancelClick">取消</el-button>
              <el-button type="primary" @click="chooseImg">确定</el-button>
            </div>
          </template>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import ImageEditor from "tui-image-editor";
import { ElMessage } from "element-plus";
import FileMd5 from "../../models/file-md5.js";
import apiFun from "../../utils/api";
import axios from "axios";
import { threadId } from "worker_threads";
export default {
  data() {
    return {
      tip: "http://192.168.50.236:5555/object/preview-image/mybucket/tip.png",
      could: true, //是否能够保存图片
      instance: null,
      title: "图片处理",
      content:
        "针对云罐中Bucket存储的图片文件（Object），您可以在浏览器对图片进行在线编辑，保存后修改后图片将覆盖原图片。您可以将进行的操作包括添加图片水印、截图、绘画、调节亮度等。",
      // 选择图片
      drawer: false,
      chooseSrc: "",
      // currentSrc:
      //   "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA12s6NU.img",
      currentSrc:
        "http://192.168.50.236:5555/object/preview-image/mybucket/tip.png",
      a: "",
      // 图片源列表
      classList: [
        {
          id: "001.jpg",
          coverImg:
            "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE59yNZ?ver=d7f3",
        },
        {
          id: "002.jpg",
          coverImg:
            "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE59gGS?ver=5bf1",
        },
        {
          id: "003.jpg",
          coverImg:
            "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA12sapl.img",
        },
        {
          id: "004.jpg",
          coverImg:
            "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA11N2LZ.img",
        },
        {
          id: "005.jpg",
          coverImg:
            "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA11N9kp.img",
        },
        {
          id: "006.jpg",
          coverImg:
            "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA11NbLD.img",
        },
      ],
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    currentSrc: function (newTip, oldTip) {
      if (newTip == this.tip) {
        this.could = true; //禁用
      } else {
        this.could = false; //可用
      }
    },
  },

  methods: {
    // 图片处理组件数据初始化
    init() {
      this.instance = new ImageEditor(
        document.querySelector("#tui-image-editor"),
        {
          includeUI: {
            loadImage: {
              path: this.currentSrc,
              name: "image",
            },
            menu: [
              "resize",
              "crop",
              "rotate",
              "draw",
              "shape",
              "icon",
              "text",
              "filter",
            ], // 底部菜单按钮列表 隐藏镜像flip和遮罩mask
            // initMenu: "draw", // 默认关闭菜单项
            menuBarPosition: "bottom", // 菜单所在的位置
            locale: locale_zh, // 本地化语言为中文
            theme: customTheme, // 自定义样式
          },
          cssMaxWidth: 1000, // canvas 最大宽度
          cssMaxHeight: 600, // canvas 最大高度
        }
      );
      document.getElementsByClassName("tui-image-editor-main")[0].style.top =
        "45px"; // 调整图片显示位置
      document.getElementsByClassName(
        "tie-btn-reset tui-image-editor-item help"
      )[0].style.display = "none"; // 隐藏顶部重置按钮
    },

    importImg() {
      //选择当前Bucket内的图片
      const num = 1;
      if (num == 0) {
        ElMessage.error("当前Bucket中不存在图片");
      } else {
        this.drawer = true;
        // apiFun.object
        //   .objectList(
        //     "myBucket", //bucketName
        //     "key", //桶名的关键字
        //     1, //第一页
        //     100, //每页的大小
        //     "", //父文件
        //     true //筛选出图片
        //   )
        //   .then((res) => {
        //     const imgList=res.data.rows;
        //     // this.classList=imgList;
        //   });
      }
    },
    // 保存图片，并上传
    async save() {
      // 调用组件官方方法，获取整个编辑后图片的base64数据
      const base64 = this.instance.toDataURL();
      var file = this.blobToFile(this.dataURLtoBlob(base64), this.a);
      file["id"] = this.uuidv4(); // 生成唯一 ID
      //确保md5计算完成后再进行上传操作
      const md5 = await this.computeMd5(file);
      await this.uploadFile(file, md5); // 计算 MD5 并上传
    },
    //上传文件
    async uploadFile(file) {
      const promises = [];
      let bucketName = "myBucket";
      // 申请上传并获取上传令牌
      if (file.size < 5 * 1024 * 1024) {
        console.log("我小于5MB~~~~~~~~~~~");
        //文件大小小于5MB
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
        console.log("小于4MB上传文件返回值：", res0);
        if (res0.data.code === 200) {
          //上传成功
          this.initTipImg();
        } else {
          //上传失败
          ElMessage.error("保存失败");
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
        console.log("大于4MB上传文件请求上传返回值：", res);
        const blockToken = res.data.blockToken;
        const ip = res.data.ip;
        const port = res.data.port;
        // 分片上传
        const count = file["chunks"];
        for (let i = 0; i < count; i++) {
          console.log("正在上传第", i + 1, "片");
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
            console.log("大于4MB上传文件合并文件返回值：", res);
            if (res.code === 200) {
              this.initTipImg();
            } else {
              ElMessage.error("保存失败");
            }
          });
      }
    },
    initTipImg() {
      ElMessage.success("已保存更改");
      this.currentSrc = this.tip;
      this.a = "";
      this.init(); //重置操作图片
    },
    changeList(id, coverImg) {
      if (this.a == id) {
        this.a = !this.a;
      } else {
        this.a = id;
        this.chooseSrc = coverImg;
      }
    },
    cancelClick() {
      this.drawer = false;
    },
    chooseImg() {
      this.currentSrc = this.chooseSrc;
      this.init(); //重置操作图片
      this.drawer = false;
    },
    //将base64转换为blob
    dataURLtoBlob: function (dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    //将blob转换为file
    blobToFile: function (blob, filename) {
      return new File([blob], filename, { type: "image/jpeg" });
    },
    computeMd5(file) {
      return new Promise((resolve, reject) => {
        // 计算 MD5
        FileMd5(file, (err, data) => {
          if (err) {
            reject(err);
          } else {
            file["etag"] = data.etag;
            file["chunks"] = data.chunks;
            file["blockToken"] = "";
            resolve(data.etag); // 传递 MD5 值
          }
        });
      });
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
  },
};

//汉化
const locale_zh = {
  ZoomIn: "放大",
  ZoomOut: "缩小",
  Hand: "手掌",
  History: "历史",
  Resize: "调整宽高",
  Crop: "裁剪",
  DeleteAll: "全部删除",
  Delete: "删除",
  Undo: "撤销",
  Redo: "反撤销",
  Reset: "重置",
  Flip: "镜像",
  Rotate: "旋转",
  Draw: "画",
  Shape: "形状标注",
  Icon: "图标标注",
  Text: "文字标注",
  Mask: "遮罩",
  Filter: "滤镜",
  Bold: "加粗",
  Italic: "斜体",
  Underline: "下划线",
  Left: "左对齐",
  Center: "居中",
  Right: "右对齐",
  Color: "颜色",
  "Text size": "字体大小",
  Custom: "自定义",
  Square: "正方形",
  Apply: "应用",
  Cancel: "取消",
  "Flip X": "X 轴",
  "Flip Y": "Y 轴",
  Range: "区间",
  Stroke: "描边",
  Fill: "填充",
  Circle: "圆",
  Triangle: "三角",
  Rectangle: "矩形",
  Free: "曲线",
  Straight: "直线",
  Arrow: "箭头",
  "Arrow-2": "箭头2",
  "Arrow-3": "箭头3",
  "Star-1": "星星1",
  "Star-2": "星星2",
  Polygon: "多边形",
  Location: "定位",
  Heart: "心形",
  Bubble: "气泡",
  "Custom icon": "自定义图标",
  "Load Mask Image": "加载蒙层图片",
  Grayscale: "灰度",
  Blur: "模糊",
  Sharpen: "锐化",
  Emboss: "浮雕",
  "Remove White": "除去白色",
  Distance: "距离",
  Brightness: "亮度",
  Noise: "噪音",
  "Color Filter": "彩色滤镜",
  Sepia: "棕色",
  Sepia2: "棕色2",
  Invert: "负片",
  Pixelate: "像素化",
  Threshold: "阈值",
  Tint: "色调",
  Multiply: "正片叠底",
  Blend: "混合色",
  Width: "宽度",
  Height: "高度",
  "Lock Aspect Ratio": "锁定宽高比例",
};

//样式主题配置
const customTheme = {
  "common.bi.image": "", // 左上角logo图片
  "common.bisize.width": "0px",
  "common.bisize.height": "0px",
  "common.backgroundImage": "none",
  "common.backgroundColor": "#f3f4f6",
  "common.border": "0px",

  // header
  "header.backgroundImage": "none",
  "header.backgroundColor": "#f3f4f6",
  "header.border": "0px",

  // load button
  "loadButton.backgroundColor": "#fff",
  "loadButton.border": "1px solid #ddd",
  "loadButton.color": "#222",
  "loadButton.fontFamily": "NotoSans, sans-serif",
  "loadButton.fontSize": "12px",
  "loadButton.display": "none", // 隐藏

  // download button
  "downloadButton.backgroundColor": "#fdba3b",
  "downloadButton.border": "1px solid #fdba3b",
  "downloadButton.color": "#fff",
  "downloadButton.fontFamily": "NotoSans, sans-serif",
  "downloadButton.fontSize": "12px",
  "downloadButton.display": "none", // 隐藏

  // icons default
  "menu.normalIcon.color": "#8a8a8a",
  "menu.activeIcon.color": "#555555",
  "menu.disabledIcon.color": "#ccc",
  "menu.hoverIcon.color": "#e9e9e9",
  "submenu.normalIcon.color": "#8a8a8a",
  "submenu.activeIcon.color": "#e9e9e9",

  "menu.iconSize.width": "24px",
  "menu.iconSize.height": "24px",
  "submenu.iconSize.width": "32px",
  "submenu.iconSize.height": "32px",

  // submenu primary color
  "submenu.backgroundColor": "#1e1e1e",
  "submenu.partition.color": "#858585",

  // submenu labels
  "submenu.normalLabel.color": "#858585",
  "submenu.normalLabel.fontWeight": "lighter",
  "submenu.activeLabel.color": "#fff",
  "submenu.activeLabel.fontWeight": "lighter",

  // checkbox style
  "checkbox.border": "1px solid #ccc",
  "checkbox.backgroundColor": "#fff",

  // rango style
  "range.pointer.color": "#fff",
  "range.bar.color": "#666",
  "range.subbar.color": "#d1d1d1",

  "range.disabledPointer.color": "#414141",
  "range.disabledBar.color": "#282828",
  "range.disabledSubbar.color": "#414141",

  "range.value.color": "#fff",
  "range.value.fontWeight": "lighter",
  "range.value.fontSize": "11px",
  "range.value.border": "1px solid #353535",
  "range.value.backgroundColor": "#ffffff",
  "range.title.color": "#fff",
  "range.title.fontWeight": "lighter",

  // colorpicker style
  "colorpicker.button.border": "1px solid #1e1e1e",
  "colorpicker.title.color": "#fff",
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  padding: 5px 15px;
  text-align: left;
}
.buttons {
  margin-bottom: 10px;
}

.drawing-container {
  width: 1300px;
  height: 750px;
  position: relative;
  .myBtn {
    position: absolute;
    right: 50px;
    top: 15px;
  }
}

.circle {
  position: relative;
  width: 632px;
  left: 15px;
}
.circle-ul {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 532px;
  padding: 0;
  margin: 14px 0 0 50px;
}
.circle-li {
  margin-right: 20px;
  list-style: none;
  margin-bottom: 20px;
}

.topic-shade {
  display: none;
}

.changeBorder {
  width: 115px;
  height: 121px;
  position: relative;
  cursor: pointer;
  border: 1px dashed #969696;
  margin: -1px -8px 0 -8px;
  .topic-shade {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: absolute;
    top: 123.5px;
    right: 0;
    bottom: 0;
    left: 86px;
  }

  .shade {
    margin-bottom: 4px;
  }
}
</style>
