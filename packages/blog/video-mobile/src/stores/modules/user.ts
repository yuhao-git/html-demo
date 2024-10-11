

import { defineStore } from 'pinia'

interface UserState {
    token: string
    userInfo: any
}

export const useUserStore = defineStore('user',
    {
        state: (): UserState => ({
            token: '',
            userInfo: {},
        }),
        persist: true,
    })

