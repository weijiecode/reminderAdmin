<template>
  <div class="header">
    <div class="leftbox">
      <el-icon @click="chmn(false)" :size="18" color="#606266" v-if="isCollapse">
        <Expand />
      </el-icon>
      <el-icon @click="chmn(true)" :size="18" color="#606266" v-if="!isCollapse">
        <Fold />
      </el-icon>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.path == '/mycenter'">个人中心</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.path == '/setting'">设置</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.path == '/usermanage'">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.path == '/message'">公告管理</el-breadcrumb-item>
        <!-- <el-breadcrumb-item v-if="route.path == '/mycenter'"></el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <div class="rightbox">
      <!-- 修改背景色 -->
      <el-icon :size="16" color="#606266">
        <Search />
      </el-icon>
      <el-icon :size="16" color="#606266">
        <Bell />
      </el-icon>
      <!-- 全屏切换 -->
      <el-icon :size="16" color="#606266" @click="handleFullScreen">
        <FullScreen />
      </el-icon>
      <el-switch v-model="themeBoole" class="mt-2" style="margin-left: 24px" inline-prompt @change="changecolor"
        :active-icon="Sunny" :inactive-icon="Moon" />
      <!-- 切换语言 -->
      <el-dropdown>
        <i class="iconfont icon-a-zhongyingwenzhongwen"
          style="color: var(--langcolor);font-size:20px;cursor: pointer;margin-left: 20px;"></i>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="changelan('ch')">中文简体</el-dropdown-item>
            <el-dropdown-item @click="changelan('en')">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 切换主题 -->
      <el-dropdown>
        <div class="user">
          <img src="@/assets/t.jpeg" alt="">
          <div class="nickname">{{nickname}}</div>
          <el-icon :size="12" color="#606266">
            <ArrowDown />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>首页</el-dropdown-item>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>代码仓库</el-dropdown-item>
            <el-dropdown-item divided @click="outaccount">安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import Cookies from "js-cookie"
import { ElMessage, ElMessageBox } from 'element-plus';
import { Bell, Sunny, Search, FullScreen, ArrowDown, Expand, Fold, ArrowRight, Moon } from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { addColor } from '../../../theme/configColor'
import { useStore } from 'vuex'
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: 'HeaderTop',
  components: {
    Search,
    Bell,
    FullScreen,
    ArrowDown,
    Expand,
    Fold,
  },
  emit: ["changemenu"],
  setup(props, { emit }) {
    // 获取vuex对象(用vuex存储，方便监听参数变化)
    let store = useStore()
    const themetype = ref('light')
    const langtype = ref('zhCn')
    const themeBoole = ref(true)
    themetype.value = store.state.themetype
    langtype.value = store.state.language
    // themetype.value = localStorage.getItem('theme') || ''
    // 刷新页面获取当前主题参数
    if (themetype.value === 'light') {
      addColor("light")
      themeBoole.value = true
      document.documentElement.classList.remove("dark");
    } else if (themetype.value === 'dark') {
      addColor("dark")
      themeBoole.value = false
      document.documentElement.classList.add("dark");
    }
    // 切换主题
    const changecolor = () => {
      if (themeBoole.value === false) {
        addColor("dark")
        document.documentElement.classList.add("dark");
        themetype.value = 'dark'
        store.commit('updatetheme', 'dark')
        // localStorage.setItem('theme', 'dark')
      } else if (themeBoole.value === true) {
        addColor("light")
        document.documentElement.classList.remove("dark");
        themetype.value = 'light'
        store.commit('updatetheme', 'light')
        // localStorage.setItem('theme', 'light')
      }
    };
    // 切换语言
    const language = computed(() => store.state.language);
    const { locale } = useI18n();
    const changelan = (value: string) => {
      console.log(value)
      if (value === 'en') {
        locale.value = 'en';
        store.commit("updatelanguage", 'en');
      } else {
        locale.value = 'zhCn';
        store.commit("updatelanguage", 'zhCn');
      }

    }
    // 刷新页面获取当前语言参数
    if (langtype.value === 'en') {
      locale.value = 'en';
      store.commit("updatelanguage", 'en');
    } else {
      locale.value = 'zhCn';
      store.commit("updatelanguage", 'zhCn');
    }
    const router = useRouter();
    const route = useRoute();
    // onMounted(() => {
    //   console.log(route)
    // });
    const isCollapse = ref<boolean>(false);
    let nickname = ref();
    // 获取用户信息并显示
    onMounted(() => {
      nickname.value = JSON.parse(localStorage.getItem('admindata') as any).nickname;
      console.log(nickname.value)
    });
    // 退出
    const outaccount = () => {
      ElMessageBox.confirm(
        '此操作将退出登录, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          localStorage.removeItem('admindata');
          Cookies.remove('token')
          // localStorage.removeItem('token');
          router.push('/login');
          ElMessage({
            type: 'success',
            message: '账号已安全退出',
          })
        })
        .catch(() => {
          // ElMessage({
          //   type: 'info',
          //   message: 'Delete canceled',
          // })
        })
    };
    // 改变菜单宽度
    const chmn = (data: boolean) => {
      isCollapse.value = !isCollapse.value
      emit('changemenu', data);
    };
    // 是否全屏
    const fullscreen = ref(false)
    // 全屏事件
    const handleFullScreen = () => {
      let element = document.documentElement;
      // 判断是否已经是全屏
      // 如果是全屏，退出
      if (fullscreen.value) {
        document.exitFullscreen();
        // console.log('已还原！');
      } else {    // 否则，进入全屏
        element.requestFullscreen();
        // console.log('已全屏！');
      }
      // 改变当前全屏状态
      fullscreen.value = !fullscreen.value;
    }
    return {
      changecolor,
      changelan,
      outaccount,
      handleFullScreen,
      isCollapse,
      chmn,
      nickname,
      ArrowRight,
      Sunny,
      Moon,
      route,
      themeBoole
    }
  }
});
</script>
<style scoped lang="scss">
// ::v-deep .el-dropdown-menu__item:not(.is-disabled):focus {
//   background-color: var(--menuli) !important;
// }

.header {
  width: 100%;
  height: 50px;
  // background-color: var(--themeColor);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.leftbox {
  display: flex;
  align-items: center;
}

.rightbox {
  margin-right: 20px;
  float: right;
  display: flex;
  align-items: center;
  height: 50px;
  justify-content: center;
}

.el-icon {
  cursor: pointer;
  margin: 0 10px;
}

img {
  height: 25px;
  width: 25px;
  border-radius: 50%;
}

.user {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 12px;
  color: #606266;

  .el-icon {
    margin-left: 2px;
  }
}
</style>
