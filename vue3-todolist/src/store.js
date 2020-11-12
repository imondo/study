import { createStore } from 'vuex'

export default createStore({
  state: {
    list: []
  },
  mutations: {
    getList(state, list) {
      state.list = list
    }
  },
  actions: {
    GetList({commit}, list) {
      commit('getList', list)
    }
  }
})