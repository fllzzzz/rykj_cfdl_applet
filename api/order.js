import request from '@/config/request.js'
	// 查询订单分页接口
export const orderCommit =(data)=>{
		return request('/order/commit', 'POST', data)
}

	// 查询订单分页接口
export const orderPage =(data)=>{
		return request('/order/page', 'POST', data)
}
// 查询订单详情接口
export const orderDetailApi =(data)=>{
		return request('/order/detail', 'POST', data)
}
// 司机未完成订单查询接口
export const pendingDriveApi =(data)=>{
		return request('/order/pending/drive', 'POST', data,"flag")
}
// 乘客未完成订单查询接口
export const pendingPassengerApi =(data)=>{
		return request('/order/pending/passenger', 'POST', data,"flag")
}
// 获取我的订单记录接口
export const orderRecordApi =(data)=>{
		return request('/order/record', 'POST', data)
}


//连续获取经纬度
export const geolocation =(data)=>{
		return request('/order/geolocation', 'POST', data)
}