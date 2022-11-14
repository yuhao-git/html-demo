import { getGUID } from "@/utils/index.ts"

export const menu = [{
  path: "/dashboard",
  icon: "home",
  label: "首页",
  key: getGUID()
},
{
  path: "/card",
  icon: "card",
  label: "卡片设计",
  key: getGUID()
},
]