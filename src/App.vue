<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { ElConfigProvider } from "element-plus"
import { useStore } from "vuex";
// 导入 Element Plus 语言包
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    // 获取vuex对象
    const store = useStore();
    const langtype = ref('zhCn')
    const numindex = ref(0)
    langtype.value = store.state.language
    // 刷新页面获取当前语言参数
    const { locale, t } = useI18n();
    if (langtype.value === 'en') {
      locale.value = 'en';
      numindex.value = 1
      store.commit("updatelanguage", 'en');
    } else {
      locale.value = 'zhCn';
      numindex.value = 0
      store.commit("updatelanguage", 'zhCn');
    }
    // element plus国际化切换
    
    const ellanguage = computed(() => store.state.language);
    watch(ellanguage,(newValue) => {
      if (newValue === 'en') {
        numindex.value = 1
      }else {
        numindex.value = 0
      }
    })
    const lang = [
      zhCn,
      en
    ];
    const ellocale = computed(() => lang[numindex.value]);
    return {
      locale: ellocale
    }
  }
})
</script>

<style lang='scss'>
/* 定义全局的scss变量 */
@import './theme/app.scss';
</style>
