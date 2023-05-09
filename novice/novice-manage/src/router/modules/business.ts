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
      {
        path: "/threejs",
        component: () => import("@/views/threejs/index.vue"),
      },
      {
        path: "/component",
        component: () => import("@/views/useComponent/index.vue"),
      },
    ],
  },
];

export default routes;
