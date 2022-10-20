import {defineStore, acceptHMRUpdate} from 'pinia'
import {login, logout} from "../modules/sys/api/login"
import {useStorage  } from '@vueuse/core'
import {CSRF_TOKEN_CACHE_KEY} from "../config/config";
const csrfStorage = useStorage(CSRF_TOKEN_CACHE_KEY, {}, sessionStorage)

/**
 * 权限，全局状态
 */
export const usePermissionStore = defineStore('permission', {
    /**
     * 定义状态变量
     */
    state: () => {
        return {
            userInfo: {
                userId: 1,
                loginId: 'zhangap',
                nickName: '蠢蠢欲动',
                postName: '开发经理(技术)',
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
            },
            menus: [{
                id: '1',
                title: '工作台',
                icon: 'HistoryOutlined',
                url: '/#dashboard'
            }, {
                id: '2',
                title: '仪表盘',
                icon: 'HeartOutlined',
                children: [{
                    id: '20',
                    title: '欢迎页',
                    icon: 'HistoryOutlined',
                    url: 'https://blog.51cto.com/u_11950846/2717263'
                }, {
                    id: '21',
                    title: '分析页',
                    icon: 'HeartOutlined',
                    url: 'https://blog.51cto.com/u_11950846/2717263'
                }, {
                    id: '22',
                    title: '监控页',
                    icon: 'HeartOutlined',
                    children: [{
                        id: '212',
                        title: '分析页',
                        icon: 'HeartOutlined',
                        url: 'https://blog.51cto.com/u_11950846/2717263'
                    }, {
                        id: '223',
                        title: '监控页',
                        icon: 'HeartOutlined',
                        url: 'https://blog.51cto.com/u_11950846/2717263'
                    }]
                }]
            }, {
                id: '3',
                title: '表单页',
                icon: 'FormOutlined',
                url: 'https://blog.51cto.com/u_11950846/2717263'
            }, {
                id: '4',
                title: '列表页',
                icon: 'TableOutlined',
                url: 'https://blog.51cto.com/u_11950846/2717263'
            }, {
                id: '5',
                title: '详情页',
                icon: 'UnorderedListOutlined',
                url: 'https://blog.51cto.com/u_11950846/2717263'
            }, {
                id: '6',
                title: '异常页',
                icon: 'WarningOutlined',
                url: 'https://blog.51cto.com/u_11950846/2717263'
            }, {
                id: '7',
                title: '结果页',
                icon: 'CheckCircleOutlined',
                url: 'https://blog.51cto.com/u_11950846/2717263'
            }, {
                id: '8',
                title: '个人页',
                icon: 'AppstoreAddOutlined',
                url: 'https://blog.51cto.com/u_11950846/2717263'
            }, {
                id: '9',
                title: '系统管理',
                icon: 'TableOutlined',
                url: 'https://blog.51cto.com/u_11950846/2717263'
            }, {
                id: '10',
                title: '跳转',
                icon: 'LinkOutlined',
                url: 'https://blog.51cto.com/u_11950846/2717263'
            }, {
                id: '11',
                title: '组件展示',
                icon: 'AppstoreAddOutlined',
                url: 'https://blog.51cto.com/u_11950846/2717263'
            }, {
                id: '12',
                title: '路由嵌套',
                icon: 'HeartOutlined',
                url: 'https://blog.51cto.com/u_11950846/2717263'
            }],
            permission: []
        }
    },
    /**
     * 获取访问对象, 一般会对state进行过滤，不允许对内容进行变更,可以通过
     */
    getters: {

    },
    /**
     * 提交变量变更
     */
    actions: {
        login(params) {
            const self = this
            return new Promise((resolve, reject) => {
                login(params).then((data) => {
                    csrfStorage.value['name'] = data['csrf-name']
                    csrfStorage.value['value'] = data['csrf-value']
                    self.userInfo = data.user
                    //登录成功
                    resolve(data)
                }).catch(() => {
                    reject()
                })
            })
        },
        logout() {
            const self = this
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    self.userInfo = {}
                    self.menus = []
                    self.permission = []
                    resolve()
                }).catch(() => {
                    reject()
                })
            })
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePermissionStore, import.meta.hot))
}