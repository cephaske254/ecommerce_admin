import axios from "axios";

export const apiLogin = (email, password) => {
  return axios.post("/token/", { email, password });
};
