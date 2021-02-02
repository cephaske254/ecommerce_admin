import axios from "axios";

export const apiGetBannerAds = (payload, next) => {
  let url = "/banners/?page_size=20";
  if (payload === "next" && next) url = next;
  return axios.get(url);
};

export const apiAddBannerAds = (payload) => {
  let url = "/banners/";
  return axios.post(url, payload);
};

export const apiGetBannerAd = (payload) => {
  let url = `/banners/${payload}/`;
  return axios.get(url);
};
