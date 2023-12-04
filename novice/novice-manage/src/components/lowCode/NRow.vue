<template>
  <el-row :gutter="10">
    <el-col :span="12"
            v-for="(item,index) in dataSource"
            :key="index"
            class="border border-dashed rounded my-2">
      <draggable v-model="item.children"
                 group="component"
                 class="container"
                 animation="300"
                 item-key="id">
        <template #item="{ element }">
          <div>
            <div>{{ element.option.text }}</div>
            <component :is="element.name" :dataSource="element" />
          </div>
        </template>
      </draggable>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import draggable from "vuedraggable";
import { ref } from "vue";
const dataSource = ref([
  { id: "01", children: [] },
  { id: "02", children: [] },
]);
</script>