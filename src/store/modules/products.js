import axios from "axios";
import * as types from "../types";

const defaultState = [];

export default {
  state: defaultState,
  getters: {
    getProducts(state) {
      return state;
    },
    availableProducts(state) {
      return state.filter((product) => product.available === true);
    },
    unavailableProducts(state) {
      return state.filter((product) => product.available === false);
    },
    discountedProducts(state) {
      return state;
    },
  },
  mutations: {
    [types.COMMIT_PRODUCTS](state, payload = []) {
      console.log(payload.data, state);
      state = payload.data;
    },
  },
  actions: {
    getProducts({ commit, state }, payload) {
      const url = "/posts";
      if (payload === "next" && state.next) url["page"] = state.next;
      return new Promise((resolve, reject) => {
        axios
          .get(url)
          .then((data) => {
            setTimeout(() => {
              commit(types.COMMIT_PRODUCTS, data);
              resolve(data);
            }, 1000);
          })
          .catch((error) => reject(error));
      });
    },
  },
};
