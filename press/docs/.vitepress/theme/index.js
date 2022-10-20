import DefaultTheme from 'vitepress/theme'
import hello from '../../components/hello.vue'
import Layout from './Layout.vue'


export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('hello', hello)
    app.component('Layout', Layout)
  }
}