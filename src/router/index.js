import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/products",
    name: "Products",
    component: () => import("../views/ProductList"),
    children: [],
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/OrdersList"),
    children: [],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
