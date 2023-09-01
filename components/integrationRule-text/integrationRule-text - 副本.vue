<template>
	<view class="text-body">
		<view class="header">
			<!-- <image class="headerImg" src="@/static/cfmoto_logo1.svg" ></image> -->
		</view>
		<view class="content">
			<!-- <h3>参观须知：</h3> -->
			<h2 class="htitle">积分兑换规则</h2>
			<h3>（一）积分获取</h3>
			<h4>1.司机积分获取：</h4>
			<text class="contentTxt">（1）根据起始点至终点的直线距离，每公里10积分，不满1公里的部分，按1公里计算。</text>
			<text class="contentTxt">（2）每单直线距离大于1公里开始统计积分。</text>
			<text class="contentTxt">（3）每月搭载超过10单，额外奖励100积分；超过20单奖励200积分；超过30单，奖励300积分。</text>
			<text class="contentTxt">（4）月度积分前三有额外奖励。</text>
			<h4>2.乘客积分获取：</h4>
			<text class="contentTxt">（1）每单5积分，一天最多2单。</text>
			<text class="contentTxt">（2）每月拼车超过10单，额外奖励50积分；超过20单，奖励80积分；超过30单，奖励120积分。</text>
			<text class="contentTxt">（3）月度积分前三有额外奖励。</text>
			<h3>（二）积分兑换</h3>
			<h5>（1:1兑换云社区商城）10积分1元定向商品兑换</h5>
			<text class="contentTxt">1.饭卡充值</text>
			<text class="contentTxt">500积分兑换50元饭卡充值。</text>
			<text class="contentTxt">1000积分兑换100元饭卡充值。</text>
			<text class="contentTxt">2.油卡</text>
			<text class="contentTxt">500积分兑换50元油卡。</text>
			<text class="contentTxt">1000积分兑换100元油卡。</text>
			<text class="contentTxt">3.话费充值</text>
			<text class="contentTxt">500积分兑换50元话费充值卡。</text>
			<text class="contentTxt">1000积分兑换100元话费充值卡。</text>
			<text class="contentTxt">4.换购实物</text>
			<text class="contentTxt">米、油等。</text>
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
