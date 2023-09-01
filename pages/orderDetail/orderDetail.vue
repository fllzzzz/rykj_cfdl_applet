<template>
	<view class="header">
		<view class="refash" @click="getDetailApi()">
			<img class="refash-img" src="@/static/reflash.svg">
		</view>
		<view class="listContent-first listContent-between">
			<view class="listContent-item listContent-between">
				<view>
					<text @click="showOrderId++"
						style="color: #999;">{{orderstartText[orderDate.order.orderState]}}</text>
				</view>


				<text selectable v-if="showOrderId>=3">{{orderDate.order.parkingOrderId}}</text>
				<view v-if="orderDate.userType===2" class="more-order" @tap="jumpDrivePage(orderDate.order)">
					<button class="more-order-btn">再来一单</button>
				</view>
			</view>
			<view class="listContent-item">
				<view><text>{{new Date(parseInt(orderDate.order.orderTime)).toLocaleString()}}</text></view>
				<view class="border--left uni-ml-10"></view>
				<view><text class="uni-ml-10">{{orderDate.order.distance}}km</text></view>

			</view>
			<view class="listContent-item"
				@tap="openMap(orderDate.order.startLongitude,orderDate.order.startLatitude,orderDate.order.startAddress)">
				<!-- <span class="ponint-circle-blue"></span> -->
				<img class="address-icon" src="@/static/start-l.png">
				<text selectable
					class="address-text">{{orderDate.order.startProvince}}{{orderDate.order.startCity}}{{orderDate.order.startCounty}}{{orderDate.order.startAddress}}</text>
				<img class="map-icon" src="@/static/map.png" alt="">
			</view>
			<view class="listContent-item"
				@tap="openMap(orderDate.order.destLongitude,orderDate.order.destLatitude,orderDate.order.destAddress)">
				<!-- <span class="ponint-circle-green"></span> -->
				<img class="address-icon" src="@/static/end-l.png">
				<text selectable
					class="address-text">{{orderDate.order.destProvince}}{{orderDate.order.destCity}}{{orderDate.order.destCounty}}{{orderDate.order.destAddress}}</text>
				<img class="map-icon" src="@/static/map.png" alt="">
			</view>
			<view class="listContent-item" style="padding-bottom: 20rpx;">
				<text class="remark-text">{{orderDate.order.remark}}</text>
			</view>
		</view>

		<view v-if="orderDate.profile" class="listContent">
			<view class="header-content">
				<view class="header-left" @click="jumpPersionInfoByName(orderDate.profile.userId)">
					<view class="header-left-avatar">
						<img v-if="orderDate.profile.avatar" class="avatar-img" :src="orderDate.profile.avatar" alt="">
						<img v-else class="avatar-img" src="@/static/my_avater.png" alt="">
					</view>
					<view class="header-left-info">
						<view class="title-tag"><text>{{orderDate.profile.title}}</text></view>
						<view class="name">{{orderDate.profile.name}}</view>
					</view>
				</view>
				<view class="border--left"></view>
				<view class="header-right">
					<view class="dingding" @tap="phoneCall(orderDate.profile.mobile)"><img class="icon-img"
							src="@/static/tel.png"></view>
					<view class="dingding" @tap="dingdingTalk(orderDate.profile.jobNumber)"><img class="icon-img"
							src="@/static/msg.png"></view>
				</view>
			</view>
		</view>
		<view v-else>
			<view v-for="item in orderDate.list" class="listContent">
				<view class="header-content">
					<view class="header-left">
						<view class="header-left-avatar" @click="jumpPersionInfoByName(item.userId)">
							<img v-if="item.avatar" class="avatar-img" :src="item.avatar" alt="">
							<img v-else class="avatar-img" src="@/static/my_avater.png" alt="">
						</view>
						<view class="header-left-info-ask">
							<view class="name">{{item.name}}</view>
							<view class="header-right-info">
								<view class="dingding-ask" @click="phoneCall(item.mobile)"><img class="icon-img-ask"
										src="@/static/tel.png"></view>
								<view class="dingding-ask" @tap="dingdingTalk(item.jobNumber)"><img class="icon-img-ask"
										src="@/static/msg.png"></view>
							</view>
						</view>
					</view>
					<view class="border--left"></view>
					<view class="header-footer-item"><button class="confirm-btn"
							@click="handleConfirmPeer(item.orderPeerId)">顺路捎上乘客</button></view>
				</view>
			</view>
		</view>

		<view class="footer">
			<!-- 乘客显示按钮 -->
			<view class="passenger-btn">
				<!-- <button @click="geolocationStart()">
					开始连续定位
				</button>
				<button @click="geolocationStop()">
					停止连续定位
				</button> -->

				<button v-if="orderDate.optType===2" class="bottom-button" type="primary"
					@click="handleArrive()">已到达目的地</button>
				<button v-if="orderDate.optType===1" class="bottom-button" type="primary"
					@click="handleCommit()">确认上车</button>
				<button v-if="orderDate.cancelType===1" class="bottom-button" style="background: #f03c3c;;"
					type="primary" @click="dialogTogglePassenger()">取消订单</button>
				<button v-if="orderDate.cancelType===2" class="bottom-button" style="background: #f03c3c;;"
					type="primary" @click="dialogToggleDriver()">取消订单</button>
			</view>
			<view class="need-help uni-mt-16" @tap="dingdingTalk('CFDL09860')"><text>联系管理员</text></view>
		</view>
	</view>
