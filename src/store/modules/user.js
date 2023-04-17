export default {
  namespaced: true,
  state () {
    return {
      profile: {
        id: '',
        avatar: '',
        nickname: '', // 昵称
        account: '', // 账户名
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    setUser (state, payload) {
      state.profile = payload
    }
  }
}
