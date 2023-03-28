<!-- 子页面 ———— 数据大屏 -->
<template>
  <div>
    <div>
      <div class="left">
        <div class="board1 card">
          <div class="part1">
            <div><h3>总访问量及独立访客量</h3></div>
            <br />
            <br /><br />
            <div class="pv">
              PV： <b>{{ pv }}</b>
            </div>
            <div class="uv">
              UV： <b>{{ uv }}</b>
            </div>
          </div>
          <div id="mychart3"></div>
        </div>

        <div class="board2 card">
          <div>
            <span class="littleTitle"><b>存储用量</b></span>
            <el-select
              class="type"
              @change="curSelect"
              v-model="value"
              placeholder="请选择"
            >
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
                <td>
                  <span class="capacity">{{ capacity1 }}</span> MB
                </td>
                <td>
                  <span class="capacity">{{ capacity2 }}</span> MB
                </td>
              </tr>
              <tr>
                <td>
                  月同比 -- <span class="rate">{{ rate1 }}</span>
                </td>
                <td>
                  月同比 -- <span class="rate">{{ rate2 }}</span>
                </td>
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
          <el-button plain class="createBtn">创建 Bucket</el-button>
          <el-button plain>查看 Bucket 列表</el-button>
          <el-button plain>导出CSV</el-button>
        </div>
      </div>
      <span class="power">@2023 - Made by Kunshi Vajra Gong</span>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import apiFun from "../../utils/api";
//引入echarts
import * as echarts from "echarts";
//引入主题
import theme from "./echarts_test";

export default {
  data() {
    return {
      cnt1: 1048,
      cnt2: 735,
      cnt3: 580,
      cnt4: 484,
      capacity1: "485.65",
      capacity2: "485.71",
      rate1: "237.39%↑",
      rate2: "237.42%↑",
      pv: 6521,
      uv: 4563,
      selects: [
        {
          value: "1",
          label: "总用量",
        },
        {
          value: "2",
          label: "标准存储",
        },
        {
          value: "3",
          label: "低频访问",
        },
        {
          value: "4",
          label: "归档存储",
        },
        {
          value: "5",
          label: "冷归档存储",
        },
      ],
      value: "1",
    };
  },
  components: {
    echarts,
    theme,
  },
  mounted() {
    this.initEcharts();
    this.initData();
  },
  methods: {
    // 初始化数据
    initData() {
      // apiFun.getScreenData().then((res) => {
      //   this.pv = res.method.pv;
      //   this.uv = res.method.uv;
      //   //...
      // });
    },
    // 初始化表格
    initEcharts() {
      // 表格数据1
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
              { value: this.cnt1, name: "标准存储" },
              { value: this.cnt2, name: "冷归档存储" },
              { value: this.cnt3, name: "归档存储" },
              { value: this.cnt4, name: "低频访问存储" },
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

      // 表格数据2
      var option2 = {
        title: {
          text: "存储类型",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          top: 40,
          data: [
            "标准存储-本地冗余",
            "低频访问-本地冗余",
            "归档存储",
            "冷归档存储",
          ],
        },
        grid: {
          top: "100",
          left: "2%",
          right: "5%",
          bottom: "5%",
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
            name: "标准存储-本地冗余",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "低频访问-本地冗余",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "归档存储",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "冷归档存储",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
        ],
      };

      // 表格数据3
      var option3 = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: 10,
          top: 300,
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "80%"],
            center: ["50%", "70%"],
            startAngle: 180,
            data: [
              {
                value: 1048,
                name: "pv(访问量)",
              },
              {
                value: 735,
                name: "uv(独立访客)",
              },
              {
                value: 1048 + 735,
                itemStyle: {
                  color: "none",
                },
              },
            ],
          },
        ],
      };

      echarts.registerTheme("theme", theme); //注册主题
      const myChart = echarts.init(document.getElementById("mychart"), "theme"); // 图标初始化
      const myChart2 = echarts.init(
        document.getElementById("mychart2"),
        "theme"
      );
      const myChart3 = echarts.init(
        document.getElementById("mychart3"),
        "theme"
      );

      myChart.setOption(option); // 渲染页面
      myChart2.setOption(option2);
      myChart3.setOption(option3);
    },

    // 根据存储类型查看用量
    curSelect(val) {
      console.log(val);
      switch (val) {
        case "1":
          {
            this.capacity1 = "264.12";
            this.capacity2 = "124.88";
            this.rate1 = "147.87%↑";
            this.rate2 = "137.54%↑";
          }
          break;
        case "2":
          {
            this.capacity1 = "125.46";
            this.capacity2 = "112.15";
            this.rate1 = "123.453%↓";
            this.rate2 = "114.24%↓";
          }
          break;
        case "3":
          {
            this.capacity1 = "435.84";
            this.capacity2 = "412.48";
            this.rate1 = "128.84%↑";
            this.rate2 = "104.31%↑";
          }
          break;
        case "4":
          {
            this.capacity1 = "84.25";
            this.capacity2 = "75.31";
            this.rate1 = "12.45%↓";
            this.rate2 = "10.12%↓";
          }
          break;
        case "5":
          {
            this.capacity1 = "45.73";
            this.capacity2 = "40.45";
            this.rate1 = "153.34%↓";
            this.rate2 = "145.27%↓";
          }
          break;
        default: {
          this.capacity1 = "";
          this.capacity2 = "";
          this.rate1 = "";
          this.rate2 = "";
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.left {
  float: left;
  width: 63%;
  height: 730px;
}

.right {
  border-radius: 5px;
  float: right;
  width: 33%;
  height: 730px;
  padding: 20px;
  background-color: white;
}

.up {
  padding-top: 60px;
  width: 100%;
  height: 510px;
}

.down {
  width: 100%;
  height: 185px;
}

.title2 {
  margin-top: 20px;
  color: #6472a3;
}

.createBtn {
  background-color: #8c99c6;
  color: white;
}

.card {
  width: 48%;
  height: 227px;
  border-radius: 5px;
  background-color: white;
}

.board1 {
  position: relative;
  float: left;
  padding: 30px;
  text-align: left;
}

.pv {
  height: 30px;
  line-height: 30px;
}

.uv {
  height: 30px;
  line-height: 30px;
}
.pv::before {
  content: url("../../assets/pv.png");
}

.uv::before {
  content: url("../../assets/uv.png");
}

.part1 {
  position: absolute;
}

.board2 {
  float: right;
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
  width: 100%;
}

th,
td {
  padding: 15px;
}

.capacity {
  font-size: 30px;
}

.rate {
  color: red;
}
.board3 {
  width: 100%;
  height: 467px;
  padding: 20px;
  border-radius: 5px;
  margin-top: 267px;
  background-color: white;
}

#mychart2 {
  width: 100%;
  height: 450px;
}

#mychart3 {
  float: right;
  margin-top: 30px;
  width: 350px;
  height: 150px;
}

.power {
  position: absolute;
  left: 40%;
  bottom: 20px;
}
</style>