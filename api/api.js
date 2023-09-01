import request from '@/config/request.js'
export default {
	// 登录获取token
	loginByCode(data) {
		return request('/user/loginByCode', 'POST', data)
	},

}

