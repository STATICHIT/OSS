<!-- bucket子页面 ———— 概览-->
<template>
  <div class="box">
    <title-tip :title="this.title" :content="this.content"></title-tip>
    <div class="board1">
      <H4>存储类型分布</H4>
      <div id="mychart"></div>
    </div>
    <div class="board2">
      <table>
        <tr>
          <th>基本信息</th>
          <th></th>
        </tr>
        <tr>
          <td>
            <span class="key">空间名称</span>
            <span class="value">important-text</span>
          </td>
          <td>
            <span class="key">存储类型</span>
            <span class="value">标准存储</span>
          </td>
        </tr>
        <tr>
          <td>
            <span class="key">创建时间</span>
            <span class="value">2023年11月11日 20:13</span>
          </td>
          <td>
            <span class="key">读写权限</span> <span class="value">私有</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import theme from "../subpages/echarts_test";
export default {
  data() {
    return {
      title: "Bucket 概览",
      content:
        "概览页面提供了本存储空间中依据存储类型不同的存储容量横向柱形图和一些基本信息。",
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      // 表格数据
      var option = {
        dataset: {
          source: [
            ["score", "存储容量", "存储类型"],
            [89.3, 4212, "标准存储"],
            [57.1, 2154, "冷归档存储"],
            [74.4, 3032, "归档存储"],
            [50.1, 2755, "低频访问存储"],
          ],
        },
        grid: { containLabel: true },
        xAxis: { name: "存储容量" },
        yAxis: { type: "category" },
        visualMap: {
          orient: "horizontal",
          left: "center",
          min: 10,
          max: 100,
          text: ["高存储量", "低存储量"],
          dimension: 0,
          inRange: {
            color: ["#edf0ff", "#b7c3f8", "#6477b7"],
          },
        },
        series: [
          {
            type: "bar",
            encode: {
              x: "存储容量",
              y: "存储类型",
            },
          },
        ],
      };
      
      echarts.registerTheme("theme", theme); //注册主题
      const myChart = echarts.init(document.getElementById("mychart"), "theme"); // 图标初始化
      myChart.setOption(option);
    },
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
.board1 {
  width: 95%;
  height: 70%;
  padding: 20px;
  border: 1px solid rgba(221, 218, 218, 0.699);
  border-radius: 10px;
}

#mychart {
  width: 90%;
  height: 70%;
}

.board2 {
  width: 95%;
  height: 20%;
  margin-top: 20px;
  border: 1px solid rgba(199, 196, 196, 0.699);
  border-radius: 10px;
}

.key {
  font-size: 15px;
  font-weight: 400;
  color: rgb(46, 45, 45);
}

.value {
  font-size: 13px;
  font-weight: 400;
  margin-left: 50px;
}
table,
td,
th {
  text-align: left;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 15px;
}
</style>