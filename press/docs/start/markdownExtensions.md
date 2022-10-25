# vitepress markdown扩展


[[toc]]


## 目录

```
[Home](/) <!-- 跳转到根目录的index.md -->
[foo](/foo/) <!-- 跳转到 foo 文件夹的 index.html-->
[foo heading](./#heading) <!-- 跳转到 foo/index.html 的特定标题位置 -->
[bar - three](../bar/three) <!-- 你可以忽略扩展名 -->
[bar - three](../bar/three.md) <!-- 具体文件可以使用 .md 结尾（推荐）-->
[bar - four](../bar/four.html) <!-- 也可以用 .html-->
```


## 表情符号 
:tada: :100: :train: :house: :wolf:

所有支持的[表情](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)


## 图片实例

![图片](../images/image.png)


### 基本
```
![img](./image.png)
```
### 使用变量
```
![图片][img]

[img]: ./image.png
```

## 表格

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |


## 自定义容器
```
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::
```
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::


## 语法高亮

```
```js
export default {
  name: 'MyComponent',
  // ...
}
```
```js
export default {
  name: 'MyComponent',
  // ...
}
```

## 指定行高亮

```js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```

````
```js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```
````


参考项目： vitepress-docs-master  XXY5VP-main

