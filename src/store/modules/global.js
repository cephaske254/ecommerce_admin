import { apiLogin, apiReset } from "../../api/auth";
import LocalStorageService from "../../global/localStorageService";
import { GET_PERFORMANCE_STATS } from "../types";
import { apiGetPerformanceStats } from "../../api/globals";

// LocalstorageService
const localStorageService = LocalStorageService.getService();

const defaultState = {
  navbarHeight: "500px",
  token: {
    access: localStorageService.getAccessToken(),
    refresh: localStorageService.getRefreshToken(),
  },
  performanceStats: {
    returning: [],
    general: [],
  },
};

export default {
  state: defaultState,
  getters: {
    isLoggedIn(state) {
      return state.token && state.token.refresh && state.token.access
        ? true
        : false;
    },
    getNavbarHeight(state) {
      return state.navbarHeight;
    },
    getPerformanceStats(state) {
      return state.performanceStats;
    },
  },
  mutations: {
    setToken(state, payload) {
      localStorageService.setToken(payload);
      state.token = payload;
    },
    clearToken(state) {
      localStorageService.clearToken();
      state.token = {};
    },
    setNavbarHeight(state, payload) {
      state.navbarHeight = payload;
    },
    [GET_PERFORMANCE_STATS](state, payload) {
      state.performanceStats = payload;
    },
  },
  actions: {
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("clearToken");
        resolve();
      });
    },
    login({ commit }, payload = { email: null, password: null }) {
      return new Promise((resolve, reject) => {
        apiLogin(payload.email, payload.password)
          .then((data) => {
            commit("setToken", data.data);
            resolve(data);
          })
          .catch((error) => reject(error));
      });
    },
    reset({ commit }, payload) {
      commit("clearToken", null);
      return new Promise((resolve, reject) => {
        apiReset(payload)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => reject(error));
      });
    },
    navbarHeight({ commit }, payload) {
      commit("setNavbarHeight", payload);
    },
    [GET_PERFORMANCE_STATS]({ commit }) {
      return new Promise((resolve, reject) => {
        apiGetPerformanceStats()
          .then((data) => {
            commit(GET_PERFORMANCE_STATS, data.data);
            resolve(data);
          })
          .catch((error) => reject(error));
      });
    },
  },
};
