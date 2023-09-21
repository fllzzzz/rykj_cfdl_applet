// 封装login方法
import * as dd from 'dingtalk-jsapi'
const baseUrl = getApp().globalData.env.baseUrl
const v = getApp().globalData.version

export const loginByCode = (orderId) => {
	console.log(orderId,"login")
	dd.ready(function() {
		console.log("dd.ready")
		dd.runtime.permission.requestAuthCode({
			// corpId: "dingb32dfe3fb37ee75c35c2f4657eb6378f", // 企业id
			corpId: "ding037640a7807d374ba39a90f97fcb1e09", // 企业id 修改
			onSuccess: function(info) {
				console.log(info,"info")
				let code = info.code 
				let params = {
					"code": code
				}
				console.log(baseUrl,"baseUrl");
				console.log(v,"v")
				uni.request({
						url: `${baseUrl}/user/loginByCode`,
						method: "POST",
						data: params,
						header: {
							'v': v
						}
					})
					.then((res) => {
						console.log(res,"bycode")
						if(res.data.code===200){
							uni.setStorageSync('user', res.data.data)
							uni.setStorageSync('v', v)						
							setTimeout(() => {
								if (orderId) {
									uni.redirectTo({
										url: "/pages/orderDetail/orderDetail?orderId=" + orderId
									})
								} else {
									uni.switchTab({
										url: "/pages/drivePage/drivePage"
									});
								}
							}, 1000)
						}else{
							uni.showToast({
								title:res.msg,
								icon:'none'
							})
						}												
					})
					.catch((err) => {
						console.error(err,"bycode接口报错");
					});
			}
		});
	});
}
