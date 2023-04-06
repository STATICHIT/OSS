<!-- 图片压缩测试 -->
<template>
  <div>
    <input type="file" @change="handleChange" />
    <img :src="image" alt="压缩后的图片" v-if="image" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: "", // 存放压缩后的图片 Data URL
    };
  },
  methods: {
    handleChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      // console.log(file);
      reader.onload = () => {
        console.log("原文件大小：", formatSizeUnits(file.size));
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = 500;
          canvas.height = (img.height / img.width) * 500;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const dataURL = canvas.toDataURL("image/jpeg", 0.7);//第二个参数与压缩效果相关
          const binaryStr = atob(dataURL.split(",")[1]);
          console.log(`压缩后文件大小：${formatSizeUnits(binaryStr.length)}`);
          this.image = dataURL;
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);//自动将文件读取为一个 DataURL，并将其存储在 reader.result 属性中
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
