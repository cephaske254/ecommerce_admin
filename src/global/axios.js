import axios from "axios";
import LocalStorageService from "./localStorageService";
import router from "../router";
import store from "../store";

// LocalstorageService
const localStorageService = LocalStorageService.getService();
const devUrl = "http://" + window.location.hostname + ":8000";

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorageService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function(error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url === `/token/`) {
      router.push("/login");
      return Promise.reject(error);
    }

    const refreshToken = localStorageService.getRefreshToken();

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      if (!refreshToken) {
        store.dispatch("logout");
        return Promise.reject(error);
      }
      originalRequest._retry = true;
      return axios
        .post("/token/refresh/", {
          refresh: refreshToken,
        })
        .then((res) => {
          if (res.status > 100 && res.status < 400) {
            localStorageService.setAccessToken(res.data["access"]);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + res.data["access"];
            return axios(originalRequest);
          }
        })
        .catch(() => {
          store.dispatch("logout");
          return error;
        });
    }
    return Promise.reject(error);
  }
);

// GLOBAL AXIOS CONFIG

axios.defaults.baseURL =
  process.env.NODE_ENV === "production" ? process.env.VUE_APP_API_URL : devUrl;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response);
    }
    return Promise.reject(error.message);
  }
);
