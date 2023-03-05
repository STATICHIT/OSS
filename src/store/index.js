import { createStore} from 'vuex'
 
export default createStore({
  state: {
    token: "",
  },
  getters: {
    //更新token的值
    setToken(state, token) {
      state.token = token
    },
    //删除token值（退出登录时）
    deleteToken(state) {
      state.token = ""
    },
  },
  mutations: {

  },
  actions: {

  },
  modules: {

  }
})