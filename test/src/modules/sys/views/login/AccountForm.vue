<template>
    <div class="login-form">
        <a-form layout="horizontal" autocomplete="off" @keydown.enter="onLogin(refreshVerifyCode)">
            <a-form-item v-bind="validateInfos.loginId" required>
                <a-input v-model:value="modelRef.loginId" placeholder="请输入登录账号" size="large" style="width: 430px;">
                    <template #prefix>
                        <user-outlined/>
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item v-bind="validateInfos.password">
                <a-input v-model:value="modelRef.password" type="password" placeholder="请输入密码" size="large"
                         style="width: 430px" autocomplete="new-password">
                    <template #prefix>
                        <key-outlined/>
                    </template>
                    <template #suffix>
                        <a @click="toForgetPage">忘记密码?</a>
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item v-bind="validateInfos.verifyCode">
                <a-input v-model:value="modelRef.verifyCode" placeholder="请输入验证码" size="large" style="width: 430px">
                    <template #prefix>
                        <unlock-outlined/>
                    </template>
                    <template #suffix>
                        <img class="verifyImg" :src="verifyUrl" title="单击进行刷新" @click="refreshVerifyCode"/>
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item :wrapper-col="{span: 24 }">
                <a-button ref="loginBtnRef" type="primary" size="large" class="loginBtn" :loading="loginLoading" @click.prevent="onLogin(refreshVerifyCode)">{{loginText}}</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup>
    import {Form} from 'ant-design-vue'
    import useLogin from './useLogin'

    const {useForm} = Form
    const router = useRouter()

    const {apiUrl} = APP_INFO
    const origVerifyUrl = `${apiUrl}/verifyCode`
    const verifyUrl = ref(origVerifyUrl)
    //表单元素
    const modelRef = reactive({
        type: 'password',
        loginId: '',
        password: '',
        verifyCode: ''
    })
    //验证规则
    const rulesRef = reactive({
        loginId: [{required: true, message: '请输入登录账号'}],
        password: [{required: true, message: '请输入登录密码'}],
        verifyCode: [{required: true, message: '请输入验证码'}]
    })

    const {validate, validateInfos} = useForm(modelRef, rulesRef)

    const refreshVerifyCode = () => {
        verifyUrl.value = `${origVerifyUrl}?r=` + Math.random()
    }

    const toForgetPage = () => {
        router.push('/forgetPwd')
    }

    const {loginLoading, loginBtnRef, loginText, onLogin} = useLogin(validate, modelRef)
</script>

<style scoped lang="less">
    .login-form {
        :deep(.ant-form-item) {
            margin-bottom: 40px;

            .ant-input-affix-wrapper {
                border: none;
                border-bottom: 2px solid @primary-color;
                box-shadow: none !important;
                padding: 11px;
            }

            input:-webkit-autofill {
                background: none !important;
                transition: background-color 99999s ease-in-out 0s;
                -webkit-transition-delay: 99999s;
            }

            input {
                padding-left: 10px;
            }
        }

        .verifyImg {
            cursor: pointer;
        }
        .loginBtn {
            width: 200px;
            height: 50px;
        }
    }
</style>