<script setup>
  import theme from './components/theme.vue'
</script>

<theme />


换肤实现 css 版本：

1.预设多个主题，设置data-theme切换

2.直接设置根元素上的css变量

```html
<div class="theme">
    theme
</div>
<el-button @click="changeTheme(true)">黑色</el-button>
<el-button @click="changeTheme(false)">白色</el-button>
```

```js
function changeTheme(black: boolean): void {
  // document.documentElement.style.setProperty("--text-color", "#0000ff");
  if (black) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}
```
```css
<style>
:root {
  --text-color: #333;
  --background: #E4E7ED;
}

[data-theme="dark"] {
  --background: #383838;
  --text-color: #F2F3F5;
}

.theme {
  color: var(--text-color);
  background: var(--background);
  color: var(--text-color);
  border: 1px dashed var(--text-color);
}

.theme {
  border-radius: 3px;
  padding: 20px 0;
  margin: 20px 0;
  text-align: center;
}
</style>
```