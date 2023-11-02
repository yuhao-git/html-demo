import { getGUID } from "@/utils/index.ts";
import menuItem from "./menuItem.ts";

const menu = [
  {
    path: "/dashboard",
    icon: "home",
    label: "首页",
  },
  {
    path: "/card",
    icon: "alipay",
    label: "遍历树",
  },
  {
    path: "/lowcode",
    icon: "QQ",
    label: "低代码",
  },
  {
    path: "/threejs",
    icon: "sun",
    label: "三维模型",
  },
  {
    path: "/component",
    icon: "card",
    label: "组件",
    children: [
      {
        path: "/component/tab",
        icon: "card",
        label: "tabs",
      },
      {
        path: "/component/pop",
        icon: "card",
        label: "pop",
      },
      {
        path: "/component/count",
        icon: "card",
        label: "count",
      },
      {
        path: "/component/preview",
        icon: "card",
        label: "preview",
      },
      {
        path: "/component/ring",
        icon: "card",
        label: "ring",
      },
      {
        path: "/component/threeSwiper",
        icon: "card",
        label: "三维轮播",
      },
      {
        path: "/component/socketTest",
        icon: "card",
        label: "socketTest",
      },
    ]
  }
];

(function setGUID(nemu: Array<menuItem>) {
  function setKey(node: menuItem) {
    if (!node) return;
    node.key = getGUID();
    node?.children?.forEach((element: menuItem) => {
      setKey(element);
    });
  }
  menu.forEach((item: menuItem) => {
    setKey(item);
  });
})(menu);

export { menu };
