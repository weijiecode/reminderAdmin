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
      <el-icon :size="16" color="#606266" @click="changecolor">
        <Sunny />
      </el-icon>
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

      <el-dropdown>
        <div class="user">
          <img src="@/assets/t.jpeg" alt="">
          <div class="nickname">{{nickname}}</div>
          <el-icon :size="12" color="#606266">
            <ArrowDown />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu style="backgroundColor:var(--menucolor)">
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
import { defineComponent, ref, onMounted } from 'vue';
import Cookies from "js-cookie"
import { ElMessage, ElMessageBox } from 'element-plus';
import { Bell, Sunny, Search, FullScreen, ArrowDown, Expand, Fold, ArrowRight } from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { addColor } from '../../../theme/configColor'

export default defineComponent({
  name: 'HeaderTop',
  components: {
    Sunny,
    Search,
    Bell,
    FullScreen,
    ArrowDown,
    Expand,
    Fold,
  },
  emit: ["changemenu"],
  setup(props, { emit }) {
    const themetype = ref('light')
    const changecolor = () => {
      if (themetype.value === 'light') {
        addColor("dark")
        themetype.value = 'dark'
      } else {
        addColor("light")
        themetype.value = 'light'
      }
    };
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
      outaccount,
      handleFullScreen,
      isCollapse,
      chmn,
      nickname,
      ArrowRight,
      route
    }
  }
});
</script>
<style scoped lang="scss">
::v-deep .el-dropdown__popper .el-dropdown-menu {
  color: '#ffffff' !important;
  background-color: red !important;
}

::v-deep .el-dropdown-menu__item:not(.is-disabled):focus {
  background-color: var(--menuli) !important;
}

.header {
  width: 100%;
  height: 50px;
  background-color: var(--themeColor);
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
