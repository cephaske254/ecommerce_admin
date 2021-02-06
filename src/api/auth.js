import axios from "axios";

export const apiLogin = (email, password) => {
  return axios.post("/token/", { email, password });
};

export const apiReset = (email) => {
  return axios.post("/password_reset/", email);
};

