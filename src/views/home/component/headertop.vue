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
        <el-breadcrumb-item :to="{ path: '/main' }">{{ $t("herader.home") }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.path == '/mycenter'">{{ $t("herader.mycenter") }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.path == '/setting'">{{ $t("herader.setting") }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.path == '/usermanage'">{{ $t("herader.usermanagement") }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.path == '/message'">{{ $t("herader.informmanagement") }}</el-breadcrumb-item>
        <!-- <el-breadcrumb-item v-if="route.path == '/mycenter'"></el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <div class="rightbox">
      <!-- 搜索框 -->
      <el-autocomplete v-model="state1" :fetch-suggestions="querySearch" clearable class="inline-input w-50"
        :placeholder="$t('header.inputmenu')" @select="handleSelect" />
      <!-- 搜索 -->
      <!-- <div class="iconbox">
        <el-icon class="subicon" :size="16" color="#606266">
          <Search />
        </el-icon>
      </div> -->
      <!-- 消息通知 -->
      <div class="iconbox1" @click="tomessage">
        <el-icon class="subicon1" :size="16" color="#606266">
          <Bell />
        </el-icon>
      </div>
      <!-- 全屏切换 -->
      <div class="iconbox2" @click="handleFullScreen">
        <el-icon class="subicon2" :size="16" color="#606266">
          <FullScreen />
        </el-icon>
      </div>
      <!-- 修改背景色 -->
      <el-switch v-model="themeBoole" size="small" class="mt-2" style="margin-left: 10px" inline-prompt
        @change="changecolor" :active-icon="Sunny" :inactive-icon="Moon" />
      <!-- 切换语言 -->
      <el-dropdown>
        <i class="iconfont icon-a-zhongyingwenzhongwen"
          style="color: var(--langcolor);font-size:16px;cursor: pointer;margin-left: 20px;"></i>
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
            <el-dropdown-item>{{ $t("herader.home") }}</el-dropdown-item>
            <el-dropdown-item>{{ $t("herader.mycenter") }}</el-dropdown-item>
            <el-dropdown-item>{{ $t("herader.codewarehouse") }}</el-dropdown-item>
            <el-dropdown-item divided @click="outaccount">{{ $t("herader.logout") }}</el-dropdown-item>
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
    // Search,
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
    const { locale, t } = useI18n();
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
    const restaurants = ref<RestaurantItem[]>([])
    const loadAll = () => {
      return [
        { value: t('menu.home'), link: '/main' },
        { value: t('menu.personalcenter'), link: '/mycenter' },
        { value: t('menu.usermanagement'), link: '/usermanage' },
        { value: t('menu.informmanagement'), link: '/message' },
        { value: t('menu.setting'), link: '/setting' },
        { value: t('menu.embeddediframe'), link: '/iframe' },
        { value: 'gitee', link: 'gitee' },
        { value: 'github', link: 'github' },
      ]
    }
    // 刷新页面获取当前语言参数
    if (langtype.value === 'en') {
      locale.value = 'en';
      store.commit("updatelanguage", 'en');
      // 刷新翻译搜索栏里的数据
      restaurants.value = loadAll()
    } else {
      locale.value = 'zhCn';
      store.commit("updatelanguage", 'zhCn');
      restaurants.value = loadAll()
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
        t('header.logoutwarning'),
        t('header.warning'),
        {
          confirmButtonText: t('header.confirm'),
          cancelButtonText: t('header.cancel'),
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
            message: t('header.safe'),
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
    // 菜单搜索数据过滤
    interface RestaurantItem {
      value: string,
      link: string
    }

    const state1 = ref('')


    const querySearch = (queryString: string, cb: any) => {
      const results = queryString
        ? restaurants.value.filter(createFilter(queryString))
        : restaurants.value
      // call callback function to return suggestions
      cb(results)
    }
    const createFilter = (queryString: string) => {
      return (restaurant: RestaurantItem) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    }


    const handleSelect = (item: any) => {
      // console.log(item)
      if (item.link === 'gitee') {
        window.open("https://gitee.com/weijiebaby", "_blank")
      } else if (item.link === 'github') {
        window.open("https://github.com/weijiecode", "_blank")
      } else {
        router.push(item.link)
      }

      state1.value = ''
    }

    onMounted(() => {
      restaurants.value = loadAll()
    })
    const tomessage = () => {
      router.push('/message')
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
      themeBoole,
      querySearch,
      handleSelect,
      state1,
      tomessage
    }
  }
});
</script>
<style scoped lang="scss">
// ::v-deep .el-dropdown-menu__item:not(.is-disabled):focus {
//   background-color: var(--menuli) !important;
// }

.iconbox,
.iconbox1,
.iconbox2 {
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.iconbox:hover .subicon {
  animation: logoAnimation 0.3s ease-in-out;
}

.iconbox1:hover .subicon1 {
  animation: logoAnimation 0.3s ease-in-out;
}

.iconbox2:hover .subicon2 {
  animation: logoAnimation 0.3s ease-in-out;
}

@keyframes logoAnimation {
  0% {
    transform: scale(0);
  }

  80% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

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
  margin-right: 5px;
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

.my-autocomplete li {
  line-height: normal;
  padding: 7px;
}

.my-autocomplete li .name {
  text-overflow: ellipsis;
  overflow: hidden;
}

.my-autocomplete li .addr {
  font-size: 12px;
  color: #b4b4b4;
}

.my-autocomplete li .highlighted .addr {
  color: #ddd;
}
</style>
