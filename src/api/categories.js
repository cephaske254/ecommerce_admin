import axios from "axios";

export const apiGetCategories = (payload, next) => {
  let url = "/categories/?page_size=20";
  if (payload === "next" || payload === "search") url = next;
  return axios.get(url);
};

export const apiGetCategory = (slug) => {
  let url = `/categories/${slug}/`;
  return axios.get(url);
};

export const apiUpdateCategory = (payload) => {
  const slug = payload["slug"];
  let url = `/categories/${slug}/`;

  return axios.put(url, payload);
};

export const apiAddCategory = (payload) => {
  let url = "/categories/";
  return axios.post(url, payload);
};
