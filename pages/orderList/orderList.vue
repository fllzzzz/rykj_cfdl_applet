<template>
	<view class="content">
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" :active-color="activeColor"
				@clickItem="onClickItem" />
		</view>
		<!-- 乘客 -->
		<view v-if="current === 0">
			<view class="listContent" v-for="item in tableData" @click="jumpOrderDetail(item)">
				<view class="listContent-item listContent-between">
					<view><text>{{new Date(parseInt(item.orderTime)).toLocaleString()}}</text></view>
				</view>
				<view class="listContent-item">
					<!-- <span class="ponint-circle-blue"></span> -->
					<img class="address-icon" src="@/static/start-l.png">
					<text
						class="address-text">{{item.startProvince}}{{item.startCity}}{{item.startCounty}}{{item.startAddress}}</text>
				</view>
				<view class="listContent-item">
					<!-- <span class="ponint-circle-green"></span> -->
					<img class="address-icon" src="@/static/end-l.png">
					<text
						class="address-text">{{item.destProvince}}{{item.destCity}}{{item.destCounty}}{{item.destAddress}}</text>
				</view>

				<view class="list-footer">
					<view class="listContent-item">
						<text>{{orderstartText[item.orderState]}}</text>
					</view>
					<!-- <view class="fr-my" v-if="item.orderState===4"> -->
					<view class="btn-list">
						<button v-if="item.evaluateState===1" class="btn-submit bgc-gray" type="primary">已评价</button>
						<button v-else-if="item.evaluateState===2&&(item.orderState===4||item.orderState===5)" class="btn-submit" type="primary"
							@click.stop="jumpEvaluate(0,item.parkingOrderId,0)">评价</button>
					</view>
				</view>
			</view>
			<view class="undraw">
				<img class="addressSelector_bg" src="@/static/undraw_city_driver_re_9xyv.svg" alt="">
			</view>

					
		</view>
		<!-- 司机 -->
		<view v-if="current === 1">
			<view class="listContent" v-for="item in tableData" @click="jumpOrderDetail(item)">
				<view class="listContent-item listContent-between">
					<view><text>{{new Date(parseInt(item.orderTime)).toLocaleString()}}</text></view>
					<view @click.stop="jumpDrivePage(item)">
						<button class="plain-btn" >再来一单</button>
					</view>
				</view>
				<view class="listContent-item">
					<!-- <span class="ponint-circle-blue"></span> -->
					<img class="address-icon" src="@/static/start-l.png">
					<text selectable
						class="address-text">{{item.startProvince}}{{item.startCity}}{{item.startCounty}}{{item.startAddress}}</text>
				</view>
				<view class="listContent-item">
					<!-- <span class="ponint-circle-green"></span> -->
					<img class="address-icon" src="@/static/end-l.png">
					<text selectable
						class="address-text">{{item.destProvince}}{{item.destCity}}{{item.destCounty}}{{item.destAddress}}</text>
				</view>
			
				<view class="list-footer">
					<view class="listContent-item">
						<text>{{orderstartText[item.orderState]}}</text>
					</view>
					<!-- <view class="fr-my" v-if="item.orderState===4"> -->
					<view class="btn-list">
						<button v-if="item.evaluateState===1" class="btn-submit bgc-gray" type="primary">已评价</button>
						<button v-else-if="item.evaluateState===2&&(item.orderState===4||item.orderState===5)" class="btn-submit" type="primary"
							@click.stop="jumpEvaluate(1,item.parkingOrderId,item.passengerUserId)">评价</button>
					</view>
				</view>
			</view>
			<view class="undraw">
				<img class="addressSelector_bg" src="@/static/addressSelector_bg.svg" alt="">
			</view>
		</view>

		<uni-load-more :status="statusLoadMore" />
	</view>
</template>

