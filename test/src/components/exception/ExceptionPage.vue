<template>
    <div class="page-exception" :style="{height: height + 'px'}">
        <div class="exception">
            <div class="img">
                <img src="@/assets/error.png"/>
            </div>
            <div class="content">
                <h1>{{ config[type].title }}</h1>
                <div class="desc">{{ config[type].desc }}</div>
                <div class="action">
                    <a-button size="large" @click="handleToHome" style="margin-right: 20px">返回首页</a-button>
                    <a-button size="large" type="primary" @click="goBack">返回上一页</a-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import types from './type'
    export default {
        name: "Exception",
        props: {
            type: {
                type: String,
                default: '404'
            }
        },
        data() {
            return {
                config: types,
                height: 500
            }
        },
        mounted() {
            this.height = document.body.clientHeight || document.documentElement.clientHeight
        },
        methods: {
            handleToHome() {
                this.$router.replace('/');
            },
            goBack() {
                this.$router.back();
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-exception{
        height: 100%;
        background-color: #ffffff;
        overflow: hidden;
        .exception {
            align-items: center;
            text-align: center;
            margin-top: 150px;
            .img {
                display: inline-block;
                padding-right: 52px;
                zoom: 1;
                img {
                    height: 360px;
                    max-width: 430px;
                }
            }
            .content {
                display: inline-block;
                flex: auto;
                h1 {
                    color: #434e59;
                    font-size: 72px;
                    font-weight: 600;
                    line-height: 72px;
                    margin-bottom: 24px;
                }
                .desc {
                    color: rgba(0, 0, 0, .45);
                    font-size: 20px;
                    line-height: 28px;
                    margin-bottom: 16px;
                }
            }
        }
    }

</style>