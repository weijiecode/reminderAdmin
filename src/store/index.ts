import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

export default createStore({
  state: {
    themetype: 'light'
  },
  getters: {
  },
  mutations: {
    updatetheme(state, themetype) {
      state.themetype = themetype
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
      paths: ['themetype']
    })
  ]
})
