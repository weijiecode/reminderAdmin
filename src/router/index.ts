import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// 引入封装的nprogress.ts
import { start, close } from '@/utils/nprogress';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login/LoginView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login/LoginView.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/home/HomeView.vue'),
    children: [
      {
        path: '/main',
        name: 'main',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/main/MainView.vue')
      },
      {
        path: '/mycenter',
        name: 'mycenter',
        meta: {
          title: '个人中心'
        },
        component: () => import('@/views/mycenter/MycenterView.vue')
      },
      {
        path: '/usermanage',
        name: 'usermanage',
        meta: {
          title: '用户管理'
        },
        component: () => import('@/views/usermanage/UserManage.vue')
      },
      {
        path: '/setting',
        name: 'setting',
        meta: {
          title: '设置'
        },
        component: () => import('@/views/setting/SettingView.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  start();
  // 设置浏览器标题
  if (to.meta.title) {
    document.title = String(to.meta.title);
  } else {
    document.title = 'reminderAdmin';
  }
  next();
});

// 路由加载结束后执行
router.afterEach(() => {
  close();
});


export default router
