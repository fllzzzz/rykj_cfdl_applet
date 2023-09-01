<template>
	<view class="notice-content" v-if="pendingDate.length>0">
		<view class="notice-content-title" @click="showNotice=!showNotice"><text class="title-text">您有<text
					class="number-text">{{pendingDate.length}}</text>笔进行中的订单</text>
			<view class="notice-item-arror"><img class="arror-img" src="@/static/drivePage_right.png">
				<view class="red-point"></view>
			</view>
		</view>
		<view v-if="showNotice">
			<view class="notice-item" v-for="(item,index) in pendingDate" @click="jumpOrderDetail(item)">
				<view class="notice-item-title">
					<text class="search-text">{{item.orderStateMsg}}</text>
					<text
						class="time-text">{{item.orderTimeShow}}</text></view>
				<view class="notice-item-info">
					<view>
						<view class="listContent-item">
							<!-- <span class="ponint-circle-blue-item"></span> -->
							<img class="address-icon" src="@/static/start-l.png">
							<text class="address-text" selectable>{{item.startAddress}}</text>
							<text v-if="item.startDistanceShow" class="distance-show">{{item.startDistanceShow}}</text>					
						</view>
						<view class="listContent-item">
							<!-- <span class="ponint-circle-green-item"></span> -->
							<img class="address-icon" src="@/static/end-l.png">
							<text class="address-text" selectable>{{item.destAddress}}</text>
							<text v-if="item.destDistanceShow" class="distance-show">{{item.destDistanceShow}}</text>					
						</view>
					</view>
					<view class="notice-item-arror"><img class="arror-img" src="@/static/drivePage_right.png">
					</view>
				</view>
			</view>
		</view>
	</view>
	<view class="content">
		<view class="refash" @click="refash()">
			<img class="refash-img" src="@/static/reflash.svg">
		</view>
		<uni-forms>
			<uni-forms-item name="name">
				<view class="search-form">
					<view class="search-view">

						<uni-easyinput @focus="jumperAddress(2)" @clear="clearData(2)" class="search-input"
							prefixIcon="location-filled" v-model="startAddressInfo.title" placeholder="请选择起始点" />
					</view>
					<view class="search-view">
						<uni-easyinput @focus="jumperAddress(3)" @clear="clearData(3)" class="search-input" prefixIcon="location-filled"
							v-model="destAddressInfo.title" placeholder="请选择目的地" />
					</view>

					<!-- <button class="search-button" size="mini" type="primary" @click="getData()">筛选</button> -->
				</view>
			</uni-forms-item>
		</uni-forms>
		<view v-for="(item,index) in tableData" :key="item.parkingOrderId" class="orderList">
			<view class="listHeader">
				<view class="listContent-list listHeader-list">
					<view class="listHeader-data">
						<view>
							<text class="listHeader-text">{{item.orderTimeShow}}</text>
						</view>
						<view class="border--left"></view>
						<view class="passengerNum"><text class="listHeader-text">{{item.passengerNum}}人</text></view>
					</view>
					<view v-if="item.userId!==userId">
						<view v-if="item.requestFlag===1" @click="handleConfirm(item.parkingOrderId,index)"><button
								class="order-button">请求搭车</button></view>
						<view v-else-if="item.requestFlag===2"><button class="order-button warn-btn"
								@click="dialogToggle(item.parkingOrderId,index)">取消请求</button></view>
					</view>
				</view>
			</view>
			<view class="listContent">
				<view class="listContent-list" @tap="openMap(item.startLongitude,item.startLatitude,item.startAddress)">
					<!-- <span class="ponint-circle-blue"></span> -->
					<img class="address-icon" src="@/static/start-l.png">
					<text selectable class="address-text">{{item.startCounty}}{{item.startAddress}}</text>
					<text class="distance-show" v-if="item.startDistanceShow">{{item.startDistanceShow}}</text>
					<img class="map-icon" src="@/static/map.png" alt="">
				</view>
				<view class="listContent-list" @tap="openMap(item.destLongitude,item.destLatitude,item.destAddress)">
					<!-- <span class="ponint-circle-green"></span> -->
					<img class="address-icon" src="@/static/end-l.png">
					<text selectable class="address-text">{{item.destCounty}}{{item.destAddress}}</text>
					<text class="distance-show" v-if="item.destDistanceShow">{{item.destDistanceShow}}</text>
					<img class="map-icon" src="@/static/map.png" alt="">
				</view>
				<view>
				</view>
				<view v-if="item.remark" class="listContent-list"><text class="remark-text">{{item.remark}}</text>
				</view>
			</view>
			<view class="listFooter">
				<view class="list-info" @click="jumperPersionInfo(item.userId)">
					<view v-if="item.avatar" class="avatar-item"><img class="avater-img" :src="item.avatar"></view>
					<view v-else class="avatar-item"><img class="avater-img" src="@/static/my_avater.png"></view>
					<view class="name-item">{{item.name}}</view>
					<view class="star-item"><img class="star-item-img"
							src="@/static/travel-star.png"><text>{{item.driveMark}}</text></view>
				</view>
			</view>
		</view>
		<view class="undraw"><img class="undraw_city_driver_re_9xyv" src="@/static/undraw_city_driver_re_9xyv.svg"
				alt=""></view>
		<uni-load-more :status="statusLoadMore" />
	</view>
	<!-- 提示窗示例 -->
	<view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="warn" cancelText="再想想" confirmText="确定" title="通知" content="确定取消预约吗？"
				@confirm="handleCancel()"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>
