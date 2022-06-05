<template>
  <div class="echarts">
    <div id="echartone"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
  name: 'CrossEcharts',
  components: {
  },
  setup() {
    // 渲染页面时加载图表
    onMounted(() => {
      type EChartsOption = echarts.EChartsOption;
      var chartDom = document.getElementById('echartone')!;
      var myChart = echarts.init(chartDom);
      var option: EChartsOption;
      // 窗口宽度变化时图表不会变形
      window.onresize = () => {
        return (() => {
          myChart.resize();
        })()
      }

      option = {
        color: ['#80FFA5', '#00DDFF'],
        title: {
          text: '平台用户增长量'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['PC设备', '移动设备']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '20px',
          top: '65px',
          right: '20px',
          bottom: '0px',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'PC设备',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(128, 255, 165)'
                },
                {
                  offset: 1,
                  color: 'rgb(1, 191, 236)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [140, 232, 101, 264, 90, 340, 250]
          },
          {
            name: '移动设备',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(0, 221, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(77, 119, 255)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 282, 111, 234, 220, 340, 310]
          }
        ]
      };
      option && myChart.setOption(option);
    });

    return {
    }
  }
});
</script>
<style scoped lang="scss">
.echarts {
  width: calc(100% - 410px);
}

#echartone {
  margin-top: 20px;
  width: 100%;
  height: 400px;
  background-color: #ffffff;
  border: 1px solid #f1f2f3;
  padding: 20px;
  margin-bottom: 30px;
}

#echartone:hover {
  box-shadow: 0 2px 12px #0000001a;
  transition: all ease 0.3s;
}

// @media and screen (max-width: )
</style>
