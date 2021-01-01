import { apiGetProducts } from "@/api/products";
import * as types from "../types";

const defaultState = {
  data: [],
  next: null,
  previous: null,
  count: null,
};

export default {
  namespaced: true,
  state: defaultState,
  getters: {
    getProducts(state) {
      return state.data;
    },
    getNext(state) {
      return state.next;
    },
    availableProducts(state) {
      return state.data.filter((product) => product.available === true);
    },
    unavailableProducts(state) {
      return state.data.filter((product) => product.available === false);
    },
    discountedProducts(state) {
      return state.data;
    },
  },
  mutations: {
    [types.COMMIT_PRODUCTS](state, payload) {
      state.data = [...state.data, ...payload.data];
      state.next = payload.next;
      state.previous = payload.previous;
      state.count = payload.count;
    },
  },
  actions: {
    getProducts({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        apiGetProducts(payload, state.next)
          .then((response) => {
            const data = response.data;
            commit(types.COMMIT_PRODUCTS, data);
            resolve(data);
          })
          .catch((error) => reject(error));
      });
    },
  },
};
