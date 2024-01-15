export default async function ({ app, store, route }) {
  try {
    if (route.path !== "/" && route.path !== "/franquias") {
      const id = store.state.franchises.idFranchise;
      const db = app.$fire.firestore;

      const docRef = db
        .collection("users")
        .doc(store.state.auth.user.uid)
        .collection("franchises")
        .doc(id);

      const franchiseData = await docRef.get();

      if (franchiseData.exists) {
        const doc = franchiseData.data();
        store.commit("franchises/setFranchiseData", doc);
      }
    }
  } catch (error) {
    console.log("new error", error);
  }
}
