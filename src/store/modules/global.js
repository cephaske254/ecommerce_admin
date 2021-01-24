import { apiLogin } from "../../api/auth";

const defaultState = {
  token: { refresh: null, access: null },
};

export default {
  state: defaultState,
  getters: {
    isLoggedIn(state) {
      return state.token && state.token.refresh && state.token.access
        ? true
        : false;
    },
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    login({ commit }, payload = { email: null, password: null }) {
      new Promise((resolve, reject) => {
        apiLogin(payload.email, payload.password)
          .then((data) => {
            commit("setToken", data.data);
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
