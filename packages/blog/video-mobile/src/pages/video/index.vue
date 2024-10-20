<script setup lang="ts">
import { onMounted, ref } from 'vue'
import request from '@/utils/request'
const list = ref([])
const videoSrc = ref('')
const active = ref('01')

const router = useRouter()
function queryProse(secret): Promise<any> {
  return request({ method: 'get', url: '/video/list', params: { secret } })
}


definePage({
  name: 'video',
  meta: {
    level: 2,
    title: '视频',
    i18n: 'home.video',
  },
})

/**
 * 获取数据
 */
function getData(secret) {
  active.value = secret
  queryProse(secret).then((res) => {
    list.value = res.data
    setVideoSrc(list.value[0])
  })
}

// videoSrc
function setVideoSrc(src) {
  videoSrc.value = import.meta.env.VITE_APP_API_BASE_URL_VIDEO + '/video/' + src
}


onMounted(() => {
  getData(active.value);
})


function getActive(str) {
  const videoStrList = videoSrc.value.split('/');
  return videoStrList[videoStrList.length - 1] == str;
}

const uploadVideo = () => {
  router.push('/video/upload')
}
</script>

<template>
  <Container>
    <var-fab type="primary" @click="uploadVideo">
      <!-- <var-button class="action" type="info" round>
        <var-icon name="plus" size="24"/>
      </var-button> -->
    </var-fab>
    <div fixed bg-black w-full mx-auto h-210 text-center text-16 text-dark dark:text-white z-10>
      <video autoplay w-full h-full :src="videoSrc" controls></video>
    </div>
    <div px-12 pt-230 overflow-auto>
      <div mb-15 flex relative z-0>
        <var-button :type="active == '01' ? 'primary' : ''" mr-10 block @click="getData('01')">精选</var-button>
        <var-button :type="active == '02' ? 'primary' : ''" block @click="getData('02')">普通</var-button>
      </div>

      <div v-for="(item, index) in list" @click="setVideoSrc(item)" :key="index" text-16 text-dark dark:text-white
        mb-20>
        <div :class="{ 'text-red': getActive(item) }" style="max-width: 100%;word-wrap: break-word;" :line-clamp="3">
          {{ index + 1 }}. {{ item.replace('.mp4', '') }}
        </div>
      </div>
    </div>
  </Container>
</template>
