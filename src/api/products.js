import axios from "axios";

export const apiGetProducts = (payload, next) => {
  let url = "/products/?page_size=20";
  if (payload === "next") url = next;
  return axios.get(url);
};

export const apiGetProduct = (id) => {
  let url = `/products/${id}/`;
  return axios.get(url);
};

export const apiAddProduct = (data) => {
  let url = "/products/";
  const images = data["images"].map((img) => img.current);
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
