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
    path: "/animate/animejs",
    icon: "sun",
    label: "动画",
  },
  {
    path: "/component",
    icon: "card",
    label: "组件",
    children: [
      {
        path: "/component/tab",
        icon: "card",
        label: "标签页",
      },
      {
        path: "/component/pop",
        icon: "card",
        label: "监听",
      },
      {
        path: "/component/count",
        icon: "card",
        label: "计数hooks",
      },
      {
        path: "/component/preview",
        icon: "card",
        label: "表格",
      },
      {
        path: "/component/ring",
        icon: "card",
        label: "旋转",
      },
      {
        path: "/component/threeSwiper",
        icon: "card",
        label: "三维轮播",
      },
      {
        path: "/component/socketTest",
        icon: "card",
        label: "即时通讯",
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
