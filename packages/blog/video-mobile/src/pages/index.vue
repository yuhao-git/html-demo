<template>
  <div w-full h-full relative>
    <div p-20>
      <h1>视频上传</h1>
      <!-- 使用 var-uploader 组件 -->
      <var-uploader v-model="files" multiple @after-read="handleAfterRead" accept="video/mp4" />
    </div>
    <div absolute bottom-70 px-20 w-full>
      <var-button type="primary" block @click="uploadVideo">上传</var-button>
    </div>
  </div>
</template>

<script setup>
import request from '@/utils/request';
import { Snackbar } from '@varlet/ui'

import { ref } from 'vue';

definePage({
  name: 'index',
  meta: {
    level: 1,
  },
})

const files = ref([]);
const message = ref('');

const handleAfterRead = (file) => {
};

const uploadVideo = async () => {
  if (files.value.length === 0) {
    Snackbar.warning("请先选择一个文件！")
    return;
  }

  const formData = new FormData();
  files.value.forEach((file) => {
    formData.append('videoFiles', file.file); // 将文件添加到 FormData 对象
  });

  try {
    const response = await request.post('/video/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // 设置请求头
      }
    });

    message.value = response.data; // 显示成功消息

    Snackbar.success("文件上传成功")
    
    // 上传成功后清空
    files.value = []; // 清空选择
  } catch (error) {
    message.value = '上传失败: ' + error.response.data; // 显示错误消息
  }
};
</script>

<style scoped>
/* 添加样式 */
</style>