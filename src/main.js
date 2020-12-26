import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import DataListAbstract from "@/subcomponents/DataList.abstract.vue";
import mixins from "@/utils/mixins";

createApp(App)
  .mixin(mixins)
  .component("data-list-abstract", DataListAbstract)
  .use(router)
  .mount("#app");
