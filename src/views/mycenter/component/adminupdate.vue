<template>
  <div class="content">
    <p class="toptitle">更新信息</p>
    <div class="adminstate">
      <div class="bothtitle">
          <div class="block"></div>
          <p class="subtitle">基本信息</p>
      </div>
      <div class="bothtitle">
          <div class="block"></div>
          <p class="subtitle">账号安全</p>
      </div>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'AdminUpdate',
  components: {
  },
  setup(){
    return {
    }
  }
});
</script>
<style scoped lang="scss">
.content {
  width: 98%;
  margin: 0 auto;
  margin-top: 15px;
  background-color: #ffffff;
  border: 1px solid #f1f2f3;
}
.content:hover {
  box-shadow: 0 2px 12px #0000001a;
  transition: all ease 0.3s;
}
.toptitle {
  padding: 15px 20px;
  color: #303133;
  border-bottom: 1px solid #e4e7ed;
}
.adminstate {
    padding: 5px 20px;
    .bothtitle {
        display: flex;
        align-items: center;
        .block {
            width: 3px;
            height: 10px;
            background-color: #518BF1;
        }
        .subtitle {
            margin-left: 10px;
            color: #303133;
        }
    }
}
</style>
