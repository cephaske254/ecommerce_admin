import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
import PassThrough from "../components/PassThrough";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Home,
    exact: true,
  },
  {
    path: "/products",
    component: PassThrough,
    children: [
      {
        name: "Products",
        path: "",
        component: () => import("../views/products/List"),
      },
      {
        name: "Add Products",
        path: "add",
        component: () => import("../views/products/Add"),
      },
    ],
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
