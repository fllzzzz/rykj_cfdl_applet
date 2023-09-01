<template>
	<view class="text-body">
		<view class="header">
			<!-- <image class="headerImg" src="@/static/cfmoto_logo1.svg" ></image> -->
		</view>
		<view class="content">
			<h2 class="htitle">顺风车须知</h2>
			<text class="text-value">顺风车小程序是一个以绿色出行为初衷、为春风员工提供内部拼车信息发布的平台。该平台仅限拼车双方获取同路信息所用，其他事宜由双方友好协商解决。</text>
			<!-- <h5 class="text-value" style="font-size: 32rpx;">
				本小程序无盈利性质，公司将不参与任何搭乘出行过程中产生的纠纷与决策。</h5> -->
		</view>
		<view class="footer">
			<view class="signature">
				<text>春风行政</text>
				<text>2022年12月30日</text>
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
	.text-body {
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
		font-size: 30rpx;
	}

	.contentTxt {
		line-height: 50rpx;
		display: block;
		color: #888;
		margin-top: 10rpx;
	}

	.footer {
		width: 90%;
		display: flex;
		justify-content: flex-end;
	}

	.signature {
		display: flex;
		flex-direction: column;
		text-align: center;
	}

	.text-value {
		display: block;
		text-indent: 2em;
	}
</style>
