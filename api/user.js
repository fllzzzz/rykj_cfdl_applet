import request from '@/config/request.js'
	// 登录获取token
export const loginByCode =(data)=>{
		return request('/user/loginByCode', 'POST', data)
}
// 5.2.15 查询个人信息接口
export const userProfileApi =(data)=>{
		return request('/user/profile', 'POST', data)
}
// 5.2.16 查询他人信息接口
export const userOtherprofileApi =(data)=>{
		return request('/user/otherprofile', 'POST', data)
}
// 5.2.17 修改个人信息接口
export const userChangeProfileApi =(data)=>{
		return request('/user/changeProfile', 'POST', data)
}
// 5.2.18 查询积分记录接口
export const userScoresApi =(data)=>{
		return request('/user/scores', 'POST', data)
}


export const getAuthInfo =(data)=>{
		return request('/user/jsapi/authentication', 'POST', data,"flag")
}

export const userUploadFileApi =(data)=>{
		return request('/upload/uploadFile', 'POST', data)
}
