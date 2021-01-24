import * as types from "../types";
import {
  apiAddCategory,
  apiGetCategories,
  apiGetCategory,
  apiUpdateCategory,
} from "../../api/categories";

const defaultState = {
  data: [],
  next: null,
  previous: null,
  count: 0,
};
export default {
  namespaced: true,
  state: {
    ...defaultState,
  },
  getters: {
    getCategories(state) {
      return state.data;
    },
    getNext(state) {
      return state.next;
    },
  },
  mutations: {
    [types.COMMIT_CATEGORIES](state, payload) {
      state.data = [...state.data, ...payload.data];
      state.next = payload.next;
      state.previous = payload.previous;
      state.count = payload.count;
    },
    [types.RESET_CATEGORY_STATE](state) {
      state.data = [];
    },
    [types.COMMIT_CATEGORY](state, payload) {
      const data = [...state.data];
      const index = data.findIndex((item) => item.id === payload.id);
      if (index >= 0) {
        data[index] = { ...payload };
      } else {
        data.push(payload);
      }
      state.data = data;
    },
  },
  actions: {
    [types.GET_CATEGORIES]({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        apiGetCategories(payload, state.next)
          .then((data) => {
            if (payload === "refresh") commit(types.RESET_CATEGORY_STATE);
            commit(types.COMMIT_CATEGORIES, data.data);
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    [types.ADD_CATEGORY]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        apiAddCategory(payload)
          .then((data) => {
            if (data && data.data) commit(types.COMMIT_CATEGORY, data.data);
            return resolve(data);
          })
          .catch((error) => reject(error));
      });
    },
    // eslint-disable-next-line
    [types.GET_CATEGORY]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        apiGetCategory(payload)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => reject(error));
      });
    },
    [types.UPDATE_CATEGORY]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        apiUpdateCategory(payload)
          .then((data) => {
            commit(types.COMMIT_CATEGORY, data.data);
            resolve(data);
          })
          .catch((error) => reject(error));
      });
    },
  },
};
