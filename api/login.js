// 封装login方法
import * as dd from 'dingtalk-jsapi'
const baseUrl = getApp().globalData.env.baseUrl
const v = getApp().globalData.version

export const loginByCode = (orderId) => {
	dd.ready(function() {
		dd.runtime.permission.requestAuthCode({
			corpId: "dingb32dfe3fb37ee75c35c2f4657eb6378f", // 企业id
			onSuccess: function(info) {
				let code = info.code 
				let params = {
					"code": code
				}
				uni.request({
						url: `${baseUrl}/user/loginByCode`,
						method: "POST",
						data: params,
						header: {
							'v': v
						}
					})
					.then((res) => {
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
						console.error(err);
					});
			}
		});
	});
}
