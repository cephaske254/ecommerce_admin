import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
import FourOFour from "../views/handlers/404";
import FiveHundred from "../views/handlers/500";
// import Base from "../components/Base";
import authGuard from "./authGuard";

import order_urls from "./order_urls";
import banner_ads_urls from "./banner_ads_urls";
import categories_urls from "./categories_urls";
import product_urls from "./product_urls";
import Base from "../subcomponents/Base";

const routes = [
  {
    path: "/",
    component: Base,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: Home,
        exact: true,
      },

      ...order_urls,
      ...banner_ads_urls,
      ...categories_urls,
      ...product_urls,
    ],
  },
  {
    path: "/login/",
    name: "Login",
    component: () => import("../views/handlers/Login"),
    children: [
      {
        path: "test-credentials/",
        name: "Test Credentials",
        component: () => import("../views/handlers/TestCredentials"),
      },
    ],
  },
  { path: "/404/", component: FourOFour },
  { path: "/500/", component: FiveHundred },

  { path: "/:pathMatch(.*)*", component: FourOFour, replace: true },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(authGuard);

export default router;
