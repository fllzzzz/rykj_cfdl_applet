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
//查询停车场列表
export const getparkingLotList =(data)=>{
	return request('/parking/lot/parkingLot/all', 'POST', data)
}
//查询用户停车场列表
export const getUserParkingLotList =(data)=>{
	return request('/parkingSpace/change/space/list', 'POST', data)
}
//车位互换
export const applyExchange =(data)=>{
	return request('/parkingSpace/change/apply', 'POST', data)
}
//查询交换车位数量
export const getExchangeCount =(data)=>{
	return request('/parkingSpace/change/count', 'POST', data)
}
//查询交换车位列表（记录）
export const getExchangeList =(data)=>{
	return request('/parkingSpace/change/applet/list', 'POST', data)
}
//交换车位操作   同意 否决 撤销
export const ExchangeDeal =(data)=>{
	return request('/parkingSpace/change/deal', 'POST', data)
}
//根据车牌查询车主信息
export const getinfoByPlateNo =(data)=>{
	return request('/user/verify/infoByPlateNo', 'POST', data)
}
//查询摇号规则
export const getdescriptionInfo =(data)=>{
	return request('/lottery/description/info', 'POST', data)
}





