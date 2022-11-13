<template>
    <div class="echarts">
        <div id="echarttwo"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch, nextTick } from 'vue';
import * as echarts from 'echarts';
import { useStore } from "vuex"

export default defineComponent({
    name: 'PieEcharts',
    components: {
    },
    setup() {
        // 后去vuex对象
        let store = useStore()
        const themetype = ref('')
        themetype.value = store.state.themetype
        // 监听vuex的themetype参数
        const getTheme = computed(() => {
            return store.state.themetype
        })
        // 渲染页面时加载图表
        onMounted(() => {
            getcharts()
        });
        // 封装方法
        const getcharts = () => {
            type EChartsOption = echarts.EChartsOption;
            var chartDom = document.getElementById('echarttwo')!;
            // 清除Echarts默认添加的属性（解决切换路由后不渲染）
            chartDom.removeAttribute("_echarts_instance_");
            var myChart = echarts.init(chartDom, themetype.value === 'dark' ? "dark" : "light");
            var option: EChartsOption;
            option = {
                color: ['#7766E7', '#518BF1', '#FFCD00', '#1DBD84', '#FE738A', '#C4C4C4'],
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
        }
        nextTick(() => {
            setTimeout(() => {
                getcharts()
            })
        })
        // 监听到主题切换，重新渲染
        watch(getTheme, () => {
            nextTick(() => {
                setTimeout(() => {
                    getcharts()
                })
                themetype.value = store.state.themetype
            })
        })

        return {
        }
    }
});
</script>
<style scoped lang="scss">
#echarttwo {
    border-radius: 10px;
    margin-top: 20px;
    width: 360px;
    height: 400px;
    background-color: var(--echartbg);
    border: 1px solid var(--tabborder);
    padding: 20px 20px 0 20px;
    margin-bottom: 30px;
}

#echarttwo:hover {
    box-shadow: 0 2px 12px #0000001a;
    transition: all ease 0.3s;
}

@media screen and (max-width: 1060px) {
    .echarts {
        float: left;
        width: 100%;
    }

    #echarttwo {
        width: 100%;
        display: flex;
        justify-content: center;
    }
}
</style>
