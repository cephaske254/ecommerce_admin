import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import DataListAbstract from "@/subcomponents/DataList.abstract.vue";
import mixins from "@/utils/mixins";

import Loadingsm from "@/subcomponents/Loadingsm.vue";

import store from "./store";
// AXIOS CONFIG
import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

const app = createApp(App)
  .use(store)
  .mixin(mixins)
  .component("data-list", DataListAbstract)
  .component("loadingsm", Loadingsm)
  .use(router);

app.mount("#app");
