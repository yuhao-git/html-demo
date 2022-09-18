<template>
    <div class="login-form">
        <a-form layout="horizontal">
            <a-form-item>
                <a-input-number placeholder="请输入手机号码" size="large" style="width: 430px;" v-focus>
                    <template #prefix>
                        <user-outlined />
                    </template>
                </a-input-number>
            </a-form-item>
            <a-form-item>
                <a-input type="password" placeholder="请输入短信验证码" size="large" style="width: 430px">
                    <template #prefix>
                        <key-outlined />
                    </template>
                    <template #suffix>
                        <a>获取验证码?</a>
                    </template>
                </a-input >
            </a-form-item>
            <a-form-item :wrapper-col="{span: 24 }">
                <a-button type="primary" size="large" class="loginBtn">登录</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup>

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
        }

        .loginBtn {
            width: 200px;
            height: 50px;
        }
    }
</style>