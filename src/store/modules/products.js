import { apiGetProducts, apiAddProduct, apiGetProduct } from "@/api/products";
import { apiUpdateProduct } from "../../api/products";
import * as types from "../types";

const defaultState = {
  data: [],
  next: null,
  previous: null,
  count: null,
  productDetail: {},
};

export default {
  namespaced: true,
  state: defaultState,
  getters: {
    getProducts(state) {
      return state.data;
    },
    getProductDetail(state) {
      console.log("CALLED");
      return state.productDetail;
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
    [types.COMMIT_PRODUCT](state, payload) {
      const product = {
        ...payload,
        image: payload["images"].length ? payload["images"][0].image : null,
      };
      state.data = [product, ...state.data];
    },
    [types.COMMIT_PRODUCT_DETAIL](state, payload) {
      state.productDetail = { ...payload };
    },
  },
  actions: {
    [types.GET_PRODUCTS]({ commit, state }, payload) {
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
    [types.ADD_PRODUCT]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        apiAddProduct(payload)
          .then((response) => {
            const data = response.data;
            commit(types.COMMIT_PRODUCT, data);
            resolve(data);
          })
          .catch((error) => reject(error));
      });
    },
    [types.GET_PRODUCT_DETAIL]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        apiGetProduct(payload)
          .then((data) => {
            commit(types.COMMIT_PRODUCT_DETAIL, data.data);
            resolve(data);
          })
          .catch((error) => reject(error));
      });
    },
    [types.UPDATE_PRODUCT]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        apiUpdateProduct(payload)
          .then((data) => {
            commit(types.COMMIT_PRODUCT_DETAIL, data.data);
            resolve(data);
            return data;
          })
          .catch((error) => reject(error));
      });
    },
  },
};
