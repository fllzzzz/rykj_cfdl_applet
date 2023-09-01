import request from '@/config/request.js'
	// 5.2.6 乘客请求搭车接口
export const handleConfirmApi =(data)=>{
		return request('/order/request/confirm', 'POST', data)
}
// 5.2.7 乘客取消请求搭车接口
export const handleCancelApi =(data)=>{
		return request('/order/request/cancel', 'POST', data)
}
// 5.2.8 司机确认同行接口
export const handleConfirmPeerApi =(data)=>{
		return request('/order/confirmPeer', 'POST', data)
}
// 5.2.9 司机取消订单接口
export const handleCancelDriveApi =(data)=>{
		return request('/order/cancel/drive', 'POST', data)
}
// 5.2.10 乘客取消订单接口
export const handleCancelPassengerApi =(data)=>{
		return request('/order/cancel/passenger', 'POST', data)
}
// 5.2.11 乘客已到目的地接口
export const handleArriveApi =(data)=>{
		return request('/order/arrive', 'POST', data)
}
// 5.2.13 司机评价接口
export const handleEvaluateDriveApi =(data)=>{
		return request('/user/evaluate/drive', 'POST', data)
}
//5.2.14 乘客评价接口
export const handleEvaluatePassengerApi =(data)=>{
		return request('/user/evaluate/passenger', 'POST', data)
}

// 乘客确认上车校验
export const handleGetOnCheckApi =(data)=>{
		return request('/order/getOnCheck', 'POST', data)
}

// 乘客确认下车校验
export const handleGetOffCheckApi =(data)=>{
		return request('/order/getOffCheck', 'POST', data)
}

// 乘客确认上车
export const handleConfirmRidingApi =(data)=>{
		return request('/order/confirmRiding', 'POST', data)
}