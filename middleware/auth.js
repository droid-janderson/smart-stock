export default function ({ store, redirect, route }) {
  const isAuthenticated = store.state.auth.isAuthenticated;
  if (!isAuthenticated && route.path !== "/") {
    redirect("/");
  }
}
