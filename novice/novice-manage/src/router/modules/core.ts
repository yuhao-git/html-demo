import login from "../../views/login/index.vue";
import layout from "../../layout/index.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: login },

];

export default routes;
