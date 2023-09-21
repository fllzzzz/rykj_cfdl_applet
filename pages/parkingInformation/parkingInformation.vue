<template>
	<view class="charts">
		<view class="timeBox">
		    <view class="timelist">
		    	<view class="title">
		    		停车场 ：
		    	</view>
		    	<view class="message">
					{{ parkingName!=''? parkingName:'暂无停车场信息'}}
		    	</view>
		    </view>
		</view>
		<view class="charts-box" >
		    <qiun-data-charts type="pie" :chartData="chartData2" v-if="isblack"/>
			<view class="qsBox" v-else>
				暂无数据
			</view>
		</view>
		
	</view>
</template>

<script>
	import { getParkingLot,getPieChart } from "@/api/lottery.js"
	export default {
		data() {
			return {
				parkingName:'',
				isblack:false,
				chartData2:{
				  series: [
					  {
				         data: [
				           // {
				           //   name: "停车场1",
				           //   value: 50
				           // }, {
				           //   name: "停车场2",
				           //   value: 30
				           // }, {
				           //   name: "停车场3",
				           //   value: 20
				           // }, {
				           //   name: "停车场4",
				           //   value: 18
				           // }, {
				           //   name: "停车场5",
				           //   value: 8
				           // },{
				           //   name: "停车场6",
				           //   value: 8
				           // }
				         ]
				  }]
				}
			}
		},
		methods: {
			async getParkingLotName(){
				const res=await getParkingLot()
				console.log(res);
				if (res.code==200) {
					this.parkingName=res.data
				}
			},
			async getPieChartpie(){
				const res=await getPieChart()
				console.log(res,"res");
				if (res.code==200) {
					this.chartData2.series[0].data=res.data
					this.isblack=true
				}else{
					this.isblack=false
					uni.showToast({
						title: res.msg,
						icon:'none',
					})
				}
			}
		},
		onLoad() {
			this.getParkingLotName()
			this.getPieChartpie()
		}
	}
</script>

<style lang="scss">
	.charts{
		font-size: 14px;
		padding: 20rpx;
		.timeBox{
			border-radius: 10px;
			padding: 30rpx;
			border-radius: 50rpx;
			box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.5);
			background-color: #fff;
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
		.charts-box{
			width: 600rpx;
			height: 600rpx;
			margin: 20rpx auto;
			border-radius: 10px;
			padding: 30rpx;
			border-radius: 50rpx;
			box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.5);
			background-color: #fff;
			
		}
		.qsBox{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
		}
	}
</style>