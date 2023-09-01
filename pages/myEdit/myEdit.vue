<template>
	<!-- 车牌号选择 -->
	<view class="contentCar">
		<!-- <button type="default" @click="addLicenseDialog">添加车牌</button> -->
		<cowain-add-license v-if="showLicenseDialog" @onCancel='cancelLicenseDialog' @onOk='okLicense' />
	</view>
	<view class="content">
		<text class=" weight mt_50">
			{{valiFormData.name}}
		</text>
		<text class=" weight">
			{{valiFormData.openId}}
		</text>
		<uni-forms class="mt_50" ref="valiForm" label-width="70px">
			<uni-forms-item label="手机号:">
				<uni-easyinput maxlength="20" v-model="valiFormData.mobile" placeholder="请输入内容"></uni-easyinput>
			</uni-forms-item>

			<uni-forms-item label="车牌号:">
				<view class="timePickerBox">
					<view class="uni-input" @click="addLicenseDialog">
						<text>
							{{valiFormData.plateNo||"请输入车牌"}}
						</text>


						<img v-if="valiFormData.plateNo" @click.stop="clearPlateNo()" class="close-icon"
							src="@/static/close.png" alt="">

					</view>
					<!-- <uni-easyinput @focus="addLicenseDialog" v-model="valiFormData.plateNo" placeholder="请输入车牌"></uni-easyinput> -->
				</view>
			</uni-forms-item>
			<!-- <uni-forms-item label="居住地:">
				<uni-easyinput maxlength="100" v-model="valiFormData.livePlace" placeholder="请输入内容"></uni-easyinput>
			</uni-forms-item> -->
		</uni-forms>
		<button class="submit-btn" type="primary" @click="userChangeProfile()">确认修改</button>
	</view>
	<view class="my-buttom">
		<img class="undraw_vehicle_sale_a645" src="@/static/undraw_vehicle_sale_a645.svg" alt="">
	</view>
</template>

<script>
	import {
		userProfileApi,
		userChangeProfileApi
	} from "@/api/user.js"
	export default {
		data() {
			return {
				from: '',
				showLicenseDialog: false, //是否显示添加车牌的dialog
				valiFormData: {
					name: "",
					openId: "",
					mobile: "",
					plateNo: "",
					livePlace: ""
				}
				// valiFormData:uni.getStorageSync('user')
			}
		},
		onLoad: function(option) {
			this.from = option.from
			this.getUserProfileApi()
		},
		methods: {
			// 获取数据
			getUserProfileApi() {
				userProfileApi().then(res => {
					this.valiFormData = res.data
				})
			},
			// 修改
			userChangeProfile() {
				let requestData = {}
				requestData.mobile = this.valiFormData.mobile
				requestData.plateNo = this.valiFormData.plateNo
				requestData.livePlace = this.valiFormData.livePlace
				userChangeProfileApi(requestData).then(res => {
					if (res.code === 200) {
						this.getUserProfileApi()
						let storeObj = uni.getStorageSync('user')
						storeObj.mobile = this.valiFormData.mobile
						uni.setStorageSync("user", storeObj)
						if (this.from) {
							uni.switchTab({
								url: "/pages/drivePage/drivePage"
							})
						}
					}
					uni.showToast({
						icon:'none',
						title: res.msg
					})
				})
			},
			//显示添加车牌
			addLicenseDialog() {
				this.showLicenseDialog = true;
			},
			clearPlateNo() {
				this.valiFormData.plateNo = ''
			},
			//取消添加车牌
			cancelLicenseDialog() {
				this.showLicenseDialog = false;
			},
			//添加车牌成功
			okLicense(license) {
				console.log(license);
				this.valiFormData.plateNo = license
			},
		}
	}
</script>

<style scoped>
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

	.submit-btn {
		width: 75%;
		align-self: center;
	}

	.contentCar {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.uni-input {
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
</style>
