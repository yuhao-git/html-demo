<template>
    <div>
        账号 <el-input></el-input>
        密码 <el-input></el-input>
        <el-button @click="login">登录</el-button>
    </div>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
function login() {
    axios.post('/adminapi/users/info').then(res => {
        console.log(res.data)
    })
}

</script>
<style scoped lang='less'></style>