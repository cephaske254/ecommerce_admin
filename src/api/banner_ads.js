import axios from "axios";

export const apiGetBannerAds = (payload, next) => {
  let url = "/banner_ads?page_size=20";
  if (payload === "next" && next) url = next;
  return axios.get(url);
};
