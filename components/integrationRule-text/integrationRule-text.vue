<template>
	<view class="text-body">
		<view class="header">
			<!-- <image class="headerImg" src="@/static/cfmoto_logo1.svg" ></image> -->
		</view>
		<view class="content">
			<!-- <h3>参观须知：</h3> -->
			<h2 class="htitle">积分兑换规则</h2>
			<h3>文案修改中</h3>
			
		</view>
		<view class="footer">
		<view class="signature">
			<text>行政部</text>
			<text>2022年11月18日</text>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: 0
			}
		},
		methods: {

		}
	}
</script>

<style>
	.text-body{
		position: relative;
	}
	.header {
		/* margin: 100rpx auto; */
		/* border-bottom: 1rpx solid #ccc; */
		margin-top: 20rpx;
		text-align: center;
		/* width: 200rpx; */
		/* height: 160rpx; */
		/* line-height: 160rpx; */
	}

	.headerImg {
		width: 150rpx;
		height: 150rpx;
	}

	.htitle {
		text-align: center;
		line-height: 100rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-right: 50rpx;
		margin-bottom: 90rpx;
	}

	.contentTxt {
		line-height: 50rpx;
		display: block;
		color: #888;
		margin-top: 10rpx;
	}
	.footer{
		width: 90%;
		display: flex;
		justify-content: flex-end;
	}
	.signature{		
		display: flex;
		flex-direction: column;
		text-align: center;	
	}
</style>
