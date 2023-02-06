// 自定义组件 自动注册
import app from './app'

const modules: Record<string, any> = import.meta.glob(["../components/**/*.vue",], {
  eager: true,
});


Object.keys(modules).forEach((key) => {
  let component = modules[key].default
  let name = key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.vue'));
  if (!name) {
    console.error('组件命名不合法！')
    return
  }
  app.component(name, component);
});

