import { createStore } from "vuex";
// import products from "./modules/products";

const { context, modules } = loadModules();
function loadModules() {
  const context = require.context("./modules", false, /([a-z_]+)\.js$/i);

  const modules = context
    .keys()
    .map((key) => ({ key, name: key.match(/([a-z_]+)\.js$/i)[1] }))
    .reduce(
      (modules, { key, name }) => ({
        ...modules,
        [name]: context(key).default,
      }),
      {}
    );

  return { context, modules };
}

if (module.hot) {
  module.hot.accept(context.id, () => {
    const { modules } = loadModules();

    store.hotUpdate({
      modules,
    });
  });
}

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules,
});
export default store;
