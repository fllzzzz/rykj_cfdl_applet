<template>
	<view class="my-info" @click="handleNavigateTo('myEdit')">
		<!-- <uni-list-item   :title="nickName" note="修改个人信息>" :thumb=showAvatar thumb-size="lg" /> -->
		<uni-list-item :title="userData.name" note="修改个人信息>">
			<template v-slot:header>
				<image v-if="userData.avatar" class="slot-image" :src="userData.avatar" mode="widthFix"></image>
				<image v-else class="slot-image" src="@/static/my_avater.png" mode="widthFix"></image>
			</template>
		</uni-list-item>
		<!-- <view class="vehicleEntrybtn">车辆录入</view> -->
	</view>
	<view class="my-content">
		<view @click="handleNavigateTo('orderList')">
			<uni-list-item title="订单记录" showArrow thumb="../../static/my_order.png" thumb-size="sm" />
		</view>
		<!-- <view @click="handleNavigateTo('score')">
			<uni-list-item title="积分记录" showArrow thumb="../../static/my_integral.png" thumb-size="sm"
				:rightText="scoreShow" />
		</view> -->
		<view @click="handleNavigateTo('usualAddress')">
			<uni-list-item title="常用地址" showArrow thumb="../../static/address.png" thumb-size="sm"
				/>
		</view>
		<!-- <view @click="handleNavigateTo('attestation')">
			<uni-list-item title="车主认证" showArrow thumb="../../static/my_attestation.png" thumb-size="sm"
				/>
		</view> -->
	</view>
	<view class="my-menu">
		<view class="inter" @click="handleNavigateTo('notice')">
			<img class="image" src="@/static/my_notice.png" alt="">
			<text>
				须知公告
			</text>
		</view>
		<!-- <view class="inter" @click="handleNavigateTo('integrationRule')">
			<img class="image" src="@/static/my_conversion.png" alt="">
			<text>
				积分兑换规则
			</text>
		</view> -->
		<view class="inter" @click="dingdingTalk()">
			<img class="image" src="@/static/my_help.png" alt="">
			<text>
				联系管理员
			</text>
		</view>
	</view>
	<view class="my-buttom">
		<img class="undraw_vehicle_sale_a645" src="@/static/undraw_vehicle_sale_a645.svg" alt="">
	</view>
	<view class="bottomFixed">
		<!-- <button @click="clearStore()">clearStorage</button> -->
		<!-- <button @click="openMap()">openMap</button> -->
		<view>
			<sapn class="bottomText">Copyright © 2022 浙江春风动力集团</sapn>
		</view>
		<view>
			<sapn class="bottomText">版本version: {{version}}</sapn>
		</view>
		<view>
			<sapn v-if="envIndex==='dev'" class="bottomText">TEST</sapn>
		</view>

	</view>
</template>

<script>
	import * as dd from 'dingtalk-jsapi'
	import {
		userProfileApi
	} from "@/api/user.js"
	export default {
		data() {
			return {
				version: getApp().globalData.version,
				myUrl: getApp().globalData.baseUrl,
				envIndex: getApp().globalData.envIndex,
				userData: {}
			}
		},
		computed: {
			scoreShow() {
				return `${this.userData.totalScore}积分`
			},
		},
		onShow() {
			this.getUserProfile()	
			},
		methods: {
			handleNavigateTo(path){
				console.log(path);
				uni.navigateTo({
					url:`/pages/${path}/${path}`
				})
			},
			dingdingTalk() {
					dd.biz.chat.openSingleChat({
						corpId: 'dingb32dfe3fb37ee75c35c2f4657eb6378f', // 企业id,必须是用户所属的企业的corpid
						userId: 'CFDL09860', // 用户的uerid
						onSuccess: function(a) {
						},
						onFail: function(err) {
							// 调用失败时回调
						}
					})
			},
			clearStore() {
				try {
					uni.clearStorageSync();
				} catch (e) {
					uni.showModal({
						title: "清除失败" + e
					})
				}
			},		

			getUserProfile() {
				userProfileApi().then(res => {
					this.userData = res.data
				})
			},			
			showUnfinish() {
				uni.showToast({
					icon:'none',
					title: '开发中...',
					duration: 2000
					
				});
			}

		}
	}
</script>

<style scoped>
	.my-info {
		border-radius: 0 0 50rpx 50rpx;
		background: #fff;
		width: 100%;
		height: 200rpx;
		display: flex;
		justify-content: space-between;
	}

	.my-content {
		margin: 30rpx 0;
	}

	.my-menu {
		background: #fff;
		width: 100%;
		height: 200rpx;
		border-radius: 50rpx;
		display: flex;
		align-items: center;
	}

	.inter {
		margin: 0 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 25rpx;
		
	}
	.image {
		width: 60rpx;
		height: 60rpx;
	}

	.my-buttom {
		width: 100%;
		height: 500rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.undraw_vehicle_sale_a645 {
		width: 70%;
	}

	.bottomFixed {
		width: 100%;
		text-align: center;
		display: flex;
		flex-direction: column;
		color: #888;
		font-size: 18rpx;
	}

	.slot-image {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		border-radius: 50%;
		margin-right: 10px;
		width: 80rpx;
		height: 80rpx;
	}
	/* .vehicleEntrybtn{
		border: 1px solid red;
		color: #353fcb;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 10px;
		font-size: 14px;
	} */
</style>
