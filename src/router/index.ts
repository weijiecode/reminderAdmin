import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// 引入封装的nprogress.ts
import { start, close } from '@/utils/nprogress';
import Cookies from 'js-cookie'
import i18n from '../i18n/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
    meta: {
      title: i18n.global.t('router.login')
    },
    component: () => import('@/views/login/LoginView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: i18n.global.t('router.login')
    },
    component: () => import('@/views/login/LoginView.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: i18n.global.t('router.home')
    },
    component: () => import('@/views/home/HomeView.vue'),
    children: [
      {
        path: '/main',
        name: 'main',
        meta: {
          title: i18n.global.t('router.home')
        },
        component: () => import('@/views/main/MainView.vue')
      },
      {
        path: '/mycenter',
        name: 'mycenter',
        meta: {
          title: i18n.global.t('router.mycenter')
        },
        component: () => import('@/views/mycenter/MycenterView.vue')
      },
      {
        path: '/message',
        name: 'message',
        meta: {
          title: '公告管理'
        },
        component: () => import('@/views/message/MessageView.vue')
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
      },
      {
        path: '/iframe',
        name: 'iframe',
        meta: {
          title: 'iframe'
        },
        component: () => import('@/views/iframe/IframeView.vue')
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
  // 获取token
  const TOKEN = Cookies.get('token')
  if (TOKEN) {
    next()
  } else {
    // 没有token 只能访问登录页面 其它页面无法访问
    if (to.name === 'login') next()
    else next('/login')
  }
})

// 路由加载结束后执行
router.afterEach(() => {
  close();
});


export default router
