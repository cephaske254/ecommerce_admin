import axios from "axios";
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

export const apiGetProduct = (id) => {
  let url = `/products/${id}/`;
  return axios.get(url);
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

  // eslint-disable-next-line
  const images = data.images.filter(
    (img) =>
      (img.remote === true && recropped.includes(img.id)) ||
      img.remote === false
  );

  let url = `/products/${slug}/`;
  return axios.put(
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
