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
        path: "/component/tab",
        component: () => import("@/views/useComponent/views/tab.vue"),
      },
      {
        path: "/component/pop",
        component: () => import("@/views/useComponent/views/pop.vue"),
      },
      {
        path: "/component/count",
        component: () => import("@/views/useComponent/views/count.vue"),
      },
      {
        path: "/component/preview",
        component: () => import("@/views/useComponent/views/preview.vue"),
      },
      {
        path: "/component/ring",
        component: () => import("@/views/useComponent/views/ring.vue"),
      },
      {
        path: "/component/threeSwiper",
        component: () => import("@/views/useComponent/views/threeSwiper.vue"),
      },
      {
        path: "/component/socketTest",
        component: () => import("@/views/useComponent/views/socketTest.vue"),
      },

    ],
  },
];

export default routes;
