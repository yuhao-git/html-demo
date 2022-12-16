import layout from "../../layout/index.vue";

const routes = [
  {
    path: "/",
    component: layout,
    children: [
      {
        path: "/card",
        component: () => import("@/views/cardDesign/index.vue"),
      },
      {
        path: "/dashboard",
        component: () => import("@/views/dashboard/index.vue"),
      },
    ],
  },
];

export default routes;
