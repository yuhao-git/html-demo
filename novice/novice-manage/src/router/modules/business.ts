import layout from "../../layout/index.vue";

const routes = [
  {
    path: "/",
    component: layout,
    redirect: "/dashboard",
    children: [
      {
        path: "/card",
        component: () => import("@/views/cardDesign/index.vue"),
      },
      {
        path: "/dashboard",
        component: () => import("@/views/dashboard/index.vue"),
      },
      {
        path: "/lowcode",
        component: () => import("@/views/lowCode/edit/index.vue"),
      },
    ],
  },
];

export default routes;
