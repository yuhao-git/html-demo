## 插入变量

webpack

插入：vue.config.js 

```js
let { plugins } = config
plugins.push(new webpack.DefinePlugin({
  'SERVICE_URL': "'http://172.0....'",
}));
```

使用

```js
axios.defaults.baseURL = SERVICE_URL;
```

vite 中配置全局变量

```
// vite.config.ts
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite 配置
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  }
})
```

使用

```
//app.vue
console.log(__APP_ENV__)
```



vite默认不加载.env中的变量，vite使用.env中定义的环境变量（未验证）：

vite.config.js

```js
const dotenv = require（'dotenv'）; 
dotenv.config（）; 
module.exports = { 
  hostUrl：process.env.HOST_URL，
  secretKey：process.env.API_KEY，
  port：process.env.PORT 
}；
```

使用

```
const {port} = require（'./ config'）; 
console.log（`端口为：$ {port}`）; // 10086
```



