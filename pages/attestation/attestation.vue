<template>
	<!-- 车牌号选择 -->
	<view class="contentCar">
		<!-- <button type="default" @click="addLicenseDialog">添加车牌</button> -->
		<cowain-add-license v-if="showLicenseDialog" @onCancel='cancelLicenseDialog' @onOk='okLicense' />
	</view>

	<!-- 车主认证 -->
	<view class="header">
		<view class="header-title">
			成为顺风车车主
		</view>
		<view class="header-text">
			请确保以下信息均为本人并且真实有效，平台将严格按照隐私政策保护你的个人信息。
		</view>
		<view class="undraw"><img class="undraw_city_driver_re_9xyv" src="@/static/undraw_city_driver_re_9xyv.svg"
				alt=""></view>
	</view>
	<view class="content">
		<view class="content-item">
			<view class="item-right">
				<!-- <view class="item-title">车牌号</view> -->
				<view class="timePickerBox">
					<view class="uni-input" @click="addLicenseDialog">
						<text>
							{{plateNo||"请输入车牌"}}

						</text>
						<img v-if="plateNo" @click.stop="clearPlateNo()" class="close-icon" src="@/static/close.png"
							alt="">
					</view>
				</view>
			</view>
		</view>
		<view class="content-item">
			<view class="item-right">
				<view class="item-title">驾驶证</view>
				<view class="item-text">准驾车型C2以上，需拍驾驶证进行上传</view>
			</view>
			<view class="item-left">
				<button type="primary" size="mini" @click="upLoadImg(1)">去上传</button>
			</view>
		</view>
		<view class="content-item">
			<view class="item-right">
				<view class="item-title">行驶证</view>
				<view class="item-text">需要本人车辆才可认证，需拍行驶证进行上传</view>
			</view>
			<view class="item-left">
				<button type="primary" size="mini">去上传</button>
			</view>
		</view>

	</view>
	<view class="footer">
		<button class="submit-btn" type="primary">提交车主认证</button>
	</view>
</template>

<script>
	import * as dd from "dingtalk-jsapi";
	import {userUploadFileApi} from "@/api/user.js"
	export default {
		data() {
			return {
				showLicenseDialog: false,
				plateNo: ''
			}
		},
		methods: {
			upLoadImg() {
				alert("开始")
				dd.biz.util.chooseImage({				
					count: 1,
					secret: false,
					sourceType: ['camera'],
					position: ['back'],
					onSuccess: (res) => {
						alert("获取图片"+JSON.stringify(res))	
																	
					},
					onFail: (err) => {
						console.log(JSON.stringify(err))
					}
				})
			},
			//显示添加车牌
			addLicenseDialog() {
				this.showLicenseDialog = true;
			},
			clearPlateNo() {
				this.plateNo = ''
			},
			//取消添加车牌
			cancelLicenseDialog() {
				this.showLicenseDialog = false;
			},
			//添加车牌成功
			okLicense(license) {
				this.plateNo = license
				console.log(license);

			},
		}
	}
</script>

<style>
	.contentCar {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.header {
		display: flex;
		flex-direction: column;
		padding: 50rpx 20rpx;
	}

	.header-title {
		font-size: 50rpx;
		font-weight: 400;
	}

	.header-text {
		font-size: 26rpx;
		color: #666;
		margin-top: 20rpx;
		line-height: 40rpx;
	}

	.undraw {
		margin-top: 50rpx;
	}

	.undraw_city_driver_re_9xyv {
		width: 100%;
		height: 250rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		position: relative;
	}

	.content-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #eee;
		padding: 30rpx 0;
	}

	.uni-input {
		width: 400rpx;
		height: 70rpx;
		line-height: 70rpx;
		color: gray;
		/* text-align: center; */
		border: 1px solid #ddd;
		border-radius: 10rpx;
		background: #fff;
		text-align: start;
		padding-left: 20rpx;
		padding-right: 15rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.close-icon {
		width: 42rpx;
		height: 42rpx;
		opacity: 0.5;
	}

	.item-title {
		font-size: 36rpx;
	}

	.item-text {
		height: 60rpx;
		line-height: 60rpx;
		color: #666;
		font-size: 24rpx;

	}

	.footer {
		margin-top: 50px;
	}

	.submit-btn {
		width: 80%;
	}
</style>
