import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
import FourOFour from "../views/handlers/404";
import Base from "../components/Base";
import authGuard from "./authGuard";

const routes = [
  {
    path: "",
    component: Base,
    children: [
      {
        path: "",
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
        name: "Add Product",
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
        children: [
          {
            name: "Delete Product",
            path: "#delete",
            component: () => import("../views/products/Delete"),
          },
        ],
      },
      {
        path: "/orders/",
        name: "Orders",
        component: () => import("../views/OrdersList"),
        children: [],
      },
      {
        path: "/categories/",
        name: "Categories",
        component: () => import("../views/categories/List"),
        children: [
          {
            path: "#add",
            name: "Add Category",
            component: () => import("../views/categories/Add"),
          },
          {
            path: "edit/:slug/",
            name: "Edit Category",
            component: () => import("../views/categories/Add"),
          },
        ],
      },
    ],
  },

  {
    path: "/login/",
    name: "Login",
    component: () => import("../views/handlers/Login"),
  },
  { path: "/404/", component: FourOFour },

  { path: "/:pathMatch(.*)*", component: FourOFour, replace: true },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(authGuard);

export default router;
