/* eslint-disable */
import axios from "axios";
// export const beforeRouteLeave = (to, from, next) => {};

export const beforeMount = () => {
  if (!this.submitted) {
    window.addEventListener("beforeunload", function(event) {
      event.preventDefault();
      event.returnValue = "";
    });
  }
};

export const productInterface = {
  product: {
    name: null,
    category: null,
    brand: null,
    price: null,
    discount_price: null,
    description: "",
    available: "",
    images: [],
  },
};

export const cleanPrice = (val) => {
  if (!val) return "";
  const text = val.toString();
  return text.replace(/[^0-9.+]/gi, "");
};
export const fields = [
  "name",
  "category",
  "brand",
  "price",
  "discount_price",
  "description",
  "available",
  "images",
];

function toDataUrl(image, callback) {
  axios.get(image.image, { responseType: "blob" }).then((response) => {
    var reader = new FileReader();
    const name = new URL(image.image).pathname.replace(/C:\\fakepath\\/gi, "");

    reader.readAsDataURL(response.data);
    reader.onloadend = async () => {
      delete image["image"];
      callback({ ...image, name, original: reader.result, current: null });
    };
    console.log("DONE");
  });
}

export function buildImages(images, callback) {
  if (!images.length) return;
  images.forEach((image) => {
    toDataUrl(image, callback);
  });
}
