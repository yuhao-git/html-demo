// 全局自动注册组件
const context = require.context('@/components', true, /\.vue$/)
context.keys().forEach(key => {
  const component = context(key).default
  if (!component.name) {
    console.error("component without name attribute!")
  }
  else {
    Vue.component(component.name, component)
  }
})
