import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import DataListAbstract from "@/subcomponents/DataList.abstract.vue";
import mixins from "@/utils/mixins";

import Axios from "axios";
import store from './store'

window.axios = Axios;

createApp(App).use(store)
  .mixin(mixins)
  .component("data-list", DataListAbstract)
  .use(router)
  .mount("#app");
