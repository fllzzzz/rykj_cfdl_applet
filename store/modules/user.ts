//弃用，从storage中取用户信息和token
import { defineStore } from 'pinia'
// import { loginByCode } from '@/api/user'
// import cache from '@/utils/cache'

export const useUserStore = defineStore('userStore', {
	state: () => ({
		userInfo: {
		},
		user: {
		},
		// token: cache.getToken()
		token: ""
	}),
	actions: {
		setUserInfo(val: any) {
			this.user = val
		},
		setUser(val: any) {
			this.user = val
			uni.setStorageSync('user',val)	
		},
		setToken(val: any) {
			this.token = val
			uni.setStorageSync('token',val)	
		},
		// 用户登录
		// async loginAction(loginForm: any) {
		// 	const res: any = await loginByCode(loginForm)
		// 	this.setToken(res.data.token)
		// },
		// 获取用户信息
		// async getUserInfoAction(loginForm: any) {
		// 	const { data } = await loginByCode(loginForm)
		// 	this.setUser(data)
		// },
		// 用户退出
		// async logoutAction() {
		// 	await useLogoutApi()

		// 	// 移除 token
		// 	this.setToken(null)
		// }
	}
})
