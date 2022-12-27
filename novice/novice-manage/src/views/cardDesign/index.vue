<template>
  <div>
    <draggable v-model="myArray"
               class="flex"
               group="people"
               @start="drag=true"
               @end="drag=false"
               item-key="id">
      <template #item="{element}">
        <div class="cursor-move shadow-md m-2 w-20 flex justify-center h-10 items-center bg-white dark:bg-gray-800">{{element.name}}</div>
      </template>
    </draggable>
  </div>
</template>
 
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import draggable from "vuedraggable";

export default defineComponent({
  components: { draggable },
  setup() {
    const data = reactive({
      drag: false,
      myArray: [
        { id: 1, name: "Jenny" },
        { id: 2, name: "kevin" },
        { id: 3, name: "lili1" },
        { id: 4, name: "lili2" },
        { id: 5, name: "lil3" },
        { id: 6, name: "lili4" },
      ],
    });
    return { ...toRefs(data) };
  },
});
</script>