<template>
  <div>
    <div class="box">
      <!-- <div class="title">云罐 / 数据大屏</div> -->
      <div class="left">
        <div class="board1 card"></div>
        <div class="board2 card">
          <div>
            <span class="littleTitle"><b>存储用量</b></span>
            <el-select class="type" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in selects"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <table>
              <tr>
                <th>原始容量</th>
                <th>计费容量</th>
              </tr>
              <tr>
                <td><span class="capacity">485.65</span> MB</td>
                <td><span class="capacity">485.71</span> MB</td>
              </tr>
              <tr>
                <td>月同比--</td>
                <td>月同比--</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="board3">
          <div id="mychart2"></div>
        </div>
      </div>
      <div class="right">
        <h2 class="title2">Bucket管理</h2>
        <div class="up" id="mychart"></div>
        <div class="down">
          <el-button plain class="createBtn" >创建 Bucket</el-button>
          <el-button plain>查看 Bucket 列表</el-button>
          <el-button plain>导出CSV</el-button>
        </div> 
      </div>
      <span class="power">powered by Kunshi Vajra Gong</span>
    </div>
  </div>
</template>

<script>
//引入echarts
import * as echarts from "echarts";
//引入主题
import theme from "../components/echarts_test";
export default {
  data() {
    return {
      selects: [
        {
          value: "总用量",
          label: "总用量",
        },
        {
          vlaue: "标准存储",
          label: "标准存储",
        },
        {
          value: "低频访问",
          label: "低频访问",
        },
        {
          value: "归档存储",
          label: "归档存储",
        },
        {
          value: "冷归档存储",
          label: "冷归档存储",
        },
      ],
      value: "",
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      var option = {
        title: {
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Bucket数量",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "标准存储" },
              { value: 735, name: "冷归档存储" },
              { value: 580, name: "归档存储" },
              { value: 484, name: "低频访问存储" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      var option2 = {
        title: {
          text: "存储类型",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "Direct",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      };

      echarts.registerTheme("theme", theme); //注册主题
      const myChart = echarts.init(document.getElementById("mychart"), "theme"); // 图标初始化
      const myChart2 = echarts.init(
        document.getElementById("mychart2"),
        "theme"
      );

      myChart.setOption(option); // 渲染页面
      myChart2.setOption(option2);

      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  box-sizing: border-box;
  position: relative;
  padding: 30px;
  width: 1570px;
  height: 900px;
  background-color: #eff1f7;
}
.left {
  float: left;
  width: 980px;
  height: 730px;
}

.right {
  border-radius:5px;
  float: right;
  width: 500px;
  height: 730px;
  padding: 20px;
  box-sizing: border-box;
  background-color: white;
}

.up {
  padding-top: 60px;
  width: 460px;
  height: 510px;
}

.down {
  width: 460px;
  height: 185px;
  // background-color: rgb(188, 196, 245);
}

.title2{
  margin-top: 20px;
  color:#6472a3;
}

.createBtn{
  background-color: #8c99c6;
  color: white;

}

.card {
  width: 480px;
  height: 227px;
  border-radius:5px;
  background-color: white;
}

.board1 {
  float: left;
}

.board2 {
  float: right;
  box-sizing: border-box;
  padding: 20px;
}

.littleTitle {
  float: left;
  margin-left: 15px;
  height: 35px;
  line-height: 35px;
}

.type {
  float: left;
  margin-left: 20px;
}

table,
td,
th {
  text-align: left;
}

table {
  border-collapse: collapse;
  width: 400px;
}

th,
td {
  padding: 15px;
}

.capacity{
  font-size: 30px;
}

.board3 {
  width: 980px;
  height: 467px;
  padding: 20px;
  box-sizing: border-box;
  border-radius:5px;
  margin-top: 267px;
  background-color: white;
}

#mychart2{
  width: 940px;
  height: 450px;
}

.power {
  position: absolute;
  left: 43%;
  bottom: 20px;
}

// .clearfix::before,.clearfix::after{
//   content: "";
//   display: table;
// }

// .clearfix::after{
//   clear:both;
// }
</style>