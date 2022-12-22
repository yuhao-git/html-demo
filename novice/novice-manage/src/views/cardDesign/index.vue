<template>
  <div>
    <draggable v-model="myArray"
               group="people"
               @start="drag=true"
               @end="drag=false"
               item-key="id">
      <template #item="{element}">
        <div class="w-2 ">{{element.name}}</div>
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
        { id: 3, name: "lili" },
      ],
    });
    return { ...toRefs(data) };
  },
});
</script>