<script>
	import {
		useaddressStore
	} from '@/store/modules/address'
	const addressStore = useaddressStore()
	import {
		orderRecordApi
	} from "@/api/order"
	import {
		userProfileApi
	} from "@/api/user.js"
	export default {
		data() {
			return {
				items: ['我是乘客', '我是司机'],

				//用户角色
				current: 0,

				activeColor: '#007aff',
				// 加载状态
				statusLoadMore: 'more',
				tableData: [],
				pageNo: 1,
				pageSize: 10,
				// 数据总量
				total: 0,
				valiFormData: {
					driveTime: 0,
					rideTime: 0,
					driveMark: 0,
					rideMark: 0,
				},
				orderstartText: ["","未开始", "进行中", "已取消", "已完成","已超时"]
			}
		},
		onShow() {
			this.getUserProfileApi()
			this.getData()
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
		methods: {
			jumpDrivePage(obj) {
		
				addressStore.setAllInfo(obj)
				uni.switchTab({
					url: "/pages/drivePage/drivePage"
				})
			},
			jumpOrderDetail(obj) {				
				uni.navigateTo({
					url: `/pages/orderDetail/orderDetail?orderId=${obj.parkingOrderId}`
				})
			},
			jumpEvaluate(type, parkingOrderId, pId) {
				uni.navigateTo({
					url: `/pages/evaluate/evaluate?type=${type}&parkingOrderId=${parkingOrderId}&pId=${pId}`
				})
			},
			// 获取个人数据
			getUserProfileApi() {
				
				userProfileApi().then(res => {
					this.valiFormData = res.data
				})
			},

			// 获取数据
			getData() {
				this.statusLoadMore = "loading"
				let requestData = {}
				requestData.userType = this.current + 1
				requestData.pageNo = this.pageNo
				requestData.pageSize = this.pageSize
				
				orderRecordApi(requestData).then(res => {
				
					if (this.pageNo === 1) {
						this.tableData = res.data.list
					} else {
						this.tableData.push(...res.data.list)
					}
					this.total = res.data.total
					if (res.data.total > 10) {
						this.statusLoadMore = "more"
					} else {
						this.statusLoadMore = "no-more"
					}

				}).catch(err => {
					console.log("error", err)
				})
			},

			onClickItem(e) {
			
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
					this.pageNo = 1
					this.getData()
				}
			},
		}
	}
</script>

<style scoped>
	.m-l_20 {
		margin-left: 20rpx;
	}

	.header-list {
		display: flex;
		padding: 0 20rpx;
		align-items: center;
	}

	.content {
		/* margin-top: 20rpx; */
		padding: 20rpx;
	}

	.listContent {
		background: #ffff;
		margin-top: 15rpx;
		border-top: 1px solid #eee;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 28rpx;
		color: #999;
		padding: 20rpx;
		/* padding-bottom: 50rpx; */
		position: relative;
		box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.38);
		border-radius: 10rpx;
	}
.listContent-between{
	justify-content: space-between;
}

	.undraw {
		padding: 50rpx;
	}

	.addressSelector_bg {
		width: 100%;
		height: 300rpx;
	}

	.btn-submit {
		text-align: center;
		width: 130rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 24rpx;
		border: none;
		border-radius: 15rpx;
	}

	.bgc-gray {
		background-color: gray;
	}


	.listContent-item {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}
.address-icon {
		width: 50rpx;
		height: 50rpx;
	}
	.ponint-circle-blue {
		width: 15rpx;
		height: 15rpx;
		margin-right: 20rpx;
		border-radius: 50%;
		background: #1296db;
	}

	.ponint-circle-green {
		width: 15rpx;
		height: 15rpx;
		margin-right: 20rpx;
		border-radius: 50%;
		background: #0e932e;
	}

	.address-text {
		color: #222;
		font-size: 28rpx;
	}

	.list-footer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 30rpx;
		/* height: 50rpx; */
		border-top: 1rpx solid #eee;
	}

	.btn-list {
		margin-top: 10rpx;
	}
	.plain-btn{
		width: 170rpx;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 24rpx;
		background: #fff;
		color: #007aff;
		border: 1rpx solid ;
	}
</style>
