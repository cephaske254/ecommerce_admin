import axios from "axios";

export const apiGetProducts = (payload, next) => {
  let url = "/products/?page_size=20";
  if (payload === "next") url = next;
  return axios.get(url);
};

export const apiAddProduct = (
  data = { name: "", category: "", description: "", images: [] }
) => {
  return data;
};
