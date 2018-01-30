import Vue from 'vue';
import Vuex from 'vuex';

import token from './modules/token';
import userInfo from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    token,
    userInfo
  }
})

export default store;