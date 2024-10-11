<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useAppStore from "@/stores/modules/app"
const isMobile = ref(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
const appStore = useAppStore()
const loading = storeToRefs(appStore).loading;

</script>

<template>
  <div h-full w-full>
    <var-overlay v-model:show="loading">
      <var-loading description="LOADING" color="#ff9f00" type="wave" />
    </var-overlay>
    <slot v-if="isMobile" />
    <div v-else class="min-h-screen flex flex-col items-center justify-center px-[14px]">
      <var-result class="max-w-[350px] bg-transparent" type="warning" :title="$t('app.warning')"
        :description="$t('app.pleaseUseMobileVisit')" />
    </div>
  </div>
</template>
