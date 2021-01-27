import { apiGetBannerAds } from "../../api/banner_ads";
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
    [types.RESET_BANNER_ADS_STATE](state) {
      state.data = [];
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
  },
};
