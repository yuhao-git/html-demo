import request from "@/utils/request";

function register(data: any) {
    return request({
        url: '/admin/user/register',
        method: 'post',
        data
    })
}

export {
    register
}