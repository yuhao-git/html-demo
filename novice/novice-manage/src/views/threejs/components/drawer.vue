<template>
  <!-- content -->
  <transition name="fade">
    <div v-if="show"
         class="content">
    </div>
  </transition>
</template>

<script>
export default {
  name: "",
  props: {
    show: {
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped lang='less'>
.content {
  height: 506.25px;
  width: 900px;
  position: absolute;
  background-color: #fff;
  top: 20%;
  left: 10%;
}

.fade-enter-active {
  animation: bounce-in 0.5s ease-out;
}

.fade-leave-active {
  animation: bounce-in 0.5s reverse ease-in-out;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  20% {
    transform: scale(1, 0.01);
  }
  50% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1);
  }
}
</style>