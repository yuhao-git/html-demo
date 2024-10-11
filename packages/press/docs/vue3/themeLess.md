less实现换肤(未实现)

> modifyVars方法是是基于 less 在浏览器中的编译来实现。
> 所以在引入less文件的时候需要通过link方式引入，然后基于less.js中的方法来进行修改变量


```html
<link rel="stylesheet/less" type="text/css" href="./src/less/public.less" />
```

```js
less.modifyVars({
  '@themeColor': 'blue'
});

// color 传入颜色值
handleColorChange (color) {
    less.modifyVars({  // 调用 `less.modifyVars` 方法来改变变量值'
         @themeColor: color
         })
    .then(() => {
         console.log('修改成功');
    });
};
```


webpack/vite中配置
```js
{
      test: /.less$/,
      loader: 'less-loader',
      options: {
             javascriptEnabled: true
       }
},
```

##### less的 modifyVars方法

modifyVars方法是是基于 less 在浏览器中的编译来实现。所以在引入less文件的时候需要通过link方式引入，然后基于less.js中的方法来进行修改变量

script引入less.min.js `<script type="text/javascript" src="/static/less.min.js" />` link方式引入主题色文件 `<link rel="stylesheet/less" type="text/css" href="/static/public.less" />` 更改主题色事件

```javascript
// color 传入颜色值
handleColorChange (color) {
    less.modifyVars({
        '@primaryColor':color
    })
    .then(() => {
         console.log('修改成功');
    });
};
```

如果工程型的项目，在webpack配置里开启：

```yaml
{
      test: /\.less$/,
      loader: 'less-loader',
      options: {
          javascriptEnabled: true
      }
},
```

**如果是vueCli3.0/vueCli4.0,给大家一份完整的配置过程**

1. 首先在vue.config.js配置；

```scss
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 按需配置，可配置多个
          'primary-color': 'red',
        },
        javascriptEnabled: true,
      }
    }
  },
```

1. 在public/static/下创建color.less, 这个文件书写所有涉及到需要改变的class及样式；

```css
@primaryColor: red;
.page {
  backgroud: @primaryColor;
  color: @primaryColor;
}
```

1. 在public/static/下创建less.min.js；
2. src/XXXX位置 创建setting.js；

```js
let lessNodesAppended;

const updateTheme = primaryColor => {
  if (!primaryColor) {
    return;
  }
  console.info(`正在编译主题!`)
  function buildIt() {
    // 正确的判定less是否已经加载less.modifyVars可用
    if (!window.less || !window.less.modifyVars) {
      return;
    }
    // less.modifyVars可用
    window.less.modifyVars({
        '@primary-color': primaryColor,
      })
      .then(() => {
        console.log(`成功`);
      })
      .catch(() => {
        console.error(`失败`);
      });
  }
  
};
```
```js
// 加载 less.js 和 color.less 静态资源
function loadLink() {
  if (!lessNodesAppended) {
    // insert less.js and color.less
    const lessStyleNode = document.createElement('link');
    const lessConfigNode = document.createElement('script');
    const lessScriptNode = document.createElement('script');
    lessStyleNode.setAttribute('rel', 'stylesheet/less');
    // 下方这个color.less位置大家也可以按需修改
    lessStyleNode.setAttribute('href', __webpack_public_path__ + 'static/color.less')
    lessConfigNode.innerHTML = `
        window.less = {
          async: true,
          env: 'production',
          javascriptEnabled: true
        };
      `;
    // less的src地址也可以是cdn地址
    lessScriptNode.src = '/static/less.min.js';
    lessScriptNode.async = true;
    lessScriptNode.onload = () => {
      lessScriptNode.onload = null;
    };
    document.body.appendChild(lessStyleNode);
    document.body.appendChild(lessConfigNode);
    document.body.appendChild(lessScriptNode);
    lessNodesAppended = true;
  }
}

```

