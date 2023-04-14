<!-- 图片压缩测试 -->
<template>
  <div>
    <input type="file" @change="handleChange" />
    <br>
    <div style="display: inline-block; float: left;margin-left: 300px;">
      <h1>原图</h1>
      <img class="img1" :src="imageUrl" alt="选中的图片" v-if="imageUrl" />
      <h2>原文件大小：{{ size1 }}</h2>
    </div>
    <div style="display: inline-block; float: right;margin-right: 300px;">
      <h1>压缩后</h1>
      <img class="img2" :src="image" alt="压缩后的图片" v-if="image" />
      <h2>压缩后文件大小：{{ size2 }}</h2>
    </div>
    <h1>压缩比： 1:{{ bili }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: "", // 存放压缩后的图片 Data URL
      imageUrl: "", //压缩前图片
      size1: 0,
      size2: 0,
      bili:0,
    };
  },
  methods: {
    handleChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      // console.log(file);
      reader.onload = () => {
        //显示原图
        this.imageUrl = reader.result;
        this.size1 = formatSizeUnits(file.size);
        console.log("原文件大小：", formatSizeUnits(file.size));
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = 500;
          canvas.height = (img.height / img.width) * 500;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const dataURL = canvas.toDataURL("image/jpeg", 0.7); //第二个参数与压缩效果相关
          const binaryStr = atob(dataURL.split(",")[1]);
          this.size2 = formatSizeUnits(binaryStr.length);
          console.log(`压缩后文件大小：${formatSizeUnits(binaryStr.length)}`);
          this.image = dataURL;
          this.bili=((file.size)/(binaryStr.length)).toFixed(0);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file); //自动将文件读取为一个 DataURL，并将其存储在 reader.result 属性中
    },
  },
};

// 辅助函数：将文件大小转换成可读性较好的字符串格式
function formatSizeUnits(size) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }
  return `${size.toFixed(2)} ${units[index]}`;
}
</script>

<style scoped>
.img1{
width: 600px;
height: 500px;
}

.img2{
  width: 600px;
height: 500px;
}

</style>
