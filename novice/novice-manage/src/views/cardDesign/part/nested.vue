<template>
  <draggable class="drag-area "
             tag="ul"
             :list="tasks"
             :group="'g1'"
             v-bind="dragOptions"
             item-key="name">
    <template #item="{ element }">
      <li>
        <p>{{ element.name }}</p>
        <nested-draggable :tasks="element.tasks" />
      </li>
    </template>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
export default {
  props: {
    tasks: {
      required: true,
      type: Array,
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  components: {
    draggable,
  },
  name: "nested-draggable",
};
</script>
<style scoped>
.drag-area {
  min-height: 50px;
  outline: 1px dashed;
  display: flex;
}
li {
  margin-left: 10px;
}

</style>