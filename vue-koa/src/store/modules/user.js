const jwt = require('jsonwebtoken');
import handleToken from './../../utils/token';

const userInfo = {
  state: null,
  mutations: {
    USER_SET: (state, user) => {
      state.user = user;
    }
  },
  actions: {
    async getUser({ commit }) {
      return await handleToken.getToken().then(token => {
        if (token) {
          let decode = jwt.decode(token)
          commit('USER_SET', decode);
          return decode;
        }
      })
    }
  }
}

export default userInfo;