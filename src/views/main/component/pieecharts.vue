<template>
    <div class="echarts">
        <div id="echarttwo"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
    name: 'PieEcharts',
    components: {
    },
    setup() {
        // 渲染页面时加载图表
        onMounted(() => {
            type EChartsOption = echarts.EChartsOption;
            var chartDom = document.getElementById('echarttwo')!;
            var myChart = echarts.init(chartDom);
            var option: EChartsOption;
            option = {
                color: ['#7766E7', '#518BF1','#FFCD00', '#1DBD84','#FE738A', '#C4C4C4'],
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '8%',
                    left: 'center'
                },
                title: {
                    text: '待办各分类'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['35%', '65%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '40',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: '生活' },
                            { value: 735, name: '工作' },
                            { value: 580, name: '学习' },
                            { value: 484, name: '健康' },
                            { value: 300, name: '社交' },
                            { value: 300, name: '其他' }
                        ]
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
#echarttwo {
    margin-top: 20px;
    width: 360px;
    height: 400px;
    background-color: #ffffff;
    border: 1px solid #f1f2f3;
    padding: 20px 20px 0 20px;
    margin-bottom: 30px;
}

#echarttwo:hover {
    box-shadow: 0 2px 12px #0000001a;
    transition: all ease 0.3s;
}
</style>
