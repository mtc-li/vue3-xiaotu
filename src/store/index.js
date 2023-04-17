import { createStore } from 'vuex'
import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {

  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cart,
    user,
    category
  },
  plugins: [
    createPersistedState({
      key: 'vue3-info', // 存储vuex数据的任意键名--本地存储里面 localStorage
      paths: ['user', 'cart'] // 存储的模块名称一级全局state数据  不写默认存储所有内容
    })
  ]
})
