<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse == false ? '200px' : '63px'">
        <MenuItem :isCollapse="isCollapse">
        </MenuItem>
      </el-aside>
      <el-container>
        <el-header>
          <HeaderTop @changemenu="tochang"></HeaderTop>
        </el-header>
        <!-- <el-main><MainContent></MainContent></el-main> -->
        <el-main>
          <el-empty v-if="editableTabs.length == 0" description="description" />
          <el-tabs v-if="editableTabs.length > 0" v-model="editableTabsValue" type="card" class="demo-tabs" closable
            @tab-remove="removeTab" @tab-click="tabClick">
            <el-tab-pane v-for="item in showeditableTabs" :key="item.name" :label="item.title" :name="item.name">
              <router-view v-if="item.name===editableTabsValue"></router-view>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderTop from "@/views/home/component/headertop.vue";
import MenuItem from "@/views/home/component/menuitem.vue";
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'HomeView',
  components: {
    HeaderTop,
    MenuItem,
    // MainContent
  },
  setup() {
    const isCollapse = ref<boolean>(false);
    const tochang = (data: boolean) => {
      isCollapse.value = data;
    };
    // 获取vuex对象
    const store = useStore()
    // tabs
    const { t } = useI18n();
    const test = ref('mycenter')
    const editableTabsValue = ref('/main')
    // 原始数据
    const editableTabs = ref([
      {
        title: 'home',
        name: '/main',
      }
    ])
    // 渲染数据（修改titl值）
    const showeditableTabs = ref([
      {
        title: '',
        name: '',
      }
    ])
    // 移除关闭tab页
    const removeTab = (targetName: any) => {
      // console.log(targetName)
      const tabs = editableTabs.value
      let activeName = editableTabsValue.value
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
              router.push(nextTab.name)
            }
          }
        })
      }
      editableTabsValue.value = activeName
      editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
      updaterouter()
    }

    const route: any = useRoute();
    const router = useRouter();
    let flag = ref<number>(0)
    // 监测路由变化（点击菜单栏的改变），并改变其对应tab页
    watch(route, () => {
      flag.value = 0
      editableTabs.value.forEach(item => {
        if (item.name === route.path) {
          flag.value = 1;
          editableTabsValue.value = route.path;
        }
      })
      if (flag.value === 0) {
        editableTabs.value.push({
          title: route.meta.title,
          name: route.path
        })
        editableTabsValue.value = route.path
      }
      updaterouter()
    });
    // tab页的切换
    const tabClick = (tab: any) => {
      router.push(tab.paneName)
    };
    // 刷新页面时的操作
    onMounted(() => {
      // 刷新时以当前路由做为tab加入tabs
      // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
      // 当当前路由是首页时，添加首页到store，并设置激活状态
      if (route.path !== '/main') {
        editableTabs.value = [{
          title: 'home',
          name: '/main'
        }]
        editableTabs.value.push({
          title: route.meta.title,
          name: route.path
        })
        editableTabsValue.value = route.path
      }
      updaterouter()
    });

    // 监听主题色是否已更改，重新渲染语言
    const getchangelang = computed(() => store.state.language)
    watch(getchangelang,() => {
      // console.log('主题已更改')
      updaterouter()
    })

    // 封装修改语言方法
    const updaterouter = () => {
      showeditableTabs.value = []
      // 深拷贝对象数据
      showeditableTabs.value = JSON.parse(JSON.stringify(editableTabs.value))
      showeditableTabs.value.forEach((item, index) => {
        showeditableTabs.value[index].title = t('router.' + item.title)
      })
      store.commit("updatetabs",JSON.stringify(showeditableTabs.value))
    }
    return {
      tochang,
      isCollapse,
      editableTabsValue,
      showeditableTabs,
      removeTab,
      editableTabs,
      tabClick
    }
  }
});
</script>
<style scoped lang="scss">
/* .home {
  width: 100%;
  height: 100%;
  background-color: var(--theme_bg_color);
} */
.common-layout {
  height: 100%;
}

.el-container {
  height: 100%;
}

.el-header {
  height: 50px;
  background-color: var(--themeColor);
}

.el-main {
  background-color: var(--subthemeColor);
  border-top: 1px solid var(--subthemeColor);
  padding: 0px;
}

::v-deep .el-tabs__nav-scroll {
  margin: 6px 0 0 5px;
}

// .el-aside {
//   transition: width 0.5s;
//   -webkit-transition: width 0.5s;
//   -moz-transition: width 0.5s;
//   -webkit-transition: width 0.5s;
//   -o-transition: width 0.5s;
// }

.demo-tabs>.el-tabs__content {
  padding: 26px;
  color: var(--subthemeColor);
  font-size: 32px;
  font-weight: 600;
}

::v-deep .el-tabs--card>.el-tabs__header .el-tabs__nav {
  border: 1px solid var(--tabborder);
}

::v-deep .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  border-bottom-color: var(--themeColor);
}

::v-deep .el-tabs--card>.el-tabs__header {
  border-bottom: 1px solid var(--themeColor);
}

::v-deep .el-tabs__item {
  height: 30px;
  line-height: 30px;
  color: #8D8D8D;
  border-left: 1px solid var(--tabborder) !important;
  border-right: 1px solid var(--tabborder) !important;
}

::v-deep .el-tabs__item.is-active {
  color: var(--el-color-primary) !important;
  border-left-color: var(--tabborder) !important;
  border-right-color: var(--tabborder) !important;
}

::v-deep .el-tabs__header {
  background-color: var(--themeColor);
}

.el-empty {
  margin-top: 15%;
}

.el-tabs__item {
  background-color: aqua !important;
}
</style>
