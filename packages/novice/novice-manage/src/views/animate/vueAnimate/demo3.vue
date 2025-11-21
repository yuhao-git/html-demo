<template>
  <div class="demo3-container">
    <h2
      class="flex justify-center items-center border h-[4rem] mb-4 border-[#ff0000] rounded-[4px]"
    >
      Vue Transition Group Demo
    </h2>

    <!-- 添加新项的输入框 -->
    <div class="input-area">
      <input
        v-model="newItem"
        @keyup.enter="addItem"
        placeholder="输入新项目并按回车添加"
      />
      <button class="mr-3" @click="addItem">添加</button>
      <button @click="sort">排序</button>
    </div>

    <!-- 列表项过渡动画 -->
    <transition-group name="list" tag="ul" class="list-container">
      <li v-for="item in items" :key="item.id" class="list-item">
        <span>{{ item.text }}</span>
        <button @click="removeItem(item.id)" class="remove-btn">×</button>
      </li>
    </transition-group>

    <!-- 说明文字 -->
    <p class="tip">点击 × 删除项目，观察过渡动画效果</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 数据定义
const newItem = ref("");
const items = ref([
  { id: 1, text: "项目 1" },
  { id: 2, text: "项目 2" },
  { id: 3, text: "项目 3" },
]);

// 随机排序
const sort = () => {
  items.value = items.value.sort(() => Math.random() - 0.5);
};

// 添加新项目
const addItem = () => {
  if (newItem.value.trim() !== "") {
    items.value.push({
      id: Date.now(), // 使用时间戳作为唯一ID
      text: newItem.value,
    });
    newItem.value = "";
  }
};

// 删除项目
const removeItem = (id) => {
  const index = items.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    items.value.splice(index, 1);
  }
};
</script>

<style scoped lang="less">
.demo3-container {
  padding: 20px;
}

.input-area {
  margin-bottom: 20px;

  input {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
    width: 200px;
  }

  button {
    padding: 8px 16px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #359c6d;
    }
  }
}

.list-container {
  list-style-type: none;
  padding: 0;
  width: 300px;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;

  .remove-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #e74c3c;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: rgba(231, 76, 60, 0.1);
      border-radius: 50%;
    }
  }
}

.tip {
  color: #999;
  font-size: 14px;
  margin-top: 20px;
}

/* 进入和离开动画 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-leave-active{
  position: absolute;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* 列表移动动画 */
.list-move {
  transition: transform 0.5s ease;
}
</style>