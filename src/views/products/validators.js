import { cleanPrice } from "./helpers";

export default function(
  data = {
    name: null,
    categories: null,
    price: 0,
    discount_price: null,
    description: null,
    images: [],
  },
  config = { discount: false }
) {
  const required = "This field is required!";
  const price_format_err = "Enter a valid price";
  const errors = {};

  if (!data["name"]) errors["name"] = [required];
  if (!data["market_price"]) errors["market_price"] = [required];
  if (!data["categories"] || !data["categories"].length)
    errors["categories"] = ["Please add atleast one category"];
  if (!data["description"]) errors["description"] = [required];

  let market_price = null;
  let discount_price = null;

  if (config.discount === true) {
    if (!data["discount_price"]) errors["discount_price"] = [required];

    try {
      market_price = parseFloat(cleanPrice(data["market_price"]));
    } catch {
      market_price = "ERROR";
    }
    try {
      discount_price = parseFloat(cleanPrice(data["discount_price"]));
    } catch {
      discount_price = "ERROR";
    }

    if (discount_price === "ERROR" && market_price === "ERROR") {
      errors["discount_price"] = errors["price"] = [price_format_err];
    } else if (market_price === "ERROR" || market_price < 1) {
      errors["market_price"] = [price_format_err];
    } else if (discount_price === "ERROR" || discount_price < 1) {
      errors["discount_price"] = [price_format_err];
    } else {
      if (discount_price > market_price)
        errors["discount_price"] = [
          "Discount price cannot exceed the market price",
        ];
      if (discount_price === market_price)
        errors["discount_price"] = [
          "Discount price cannot be equalto the market price",
        ];
    }
  }

  if (!data["images"] || !data["images"].length)
    errors["images"] = ["Please add atleast one image"];

  errors["valid"] = true;
  Object.entries(errors).forEach((error) => {
    if (error[1].length) {
      errors["valid"] = false;
    }
  });
  return errors;
}

export function ValidateEmail(mail) {
  if (!mail) return;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
    return true;
  }
  return "You have entered an invalid email address!";
}
