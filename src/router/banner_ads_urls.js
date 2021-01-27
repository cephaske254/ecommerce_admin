export default [
  {
    path: "banner_ads/",
    component: () => import("../views/banner_ads/Base"),
    children: [
      {
        path: "",
        name: "Banner Ads",
        component: () => import("../views/banner_ads/List"),
        children: [
          {
            path: "add/",
            name: "Add Banner Ad",
            component: () => import("../views/banner_ads/Add"),
          },
        ],
      },
      {
        path: "preview/",
        name: "Preview Banner Ads",
        component: () => import("../views/banner_ads/Preview"),
      },
    ],
  },
];
