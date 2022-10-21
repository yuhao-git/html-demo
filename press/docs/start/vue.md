---
title: markdown中使用vue
editLink: true
---

[[toc]]

## 模板语法

```html
{{1 + 1}}
```

{{1 + 1}}

```html
<span v-for="i in 3">{{ i }} </span>
```

<span v-for="i in 3">{{ i }} </span>

::: v-pre
`{{ This will be displayed as-is }}`
:::

```
<script setup>
import { useData } from 'vitepress'

const { page } = useData()
</script>

<pre>{{ page }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const  {site,page,theme,lang}  = useData()

import hello from '../components/hello.vue'

</script>
<pre>
{{page}}
</pre>

## 引入自定义组件

<hello />

```
<script setup>
import hello from '../components/hello.vue'
</script>

<hello />
```

## 布局组件

第一次添加.vitepress/theme/index.js文件后需要重启。。。

```
<!-- .vitepress/theme/Layout.vue -->
<template>
  <h1>Custom Layout!</h1>
  <Content /><!-- make sure to include markdown outlet -->
</template>
```

```
// .vitepress/theme/index.js
import Layout from './Layout.vue'

export default {
  Layout,
  NotFound: () => 'custom 404', // <- this is a Vue 3 functional component
  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
  }
}
```

```
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme
}
```



<Layout />

## YAML frontmatter

{{ $frontmatter.title }}

```
{{ $frontmatter.title }}
```


```
# .scss and .sass
npm install -D sass

# .less
npm install -D less

# .styl and .stylus
npm install -D stylus
```