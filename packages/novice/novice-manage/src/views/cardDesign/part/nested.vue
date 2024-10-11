<template>
  <draggable class="drag-area"
             tag="ul"
             :list="tasks"
             :group="'g1'"
             v-bind="dragOptions"
             item-key="name">
    <template #item="{ element }">
      <li class="li">
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
        animation: 300,
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
  min-height: 20px;
  display: flex;
  outline: 1px dashed;
  flex: none;
}
.li {
  margin: 10px;
  outline: 1px solid;
  height: fit-content;
}
</style>