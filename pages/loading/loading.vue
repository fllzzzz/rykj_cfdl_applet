<template>
	<view class="container">
		<img @click="backToIndex" class="logoImg" src="../../static/cfmoto_logo1.svg" alt="">
		<text class="logoTitle">春风顺风车</text>
	</view>
</template>

<script>
	import * as dd from "dingtalk-jsapi";
	import {
		authenticate
	} from "@/api/authentication.js"
	import {
		loginByCode
	} from "@/api/login.js"
	export default {
		data() {
			return {
				orderId: ''
			}
		},
		methods: {
			backToIndex() {
				uni.switchTab({
					url: "/pages/drivePage/drivePage"
				});
			}
		},
		onLoad: function(option) {
			this.orderId = option.orderId
			dd.biz.navigation.setRight({
				show: false, //控制按钮显示， true 显示， false 隐藏， 默认true
			})
			if (dd.env.platform == 'notInDingTalk') {
				uni.showToast({
					title: "请在钉钉中打开！",
					icon:'none',
				})
			}
			//  else if (dd.env.platform == 'pc') {
			// 	uni.showToast({
			// 		title: "请在手机端打开！"
			// 	})
			// } 
			else {
				authenticate()
				loginByCode(this.orderId)
				
			}

		}
	}
</script>

<style>
	.container {
		height: 75vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.logoImg {
		width: 20%;
		height: 20%;
	}

	.logoTitle {
		margin-top: 20rpx;
		color: gray;
		font-size: 36rpx;
	}
</style>
