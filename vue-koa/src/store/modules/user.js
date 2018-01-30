const currentUser = {
  state: null,
  mutations: {
    USER_SET: (state, user) => {
      state.user = user;
    }
  },
  actions: {
    getUser() {

    }
  }
}

export default currentUser;