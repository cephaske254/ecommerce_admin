export default [
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
];
