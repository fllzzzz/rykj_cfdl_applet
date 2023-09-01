<template>

	<view class="header">
		<view class="header-left">
			<view class="header-left-avatar">
				<img v-if="tableData.avatar" class="avatar-img" :src="tableData.avatar" alt="">
				<img v-else class="avatar-img" src="@/static/my_avater.png" alt="">
			</view>
			<view class="header-left-info">
				<view class="name">{{tableData.name}}</view>
				<view v-if="tableData.plateNo" class="info-detail">
					<text class="info-plateNo">{{tableData.plateNo}}</text>
				</view>
			</view>
		</view>
		<view class="header-right">
			<view class="dingding" @tap="phoneCall(tableData.mobile)"><img class="icon-img" src="@/static/tel.png">
			</view>
			<view class="dingding" @tap="dingdingTalk()"><img class="icon-img" src="@/static/msg.png"></view>
		</view>
	</view>

	<!-- <view v-if="tableData.livePlace" class="location">
		<view class="icon-location"><img class="icon-location-img" src="@/static/address.png" alt=""></view>
		<view class="address"><text class="address-text">{{tableData.livePlace}}</text></view>
	</view> -->
	<view class="content-list">
		<view class="list-item">
			<view><text class="list-item-times">{{tableData.driveTime}}</text> <text class="list-item-text"
					style="color: #000;font-weight: 600;">次</text></view>
			<view class="list-item-text">开车次数</view>
		</view>
		<view class="border--left"></view>
		<view class="list-item">
			<view><text class="list-item-times">{{tableData.driveTotalKilometers}}</text> <text class="list-item-text"
					style="color: #000;font-weight: 600;">KM</text></view>
			<view class="list-item-text">开车总里程</view>
		</view>
	</view>
	<view class="content-list">
		<view class="list-item">
			<view><text class="list-item-times">{{tableData.rideTime}}</text> <text class="list-item-text"
					style="color: #000;font-weight: 600;">次</text></view>
			<view class="list-item-text">搭车次数</view>
		</view>
		<view class="border--left"></view>
		<view class="list-item">
			<view><text class="list-item-times">{{tableData.rideTotalKilometers}}</text> <text class="list-item-text"
					style="color: #000;font-weight: 600;">KM</text></view>
			<view class="list-item-text">搭车总里程</view>
		</view>
	</view>
	<view class="content-list">
		<view class="list-item">
			<view>
				<uni-rate :value="tableData.driveMark" readonly />
			</view>
			<view class="list-item-text">车主评价分</view>
		</view>
		<view class="border--left"></view>
		<view class="list-item">
			<view>
				<uni-rate :value="tableData.rideMark" readonly />
			</view>
			<view class="list-item-text">乘客评价分</view>
		</view>
	</view>
</template>

<script>
	import * as dd from 'dingtalk-jsapi'
	import {
		getAuthInfo
	} from "@/api/user";
	import {
		userOtherprofileApi
	} from "@/api/user.js"
	import {
		handleConfirmPeerApi
	} from "@/api/handle.js"
	export default {
		data() {
			return {
				userId: "",
				parkingOrderId: "",
				orderPeerId: "",
				tableData: []
			}
		},
		onLoad: function(option) {
			this.orderPeerId = option.orderPeerId
			this.userId = option.userId
			this.parkingOrderId = option.parkingOrderId
		},
		onShow() {
			this.getserOtherprofile()
		},
		methods: {
			dingdingTalk() {
					dd.biz.chat.openSingleChat({
						corpId: 'dingb32dfe3fb37ee75c35c2f4657eb6378f', // 企业id,必须是用户所属的企业的corpid
						userId: this.tableData.jobNumber, // 用户的uerid
						onSuccess: function(a) {
						},
						onFail: function(err) {
							// 调用失败时回调
						}
					})
				
			},
			phoneCall(phone) {
					dd.biz.telephone.showCallMenu({
						phoneNumber: phone, // 期望拨打的电话号码
						showDingCall: true, // 是否显示钉钉电话
						onSuccess: function() {},
						onFail: function(err) {
						}
					})
				
			},
			// 获取他人信息
			getserOtherprofile() {
				let re = {}
				re.userId = this.userId
				userOtherprofileApi(re).then(res => {
					this.tableData = res.data
				})
			}



		}
	}
</script>

<style scoped>
	.header {
		width: 100%;
		height: 200rpx;
		background: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-radius: 0 0 25rpx 25rpx;
	}

	.header-left-avatar {

		/* margin-left: 40rpx; */
		width: 110rpx;
	}

	.avatar-img {
		width: 85rpx;
		height: 85rpx;
		border-radius: 50%;
	}

	.header-left {
		display: flex;
		/* width: 280rpx; */
		/* background: #000; */
		justify-content: space-between;
	}

	.header-left-info {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		color: #999;
		font-size: 28rpx;
	}

	.header-right {
		margin-left: 200rpx;
		display: flex;
		justify-content: space-between;
		width: 150rpx;
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

	.icon-img {
		width: 40rpx;
		height: 40rpx;
	}

	.location {
		margin-top: 30rpx;
		width: 100%;
		height: 100rpx;
		background: #fff;
		display: flex;
		/* justify-content: space-around; */
		align-items: center;
		border-radius: 50rpx;
	}

	.icon-location {
		margin-left: 30rpx;
		width: 50rpx;
		height: 50rpx;

	}

	.icon-location-img {
		width: 50rpx;
		height: 50rpx;
	}

	.address {
		margin-left: 20rpx;
		font-size: 28rpx;
		color: #999;
	}

	.address-text {
		overflow-wrap: anywhere;
	}

	.content-list {
		margin-top: 30rpx;
		width: 100%;
		height: 200rpx;
		background: #fff;
		border-radius: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		/* flex-direction: column; */
	}

	.list-item {
		width: 50%;
		height: 80rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.border--left {
		height: 30rpx;
		border-left: 1rpx solid #eee;
	}

	.list-item-times {
		font-size: 36rpx;
		font-weight: 800;
	}

	.list-item-text {
		font-size: 24rpx;
		font-weight: 200;
		color: #999;
	}

	.star-img {
		width: 40rpx;
		height: 40rpx;
	}



	.content {
		padding: 30rpx;
		display: flex;
		flex-direction: column;
	}

	.weight {
		font-size: 36rpx;
		font-weight: 550;
		margin-bottom: 10rpx;
	}

	.mt_50 {
		margin-top: 50rpx;
	}

	.m-l_20 {
		margin-left: 20rpx;
	}

	.info {
		display: flex;
		align-items: center;
		font-size: 30rpx;
		color: #555;
		margin-bottom: 10rpx;
	}

	.info-plateNo {
		padding: 10rpx;
		background: #007aff;
		color: #fff;
		border-radius: 10rpx;
	}

	.info-phone {
		color: blue;
		text-decoration: underline;
	}

	.info-phone-img {
		width: 50rpx;
		height: 50rpx;
	}

	.dingTalk {
		margin-top: 50rpx;
		width: 100%;
		text-align: center;
	}

	.dingTalk-img {
		width: 120rpx;

		height: 120rpx;
	}

	.submit {
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
	}

	.submit-button {
		width: 50%;
	}
</style>
