<template>

	<view>
		<!-- <uni-list-item v-for="item in tableData" :title="item." :note="item.content" :rightText="item.score.toString()" /> -->
		<!-- <uni-list-item click="showOrderId(item.parkingOrderId)" v-for="item in tableData" :title="(item.parkingOrderId>0)?`顺风车奖励`:item.remark" :note="item.createTm"
							thumb-size="base" :rightText="(item.score>0)?`+${item.score}`:item.score" />
		 -->
		<view class="score-list" v-for="item in tableData"> 
			<view class="item-left">
				<view class="title" v-if="item.parkingOrderId>0" @click="showOrderId(item.parkingOrderId)">顺风车奖励</view>
				<view class="title" v-else >{{item.remark}}</view>
				<view class="data">{{item.createTm}}</view>
			</view>
			<view v-if="item.score>0" class="item-right-red">+{{item.score}}</view>
			<view v-else class="item-right-green">{{item.score}}</view>
		</view>
		<view class="my-buttom">
			<img class="pinapp-empty-box" src="@/static/pinapp-empty-box.png" alt="">
		</view>
		<uni-load-more :status="statusLoadMore" />
	</view>

</template>

<script>
	import {
		userScoresApi
	} from "@/api/user.js"
	export default {
		data() {
			return {
				// 加载状态
				statusLoadMore: 'more',
				pageNo: 1,
				pageSize: 20,
				// 数据总量
				total: 0,
				tableData: [],
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			
			this.pageNo = 1
			this.getData()
			//加载完成停止刷新
			uni.stopPullDownRefresh()
		},
		//上拉加载
		onReachBottom() {
			
			if (this.tableData.length >= this.total) {
				this.statusLoadMore = "noMore"
			} else {
				//否则，页码+1，继续请求列表
				this.pageNo++
				this.getData()
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			showOrderId(id){
				
				if(id>0){
					uni.showToast({
						icon:'none',
						title: "订单编号："+id
					});
				}
			},
			// 获取数据
			getData() {
				this.statusLoadMore = "loading"
				let obj = {}
				obj.pageNo = this.pageNo
				obj.pageSize = this.pageSize
				userScoresApi(obj).then(res => {
					
					if (this.pageNo === 1) {
						this.tableData = res.data.list
					} else {
						this.tableData.push(...res.data.list)
					}
					this.total = res.data.total
					if (res.data.total > 20) {
						this.statusLoadMore = "more"
					} else {
						this.statusLoadMore = "no-more"
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>
.score-list{
	background: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15rpx;
	margin: 25rpx;
	font-size: 32rpx;
	font-weight: 400;
}
.title{
	width: 500rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	height: 80rpx;
	line-height: 80rpx;
}
.data{
	color: #999;
	font-size: 26rpx;
}
.item-right-red{
	color: #de3428;
}
.item-right-green{
	color: green;
}
.my-buttom {
		width: 100%;
		height: 500rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.pinapp-empty-box{
		width: 70%;
	}
</style>
