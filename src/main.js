import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import DataListAbstract from "@/subcomponents/DataList.abstract.vue";
import DataGridAbstract from "@/subcomponents/DataGrid.abstract.vue";
import mixins from "@/utils/mixins";

import Axios from "axios";

window.axios = Axios;

createApp(App)
  .mixin(mixins)
  .component("data-list", DataListAbstract)
  .component("data-grid", DataGridAbstract)
  .use(router)
  .mount("#app");
