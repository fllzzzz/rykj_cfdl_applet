import {
	loginByCode
} from "@/api/login.js"

// 全局请求封装
export default (url, method, params, flag) => {
	const baseUrl = getApp().globalData.env.baseUrl
	const v = getApp().globalData.version
	const token = uni.getStorageSync('user').token
	// const token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjoie1wiaWRcIjpcIjE2Njg1MDI2NDcwOTY2OTBcIn0iLCJleHAiOjE2NzEyNDA1NTJ9.dvCSEbO-xnm3AYjXEKKwe7hWD30Ysfdz_dfarAZg-Gg"
	if (!flag) {
		uni.showLoading({
			title: '加载中'
		})
	}
	
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method: method,
			header: {
				'token': token,
				'v': v
			},
			data: {
				...params
			},
			success(res) {
				resolve(res.data)
				if (res.data.code === 401) {
					uni.navigateTo({
						url: "/pages/loading/loading"
					})
					resolve(res.data)
				} else {
					resolve(res.data)
				}
			},
			fail(err) {
				reject(err)
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}
