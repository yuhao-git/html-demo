<template>
  <div class="container">
    <div class="item" v-for="item in circlePoints1" :style="{ top: `${item.value[0]}px`, left: `${item.value[1]}px` }"></div>
    <div :style="getPositonStyle" class="ball"></div>

    <div :style="{ top: `${circlePoints1[(ballIndex + 9) % 36].value[0]}px`, left: `${circlePoints1[(ballIndex + 9) % 36].value[1]}px` }" class="ball"></div>

    <div :style="{ top: `${circlePoints1[(ballIndex + 18) % 36].value[0]}px`, left: `${circlePoints1[(ballIndex + 18) % 36].value[1]}px` }" class="ball"></div>

    <div :style="{ top: `${circlePoints1[(ballIndex + 27) % 36].value[0]}px`, left: `${circlePoints1[(ballIndex + 27) % 36].value[1]}px` }" class="ball"></div>

    <div class="item" v-for="item in circlePoints2" :style="{ top: `${item.value[0]}px`, left: `${item.value[1]}px` }"></div>
<!-- 
    <div :style="{ top: `${circlePoints2[ballIndex % 36].value[0]}px`, left: `${circlePoints2[ballIndex % 36].value[1]}px` }" class="ball"></div>

    <div :style="{ top: `${circlePoints2[(ballIndex + 9) % 36].value[0]}px`, left: `${circlePoints2[(ballIndex + 9) % 36].value[1]}px` }" class="ball"></div>

    <div :style="{ top: `${circlePoints2[(ballIndex + 18) % 36].value[0]}px`, left: `${circlePoints2[(ballIndex + 18) % 36].value[1]}px` }" class="ball"></div>

    <div :style="{ top: `${circlePoints2[(ballIndex + 27) % 36].value[0]}px`, left: `${circlePoints2[(ballIndex + 27) % 36].value[1]}px` }" class="ball"></div> -->
  </div>

    
</template>

<script lang='ts' setup>
import { reactive, ref, computed } from "vue";


// a 长半径， b 短半径， p 节点的间隔 ， cx, cy 圆心, 
function getCPoint({ a, b, p = 1, cx = 0, cy = 0, angle = 0 }) {
  const data = []
  for (let index = 0; index < 360; index = index + p) {
    // 旋转
    let x = a * Math.cos(Math.PI * 2 * index / 360) * Math.cos(angle) - b * Math.sin(Math.PI * 2 * index / 360) * Math.sin(angle);
    let y = a * Math.cos(Math.PI * 2 * index / 360) * Math.sin(angle) + b * Math.sin(Math.PI * 2 * index / 360) * Math.cos(angle);

    data.push(...[
      {
        value: [x + cx, y + cy],
      }
    ])
  }
  return data
}


let circlePoints1 = getCPoint({ a: 50, b: 200, p: 10, cx: 200, cy: 200, angle: -10 })
let circlePoints2 = getCPoint({ a: 50, b: 200, p: 10, cx: 200, cy: 200, angle: 10 })
let ballIndex = ref(0);
const state = reactive({ circlePoints1, circlePoints2 })


setInterval(() => {
  ballIndex.value++
}, 100)


let getPositonStyle = computed(() => {
  let index = ballIndex.value % circlePoints1.length;
  let scale = 1;
  let t = index > 18 ? circlePoints1.length - index : index;
  scale = Math.max(1, (t) / circlePoints1.length * 8);

  return {
    top: `${circlePoints1[index].value[0]}px`,
    left: `${circlePoints1[index].value[1]}px`,
    background: "red",
    transform: `scale(${scale})`
  };
})

</script>
<style scoped lang='less'>
.container {
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.item {
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 10px;
  // background: red;
}

.ball {
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 10px;
  background: blue;
  transition: 0.1s linear;
}
</style>