<template>
  <div
    class="echart"
    id="mychart"
    :style="{ float: 'left', width: '100%', height: '400px' }"
  ></div>
</template>

<script>
//引入echarts
import * as echarts from "echarts";
//引入主题
import theme from './echarts_test'
export default {
  data() {
    return {
      name: "张雪",
      xData: ["2020-02", "2020-03", "2020-04", "2020-05"], //横坐标数据
      yData: [30, 132, 80, 134] //纵坐标数据，与横坐标对应
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      var option = {
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        roseType: 'angle',
                        data:[
                            {value:235, name:'视频广告'},
                            {value:274, name:'联盟广告'},
                            {value:310, name:'邮件营销'},
                            {value:335, name:'直接访问'},
                            {value:400, name:'搜索引擎'}
                        ]
                    }
                ]
            };
 

      echarts.registerTheme('theme',theme);//注册主题
      const myChart = echarts.init(document.getElementById('mychart'),'theme');// 图标初始化

      myChart.setOption(option);// 渲染页面
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>

