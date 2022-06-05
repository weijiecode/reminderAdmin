<template>
  <div class="main">
    <div class="oneitem">
      <div class="subone">
        <div class="databox">
          <p class="pone">2639,63</p>
          <p class="ptwo">+12.10%</p>
          <p class="pthree">平台总流量</p>
        </div>
        <div class="iconbox" style="background-color: #ecf5ff;">
          <i class="iconfont icon-liuliangtongji" style="color: #409eff;font-size:34px;"></i>
        </div>
      </div>
      <div class="subone">
        <div class="databox">
          <p class="pone">1002,10</p>
          <p class="ptwo" style="color: #6690f9;">-12.10%</p>
          <p class="pthree">今日总流量</p>
        </div>
        <div class="iconbox" style="background-color: #f0f9eb;">
          <i class="iconfont icon-liuliang" style="color: #67c23a;font-size:34px;"></i>
        </div>
      </div>
      <div class="subone">
        <div class="databox">
          <p class="pone">7639,63</p>
          <p class="ptwo">+12.10%</p>
          <p class="pthree">用户数量</p>
        </div>
        <div class="iconbox" style="background-color: #fdf6ec;">
          <i class="iconfont icon-ren-duoren" style="color: #e6a23c;font-size:34px;"></i>
        </div>
      </div>
      <div class="subone">
        <div class="databox">
          <p class="pone">2229,20</p>
          <p class="ptwo">+12.10%</p>
          <p class="pthree">今日待办总数量</p>
        </div>
        <div class="iconbox" style="background-color: #fef0f0;">
          <i class="iconfont icon-daibantixing" style="color: #f56c6c;font-size:34px;"></i>
        </div>
      </div>
    </div>
    <div class="oneechartsview">
      <CrossEcharts></CrossEcharts>
      <PieEcharts></PieEcharts>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CrossEcharts from '@/views/main/component/crossecharts.vue';
import PieEcharts from '@/views/main/component/pieecharts.vue';


export default defineComponent({
  name: 'MainView',
  components: {
    CrossEcharts,
    PieEcharts
  },
  setup(){
    return {
    }
  }
});
</script>
<style scoped lang="scss">
.iconbox {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.oneitem {
  display: flex;

}

.subone {
  width: 25%;
  cursor: default;
  height: 130px;
  background-color: #ffffff;
  margin: 10px;
  display: flex;
  border: 1px solid #f1f2f3;
  align-items: center;
  justify-content: space-around;
}

@media screen and (max-width: 1110px) {
  .oneitem {
    flex-wrap: wrap;
  }
  .subone {
    width: 47%;
    overflow: auto;
  }
}
@media screen and (max-width: 880px) {
  .oneitem {
    flex-wrap: wrap;
  }
  .subone {
    width: 97%;
    overflow: auto;
  }
}

.subone:hover {
  box-shadow: 0 2px 12px #0000001a;
  transition: all ease 0.3s;
}

.pone {
  color: #303133;
  font-size: 30px;
}

.ptwo {
  color: #ff7270;
  font-size: 16px;
}

.pthree {
  margin-top: 10px;
  color: #303133;
  font-size: 14px;
}
.oneechartsview {
  display: flex;
  justify-content: space-around;
}
</style>
