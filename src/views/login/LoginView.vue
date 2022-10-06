<template>
  <div class="content">
    <div class="toptitle">reminderAdmin</div>
    <img class="bgimg" :src="bgSvg" alt="" />
    <Account />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Account from "@/views/login/component/account.vue";
import bgSvg from "@/assets/bg.svg";
import { addColor } from '../../theme/configColor'
import { useStore } from "vuex"

export default defineComponent({
  components: {
    Account,
  },
  setup() {
    // 获取vuex对象
    let store = useStore()
    const themetype = ref('light')
    themetype.value = store.state.themetype
    // themetype.value = localStorage.getItem('theme') || ''
    if (themetype.value === 'light') {
      addColor("light")
      document.documentElement.classList.remove("dark");
    } else if (themetype.value === 'dark') {
      addColor("dark")
      document.documentElement.classList.add("dark");
    }
    return {
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
  background-color: var(--loginbg);
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
