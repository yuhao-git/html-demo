<template>
  <!-- content -->
  <div class="container">
    <transition name="fade">
      <div v-if="show"
          class="content">
      </div>
    </transition>
  </div>
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
.container {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  // background-color: #00f;
  top: 20%;
  left: 10%;
  border: 1px solid;
}

.fade-enter-active {
  animation: bounce-in 0.5s ease-in-out;
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
    background: #fff;
    transform: scale(1, 0.01);
  }

  50% {
    background: transparent;
    transform: scale(1, 1.2);
  }

  100% {
    transform: scale(1);
  }
}
</style>