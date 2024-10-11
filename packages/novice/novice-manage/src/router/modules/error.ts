import layout from "../../layout/index.vue";

const routes = [
  {
    path: "/",
    component: layout,
    children: [
      {
        path: "/404",
        component: () => import("../../views/error/404.vue"),
      },
    ],
  },
  { path: "/:pathMatch(.*)", redirect: "/404" },
];

export default routes;
