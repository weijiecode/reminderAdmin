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
        <!-- <el-breadcrumb-item v-if="route.path == '/mycenter'"></el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <div class="rightbox">
      <el-icon :size="16" color="#606266" @click="changecolor">
        <Sunny />
      </el-icon>
      <el-icon :size="16" color="#606266">
        <Search />
      </el-icon>
      <el-icon :size="16" color="#606266">
        <Bell />
      </el-icon>
      <el-icon :size="16" color="#606266">
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
import { defineComponent, ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Bell, Sunny, Search, FullScreen, ArrowDown, Expand, Fold, ArrowRight } from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';
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
    const changecolor = () => {
      document.documentElement.style.setProperty("--theme_bg_color", '#1E90FF');
      document.documentElement.style.setProperty("--theme_font_color", '#aaa');
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
      nickname.value =  JSON.parse(localStorage.getItem('admindata') as any).nickname;
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
          localStorage.removeItem('token');
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
    return {
      changecolor,
      outaccount,
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
.header {
  width: 100%;
  height: 50px;
  background-color: #ffffff;
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
