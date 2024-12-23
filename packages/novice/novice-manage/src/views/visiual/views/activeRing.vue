<script setup lang="ts">
import activeRing from "../components/activeRing/activeRing.vue";
</script>

<template>
  <div class="active-ring">
    <activeRing active>
      <div class="ring-content">
        <div class="item-ring"></div>
        <div class="item-icon"></div>
      </div>
    </activeRing>
  </div>
</template>

<style lang="less" scoped>
.active-ring {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ring-content {
  position: relative;
  width: 180px * 0.75;
  height: 190px * 0.75;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/img/views/item-bg.png") no-repeat center center;
  background-size: 100% 100%;
  .item-ring {
    height: 262px * 0.75;
    width: 262px * 0.75;
    position: absolute;
    background-image: url("../assets/img/views/ring.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>