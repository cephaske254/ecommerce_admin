import axios from "axios";

export const apiGetBannerAds = (payload, next) => {
  let url = "/banners/?page_size=10000";
  if (payload === "next" && next) url = next;
  return axios.get(url);
};

export const apiAddBannerAd = (payload) => {
  let url = "/banners/";
  return axios.post(url, payload);
};

export const apiUpdateBannerAd = (payload) => {
  let url = `/banners/${payload.product.slug}/`;
  return axios.patch(url, payload);
};

export const apiGetBannerAd = (payload) => {
  let url = `/banners/${payload}/`;
  return axios.get(url);
};