<script>
	import * as dd from 'dingtalk-jsapi'
	import {
		orderPage,
		pendingPassengerApi
	} from "@/api/order"
	import {
		handleConfirmApi,
		handleCancelApi
	} from "@/api/handle"

	import {
		userProfileApi
	} from '@/api/user.js'
	import {
		useaddressStore
	} from '@/store/modules/address'
	const addressStore = useaddressStore()
	export default {
		data() {
			return {
				showNotice: false,
				userId: uni.getStorageSync('user').userId,
				// 快捷入口数据
				pendingDate: [],
				textValue: "您有未完成的订单：",
				name: '',
				// 加载状态
				statusLoadMore: 'more',
				pageNo: 1,
				pageSize: 10,
				// 数据总量
				total: 0,
				tableData: [],

				startAddress: addressStore.travelAddressStart,
				destAddress: addressStore.travelAddressEnd,
				// 订单id
				orderId: "",
				orderIndex: 0
			}
		},

		//下拉刷新
		onPullDownRefresh() {
		
			this.pageNo = 1
			this.getData()
			//加载完成停止刷新
			uni.stopPullDownRefresh();
		},
		//上拉加载
		onReachBottom() {
			if (this.tableData.length >= this.total) {
				this.statusLoadMore = "noMore"
			} else {
				//否则，页码+1，继续请求列表
				this.pageNo++
				this.getData()
			}
		},
		onShow: function() {
			this.pageNo = 1
			this.startAddressInfo = addressStore.travelAddressStart
			this.destAddressInfo = addressStore.travelAddressEnd
			this.getData()
			this.getPendingPassenger()
		},
		methods: {
			clearData(type){
				addressStore.resetData(type)
				this.startAddressInfo = addressStore.travelAddressStart
				this.destAddressInfo = addressStore.travelAddressEnd
				this.refash()
			},
			jumperAddress(type) {
				addressStore.setAddressType(type)
				uni.navigateTo({
					url: "/pages/addressSelector/addressSelector"
				})
			},
			openMap(longitude,latitude,title) {
				dd.ready(function() {
					dd.biz.map.view({
						latitude: latitude, // 纬度
						longitude: longitude, // 经度
						title: title ,// 地址/POI名称
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
			refash() {
				this.pageNo = 1
				this.getData()
				this.getPendingPassenger()
			},
			jumperPersionInfo(id) {
				uni.navigateTo({
					url: "/pages/persionInfo/persionInfo?userId=" + id
				})
			},
			jumpOrderDetail(obj) {
				// addressStore.setAllInfo(obj)
				uni.navigateTo({
					url: `/pages/orderDetail/orderDetail?orderId=${obj.parkingOrderId}`
				})
			},
			// 乘客请求搭乘
			handleConfirm(parkingOrderId, index) {
				let requestData = {}
				requestData.parkingOrderId = parkingOrderId
				handleConfirmApi(requestData).then(res => {
					
					// 请求成功后刷新数据
					if (res.code === 200) {
						uni.showToast({
							icon:'none',
							title: res.msg
						})
						// this.getPendingPassenger()
						this.tableData[index].requestFlag = 2
					}else{
						uni.showModal({
							title: '提示',
							content: res.msg,
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
						this.pageNo = 1
						this.getData()
					}

				})
			},
			// 取消确认
			dialogToggle(id, index) {
				this.orderId = id
				this.orderIndex = index
				this.$refs.alertDialog.open()
			},
			// 乘客取消请求搭乘
			handleCancel() {
				let requestData = {}
				requestData.parkingOrderId = this.orderId
				handleCancelApi(requestData).then(res => {				
						uni.showToast({
							icon:'none',
							title: res.msg
						})
					if (res.code === 200) {
						this.tableData[this.orderIndex].requestFlag = 1
					}
					else{
						this.getData()
					}
				})
			},
			getPendingPassenger() {
				pendingPassengerApi().then(res => {
					this.pendingDate = res.data
				})
			},
			// 获取数据
			 getData() {
				this.statusLoadMore = "loading"
				let requestData = {}
				requestData.pageNo = this.pageNo
				requestData.pageSize = this.pageSize
				requestData.passengerStartLongitude = this.startAddressInfo.longitude
				requestData.passengerStartLatitude = this.startAddressInfo.latitude				
				requestData.passengerDestLongitude = this.destAddressInfo.longitude
				requestData.passengerDestLatitude = this.destAddressInfo.latitude
				orderPage(requestData).then(res => {
					if (this.pageNo === 1) {
						this.tableData = res.data.list
					} else {
						this.tableData.push(...res.data.list)
					}
					this.total = res.data.total
					if (res.data.total > 10) {
						this.statusLoadMore = "more"
					} else {
						this.statusLoadMore = "no-more"
					}

				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>
<style scoped>
	.content {
		margin-top: 20rpx;
		position: relative;
		padding: 0 20rpx;
	}

	.notice-content {
		background: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 15rpx 0;
		/* box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.5); */
		margin: 22rpx;
		border-radius: 10rpx;
		margin-top: 20rpx;
	}

	.notice-content-title {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 640rpx;
		height: 60rpx;
		/* line-height: 60rpx; */
	}

	.red-point {
		position: absolute;
		left: -20rpx;
		top: 5rpx;
		width: 16rpx;
		height: 16rpx;
		background: #f65945;
		border-radius: 50%;
		box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.5);
	}

	.notice-item {
		padding: 10rpx 0;
		border-top: 1rpx solid #eee;
	}

	.notice-item-title {
		height: 40rpx;
	}

	.notice-item-info {
		display: flex;
		justify-content: space-between;
		width: 640rpx;
		overflow: hidden;

	}

	.arror-img {
		width: 30rpx;
		height: 30rpx;
	}

	.title-text {
		font-size: 32rpx;
		font-weight: 520;
	}

	.number-text {
		color: #1296db;
	}

	.search-view {
		width: 49%;
	}
	.address-icon {
		width: 50rpx;
		height: 50rpx;
	}
	.distance-show{
	margin-left: 20rpx;
	}
	.search-text {
		color: #1296db;
		font-size: 28rpx;
		font-weight: 500;
		margin-right: 20rpx;
	}

	.time-text {
		color: #999;
		font-size: 28rpx;
	}

	/* .address-text {
		font-size: 30rpx;
		font-weight: 520;
	} */

	.listContent-item {
		display: flex;
		align-items: center;
		width: 100%;
		margin-top: 10rpx;
		/* height: 60rpx; */
	}

	.ponint-circle-blue-item {
		width: 15rpx;
		height: 15rpx;
		margin-right: 20rpx;
		border-radius: 50%;
		background: #1296db;
	}

	.map-icon {
		margin-left: 20rpx;
		width: 25rpx;
		height: 25rpx;
	}

	.ponint-circle-green-item {
		width: 15rpx;
		height: 15rpx;
		margin-right: 20rpx;
		border-radius: 50%;
		background: #0e932e;
	}





	.search-form {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.search-button {
		margin-left: 15rpx;
		height: 60rpx;
		line-height: 60rpx;
	}

	.orderList {
		background-color: #fff;
		margin-top: 10rpx;
		padding: 20rpx;
		border-radius: 25rpx;
	}

	.listHeader {
		height: 40rpx;
		display: flex;
		flex-direction: row;
		align-items: center;

	}

	.listHeader-data {
		display: flex;
		align-items: center;
	}

	.listHeader-list {
		justify-content: space-between;
		align-items: center;
	}

	.address-text {
		/* width: 90%; */
		font-size: 26rpx;
	}

	.border--left {
		margin-left: 20rpx;
		height: 20rpx;
		border-left: 1rpx solid #777;
	}

	.listHeader-text {
		/* margin: 0 20rpx; */
		font-size: 30rpx;
		font-weight: 600;
	}

	.listTitle {
		font-size: 36rpx;
	}

	.order-button {
		background-color: #007aff;
		color: white;
		overflow: visible;
		display: inline-block;
		text-align: center;
		width: 160rpx;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 24rpx;
	}

	.warn-btn {
		background-color: #d6204b;
	}

	.listContent {
		margin-top: 20rpx;
		border-top: 1px solid #eee;
	}

	.remark-text {
		font-size: 18rpx;
		color: #999;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.listContent-list {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #555;
		width: 100%;
		margin: 20rpx 0;
		overflow: hidden;
	}

	.passengerNum {
		margin-left: 20rpx;
	}

	.undraw {
		padding: 50rpx;
	}

	.undraw_city_driver_re_9xyv {
		width: 100%;
		height: 250rpx;
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

	.listFooter {
		border-top: 1rpx solid #eee;
		display: flex;
		align-items: center;
		height: 70rpx;
		/* line-height: 70rpx; */
	}

	.list-info {
		display: flex;
		margin-top: 20rpx;
		height: 70rpx;
		width: 35%;
		align-items: center;
		justify-content: space-around;
		font-size: 28rpx;
		font-weight: 200;
		color: #999;
	}

	.avater-img {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
	}

	.star-item {
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}

	.star-item-img {
		margin-right: 10rpx;
		width: 30rpx;
		height: 30rpx;
	}

	.refash {
		z-index: 99;
		position: fixed;
		right: 50rpx;
		bottom: 10%;
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
</style>
