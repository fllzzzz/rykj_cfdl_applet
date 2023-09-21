<template>
	<view class="lotteryBox">
		<view class="timeBox">
			<view class="timelist"> 
				<view class="title">
					报名时间 ：
				</view>
				<view class="message">
				{{lotteryData.applyStartTime}} — {{lotteryData.applyEndTime}}
				</view>
			</view>
			<view class="timelist">
				<view class="title">
					车位有效期 ：
				</view>
				<view class="message">
				{{lotteryData.validStartDate}} — {{lotteryData.validEndDate}}
				</view>
			</view>
			<view class="timelist" v-if="!lotteryData.timeState">
				<view class="title">
					摇号结果 ：
				</view>
				<view class="message">
					<uni-notice-bar v-if="lotteryData.resultColor=='0'" color="#909399" background-color="#f4f4f5" single :text="lotteryData.result"></uni-notice-bar>
					<uni-notice-bar v-if="lotteryData.resultColor=='1'" color="#909399" background-color="#f4f4f5" single :text="lotteryData.result"></uni-notice-bar>
					<uni-notice-bar v-if="lotteryData.resultColor=='2'" color="#909399" background-color="#f4f4f5" single :text="lotteryData.result"></uni-notice-bar>
					<uni-notice-bar v-if="lotteryData.resultColor=='3'" color="#fa3534" background-color="#fef0f0" single :text="lotteryData.result"></uni-notice-bar>
					<uni-notice-bar v-if="lotteryData.resultColor=='4'" color="#19be6b" background-color="#dbf1e1" single :text="lotteryData.result"></uni-notice-bar>
				</view>
			</view>
		</view>
		<view class="btns" v-if="lotteryData.timeState">
			<button v-if="!lotteryData.applyState" class="submit-btn" type="primary" @click="submit()">申请摇号</button>
			<button v-else class="submit-btn" type="primary" @click="cancel()">取消申请</button>
		</view>
	</view>
</template>

<script>
	import { lotteryInfo , lotteryCancel , lotteryApply } from "@/api/lottery.js"
	export default {
		data() {
			return {
				lotteryData:{
					// applyEndTime: "2023-09-19T02:26:56.099Z",
					// applyStartTime: "2023-09-19T02:26:56.099Z",
					// applyState: true,
					// batchId: 0,
					// result: "测试数据结果",
					// resultColor:'0',
					// timeState: true,
					// validEndDate: "2023-09-19T02:26:56.099Z",
					// validStartDate: "2023-09-19T02:26:56.099Z",
					applyEndTime: "",
					applyStartTime: "",
					applyState: true,
					batchId: 0,
					result: "",
					resultColor:'0',
					timeState: true,
					validEndDate: "",
					validStartDate: ""
				}
			}
		},
		methods: {
			async getLotteryInfo(){
				const res = await lotteryInfo()
				console.log(res);
				this.lotteryData=res.data
			},
			async submit(){
				console.log("提交申请");
				try{
					const res = await lotteryApply()
					if(res.code==200){
						this.lotteryData.applyState=true
						uni.showToast({
							title: "申请成功",
							icon:'none',
						})
					}
				}catch(e){
					console.log(e);
				}
				
			},
			async cancel(){
				console.log("取消申请");
				try{
					const res = await lotteryCancel()
					if(res.code==200){
						this.lotteryData.applyState=false
						uni.showToast({
							title: "取消成功",
							icon:'none',
						})
					}
				}catch(e){
					
				}
				
			}
		},
		onLoad() {
			this.getLotteryInfo()
		}
	}
</script>

<style scoped lang="scss">
.lotteryBox{
	font-size: 14px;
	padding: 20rpx;
	.timeBox{
		border-radius: 10px;
		padding: 30rpx;
		border-radius: 50rpx;
		box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.5);
		.timelist{
			margin-top: 10px;
			.title{
				// font-size: 16px;
				font-weight: bold;
			}
			.message{
				margin: 5rpx 0 0 5rpx;
				color: #9a9a9a;
			}
		}
		
	}
	.btns{
		margin-top: 20px;
	}
	.centerBox{
		margin-top: 30rpx;
	}
}


</style>
