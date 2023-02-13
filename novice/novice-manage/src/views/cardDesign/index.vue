<template>
  <div class="row">
    <div class="col-8">
      <!-- <h3>Nested draggable</h3> -->
      <nested-draggable :tasks="list"
                        class="top-container" />
      <nested-draggable :tasks="list1"
                        class="top-container" />
    </div>
    <el-button @click="before">前序</el-button>
    <el-button @click="after">后续</el-button>
  </div>
</template>

<script>
import nestedDraggable from "./part/nested.vue";
export default {
  name: "nested-example",
  display: "Nested",
  order: 15,
  components: {
    nestedDraggable,
  },
  data() {
    return {
      list: [
        {
          name: "task 1",
          tasks: [
            {
              name: "task 2",
              tasks: [],
            },
          ],
        },
        {
          name: "task 3",
          tasks: [
            {
              name: "task 4",
              tasks: [],
            },
          ],
        },
        {
          name: "task 5",
          tasks: [],
        },
      ],
      list1: [],
    };
  },
  methods: {
    before() {
      let length = 0;
      let arr = [];
      this.treeBefore(this.list, (data) => {
        length++;
        let { tasks, ...v } = data;
        arr.push(v);
      });
      console.log(arr);
    },
    after() {
      let arr = [];
      this.treeAfter(this.list, (data) => {
        let { tasks, ...v } = data;
        arr.push(v);
      });
      console.log(arr);
    },
    // 前序
    treeBefore(node, func) {
      if (!node) return;
      node?.forEach?.((item) => {
        this.treeBefore(item.tasks, func);
        func(item);
      });
    },
    // 后序
    treeAfter(node, func) {
      if (!node) return;
      node?.forEach?.((item) => {
        func(item);
        this.treeAfter(item.tasks, func);
      });
    },
  },
};
</script>
<style scoped>
.top-container {
  outline: 1px solid;
  padding: 20px 0;
}
</style>
