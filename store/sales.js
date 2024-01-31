/* eslint-disable no-useless-catch */
export const state = () => ({
  sales: null,
});

export const mutations = {
  setSales(state, payload) {
    state.sales = payload;
  },
};

export const actions = {
  async getSales({ commit, rootState }) {
    const franchiseId = rootState.franchises.idFranchise;
    const db = this.$fire.firestore;

    try {
      const salesRef = db
        .collection("users")
        .doc(rootState.auth.user.uid)
        .collection("franchises")
        .doc(franchiseId)
        .collection("sales");

      salesRef.onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        commit("setSales", data);
      });
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  },

  async saveSaleMade({ rootState }, payload) {
    const franchiseId = rootState.franchises.idFranchise;
    const db = this.$fire.firestore;

    try {
      const sale = await db
        .collection("users")
        .doc(rootState.auth.user.uid)
        .collection("franchises")
        .doc(franchiseId)
        .collection("sales")
        .add(payload);

      await sale.update({
        id: sale.id,
      });
    } catch (error) {
      console.error("Error sending products to Firebase:", error);
      this.$toast.error("Failed to send products to Firebase.");
    }
  },

  async saveSales({ rootState }, payload) {
    const franchiseId = rootState.franchises.idFranchise;
    const db = this.$fire.firestore;

    try {
      for (const product of payload) {
        await db
          .collection("users")
          .doc(rootState.auth.user.uid)
          .collection("franchises")
          .doc(franchiseId)
          .collection("sales")
          .add(product);
      }
    } catch (error) {
      console.error("Error sending products to Firebase:", error);
      this.$toast.error("Failed to send products to Firebase.");
    }
  },
};

export const getters = {
  salesData: (state) => {
    return state.sales;
  },
};
