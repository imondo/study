import handleToken from './../../utils/token'

const token = {
  state: null,
  mutations: {
    TOKEN_SET: (state, token) => {
      state.token = token;
    },
    TOKNE_DEL: (state, token) => {
      state.token = null
    }
  },
  actions: {
    async getToken({ commit }) {
      return await handleToken.getToken().then(token => {
        commit('TOKEN_SET', token);
        return token;
      })
    },
    async deleteToken({ commit }) {
      return await handleToken.removeToken().then(isTrue => {
        isTrue && commit('TOKNE_DEL', null);
        return isTrue;
      })
    }
  }
}

export default token;