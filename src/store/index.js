import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },

  mutations: {
    setToken (state, token) {
      state.token = token
    }
  }
})
