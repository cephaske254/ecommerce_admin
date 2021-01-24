import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mixins from "@/utils/mixins";

import Loadingsm from "@/subcomponents/Loadingsm.vue";
import Loading from "@/subcomponents/Loading.vue";
import formErrors from "./subcomponents/formErrors";
import store from "./store";
import "./global/axios";


const app = createApp(App)
  .use(router)
  .use(store)
  .mixin(mixins)
  .component("loadingsm", Loadingsm)
  .component("form-errors", formErrors)
  .component("loading", Loading);

app.config.devtools = true;
app.mount("#app");