</template>

<script>
	import * as dd from 'dingtalk-jsapi'
	import {
		useaddressStore
	} from '@/store/modules/address'
	const addressStore = useaddressStore()
	import {
		orderDetailApi,
		geolocation
	} from "@/api/order.js"
	import {
		handleCancelPassengerApi,
		handleCancelDriveApi,
		handleArriveApi,
		handleConfirmPeerApi,
		handleGetOnCheckApi,
		handleGetOffCheckApi,
		handleConfirmRidingApi
	} from "@/api/handle.js"
	import {
		loginByCode
	} from "@/api/login.js"
	export default {
		data() {
			return {

				nowAddress: {},

				showOrderId: 0,
				orderId: "",
				orderDate: {},
				orderstartText: ["", "未开始", "进行中", "已取消", "已完成", "已超时"]
			}
		},
		onLoad: function(option) {
			this.orderId = option.orderId
			this.getDetailApi()
		},
		methods: {
			// geolocationStop() {
			// 	let _this = this
			// 	dd.device.geolocation.stop({
			// 		sceneId: _this.orderId, // 定位场景id,
			// 		onSuccess: function(result) {
			// 			/*  结果同dd.device.geolocation.get */

			// 		},
			// 		onFail: function(err) {}
			// 	});
			// },
			// geolocationStart() {
			// 	let _this = this
			// 	dd.device.geolocation.start({
			// 		targetAccuracy: 200, // 期望精确度
			// 		iOSDistanceFilter: 1, // 变更感知精度(iOS端参数)
			// 		useCache: true, // 是否使用缓存(Android端参数)
			// 		withReGeocode: false, // 是否返回逆地理信息,默认否
			// 		callBackInterval: 5000, //回传时间间隔，ms
			// 		sceneId: _this.orderId, // 定位场景id,
			// 		onSuccess: function(result) {
			// 			/*  结果同dd.device.geolocation.get */
			// 			uni.showToast({
			// 				icon: 'none',
			// 				title: result
			// 			})
			// 			let obj = {
			// 				"parkingOrderId": _this.orderId,
			// 				"longitude": result.longitude,
			// 				"latitude": result.latitude,
			// 			}
			// 			geolocation(obj).then(res => {

			// 			})
			// 		},
			// 		onFail: function(err) {

			// 		}
			// 	});
			// },


			openMap(longitude, latitude, title) {
				dd.ready(function() {
					dd.biz.map.view({
						latitude: latitude, // 纬度
						longitude: longitude, // 经度
						title: title, // 地址/POI名称
						onSuccess: function(res) {
							// 调用成功时回调
							console.log(res)
						},
						onFail: function(err) {
							// 调用失败时回调
						}
					});

				})

			},
			// 确认同行
			handleConfirmPeer(orderPeerId) {
				let re = {
					orderPeerId: orderPeerId,
					parkingOrderId: this.orderId
				}
				let _this = this
				uni.showModal({
					title: '提示',
					content: '是否确认同行?',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							handleConfirmPeerApi(re).then(res => {
								if (res.code === 200) {
									uni.showToast({
										icon: 'none',
										title: '确认同行成功'
									})
								} else {
									uni.showToast({
										icon: 'none',
										title: res.msg
									})
								}
								_this.getDetailApi()
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			phoneCall(phone) {

				dd.biz.telephone.showCallMenu({
					phoneNumber: phone, // 期望拨打的电话号码
					showDingCall: true, // 是否显示钉钉电话
					onSuccess: function() {},
					onFail: function() {}
				})
			},
			dingdingTalk(ddId) {

				dd.biz.chat.openSingleChat({
					corpId: 'dingb32dfe3fb37ee75c35c2f4657eb6378f', // 企业id,必须是用户所属的企业的corpid
					userId: ddId, // 用户的uerid
					onSuccess: function() {},
					onFail: function() {

					}
				})
			},
			// 再来一单
			jumpDrivePage(obj) {
				addressStore.setAllInfo(obj)
				uni.switchTab({
					url: `/pages/drivePage/drivePage`,
				})
			},
			// 司机取消弹窗
			dialogToggleDriver() {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '确认取消订单？',
					success: function(res) {
						if (res.confirm) {
							_this.handleCancelDrive()
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			// 乘客取消弹窗
			dialogTogglePassenger() {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '确认取消订单？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							_this.handleCancelPassenger()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 乘客取消
			handleCancelPassenger() {
				let rData = {}
				rData.parkingOrderId = this.orderId
				handleCancelPassengerApi(rData).then(res => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: "取消成功"
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
					this.getDetailApi()
				})
			},
			// 司机取消
			handleCancelDrive() {
				let rData = {}
				rData.parkingOrderId = this.orderId
				handleCancelDriveApi(rData).then(res => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: "取消成功"
						})


					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
					}
					this.getDetailApi()
				})
			},
			// 确认上车
			handleCommit() {
				let _this = this;
				// 获取位置
				dd.ready(function() {
					dd.device.geolocation.get({
						targetAccuracy: 200,
						coordinate: 1,
						withReGeocode: true,
						useCache: false, //默认是true，如果需要频繁获取地理位置，请设置false
						onSuccess: function(result) {
							_this.nowAddress.latitude = result.latitude
							_this.nowAddress.longitude = result.longitude
							// check
							let rData = {}
							rData.latitude = result.latitude
							rData.longitude = result.longitude
							rData.parkingOrderId = _this.orderDate.order.parkingOrderId
							handleGetOnCheckApi(rData).then(res => {
								let msg = "确认上车？"
								if (res.code !== 200) {
									msg = res.msg
								}
								uni.showModal({
									title: '提示',
									content: msg,
									success: function(res) {
										if (res.confirm) {
											let obj = {}
											obj.parkingOrderId = _this.orderDate
												.order.parkingOrderId
											obj.passengerStartLatitude = result
												.latitude
											obj.passengerStartLongitude = result
												.longitude
											handleConfirmRidingApi(obj).then(
												_res => {
													if (_res.code === 200) {
														uni.showToast({
															icon: 'none',
															title: "成功"
														})
													} else {
														uni.showToast({
															icon: 'none',
															title: _res
																.msg
														})
													}
													_this.getDetailApi()
												})
										} else if (res.cancel) {

										}
									}
								});
							})
						},
						onFail: function(err) {
							uni.showToast({
								icon: 'none',
								title: "获取当前位置失败，请重试"
							})
						}
					});
				});

			},


			// 确认下车 
			handleArrive() {
				let _this = this;
				// 获取位置
				dd.ready(function() {
					dd.device.geolocation.get({
						targetAccuracy: 200,
						coordinate: 1,
						withReGeocode: true,
						useCache: false, //默认是true，如果需要频繁获取地理位置，请设置false
						onSuccess: function(result) {
							_this.nowAddress.latitude = result.latitude
							_this.nowAddress.longitude = result.longitude
							// check
							let rData = {}
							rData.latitude = result.latitude
							rData.longitude = result.longitude
							rData.parkingOrderId = _this.orderDate.order.parkingOrderId
							handleGetOffCheckApi(rData).then(res => {
								let msg = "确认到达目的地？"
								if (res.code !== 200) {
									msg = res.msg
								}
								uni.showModal({
									title: '提示',
									content: msg,
									success: function(res) {
										if (res.confirm) {
											let obj = {}
											obj.parkingOrderId = _this.orderDate
												.order.parkingOrderId
											obj.passengerDestLongitude = result
												.longitude
											obj.passengerDestLatitude = result
												.latitude
											handleArriveApi(obj).then(_res => {
												if (_res.code === 200) {
													uni.showToast({
														icon: 'none',
														title: "成功"
													})
												} else {
													uni.showToast({
														icon: 'none',
														title: _res
															.msg
													})
												}
												_this.getDetailApi()
											})
										} else if (res.cancel) {

										}
									}
								});
							})
						},
						onFail: function(err) {
							uni.showToast({
								icon: 'none',
								title: "获取当前位置失败，请重试"
							})
						}
					});
				});

			},

			//点击姓名查看
			jumpPersionInfoByName(id) {
				uni.navigateTo({
					url: "/pages/persionInfo/persionInfo?userId=" + id
				})
			},
			jumpPersionInfo(orderPeerId, userId) {
				uni.navigateTo({
					url: `/pages/persionInfo/persionInfo?orderPeerId=${orderPeerId}&userId=${userId}&parkingOrderId=${this.orderId}`
				})
			},
			getDetailApi() {
				let requestData = {}
				requestData.parkingOrderId = this.orderId
				orderDetailApi(requestData).then(res => {
					this.orderDate = res.data
					// 用户无权限
					if (res.code === 102012) {
						uni.switchTab({
							url: '/pages/drivePage/drivePage'
						})
					}
				})
			}
		}

	}
</script>

<style>
	.header {
		/* margin-top: 20rpx; */
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.header-list {
		display: flex;
		padding: 0 20rpx;
		align-items: center;
	}

	.listContent-first {
		background: #fff;
		width: 90%;
		border-radius: 40rpx;
		padding: 10rpx 20rpx;
		margin-top: 20rpx;
		box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.38);
		font-family: Arial, Helvetica, sans-serif;
		font-size: 28rpx;
		color: #999;
	}

	.listContent {
		background: #fff;
		width: 670rpx;
		height: 150rpx;
		border-radius: 40rpx;
		padding: 10rpx 20rpx;
		margin-top: 20rpx;
		box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.38);
		font-family: Arial, Helvetica, sans-serif;
		font-size: 28rpx;
		color: #999;
	}

	.header-content {
		width: 100%;
		height: 150rpx;
		background: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-radius: 0 0 25rpx 25rpx;
	}

	.m-l_20 {
		margin-left: 20rpx;
	}

	.map-icon {
		width: 25rpx;
		height: 25rpx;
		margin-left: 20rpx;
	}

	.header-left {
		display: flex;
		justify-content: space-between;
	}

	.listContent-item {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}

	.address-icon {
		width: 50rpx;
		height: 50rpx;
	}

	.more-order {
		display: flex;
		/* width: 100%; */
		justify-content: center;
		align-items: center;
	}

	.more-order-btn {
		width: 170rpx;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 24rpx;
		background: #fff;
		color: #007aff;
		border: 1rpx solid;
	}

	.header-left-avatar {}

	.avatar-img {
		width: 85rpx;
		height: 85rpx;
		border-radius: 50%;
	}

	.header-left {
		display: flex;
		justify-content: space-between;
	}

	.header-left-info {
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		color: #999;
		font-size: 28rpx;
	}

	.header-left-info-ask {
		/* background: #000; */
		width: 150rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		color: #999;
		font-size: 30rpx;

	}

	.title-tag {
		text-align: center;
		background: skyblue;
		border: none;
		border-radius: 10rpx;
		color: #fff;
		font-size: 28rpx;
		font-weight: 600;
		width: 80rpx;
	}

	.plain-btn {
		width: 170rpx;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 18rpx;
		background: #fff;
		color: #007aff;
		border: 1rpx solid;
	}

	.ponint-circle-blue {
		width: 15rpx;
		height: 15rpx;
		margin-right: 20rpx;
		border-radius: 50%;
		background: #1296db;
	}

	.ponint-circle-green {
		width: 15rpx;
		height: 15rpx;
		margin-right: 20rpx;
		border-radius: 50%;
		background: #0e932e;
	}

	.listContent-between {
		justify-content: space-between;
	}

	.address-text {
		color: #222;
		font-size: 28rpx;

	}

	.remark-text {
		font-family: Arial, Helvetica, sans-serif;
		font-size: 28rpx;
		color: #999;

	}

	.header-right {
		/* margin-left: 200rpx; */
		display: flex;
		justify-content: space-between;
		width: 150rpx;
	}

	.header-right-info {
		/* background: #007aff; */
		display: flex;
		width: 100%;
		justify-content: space-around;
	}


	.dingding {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60rpx;
		height: 60rpx;
		border: 1rpx solid #eee;
		border-radius: 50%;
	}

	.dingding-ask {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50rpx;
		height: 50rpx;
		border: 1rpx solid #eee;
		border-radius: 50%;
	}

	.icon-img {
		width: 40rpx;
		height: 40rpx;
	}

	.icon-img-ask {
		width: 40rpx;
		height: 40rpx;
	}

	.header-footer {
		/* background: #efefef; */
		display: flex;
		border-top: 1rpx solid #eee;
	}

	.confirm-btn {
		width: 300rpx;
		height: 100rpx;
		line-height: 100rpx;
		color: #fff;
		background: #007aff;
		font-size: 28rpx;
		border-radius: 40rpx;
		box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.38);
	}

	.border--left {
		height: 30rpx;
		border-left: 1rpx solid #eee;
	}





	.reflash {
		position: absolute;
		right: 50rpx;
		top: 50rpx;
	}

	.reflash-img {
		width: 40rpx;
		height: 40rpx;
	}

	.content {
		margin-top: 30rpx;
		font-size: 30rpx;
		color: #999;
	}

	.content-list {
		display: flex;
		padding: 0 20rpx;
		align-items: center;
		margin: 10rpx 0;
	}

	.content-list-avater {
		display: flex;
		padding: 0 20rpx;
		align-items: flex-start;
		flex-direction: column;
	}

	.avater-list {
		display: flex;
		flex-wrap: wrap;
	}

	.avater {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20rpx;
	}

	.avater-img {
		width: 75rpx;
		height: 75rpx;
		border-radius: 50%;
	}

	.bottom {
		width: 100%;
		margin-top: 100rpx;
		display: flex;
		justify-content: center;
	}



	.info-phone-img {
		margin-left: 20rpx;
		width: 80rpx;
		height: 80rpx;
	}

	.phone-text {
		color: blue;
	}

	.footer {
		width: 100%;
		margin-top: 80rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.bottom-button {
		font-size: 28rpx;
		padding: 0 50rpx;
		border: none;
	}

	.refash {
		position: fixed;
		right: 50rpx;
		bottom: 5%;
		width: 80rpx;
		height: 80rpx;
		background: #fff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.38);
	}

	.refash-img {
		width: 60rpx;
		height: 60rpx;

	}

	.passenger-btn {
		width: 100%;
		display: flex;
		justify-content: space-around;
	}

	.need-help {
		width: 100%;
		display: flex;
		justify-content: center;
		color: #007aff;
		text-decoration: underline;
	}
</style>
