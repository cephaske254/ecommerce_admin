export default [
  {
    path: "/orders/",
    name: "Orders",
    component: () => import("../views/OrdersList"),
    children: [],
  },
];
