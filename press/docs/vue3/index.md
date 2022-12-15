## 对比学习

父子传值三种方式：

- 方式1

```js
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    name: {
      type: String,
    },
  },
  setup(props) {
    console.log(props.name);
  },
});
```

- 方式2

```js
export default {
  setup(props) {
      console.log(props)
  },
  mounted() {},
};
```

- 方式3

```js
interface Props {
  name?: string;
}
const props = withDefaults(defineProps<Props>(), { name: "" });

console.log(props);
```

