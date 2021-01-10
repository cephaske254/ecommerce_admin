import axios from "axios";
import store from "../store/index";
import { COMMIT_PRODUCT_DETAIL } from "../store/types";

export const getCategorySuggestions = (value) => {
  // return axios.get(`/search/products/?q=${value}`);
  return axios.get(
    `https://api.kilimall.com/ke/v1/wordAutoComplete?term=${value}`
  );
};
export const apiGetProducts = (payload, next) => {
  let url = "/products/?page_size=20";
  if (payload === "next") url = next;
  return axios.get(url);
};

export const apiGetProduct = (slug) => {
  let url = `/products/${slug}/`;
  return axios.get(url);
};

export const apiDeleteProduct = (slug) => {
  let url = `/products/${slug}/`;
  return axios.delete(url);
};

export const apiAddProduct = (data) => {
  let url = "/products/";
  const images = data["images"].map((img) => {
    const output = { ...img };
    if (img.current && img.original) output["original"] = null;
    return output;
  });
  const watcher = data["watcher"];

  return axios.post(
    url,
    { ...data, images },
    {
      onUploadProgress: function(progressEvent) {
        let uploadPercentage = parseInt(
          Math.round((progressEvent.loaded / progressEvent.total) * 100)
        );
        if (watcher) watcher(uploadPercentage);
      }.bind(this),
    }
  );
};

export const apiUpdateProduct = (data) => {
  const watcher = data["watcher"];
  const slug = data["slug"];
  delete data["slug"];

  const recropped = data["recroppedImages"] || [];

  const images = data.images.filter(
    (img) =>
      (img.remote === true && recropped.includes(img.id)) ||
      img.remote === false
  );

  let url = `/products/${slug}/`;
  return axios
    .put(
      url,
      { ...data, images },
      {
        onUploadProgress: function(progressEvent) {
          let uploadPercentage = parseInt(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
          if (watcher) watcher(uploadPercentage);
        }.bind(this),
      }
    )
    .then((data) => {
      store.commit("products/" + COMMIT_PRODUCT_DETAIL, data.data);
      return data;
    });
};
