export default [
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
];
