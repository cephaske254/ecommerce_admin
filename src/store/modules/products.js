import axios from "axios";
import * as types from "../types";

const defaultState = [
  {
    id: "2x3D",
    name: "Cephas Too",
    available: true,
    description:
      "As an example, you could use the jQuery code above to restrict the user from entering more than 10 characters while he's typing; the following code snippet does exactly this As an example, you could use the jQuery code above to restrict the user from entering more than 10 characters while he's typing; the following code snippet does exactly this",
    price: "Ksh 220",
    imageCount: 3,
  },
  {
    id: "asE4X",
    name: "Cephas Too",
    available: true,
    description:
      "As an example, you could use the jQuery code above to restrict the user from entering more than 10 characters while he's typing; the following code snippet does exactly this As an example, you could use the jQuery code above to restrict the user from entering more than 10 characters while he's typing; the following code snippet does exactly this",
    price: "Ksh 220",
    imageCount: 8,
  },
];

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
    pushProducts(state, payload = []) {
      state.products.push(...payload);
    },
  },
  actions: {
    getProducts({ state }, payload) {
      const url = "https://google.com";
      if (payload === "next" && state.next) url["page"] = state.next;
      return new Promise((resolve, reject) => {
        axios
          .get(url)
          .then((data) => {
            setTimeout(() => {
              commit(types.COMMIT_PRODUCTS, data);
              return resolve(data);
            }, 1000);
          })
          .catch((error) => reject(error));
      });
    },
  },
};
