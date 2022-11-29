<template>
  <div class="echarts">
    <div id="echartone"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, toRefs, reactive, watch, ref, nextTick } from 'vue';
import * as echarts from 'echarts';
import { useStore } from "vuex"
import { useI18n } from 'vue-i18n'
import { sevenData } from '@/api/main'

export default defineComponent({
  name: 'CrossEcharts',
  components: {
  },
  setup() {
    const { t } = useI18n()
    const state = reactive({
      sData: [0,0,0,0,0,0,0],
      sData1: [0,0,0,0,0,0,0],
    })

    const { sData, sData1 } = toRefs(state)
    const getuserData = async() => {
      await sevenData().then(res => {
        console.log(res)
        if (res.code === 200) {
          sData.value = [res.data.s1, res.data.s2, res.data.s3, res.data.s4, res.data.s5, res.data.s6, res.data.s7]
          sData1.value = [res.data.s8, res.data.s9, res.data.s10, res.data.s11, res.data.s12, res.data.s13, res.data.s14]
        }
      })
    }
    // 获取vuex对象
    let store = useStore()
    const themetype = ref('')
    themetype.value = store.state.themetype
    // 监听vuex的themetype参数
    const getTheme = computed(() => {
      return store.state.themetype
    })
    // 监听vuex的language参数
    const getlang = computed(() => {
      return store.state.language
    })
    // 渲染页面时加载图表
    onMounted(() => {
      // 获取数据
      getuserData().then( () => {
        getcharts()
      })
      
    });
    // 封装方法
    const getcharts = () => {
      type EChartsOption = echarts.EChartsOption;
      var chartDom = document.getElementById('echartone')!;
      // 清除Echarts默认添加的属性（解决切换路由后不渲染）
      chartDom.removeAttribute("_echarts_instance_");
      var myChart = echarts.init(chartDom, themetype.value === 'dark' ? "dark" : "light");
      var option: EChartsOption;
      // 解决重新渲染时的变形
      setTimeout(() => {
        myChart.resize();
      }, 500)
      // 窗口宽度变化时图表不会变形
      window.onresize = () => {
        return (() => {
          myChart.resize();
        })()
      }
      option = {
        color: ['#80FFA5', '#00DDFF'],
        title: {
          text: t('main.weekcount'),
          textStyle: {
            fontSize: 15
          }
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
          data: [t('main.pc'), t('main.mobile')]
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
            data: [t('main.Mon'), t('main.Tue'), t('main.Wed'), t('main.Thu'), t('main.Fri'), t('main.Sat'), t('main.Sun')]
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: t('main.pc'),
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
            data: sData.value
          },
          {
            name: t('main.mobile'),
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
            data: sData1.value
          }
        ]
      };
      option && myChart.setOption(option);
    }

    watch(getTheme, () => {
      nextTick(() => {
        setTimeout(() => {
          getcharts()
        })
        themetype.value = store.state.themetype
      })
    })

    watch(getlang, () => {
      nextTick(() => {
        getcharts()
      })
    })

    return {
    }
  }
});
</script>
<style scoped lang="scss">
.echarts {
  width: calc(100% - 410px);
  // float: left;
}

#echartone {
  border-radius: 10px;
  margin-top: 10px;
  width: 100%;
  height: 400px;
  background-color: var(--echartbg);
  border: 1px solid var(--tabborder);
  padding: 20px;
  margin-bottom: 30px;
}

#echartone:hover {
  box-shadow: 0 2px 12px #0000001a;
  transition: all ease 0.3s;
}

@media screen and (max-width: 1060px) {
  .echarts {
    float: left;
    width: 100%;
    // min-width: 670px;
    width: 100%;
  }
}
</style>
