<template>
	<view class="lotteryManagementBox">
		<view class="list" @click="handleNavigateTo('lottery')">申请摇号</view>
		<view class="list" @click="handleNavigateTo('lotteryRecord')">摇号记录</view>
		<view class="list" @click="handleNavigateTo('freeParking')">车位转赠</view>
		<view class="list" @click="handleNavigateTo('transferRecord')">转赠记录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			handleNavigateTo(path){
				console.log(path);
				uni.navigateTo({
					url:`/pages/${path}/${path}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.lotteryManagementBox{
	padding: 30px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	.list{
		width: 40%;
		height: 200rpx;
		margin-top: 20px;
		text-align: center;
		line-height: 200rpx;
		color: #fff;
		background-color:#007AFF ;
		border-radius: 50rpx;
	}
}
</style>
