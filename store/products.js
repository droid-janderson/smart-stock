/* eslint-disable no-useless-catch */
export const state = () => ({
  products: null,
  productData: null,
});

export const mutations = {
  setProductData(state, data) {
    state.productData = data;
  },
  setProducts(state, payload) {
    state.products = payload;
  },
};

export const actions = {
  async getProducts({ commit, rootState }) {
    try {
      const franchiseId = rootState.franchises.idFranchise;
      const db = this.$fire.firestore;
      const franchiseRef = db
        .collection("users")
        .doc(rootState.auth.user.uid)
        .collection("franchises")
        .doc(franchiseId)
        .collection("products");

      franchiseRef.onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        commit("setProducts", data);
      });
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  },
  async saveProduct({ rootState }, payload) {
    try {
      const franchiseId = rootState.franchises.idFranchise;
      const db = this.$fire.firestore;

      payload.id = "";

      const product = await db
        .collection("users")
        .doc(rootState.auth.user.uid)
        .collection("franchises")
        .doc(franchiseId)
        .collection("products")
        .add(payload);

      await product.update({
        id: product.id,
      });

      return product;
    } catch (error) {
      throw error;
    }
  },

  async deleteProduct({ rootState }, payload) {
    try {
      const franchiseId = rootState.franchises.idFranchise;
      const db = this.$fire.firestore;

      const product = await db
        .collection("users")
        .doc(rootState.auth.user.uid)
        .collection("franchises")
        .doc(franchiseId)
        .collection("products")
        .doc(payload.id)
        .delete();

      return product;
    } catch (error) {
      throw error;
    }
  },
};

export const getters = {
  productsData: (state) => {
    return state.products;
  },
};
