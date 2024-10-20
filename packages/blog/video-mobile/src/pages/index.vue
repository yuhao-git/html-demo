<template>
  <div w-full h-full relative p-15>
    <var-paper :elevation="2" radius="5">
      <var-cell border ripple>
        视频
        <template #extra>
          <var-icon name="chevron-right" />
        </template>
      </var-cell>
      <var-cell border ripple>
        壁纸
        <template #extra>
          <var-icon name="chevron-right" />
        </template>
      </var-cell>
    </var-paper>

  </div>
</template>

<script setup>

definePage({
  name: 'index',
  meta: {
    level: 1,
  },
})

</script>
