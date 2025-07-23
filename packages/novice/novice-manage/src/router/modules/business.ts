/*
 * @git config user.name: yuhao-git
 * @LastEditors: yuhao-git
 * @Description: 
 * Copyright (c) 2024 by ${git_name} , All Rights Reserved.
 */
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
      {
        path: "/animate/animejs",
        component: () => import("@/views/animate/animejs/index.vue"),
      },
      {
        path: "/animate/vueAnimate",
        component: () => import("@/views/animate/vueAnimate/page.vue"),
      },
      {
        path: "/component/transition",
        component: () => import("@/views/useComponent/views/transition.vue"),
      },
      {
        path: "/visiual",
        component: () => import("@/views/visiual/index.vue"),
      },
      {
        path: "/mark",
        component: () => import("@/views/mark/index.vue"),
      },
      {
        path: "/lineage",
        component: () => import("@/views/lineage/index.vue"),
      },
      {
        path: "/playGround/asyncComponent",
        component: () => import("@/views/playGround/asyncComponent/index.vue"),
      },
      {
        path: "/playGround/use",
        component: () => import("@/views/playGround/use/index.vue"),
      },
      {
        path: "/playGround/provide",
        component: () => import("@/views/playGround/provide/index.vue"),
      },
      {
        path: "/playGround/plugin",
        component: () => import("@/views/playGround/plugin/index.vue"),
      },
      {
        path: "/playGround/render",
        component: () => import("@/views/playGround/render/index.vue"),
      },
    ],
  },
];

/**
 * 自动加载文件生成路由
 * @param basePath 
 * @returns 
 */
export function generateRoutes(basePath: string = "@/views") {
  // 1. 使用 Vite 的 Glob 导入功能扫描所有 Vue 文件
  const modules = import.meta.glob('/src/views/**/*.vue');
  
  // 2. 转换模块映射为路由配置
  return Object.entries(modules).map(([filePath, component]) => {
    // 从文件路径提取路由路径
    const routePath = filePath
      .replace(/^\/src\/views/, '')  // 移除基础路径
      .replace(/\.vue$/, '')         // 移除文件扩展名
      .replace(/\/index$/, '')       // 移除index结尾
      .toLowerCase();                // 统一小写
    
    // 返回路由配置对象
    return {
      path: routePath || '/',  // 处理根路径情况
      component: component
    };
  });
}

export default routes;
