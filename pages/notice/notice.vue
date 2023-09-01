<template>
	<view class="pageBG">
		<view>
			<notice-text/>
			<button class="bottom"   v-if="btnDisabled" withCredentials="true"
				@click="handleIKonw">知道了</button>
			<button class="bottom"  v-if="!btnDisabled" disabled="true" withCredentials="true"
				>知道了（{{countDown}}S）</button>
		</view>
		<view class="bottomFixed"><sapn class="bottomText">Copyright © 2022 浙江春风动力集团</sapn></view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				countDown: 3,
				btnDisabled: false
			};
		},
		methods: {
			handleIKonw() {
				uni.switchTab({
					url:"/pages/my/my"
				})
				
				
			}
		},
		onLoad() {
			const skip=setInterval(() => {
				this.countDown--
				if (this.countDown===0) {
					clearInterval(skip)
					this.btnDisabled = true
				} 
			}, 1000);
		}
	};
</script>

<style>
	.bottom {
		background: #007aff;
		color:#fff;
		border-radius: 80rpx;
		margin: 50rpx 50rpx;
		font-size: 25rpx;
	}
	.bottomFixed {
		width: 100%;
		text-align: center;
		height: 200rpx;
	}
	.bottomText{
		color: #888;
		font-size: 13rpx;
	}
</style>
