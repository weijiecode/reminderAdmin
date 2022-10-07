<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { ElConfigProvider } from "element-plus"
import { useStore } from "vuex";
// 导入 Element Plus 语言包
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    const store = useStore();
    const language = computed(() => store.state.language);
    const lang = {
      zhCn,
      en,
    };
    const locale = ref('zhCn');
    return {
      locale: zhCn
    }
  }
})
</script>

<style lang='scss'>
/* 定义全局的scss变量 */
@import './theme/app.scss';
</style>
