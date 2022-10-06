import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/icon/iconfont.css'
// import locale from 'element-plus/lib/locale/lang/zh-cn'
import { addColor } from './theme/configColor'
import '@/theme/css-vars.css'
import i18n from './i18n'

addColor("light")

// createApp(App).use(store).use(router).use(ElementPlus,{locale}).mount('#app')
createApp(App).use(store).use(i18n).use(router).mount('#app')


