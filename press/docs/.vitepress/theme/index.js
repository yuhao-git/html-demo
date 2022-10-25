import DefaultTheme from 'vitepress/theme'
import hello from '../../components/hello.vue'
import Layout from './Layout.vue'
import "element-plus/dist/index.css";


export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData, isServer }) {
    app.component('hello', hello)
    app.component('Layout', Layout)
    import("element-plus").then((module) => {
      app.use(module);
    });
  }
}