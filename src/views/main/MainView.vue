<template>
  <div class="main">
    <div class="oneitem">
      <div class="subone">
        <div class="iconbox">
          <i class="iconfont icon-liuliangtongji" style="color: #67c23a;font-size:34px;"></i>
        </div>
      </div>
      <div class="subone"></div>
      <div class="subone"></div>
      <div class="subone"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'MainView',
  components: {
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
  background-color: #f0f9eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
