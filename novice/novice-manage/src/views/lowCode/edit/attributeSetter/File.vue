<template>
  <el-scrollbar max-height="100%">
    <div class="whitespace-pre">
      {{template}}
    </div>
  </el-scrollbar>
</template>

<script setup>
import { ref, watch } from "vue";
let props = defineProps(["dataSource"]);
let template = ref("");

function onSave() {
  let template = props.dataSource
    .map((item) => `  <${item.name} :propsValue="propsValue"></${item.name}>`)
    .join("\n");

  let script = `\n\n<script>\n<\/script>`;

  return "<template>\n" + template + "\n</template>" + script;
}

watch(
  () => props.dataSource,
  () => {
    template.value = onSave();
  },
  { deep: true, immediate: true }
);
</script>
