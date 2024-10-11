<template>
  <!-- 提取重复的功能作为hooks -->
  <div>
    {{ count }}
    <el-divider border-style="dashed" />
    <el-button @click="increase">+1</el-button>
    <el-button @click="decrease">-1</el-button>
    <div v-for="(value,key,index) in obj"
         :key="index">{{key}} : {{value}} -- {{index}}</div>
  </div>
  <meter value="80"
         min="0"
         max="100">50%</meter>
  <progress value="10"
            min="0"
            max="100">50%</progress>

  <div class="container-1">
    <div class="box box-1">1</div>
    <div class="box box-2">2</div>
    <div class="box box-3">3</div>
    <!-- <div class="box box-4">4</div>
    <div class="box box-5">5</div>
    <div class="box box-right box-6">6</div> -->
  </div>
  <!-- <div class="container-2"></div> -->

<!-- 
  <del>删除</del>
  <fieldset>
    <legend>Choose your favorite monster</legend>

    <input type="radio"
           id="kraken"
           name="monster"
           value="K" />
    <label for="kraken">Kraken</label><br />

    <input type="radio"
           id="sasquatch"
           name="monster"
           value="S" />
    <label for="sasquatch">Sasquatch</label><br />
  </fieldset>

  <div class="flex ">
    <div class="left "></div>
    <div class="right "></div>
  </div> -->
</template>

<script lang="ts" setup >
import useCount from "@/hooks/useAdd.ts";
import { reactive } from "vue";
const { count, increase, decrease } = useCount(10);

const obj = reactive({ name: "obj", value: "123" });
</script>

<style scoped>
.container-1 {
  width: 202px;
  clear: both;
  border: 1px solid red;
}

.container-2{
  height: 200px;
  width: 200px;
  border: 1px solid red;
}

.box {
  height: 100px;
  width: 100px;
  border: solid #eee;
  float: left;
}

.box-right {
  /* float: right; */
}
.box-1 {
  height: 0;
  /* clear: left; */
}

.box-2 {
  height: 100px;
  /* clear: left; */
}
.box-3 {
  float: none;
  display: inline-block;
}

.flex {
  display: flex;
  width: 200px;
  height: 100px;
}
.left {
  flex: 1 2 100px;
  background: #333;
}
.right {
  flex: 2 3 200px;
  background: #666;
}
</style>

