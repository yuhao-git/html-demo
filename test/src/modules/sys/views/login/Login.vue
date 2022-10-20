<template>
    <div class="login-page">
        <div class="login-left">
            <div class="login-title">
                {{appName}}
            </div>
            <div class="white-line"></div>
            <div class="sign-in">
                <div class="text">SIGN</div>
                <div class="text">
                    <span>IN</span>
                    <span class="circle"></span>
                </div>
            </div>
            <div class="widget">
                <div class="widget-line" v-for="i in 3"></div>
                <div class="widget-circle"></div>
            </div>
        </div>
        <div class="login-right">
            <div class="login-title">
                <div>您好，欢迎使用{{loginType.text}}!</div>
            </div>
            <div class="login-box">
                <account-form v-if="loginType.key == 'password'"/>
                <sms-form v-if="loginType.key == 'sms'"/>
                <qr-form v-if="loginType.key == 'qrcode'"/>
                <wx-form v-if="loginType.key == 'weixin'"/>
                <a-divider/>
                <div class="other-login">
                    <span>其他登录方式：</span>
                    <template v-for="type in loginTypes">
                        <a @click="changeLoginType(type)">{{type.text}}</a>
                        <a-divider type="vertical"/>
                    </template>
                </div>
            </div>
        </div>
        <div class="top-right-circle"></div>
        <div class="bottom-right-circle"></div>
    </div>
</template>

<script setup>
    import AccountForm from './AccountForm.vue'
    import SmsForm from './SmsForm.vue'
    import QrForm from './QrForm.vue'
    import WxForm from './WxForm.vue'

    const {appName} = APP_INFO

    const loginTypes = [{
        key: 'password',
        text: '账号登录',
        icon: ''
    },{
        key: 'sms',
        text: '手机登录',
        icon: ''
    },{
        key: 'qrcode',
        text: '二维码登录',
        icon: ''
    },{
        key: 'weixin',
        text: '微信登录',
        icon: ''
    }]

    let loginType = reactive({
        ...loginTypes[0]
    })

    const changeLoginType = (type) => {
        for (let key in loginType) {
            loginType[key] = type[key]
        }
    }

</script>

<style scoped lang="less">
    .notice {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        z-index: 999;
    }
    .login-page {
        display: flex;
        justify-content: space-between;
        height: 100%;
        min-height: 600px;
        position: relative;

        .login-left {
            position: relative;
            width: 33%;
            height: 100%;
            min-width: 430px;
            padding-left: 5%;
            background-color: @primary-color;
            user-select: none;
            @text-color: #ffffff;

            color: @text-color;

            .login-title {
                font-size: 28px;
                padding-top: 20%;
                font-weight: 500;
                line-height: 1.5;
            }

            .white-line {
                height: 20px;
                width: 60px;
                background-color: @text-color;
                margin-top: 60px;
                display: inline-block;
            }

            .sign-in {
                margin-top: 60px;
                font-size: 80px;
                font-weight: bold;

                .circle {
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background-color: @text-color;
                    margin-left: 30px;
                }
            }

            .widget {
                position: absolute;
                top: 13%;
                right: -50px;

                .widget-line {
                    padding-bottom: 10px;
                    display: flex;
                    justify-content: space-between;

                    &:before {
                        background-color: @text-color !important;
                    }

                    &:before, &:after {
                        content: "";
                        display: inline-block;
                        width: 50px;
                        height: 20px;
                        background-color: @primary-color;
                    }
                }

                .widget-circle {
                    position: absolute;
                    top: 300px;
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    overflow: hidden;

                    &:before {
                        background-color: @text-color !important;
                    }

                    &:before, &:after {
                        content: "";
                        display: inline-block;
                        width: 50px;
                        height: 100px;
                        background-color: @primary-color;
                    }
                }
            }
        }

        .login-right {
            padding-left: 15%;
            width: 67%;
            height: 100%;
            padding-top: 5%;

            .login-title {
                color: @primary-color;
                font-size: 28px;
                line-height: 1.5;
            }
            .login-box {
                margin-top: 60px;
                display: inline-block;
                width: 440px;
            }
        }

        .top-right-circle {
            width: 200px;
            height: 150px;
            background-color: @primary-color;
            border-radius: 50%;
            position: absolute;
            top: -100px;
            right: -80px;
        }

        .bottom-right-circle {
            width: 100px;
            height: 100px;
            position: absolute;
            right: -50px;
            bottom: 10px;
            background-color: @primary-color;
            border-radius: 50%;
        }
    }
</style>