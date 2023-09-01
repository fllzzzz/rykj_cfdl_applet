<template>
	<view class="text-body">
		<view class="header">
			<!-- <image class="headerImg" src="@/static/cfmoto_logo1.svg" ></image> -->
		</view>
		<view class="content">
			<!-- <h3>参观须知：</h3> -->
			<h2 class="htitle">春风顺风车须知</h2>
			<text class="contentTxt">各位小伙伴：</text>
			<text
				class="contentTxt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎使用春风顺风车程序，我们希望春风顺风车可以为大家减轻出行压力，方便员工出行，承担为职工出行创造价值的责任，为广大职工提供安全、经济、友善、环保的出行方式。在经过多轮测试后，上线了春风顺风车小程序。小程序本着公益免费原则，为大家创造一个可靠安全的通勤内部拼车服务平台，公司将为大家补贴积分，兑换福利。</text>
			<h4>小程序规则：</h4>
			<text class="contentTxt">请打开小程序，司机选择开车版块，乘客选择搭乘板块。</text>
			<h4>搭乘流程：</h4>
			<text class="contentTxt">司机发单（订单未开始）->乘客请求搭车->司机确认同行（订单进行中）->乘客点已上车（订单开始）->乘客已到达目的（订单已完成）->司机乘客互评</text>
			<text class="contentTxt">1、 司机：每天只能搭载两单，上午（0时-12时）、下午（12时-24时），已取消订单不算在两单限制内，非当天的拼车单可在“搭乘”或“我的”中查询；</text>
			<text class="contentTxt">2、
				乘客：每天只能搭乘两单，上午（0时-12时）、下午（12时-24时），已取消状态订单不算，可以同时请求搭乘今天的上午单、下午单和明天上午单；搭乘列表最多可同时请求3个未开始订单；小程序每日10时和20时将会提醒乘客还有未完成的订单，如订单实际已完成，乘客需要在小程序上点击已上车和到达目的地；</text>
			<text class="contentTxt">3、 距离出发时间超过24小时的订单，订单会自动变成超时订单，将会通知司机联系管理员处理，超时订单不算有效单数；</text>
			<text class="contentTxt">4、 未开始、进行中乘客未点已上车、进行中乘客点已上车10分钟之内 司机乘客都可以取消订单。取消订单将会影响对方出行，请谨慎操作；</text>
			<h5>注意：乘客点了到达目的地，订单变成已完成，对方和自己才能获得相应积分。</h5>
			<text class="contentTxt">5、 点击对方头像可以进行私聊。</text>
			<h4>安全公示:</h4>
			<text
				class="contentTxt">平台坚持公益原则，如有资金纠纷或交通事故，公司概不负责。请广大司机朋友请安全驾驶，提醒乘客系好安全带，自觉遵守交通规则；乘客小伙伴请核对车牌信息，尽量选择后排落座，路途中注意行驶路线，遇到危险请及时拨打110。
				如有其他需求请联系后台联系人。</text>
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
