<template>
    <container>
        <div class="p-20 text-center">
            <h1>{{ t("register.welcome") }}</h1>
            <var-input v-model="username" :placeholder='t("register.username")' class="mb-4" />
            <var-input v-model="nickname" :placeholder='t("register.nickname")' class="mb-4" />
            <var-input v-model="email" :placeholder='t("register.email")' class="mb-4" />
            <var-input type="password" v-model="password" :placeholder='t("register.password")' class="mb-4" />
            <var-input type="password" v-model="confirmPassword" :placeholder='t("register.confirmPassword")' class="mb-4" />
            <div pt-20>
                <var-button block type="primary" @click="handleSubmit">{{ t("register.register") }}</var-button>
            </div>
            <p class="mt-15">{{ t("register.alreadyHaveAccount") }}？ <a  href="#" @click="goLogin">{{ t("register.goLogin") }}</a></p>
        </div>
    </container>
</template>

<script setup>
import { register } from '@/api/register.ts'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { STORAGE_TOKEN_KEY } from '@/stores/mutation-type'
import { encryptWithRSA } from "@/utils/utils"
const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()

definePage({
    name: 'register',
    meta: {
        level: 2,
        title: "注册",
        i18n: 'register.register',
    },
})
import { ref } from 'vue'

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const nickname = ref('');
const handleSubmit = async () => {
    // 注册
    if (password.value !== confirmPassword.value) {
        alert('密码不匹配');
        return;
    }
    const res = await register({ username: username.value, email: email.value, password: encryptWithRSA(password.value), nickname: nickname.value })
    userStore.token = res.data.token
    userStore.userInfo = res.data.userInfo
    router.push('/profile')
};

const goLogin = () => {
    router.push('/login')
}
</script>
