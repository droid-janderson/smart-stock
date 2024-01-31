/* eslint-disable no-useless-catch */
export const state = () => ({
  user: null,
  isAuthenticated: false,
});

export const mutations = {
  setUser(state, payload) {
    state.user = payload;

    console.log("User", state.user);
  },
  setIsAuthenticated(state, payload) {
    state.isAuthenticated = payload;
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
      commit("setIsAuthenticated", true);

      localStorage.setItem("user", JSON.stringify(userCredential.user));
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  async register({ commit }, { nome, email, password }) {
    try {
      const userCredential =
        await this.$fire.auth.createUserWithEmailAndPassword(email, password);

      await db.collection("users").add(userCredential.user.uid);

      console.log(userCredential.user.uid);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  async googleLogin({ commit }, user) {
    try {
      commit("setUser", user);
      commit("setIsAuthenticated", true);

      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      throw error;
    }
  },

  async logout({ commit }) {
    await this.$fire.auth.signOut();
    commit("setUser", null);
    commit("setIsAuthenticated", false);
  },
};

export const getters = {
  isAuthenticated: (state) => state.user !== null,
  currentUser: (state) => state.user,
};
