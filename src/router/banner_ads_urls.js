export default [
  {
    path: "banner_ads/",
    component: () => import("../views/banner_ads/Base"),
    children: [
      {
        path: "",
        name: "Banner Ads",
        component: () => import("../views/banner_ads/List"),
      },
      {
        path: ":slug/",
        name: "Banner Ad Detail",
        component: () => import("../views/banner_ads/Detail"),
      },
      {
        path: "preview/",
        name: "Preview Banner Ads",
        component: () => import("../views/banner_ads/Preview"),
      },
    ],
  },
];
