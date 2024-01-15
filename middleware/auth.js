export default function ({ store, redirect, route }) {
  const isAuthenticated = store.state.auth.user ? true : false;
  if (!isAuthenticated && route.path !== "/") {
    redirect("/");
  }
}
