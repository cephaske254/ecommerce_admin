import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import DataListAbstract from "@/subcomponents/DataList.abstract.vue";
import mixins from "@/utils/mixins";

import store from "./store";
// AXIOS CONFIG
import axios from "axios";
axios.defaults.baseURL = "https://mockend.com/cephaske254/ecommerce_admin/";

createApp(App)
  .use(store)
  .mixin(mixins)
  .component("data-list", DataListAbstract)
  .use(router)
  .mount("#app");
