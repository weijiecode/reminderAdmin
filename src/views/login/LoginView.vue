<template>
  <div class="content">
    <div class="toptitle">reminderAdmin</div>
    <img class="bgimg" :src="bgSvg" alt="" />
    <Account />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Account from "@/views/login/component/account.vue";
import bgSvg from "@/assets/bg.svg";
export default defineComponent({
  components: {
    Account,
  },
  setup() {
    const changecolor = () => {
      document.documentElement.style.setProperty("--theme_bg_color", "#000");
    };
    return {
      changecolor,
      bgSvg,
    };
  },
});
</script>

<style scoped lang="scss">
.content {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5ff;
}

.bgimg {
  width: 50%;
  height: 70%;
  position: absolute;
  left: 0;
  bottom: 0;
}

.toptitle {
  position: absolute;
  top: 50px;
  left: 80px;
  display: flex;
  align-items: center;
  color: #409eff;
  font-size: 25px;
}
</style>
