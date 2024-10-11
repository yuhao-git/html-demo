---
title: 全局计算属性
editLink: true
---

全局计算属性调用方式改了。。。

## useData 返回数据 [useData](https://vitepress.vuejs.org/guide/api)

```
interface VitePressData {
  site: Ref<SiteData>
  page: Ref<PageData>
  theme: Ref<any> // themeConfig from .vitepress/config.js
  frontmatter: Ref<PageData['frontmatter']>
  lang: Ref<string>
  title: Ref<string>
  description: Ref<string>
  localePath: Ref<string>
}
```

```
<script setup>
import { useData } from 'vitepress'
const  {site,page,theme,lang,localePath}  = useData()
import hello from '../components/hello.vue'
</script>

<pre>
{{localePath}}
</pre>
```

<script setup>
import { useData } from 'vitepress'
const  {site,page,theme,lang,localePath}  = useData()
import hello from '../components/hello.vue'
</script>

<pre>
{{page}}
</pre>
