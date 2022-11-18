<!-- 图标 -->
<template lang="">
  <svg :class="svgClass" aria-hidden="true" >
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const svgClass = computed(() => {
      if (props.className) {
        return "svg-icon " + props.className;
      } else {
        return "svg-icon";
      }
    });
    const iconName = computed(() => {
      return `#icon-${props.iconClass}`;
    });
    return {
      svgClass,
      iconName,
    };
  },
});
</script>
<style lang="css">
.svg-icon {
  width: 1.2em;
  height: 1.2em;
  fill: currentColor;
  vertical-align: middle;
  cursor: pointer;
}
</style>
