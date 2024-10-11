安装依赖 

```JS
yarn add babel-register babel-preset-env --save-dev
```

www

```JS
require('babel-register')({  presets: ['env'] });
```

package.json

```json
"type": "module",
```



1. 将文件后缀改为`.mjs`，node.js加载的时候自动会用`ESM`规范
2. 在项目中`package.json`新增配置项`"type":"module"`，那么整个项目中的.js文件都会按照`ESM`规范去执行
3. 增加执行参数`--input-type`也可以实现相同效果



如今的前端两种规范：

1. commonJS 由 node 提出
2. ESM（ECMAScript Module）由 ECMAScript 组织提出



```js
// 由于参数不同， 这个会让`foo.mjs`被加载两次，而不会利用缓存中的`foo.mjs` 
import './foo.mjs?query=1'; // loads ./foo.mjs with query of "?query=1"
import './foo.mjs?query=2'; // loads ./foo.mjs with query of "?query=2"


import 'data:text/javascript,console.log("hello!");'; // text/javascript 会将后面的内容当成js模块
import { test } from 'data:text/javascript,function test(){console.log("test")};export {test};'; // 这里我们是不是扩宽思路，直接加载在线js呢？

import _ from 'data:application/json,"world!"' assert { type: 'json' }; // application/json 则是json


import { default as cjs } from 'cjs'; // module.exports 导出
import cjsSugar from 'cjs'; // module.exports
import * as m from 'cjs';

const { default: barData } =
  await import('./bar.json', { assert: { type: 'json' } });


```





