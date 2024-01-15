/* eslint-disable no-useless-catch */
export const state = () => ({
  user: null,
});

export const mutations = {
  setUser(state, payload) {
    state.user = payload;

    console.log("User", state.user);
  },
};

export const actions = {
  async login({ commit }, { email, password }) {
    try {
      const userCredential = await this.$fire.auth.signInWithEmailAndPassword(
        email,
        password
      );

      commit("setUser", userCredential.user);

      localStorage.setItem("user", JSON.stringify(userCredential.user));
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  async googleLogin({ commit }, user) {
    try {
      commit("setUser", user);

      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      throw error;
    }
  },

  async logout({ commit }) {
    await this.$fire.auth.signOut();
    commit("setUser", null);
  },
};

export const getters = {
  isAuthenticated: (state) => {
    return !!state.user;
  },
  currentUser: (state) => {
    return state.user;
  },
};
