import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

export default createStore({
  state: {
    themetype: 'light',
    language: 'zhCn',
    tabs: ''
  },
  getters: {
  },
  mutations: {
    updatetheme(state, themetype) {
      state.themetype = themetype
    },
    updatelanguage(state, value) {
      // state.language = value;
      // sessionStorage.setItem("localeLang", value);
      state.language = value;
    },
    updatetabs(state, value) {
      state.tabs = value
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    //默认是存储在localStorage中
    createPersistedstate({
      // key: 存储数据的键名
      key: 'longStore',
      //paths:存储state中的那些数据
      paths: ['themetype','language','tabs']
    })
  ]
})
