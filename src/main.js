import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mixins from "@/utils/mixins";

import Loadingsm from "@/subcomponents/Loadingsm.vue";
import Loading from "@/subcomponents/Loading.vue";

import store from "./store";
import axios from "axios";

// AXIOS CONFIG
const devUrl = "http://" + window.location.hostname + ":8000";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production" ? process.env.API_URL : devUrl;

axios.interceptors.response.use(null, (error) => {
  if (!error || !error.response) return Promise.reject(error);
  let path = "";
  switch (error.response.status) {
    case 401:
      path = "/login/";
      break;
    case 404:
      path = "/404/";
      break;
  }
  if (path) {
    router.push(path);
    return Promise.reject(error);
  }
  return Promise.resolve()
});

//

const app = createApp(App)
  .use(router)
  .use(store)
  .mixin(mixins)
  .component("loadingsm", Loadingsm)
  .component("loading", Loading);

app.config.devtools = true;
app.mount("#app");
