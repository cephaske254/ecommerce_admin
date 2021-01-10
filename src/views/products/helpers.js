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
    categories: null,
    brand: null,
    price: null,
    discount_price: null,
    description: "",
    available: "",
    images: [],
  },
};

export const cleanPrice = (val) => {
  if (!val) return null;
  const text = val.toString();
  return text.replace(/[^0-9.+]/gi, "");
};
export const fields = [
  "name",
  "categories",
  "brand",
  "price",
  "discount_price",
  "description",
  "available",
  "images",
];

function toDataUrl(image, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    const reader = new FileReader();
    const name =
      "_" + new URL(image.image).pathname.replace(/\/media\/products\//gi, "");
    reader.readAsDataURL(xhr.response);
    reader.onloadend = async () => {
      delete image["image"];
      callback({
        ...image,
        name,
        original: reader.result,
        current: null,
        remote: true,
      });
    };
  };

  xhr.responseType = "blob";
  xhr.open("GET", image.image);
  xhr.send();
}

export function buildImages(images, callback) {
  if (!images.length) return;
  images.forEach((image) => {
    toDataUrl(image, callback);
  });
}

export function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function(permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        new Notification("Hi there!");
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}
