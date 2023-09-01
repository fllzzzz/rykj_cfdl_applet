// 封装鉴权方法
import * as dd from "dingtalk-jsapi";
import {
	getAuthInfo
} from "@/api/user";

const baseaAentId = getApp().globalData.env.agentId
export const authenticate = () => {
	getAuthInfo().then(res => {
		if (res.code === 200) {
			dd.config({
				agentId: baseaAentId, // 必填，微应用ID
				corpId: "dingb32dfe3fb37ee75c35c2f4657eb6378f", //必填，企业ID
				timeStamp: res.data.timeStamp, // 必填，生成签名的时间戳
				nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
				signature: res.data.signature, // 必填，签名
				type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
				jsApiList: ["biz.telephone.showCallMenu", "device.geolocation.get",
					"biz.map.locate", "biz.chat.openSingleChat", "biz.map.view",
					"device.geolocation.start", "device.geolocation.stop","biz.util.chooseImage"
				] // 必填，需要使用的jsapi列表，注意：不要带dd。
			});

			dd.error(function(err) {
				uni.showModal({
					title: "授权失败，请退出应用重试"
				})
				console.log("err", err);
			})
		}
	})

}
