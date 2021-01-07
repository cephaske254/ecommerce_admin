import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
import FourOFour from "../views/handlers/404";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Home,
    exact: true,
  },

  {
    name: "Products",
    path: "/products/",
    component: () => import("../views/products/List"),
    exact: true,
  },
  {
    name: "Add Products",
    path: "/products/add/",
    component: () => import("../views/products/Add"),
    exact: true,
  },
  {
    name: "Product Detail",
    path: "/products/:slug/",
    component: () => import("../views/products/Detail"),
  },
  {
    name: "Edit Product",
    path: "/products/:slug/edit/",
    component: () => import("../views/products/Add"),
    exact: true,
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/OrdersList"),
    children: [],
  },

  { path: "/404/", component: FourOFour },

  { path: "/:pathMatch(.*)*", component: FourOFour, replace: true },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
