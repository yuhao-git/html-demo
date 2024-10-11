<template>
    <container>
        <div class="p-20 text-center">
            <h1>{{ t("login.welcome") }}</h1>
            <var-input v-model="username" :placeholder='t("login.username")' class="mb-4" />
            <var-input type="password" class=" mb-4" v-model="password" :placeholder='t("login.password")' />
            <div pt-20>
                <var-button block type="primary" @click="handleSubmit">{{ t("login.login") }}</var-button>
            </div>
            <p class="mt-15">{{ t("login.noAccount") }}？ <a href="#">{{ t("login.goRegist") }}</a></p>
        </div>
    </container>
</template>


<script setup>
import { login } from '@/api/login.ts'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { STORAGE_TOKEN_KEY } from '@/stores/mutation-type'
import { encryptWithRSA } from "@/utils/utils"
const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()

definePage({
    name: 'login',
    meta: {
        level: 2,
        title: "登录",
        i18n: 'login.login',
    },
})
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const handleSubmit = async () => {
    // 登录
    const res = await login({ username: username.value, password: encryptWithRSA(password.value) })
    localStorage.setItem(STORAGE_TOKEN_KEY, res.data.token)
    userStore.token = res.data.token
    userStore.userInfo = { username: username.value } // Assuming the API returns user info
    router.push('/profile')
};


</script>
