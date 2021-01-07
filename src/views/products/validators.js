import { cleanPrice } from "./helpers";

export default function(
  data = {
    name: null,
    category: null,
    price: 0,
    discount_price: null,
    description: null,
    images: [],
  },
  config = { discount: false }
) {
  const required = "This field is required!";
  const errors = {};

  if (!data["name"]) errors["name"] = [required];
  if (!data["price"]) errors["price"] = [required];
  if (!data["category"]) errors["category"] = [required];
  if (!data["description"]) errors["description"] = [required];

  let price = null;
  let discount_price = null;

  if (config.discount === true) {
    if (!data["discount_price"]) errors["discount_price"] = [required];

    try {
      price = parseFloat(cleanPrice(data["price"]));
    } catch {
      price = "ERROR";
    }
    try {
      discount_price = parseFloat(cleanPrice(data["discount_price"]));
    } catch {
      discount_price = "ERROR";
    }

    const price_format_err = "Enter a valid price";

    if (discount_price === "ERROR" && price === "ERROR") {
      errors["discount_price"] = errors["price"] = [price_format_err];
    } else if (price === "ERROR") {
      errors["price"] = [price_format_err];
    } else if (discount_price === "ERROR") {
      errors["discount_price"] = [price_format_err];
    }

    if (discount_price > price)
      errors["discount_price"] = ["Discount price cannot exceed the old price"];
    if (discount_price === price)
      errors["discount_price"] = [
        "Discount price cannot be equalto the old price",
      ];
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
