import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mixins from "@/utils/mixins";

import Loadingsm from "@/subcomponents/Loadingsm.vue";
import Loading from "@/subcomponents/Loading.vue";

import store from "./store";
// AXIOS CONFIG
import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.interceptors.response.use(null, (error) => {
  let path = "/error/";
  switch (error.response.status) {
    case 401:
      path = "/login/";
      break;
    case 404:
      path = "/404/";
      break;
  }
  router.replace(path);
  return Promise.reject(error);
});

//

const app = createApp(App)
  .use(store)
  .mixin(mixins)
  .component("loadingsm", Loadingsm)
  .component("loading", Loading)
  .use(router);

app.config.devtools = true;
app.mount("#app");
