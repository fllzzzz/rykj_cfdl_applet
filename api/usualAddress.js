import request from '@/config/request.js'
// 5.2.23 获取常用地址接口
export const getAddress =(data)=>{
		return request('/user/getAddress', 'POST', data)
}

// 5.2.21 新增常用地址接口
export const addAddress =(data)=>{
		return request('/user/addAddress', 'POST', data)
}


// 5.2.22 删除常用地址接口
export const delAddress =(data)=>{
		return request('/user/delAddress', 'POST', data)
}

