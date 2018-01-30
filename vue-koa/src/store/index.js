import Vue from 'vue';
import Vuex from 'vuex';

import token from './modules/token';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    token
  }
})

export default store;