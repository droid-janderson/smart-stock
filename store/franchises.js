/* eslint-disable no-useless-catch */
export const state = () => ({
  franchises: null,
  idFranchise: null,
  franchiseData: null,
});

export const mutations = {
  setIdFranchise(state, id) {
    state.idFranchise = id;
    console.log(state.idFranchise);
  },
  setFranchiseData(state, data) {
    state.franchiseData = data;
  },
  setFranchises(state, payload) {
    state.franchises = payload;
  },
};

export const actions = {
  async getFranchises({ commit, rootState }) {
    try {
      const db = this.$fire.firestore;
      const franchiseRef = db
        .collection("users")
        .doc(rootState.auth.user.uid)
        .collection("franchises");

      franchiseRef.onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        commit("setFranchises", data);
      });
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  },
  async saveFranchise({ rootState }, { name, description }) {
    try {
      const db = this.$fire.firestore;

      const data = {
        id: "",
        name,
        description,
      };

      const franchise = await db
        .collection("users")
        .doc(rootState.auth.user.uid)
        .collection("franchises")
        .add(data);

      await franchise.update({
        id: franchise.id,
      });

      return franchise;
    } catch (error) {
      throw error;
    }
  },
};

export const getters = {
  franchisesData: (state) => {
    return state.franchises;
  },
};
