import {
  apiGetBannerAd,
  apiGetBannerAds,
  apiAddBannerAd,
  apiUpdateBannerAd,
  apiDeleteBannerAd,
} from "../../api/banner_ads";
import * as types from "../types";

const defaultState = {
  data: [],
  next: null,
  count: null,
};

export default {
  state: defaultState,
  getters: {
    getBannerAds(state) {
      return state.data;
    },
    getTotalCount(state) {
      return state.data.length;
    },
    getNext(state) {
      return state.next;
    },
  },
  mutations: {
    [types.COMMIT_BANNER_ADS](state, payload) {
      state.data = [...state.data, ...payload.data];
      state.next = payload.next;
      state.count = payload.count;
    },
    [types.COMMIT_BANNER_AD](state, payload) {
      const data = [...state.data];

      const banner = data.find((i) => i.product.slug === payload.product.slug);

      if (banner) data[data.indexOf(banner)] = { ...banner, ...payload };

      state.data = data;
    },
    [types.RESET_BANNER_ADS_STATE](state) {
      state.data = [];
    },
    [types.DELETE_BANNER_AD](state, payload) {
      state.data = state.data.filter((i) => i.slug !== payload);
    },
  },
  actions: {
    [types.GET_BANNER_ADS]({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        apiGetBannerAds(payload, state.next)
          .then((data) => {
            if (payload === "refresh") commit(types.RESET_BANNER_ADS_STATE);
            commit(types.COMMIT_BANNER_ADS, data.data);
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    [types.GET_BANNER_AD]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        apiGetBannerAd(payload)
          .then((data) => {
            commit(types.COMMIT_BANNER_AD, data.data);
            resolve(data);
          })
          .catch((error) => reject(error));
      });
    },
    [types.ADD_BANNER_AD]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        apiAddBannerAd(payload)
          .then((data) => {
            commit(types.COMMIT_BANNER_AD, data.data);
            resolve(data);
          })
          .catch((error) => reject(error));
      });
    },
    [types.UPDATE_BANNER_AD]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        apiUpdateBannerAd(payload)
          .then((data) => {
            commit(types.COMMIT_BANNER_AD, data.data);
            resolve();
          })
          .catch((error) => reject(error));
      });
    },
    [types.DELETE_BANNER_AD]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        apiDeleteBannerAd(payload)
          .then((data) => {
            resolve(data);
            commit(types.DELETE_BANNER_AD, payload);
          })
          .catch((error) => reject(error));
      });
    },
  },
};
