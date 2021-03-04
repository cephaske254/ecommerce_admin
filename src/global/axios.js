import axios from "axios";
import LocalStorageService from "./localStorageService";
import router from "../router";
import store from "../store";

// LocalstorageService
const localStorageService = LocalStorageService.getService();
const devUrl = "http://" + window.location.hostname + ":8000";
const baseURL =
  process.env.NODE_ENV === "production" ? process.env.VUE_APP_API_URL : devUrl;
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

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorageService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
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

    if (error.response && error.response.status === 404) {
      router.push("/404/");
      return Promise.reject(error);
    } else if (error.response && error.response.status === 500) {
      router.push("/500/");
      return Promise.reject(error);
    } else if (
      error.response &&
      error.response.status === 401 &&
      (originalRequest.url === "/token/refresh/" ||
        originalRequest.url === "/token/")
    ) {
      router.push({
        name: "Login",
        query: { next: router.currentRoute.value.path },
      });
      return Promise.reject(error);
    } else if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      store.getters.refreshValid
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorageService.getRefreshToken();
      return axios
        .post("/token/refresh/", {
          refresh: refreshToken,
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            localStorageService.setAccessToken(res.data);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + localStorageService.getAccessToken();
            return axios(originalRequest);
          }
        })
        .catch(() => {
          store.dispatch("logout");
          return Promise.reject(error);
        });
    } else if (error.response.status === 401) {
      store.dispatch("logout");
      router.push({ query: { next: router.currentRoute.value.path } });
    }
    return Promise.reject(error);
  }
);

// GLOBAL AXIOS CONFIG

axios.defaults.baseURL = baseURL;
