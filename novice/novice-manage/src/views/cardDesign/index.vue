<template>
  <div class="row">
    <div class="col-8">
      <!-- <h3>Nested draggable</h3> -->
      <nested-draggable :tasks="list"
                        class="top-container" />
      <nested-draggable :tasks="list1"
                        class="top-container" />
    </div>
    <section class="flex content-start">
      <div class="w-1/2">
        前序遍历
        <JsonView :dataSource="PreOrderTraversal"></JsonView>
      </div>
      <div class="w-1/2">
        后续遍历
        <JsonView :dataSource="PostOrderTraversal"></JsonView>
      </div>
    </section>
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
      PreOrderTraversal: [],
      PostOrderTraversal: [],
    };
  },
  methods: {
    before() {
      this.PreOrderTraversal = [];
      this.treeBefore(this.list, (data) => {
        let { tasks, ...v } = data;
        this.PreOrderTraversal.push(v);
      });
    },
    after() {
      this.PostOrderTraversal = [];
      this.treeAfter(this.list, (data) => {
        let { tasks, ...v } = data;
        this.PostOrderTraversal.push(v);
      });
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
  watch: {
    list: {
      handler() {
        this.before();
        this.after();
      },
      deep: true,
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
