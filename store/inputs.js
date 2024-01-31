/* eslint-disable no-useless-catch */
export const state = () => ({
  inputs: null,
  inputData: null,
});

export const mutations = {
  setInputs(state, payload) {
    state.inputs = payload;
  },
};

export const actions = {
  async getInputs({ commit, rootState }) {
    try {
      const franchiseId = rootState.franchises.idFranchise;
      const db = this.$fire.firestore;
      const inputRef = db
        .collection("users")
        .doc(rootState.auth.user.uid)
        .collection("franchises")
        .doc(franchiseId)
        .collection("inputs");

      inputRef.onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(data);

        commit("setInputs", data);
      });
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  },

  async saveInputs({ rootState }, payload) {
    const franchiseId = rootState.franchises.idFranchise;
    const db = this.$fire.firestore;

    try {
      for (const product of payload) {
        await db
          .collection("users")
          .doc(rootState.auth.user.uid)
          .collection("franchises")
          .doc(franchiseId)
          .collection("inputs")
          .add(product);
      }
    } catch (error) {
      console.error("Error sending products to Firebase:", error);
      this.$toast.error("Failed to send products to Firebase.");
    }
  },
};

export const getters = {
  inputsData: (state) => {
    return state.inputs;
  },
};
