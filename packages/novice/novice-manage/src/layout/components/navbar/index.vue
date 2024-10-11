<template>
  <div class="shadow-sm flex items-center  w-full justify-between pl-4 pr-4">
    <div class="flex items-center">
      <!-- <breadcrumb /> -->
    </div>
    <div>
      <el-popover placement="bottom"
                  :width="200"
                  trigger="hover">
        <template #reference>
          <el-button class="mr-4"
                     type="primary"
                     link>
            <el-icon class="mr-1"
                     size="20">
              <Avatar />
            </el-icon>
            <span>{{username}}</span>
          </el-button>
        </template>
        <userInfo />
      </el-popover>
      <el-switch inline-prompt
                 v-model="isLight"
                 :active-icon="sun"
                 :inactive-icon="moon"
                 @change="changeTheme" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useRouter } from "vue-router";
import moon from "@/assets/svg/moon.svg";
import sun from "@/assets/svg/sun.svg";
import { ref, computed } from "vue";
import { useUserStoreHook } from "@/store/modules/user";
import { useThemeStoreHook } from "@/store/modules/theme";
import { storeToRefs } from "pinia";

// import breadcrumb from "./breadcrumb.vue";
import userInfo from "./userInfo.vue";

const router = useRouter();
function goBack() {
  router.replace("/login");
}

// 用户名
const userStore = useUserStoreHook();
const { username } = storeToRefs(userStore);

// 主题
const themeStore = useThemeStoreHook();
let { isLight } = storeToRefs(themeStore);
function changeTheme(value: boolean) {
  themeStore.changeTheme(value);
}

// 重置数据
// store.$patch((state) => {
// })

// 替换数据
// store.$state = { counter: 666, name: '张三' }
</script>