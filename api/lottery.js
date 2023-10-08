import request from '@/config/request.js'
//获取摇号信息
export const lotteryInfo =(data)=>{
	return request('/lottery/applyRecord/info', 'POST', data)
}
//申请摇号
export const lotteryApply =(data)=>{
	return request('/lottery/applyRecord/apply', 'POST', data)
}
//取消摇号
export const lotteryCancel =(data)=>{
	return request('/lottery/applyRecord/cancel', 'POST', data)
}
//查询摇号记录
export const getApplyRecordList =(data)=>{
	return request('/lottery/applyRecord/list', 'POST', data)
}
//获取个人车辆列表
export const getVehicleList =(data)=>{
	return request('/user/verify/vehicleList', 'POST', data)
}
//获取个人车辆详细信息
export const getVehicleInfo =(data)=>{
	return request('/user/verify/info', 'POST', data)
}
//新增车辆审核
export const addVehicle =(data)=>{
	return request('/user/verify/add', 'POST', data)
}
//删除车辆信息
export const deleteVerifyList =(data)=>{
	return request('/user/verify/delete', 'POST', data)
}
//查询停车场
export const getParkingLot =(data)=>{
	return request('/parking/lot/parkingLot/name', 'POST', data)
}
//车位转赠列表
export const gettransferRecordList =(data)=>{
	return request('/parkingSpace/transferRecord/list', 'POST', data)
}
//车位转赠申请
export const transfer =(data)=>{
	return request('/parkingSpace/transferRecord/transfer', 'POST', data)
}
//查询人员列表
export const getUserList =(data)=>{
	return request('/lottery/assignRule/userList', 'POST', data)
}

//查询饼图数据
export const getPieChart =(data)=>{
	return request('/parking/lot/parkingLot/pieChart', 'POST', data)
}
//提交上传
export const addVerify =(data)=>{
	return request('/user/verify/add', 'POST', data)
}
//修改上传
export const updateVerify =(data)=>{
	return request('/user/verify/update', 'POST', data)
}



