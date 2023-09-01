<template>
	<view class="grade">
		<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
			<uni-section title="对于本次乘客/司机的评价" type="line" padding>
				<uni-forms-item required name="rateValue">
				<uni-rate v-model="valiFormData.rateValue" />
				</uni-forms-item>
			</uni-section>
			<uni-section title="评价描述" type="line" padding>
				<uni-forms-item name="textdesc">
				<uni-easyinput type="textarea" v-model="valiFormData.textdesc" placeholder="请输入您的意见" />
				</uni-forms-item>
			</uni-section>
		</uni-forms>
		
	</view>
	<view class="footer">
		
	<button class="submit" type="primary" @click="submit('valiForm')">提交</button>
	</view>
</template>

<script>
	import {handleEvaluateDriveApi,handleEvaluatePassengerApi} from "@/api/handle.js"
	import {
		Debounce
	} from '@/utils/debounce.js'
	export default {
		data() {
			return {
				type:"",
				parkingOrderId:"",
				pId:"",
				valiFormData: {
					rateValue: "",
					textdesc: ""
				},
				// 校验规则
				rules: {
					rateValue: {
						rules: [{
							required: true,
							errorMessage: '不能为空'
						}]
					}
				},
			}
		},
		onLoad: function(option) {
			this.type=option.type
			this.parkingOrderId=option.parkingOrderId
			this.pId=option.pId
		},
		methods: {
			submit: Debounce(function(ref) {
				this.$refs[ref].validate().then(res => {
				//获取ID
				
				// 乘客评价
				if(this.type==0){
					let reqData = {}
					reqData.parkingOrderId = this.parkingOrderId
					reqData.level = this.valiFormData.rateValue
					reqData.evaluateDesc = this.valiFormData.textdesc
					handleEvaluatePassengerApi(reqData).then(res => {
						if (res.code === 200) {
							uni.showToast({
								title: '提交成功',
								icon: 'none',
								duration: 2000
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon:'none',
								duration: 1000
							})
						}
							uni.navigateTo({
								url: "/pages/orderList/orderList"
							})
					}).catch(err => {
						console.log(err)
					})
				}
				// 司机评价
				else{
					let reqData = {}
					reqData.level = this.valiFormData.rateValue
					reqData.evaluateDesc = this.valiFormData.textdesc
					reqData.parkingOrderId = this.parkingOrderId
					reqData.userId = this.pId
					handleEvaluateDriveApi(reqData).then(res => {
						if (res.code === 200) {
							uni.showToast({
								title: '提交成功',
								icon:'none',
								duration: 2000
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon:'none',
								duration: 1000
							})
						}
							uni.navigateTo({
								url: "/pages/orderList/orderList"
							})
					}).catch(err => {
						console.log(err)
					})
					
				}
				
			})})
		}
	}
</script>

<style>
	.footer{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.submit {
		width: 600rpx;
		/* margin-top: 500rpx; */
	}
</style>
