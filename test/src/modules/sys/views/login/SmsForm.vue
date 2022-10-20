<template>
    <div class="login-form">
        <a-form layout="horizontal">
            <a-form-item v-bind="validateInfos.phone">
                <a-input-number v-model:value="modelRef.phone" placeholder="请输入手机号码" size="large" style="width: 430px;" v-focus>
                    <template #prefix>
                        <user-outlined />
                    </template>
                </a-input-number>
            </a-form-item>
            <a-form-item v-bind="validateInfos.smsCode">
                <a-input v-model:value="modelRef.smsCode" placeholder="请输入短信验证码" size="large" style="width: 430px">
                    <template #prefix>
                        <key-outlined />
                    </template>
                    <template #suffix>
                        <a-button type="link" size="large" :loading="smsBtnLoading" @click="fetchSmsCode">{{smsBtnText}}</a-button>
                    </template>
                </a-input >
            </a-form-item>
            <a-form-item :wrapper-col="{span: 24 }">
                <a-button ref="loginBtnRef" type="primary" size="large" class="loginBtn" :loading="loginLoading" @click="onLogin">{{loginText}}</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup>
    import {Form} from 'ant-design-vue'
    import useSmsCode from '@/composables/useSmsCode'
    import useLogin from './useLogin'

    const {useForm} = Form
    const {smsBtnLoading, smsBtnText, fetchSmsCode} = useSmsCode()
    const modelRef = reactive({
        type: '1',
        phone: '',
        smsCode: ''
    })

    const rulesRef = reactive({
        phone: [{required: true, message: '请输入手机号码'}],
        smsCode: [{required: true, message: '请输入短信验证码'}]
    })

    const {validate, validateInfos} = useForm(modelRef, rulesRef)

    const {loginLoading, loginText, loginBtnRef, onLogin} = useLogin(validate, modelRef)
</script>

<style scoped lang="less">
    .login-form {
        :deep(.ant-form-item) {
            margin-bottom: 40px;

            .ant-input-affix-wrapper,.ant-input-number-affix-wrapper-lg {
                border: none;
                border-bottom: 2px solid @primary-color;
                box-shadow: none !important;
                padding: 11px;
            }

            .ant-input-number-handler-wrap {
                display: none;
            }
            input {
                padding-left: 10px;
            }
        }

        .loginBtn {
            width: 200px;
            height: 50px;
        }
    }
</style>