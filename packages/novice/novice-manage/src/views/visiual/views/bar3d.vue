<script>
import bar3d from "../components/bar3d/bar3d.vue";

export default {
  components: {
    bar3d,
  },
  data() {
    return {
      dataList: [
        { name: "2021-01", value1: Math.random() * 1000, value2: Math.random() * 1000 },
        { name: "2021-02", value1: Math.random() * 1000, value2: Math.random() * 1000 },
        { name: "2021-03", value1: Math.random() * 1000, value2: Math.random() * 1000 },
        { name: "2021-04", value1: Math.random() * 1000, value2: Math.random() * 1000 },
        { name: "2021-05", value1: Math.random() * 1000, value2: Math.random() * 1000 },
        { name: "2021-06", value1: Math.random() * 1000, value2: Math.random() * 1000 },
        { name: "2021-07", value1: Math.random() * 1000, value2: Math.random() * 1000 },
        { name: "2021-08", value1: Math.random() * 1000, value2: Math.random() * 1000 },
      ],
    };
  },
};
</script>

<template>
  <bar3d />
</template>
