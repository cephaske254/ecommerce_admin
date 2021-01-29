import store from "../store";

export default (to, from, next) => {
  const includes = ["/404", "/500"].includes(to.path);
  if (includes) next();
  else if (to.name !== "Login" && !store.getters.isLoggedIn)
    next({
      name: "Login",
      query: { next: from.name !== "Login" && !includes ? from.path : "/" },
    });
  else next();
};