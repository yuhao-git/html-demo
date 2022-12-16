import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "@/utils/progress";
// 自动引入 ./modules下的路由
const routes: any[] = [];

const modules: Record<string, any> = import.meta.glob(["./modules/**/*.ts"], {
  eager: true,
});

Object.keys(modules).forEach((key) => {
  routes.push(...modules[key].default);
});

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
