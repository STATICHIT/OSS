<template>
  <div>
    <div class="box">
      <title-tip :title="this.title" :content="this.content"></title-tip>
      <div class="board1">
        <div><b>欢迎使用文档处理</b></div>
        <br />
        <span style="color: gray">
          ——1.在线创作文档并保存入bucket,若在线创作文档将默认以文档第一句话为文件名称并保持在当前bucket根目录中。
          <br /><br />
          ——2.选择bucket中文档文件进行在线处理，保存更改后覆盖原文件，用户可通过备份功能找回原版文件。
        </span>
      </div>
      <br />
      <div class="buttons">
        <el-button class="myBtn" @click="importImg" plain>选择文档</el-button>
        <el-button class="myBtn" @click="save" plain :disabled="could"
          >保存更改</el-button
        >
      </div>
      <br />

      <div>
        <div id="editor"></div>
      </div>

      <!-- 选择文档抽屉组件 -->
      <div>
        <el-drawer v-model="drawer" direction="rtl" size="40%" z-index="100000">
          <!-- 头部 -->
          <template #header>
            <h3 style="text-align: left">选择文档</h3>
          </template>
          <!-- 内容 -->
          <template #default>
            <h3>请选择您要进行处理的文档文件</h3>
            <el-table
              :data="FilesData"
              style="width: 100%"
              :header-cell-style="{ background: '#eff1f7', color: '#606266' }"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column label="文件名" prop="fileName" />
              <el-table-column label="大小" prop="size" />
            </el-table>
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
import { ElMessage } from "element-plus";
// 引入 wangEditor
import wangEditor from "wangeditor";
export default {
  data() {
    return {
      could: false, //是否能够保存文档
      title: "文档处理",
      content:
        "针对云罐中Bucket存储的文档文件（Object），您可以在浏览器对图片进行在线编辑，保存后修改后图片将覆盖原图片。您可以将进行的操作包括添加图片水印、截图、绘画、调节亮度等。",
      drawer: false,
      editor: null,
      editorData: "",
      FilesData: [
        { fileName: "第三次作业", size: "18KB" },
        { fileName: "前端学习笔记", size: "18KB" },
        { fileName: "五一旅行计划", size: "18KB" },
        { fileName: "暑期训练营策划案", size: "18KB" },
      ],
    };
  },
  mounted() {
    const editor = new wangEditor(`#editor`);
    editor.create();
    this.editor = editor;
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
    importImg() {
      //选择当前Bucket内的图片
      const num = 1;
      if (num == 0) {
        ElMessage.error("当前Bucket中不存在文档文件");
      } else {
        this.drawer = true;
      }
    },
    // 保存图片，并上传
    save() {
      // 通过代码获取编辑器内容
      let data = this.editor.txt.html();
      this.editor.txt.html("");
      console.log(data);
      ElMessage.success("保存成功");
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
      this.editor.txt.html(
        '<h2 id="ifec1"><span style="background-color: rgb(249, 150, 59);">五一旅游计划：</span></h2><p>日期：2023年4月29日至5月3日（共5天）</p><p>地点：<u>广西南宁、桂林、阳朔</u></p><p>第一天：<b>南宁</b></p><ul><li>上午：抵达南宁，前往酒店办理入住手续；</li><li>下午：参观南宁市区著名景点——青秀山公园，欣赏美丽的自然风景和独特的文化景观；</li><li>晚上：品尝南宁当地特色小吃，感受南宁夜生活。</li></ul><p>第二天：<b>桂林</b></p><ul><li>上午：前往桂林，游览著名的象鼻山、伏波山；</li><li>下午：游览漓江，乘坐竹筏漂流，欣赏桂林山水甲天下；</li><li>晚上：入住桂林酒店，体验桂林特色美食。</li></ul><p>第三天：<b>阳朔</b></p><ul><li>上午：前往阳朔，游览著名的阳朔西街、十里画廊；</li><li>下午：骑行或徒步到月亮山看阳朔山水美景；</li><li>晚上：在西街品尝阳朔特色美食，欣赏夜景。</li></ul><p>第四天：<b>桂林</b></p><ul><li>上午：返回桂林，游览古城区，感受桂林的历史文化底蕴；</li><li>下午：游览银子岩景区，欣赏独特的石灰岩地貌；</li><li>晚上：品尝桂林特色美食，感受桂林夜生活。</li></ul><p>第五天：<b>南宁</b></p><ul><li>上午：返回南宁，参观南宁动物园，观赏珍稀动物；</li><li>下午：游览南宁市民广场，品尝当地小吃；</li><li>晚上：结束旅程，返回酒店休息。</li></ul>'
      );
      this.drawer = false;
    },
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  },
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
  width: 1280px;
  height: 1000px;
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
.board1 {
  width: 100%;
  height: 15%;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid rgba(196, 191, 191, 0.699);
  border-radius: 10px;
}

</style>
