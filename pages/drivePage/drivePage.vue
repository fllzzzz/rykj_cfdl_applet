<template>
	<view>
		<!-- <banner></banner> -->
		<!-- <view v-if="pendingDate.length" class="notice-bar" @click="jumperOrderList()">
			<uni-notice-bar show-icon scrollable :text="noticeTextValue" />
		</view> -->

		<view class="location-content">
			<view class="inputLocation" @click="jumperAddress(0)">
				<view class="img-content">
					<!-- <span class="circle cirle_start"></span> -->
					<img class="address-icon" src="@/static/start-l.png">
				</view>
				<input class="location-input" v-model="calculateShowAddressStart" disabled />
			</view>
			<view class="inputLocation m-t_10" @click="jumperAddress(1)">
				<view class="img-content">
					<!-- <span class="circle cirle_end"></span> -->
					<img class="address-icon" src="@/static/end-l.png">
				</view>
				<input class="location-input" v-model="calculateShowAddressEnd" disabled />
			</view>
		</view>
		<view class="content">
			<view class="item-time">

				<view class="timePickerBox">
					<picker @change="bindPickerChange" :value="dateIndex" :range="rangeArray">
						<view class="uni-input">{{rangeArray[dateIndex]||'出发日期'}}</view>
					</picker>
					<!-- <uni-data-select
					        v-model="dataDay"
					        :localdata="range"
					        @change="change"
					        label="选择日期"
							placeholder="请选择日期"
					      ></uni-data-select> -->
				</view>
				<view class="timePickerBox">
					<picker class="timePicker" mode="time" :value="dataTime" @change="bindTimeChange">
						<view class="uni-input">{{dataTime||'出发时间'}}</view>
					</picker>
				</view>
				<view class="timePickerBox">
					<picker @change="bindPickerNumChange" :value="numIndex" :range="rangeNumArray">
						<view class="uni-input">{{rangeNumArray[numIndex]||'可载人数'}}</view>
					</picker>
				</view>

			</view>
			<view class="item-remark m-t_10">
				<!-- <uni-easyinput class="textarea-remark" type="textarea" v-model="remark" placeholder="备注"
					maxlength="100"></uni-easyinput> -->
				<!-- <input type="text" placeholder="备注"></input> -->
				<uni-easyinput v-model="remark" maxlength="100" placeholder="备注" />
			</view>
			<view class="confirm-rules">
				<button class="submit-btn" type="primary" @click="submit()">发布</button>
			</view>
			<view class="confirm-box">
				<uni-data-checkbox v-model="confirmIndex" multiple :localdata="confirmRules"
					@change="showDrawerNotice()" />
				<text class="confirm-text" @click="showDrawerNotice(1)">《顺风车须知》</text>
				<!-- <text>及</text>
				<text class="confirm-text" @click="showDrawerRule()">《积分兑换规则》</text> -->
			</view>
		</view>
		<view class="notice-content" v-if="pendingDate.length>0">
			<view class="notice-content-title"><text class="title-text">您有<text
						class="number-text">{{pendingDate.length}}</text>笔进行中的订单</text></view>
			<view class="notice-item" v-for="(item,index) in pendingDate" @click="jumpOrderDetail(item)">
				<view class="notice-item-title"><text class="search-text">{{item.orderStateMsg}}</text><text
						class="time-text">{{item.orderTimeShow}}</text></view>
				<view class="notice-item-info">
					<view>
						<view class="listContent-item">
							<!-- <span class="ponint-circle-blue"></span> -->
							<img class="address-icon" src="@/static/start-l.png">
							<text class="address-text" selectable>{{item.startAddress}}</text>
						</view>
						<view class="listContent-item">
							<!-- <span class="ponint-circle-green"></span> -->
							<img class="address-icon" src="@/static/end-l.png">
							<text class="address-text" selectable>{{item.destAddress}}</text>
						</view>
					</view>
					<view class="notice-item-arror"><img class="arror-img" src="@/static/drivePage_right.png">
					</view>
				</view>
			</view>
		</view>
	</view>

<!-- 顺风车须知 -->
	<uni-drawer ref="showNotice" mode="right" :mask-click="false" width="380">
		<view class="scroll-view">
			<scroll-view class="scroll-view-box" scroll-y="true">
				<notice-text></notice-text>
				<button class="bottom"   v-if="btnDisabled" withCredentials="true"
					@click="handleIKonwNotice">知道了</button>
				<button class="bottom"  v-if="!btnDisabled" disabled="true" withCredentials="true"
					>知道了（{{countDown}}S）</button>
					<view class="bottomFixed">
						<sapn class="bottomText">Copyright © 2022 浙江春风动力集团</sapn>
					</view>
			</scroll-view>
		</view>
	</uni-drawer>

<!-- 积分规则 -->
	<uni-drawer ref="showRule" mode="right" :mask-click="false" width="380">
		<view class="scroll-view">
			<scroll-view class="scroll-view-box" scroll-y="true">
				<integrationRule-text></integrationRule-text>
				<button class="bottom" withCredentials="true"
					@click="handleIKonwRule">知道了</button>
				
					<view class="bottomFixed">
						<sapn class="bottomText">Copyright © 2022 浙江春风动力集团</sapn>
					</view>
			</scroll-view>
		</view>
	</uni-drawer>
	
</template>

<script>
	import {
		orderCommit,
		pendingDriveApi
	} from "@/api/order.js"

	import {
		callWithErrorHandling
	} from "vue"
	import {
		useaddressStore
	} from '@/store/modules/address'
	const addressStore = useaddressStore()
	export default {
		data() {
			return {						
				confirmIndex: 0,
				confirmRules: [{
					text: '我已阅读并知晓',
					value: 1
				}],
				countDown: 5,
				btnDisabled: false,

				numIndex: null,
				dateIndex: null,
				rangeArray: [
					"今天",
					"明天",
					"后天"
				],
				rangeNumArray: [
					"1人",
					"2人",
					"3人",
					"4人",
					"5人"
				],
				range: [{
						value: 0,
						text: "今天"
					},
					{
						value: 1,
						text: "明天"
					},
					{
						value: 2,
						text: "后天"
					},
				],
				restStatus: '',
				// 快捷入口数据
				pendingDate: [],
				textValue: "您有未完成的订单：",
				// 校验表单数据

				showLeft: false,

				dataTime: "",
				remark: addressStore.remark,
				// 提交时间戳
				// submitTimeS: new Date().getTime(),
				//0起始点、1目的地
				addressStart: addressStore.addressStart,

				addressEnd: addressStore.addressEnd,


				// 校验规则
				rules: {
					date: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					time: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
				},
			}
		},
		onShow() {
			// 解决小程序pinia数据响应式问题			
			this.addressStart = addressStore.addressStart
			this.addressEnd = addressStore.addressEnd
			this.numIndex = addressStore.passengerNum - 1
			this.remark = addressStore.remark
			//获取未完成订单
			this.getPendingDrive()
		},
		// onTabItemTap: function(e) {
		// 	if (e.from === "user") {
		// 		console.log("触发了onTabItemTap", e);

		// 		this.resetData()
		// 	}
		// },
		// watch: {
		// 	dataDay(newq, oldq) {
		// 		if (!this.dataTime) {
		// 			this.dataTime = this.getTodayTime
		// 		}
		// 		let time = `${newq} ${this.dataTime}`;
		// 		let strtime = time.replace(/-/g, '/')
		// 		let date = new Date(strtime);
		// 		this.submitTimeS = date.getTime()
		// 	},
		// 	dataTime(newq, oldq) {
		// 		if (!this.dataDay) {
		// 			this.dataDay = this.getTodayDate
		// 		}
		// 		let time = `${this.dataDay} ${newq}`;
		// 		let strtime = time.replace(/-/g, '/')
		// 		let date = new Date(strtime);
		// 		this.submitTimeS = date.getTime()
		// 	}
		// },
		computed: {
			getToday() {
				return new Date().getTime()
			},
			getTodayDate() {
				let now = new Date()
				let year = now.getFullYear();
				let month = now.getMonth() + 1;
				let day = now.getDate();
				let nowDate = year + "-";
				if (month < 10)
					nowDate += "0";
				nowDate += month + "-";
				if (day < 10)
					nowDate += "0";
				nowDate += day + " ";
				return nowDate
				// return `${mytime.getFullYear()}-${mytime.getMonth()+1}-${mytime.getDate()}`
			},
			getTodayTime() {
				let now = new Date()
				let hh = now.getHours();
				let mm = now.getMinutes();
				let clock = ""
				if (hh < 10)
					clock += "0";
				clock += hh + ":";
				if (mm < 10) clock += '0';
				clock += mm;
				return clock
			},
			calculateShowAddressStart() {
				if (this.addressStart.province) {
					return `${this.addressStart.province} ${this.addressStart.city} ${this.addressStart.area} ${this.addressStart.title}`
				} else {
					return "请选择出发点"
				}
			},
			calculateShowAddressEnd() {
				if (this.addressEnd.province) {
					return `${this.addressEnd.province} ${this.addressEnd.city} ${this.addressEnd.area} ${this.addressEnd.title}`
				} else {
					return "请选择目的地"
				}
			}
		},
		methods: {
			handleIKonwRule(){
				this.$refs.showRule.close()
			},
			
			showDrawerRule(type) {
					this.$refs.showRule.open()	
			},
			handleIKonwNotice(){
				this.$refs.showNotice.close()
			},
			
			showDrawerNotice(type) {
				const skip=setInterval(() => {
					this.countDown--
					if (this.countDown===0) {
						clearInterval(skip)
						this.btnDisabled = true
					} 
				}, 1000);
				if (this.confirmIndex == 1) {
					this.$refs.showNotice.open()
				}
				else if(type===1){
					this.$refs.showNotice.open()
				}
			},
			bindPickerNumChange: function(e) {
				console.log("e", e);
				this.numIndex = e.detail.value
			},
			bindPickerChange: function(e) {
				console.log("e", e);
				this.dateIndex = e.detail.value
			},
			resetData() {
				addressStore.setAddressType(99)
				addressStore.resetData()
				this.dateIndex = null
				this.dataTime = ""
				this.numIndex = null
				this.remark = ""
			},
			getPendingDrive() {
				pendingDriveApi().then(res => {
					this.pendingDate = res.data
				})
			},
			bindTimeChange: function(e) {
				this.dataTime = e.detail.value
			},
			jumperAddress(type) {
				addressStore.setAddressType(type)
				uni.navigateTo({
					url: "/pages/addressSelector/addressSelector"
				})
			},
			jumpOrderDetail(obj) {
				uni.navigateTo({
					url: `/pages/orderDetail/orderDetail?orderId=${obj.parkingOrderId}`
				})
			},
			submit() {

				let dateRequest = {}
				dateRequest.startProvince = addressStore.addressStart.province
				dateRequest.startCity = addressStore.addressStart.city
				dateRequest.startCounty = addressStore.addressStart.area
				dateRequest.startAddress = addressStore.addressStart.title
				dateRequest.startLatitude = addressStore.addressStart.latitude
				dateRequest.startLongitude = addressStore.addressStart.longitude
				dateRequest.destProvince = addressStore.addressEnd.province
				dateRequest.destCity = addressStore.addressEnd.city
				dateRequest.destCounty = addressStore.addressEnd.area
				dateRequest.destAddress = addressStore.addressEnd.title
				dateRequest.destLatitude = addressStore.addressEnd.latitude
				dateRequest.destLongitude = addressStore.addressEnd.longitude
				dateRequest.orderDate = this.dateIndex + 1
				dateRequest.dateTime = this.dataTime
				dateRequest.passengerNum = this.numIndex + 1
				dateRequest.remark = this.remark
				if(this.confirmIndex==1){
					orderCommit(dateRequest).then(res => {
						if (res.code === 200) {
							uni.showToast({
								title: "发布成功",
								icon: 'none'
							})
							uni.navigateTo({
								url: `/pages/orderDetail/orderDetail?orderId=${res.data.parkingOrderId}`
							})
							this.resetData()
						} else if (res.code === 101002) {
							uni.showToast({
								title: "请输入完整信息",
								duration: 2000,
								icon: 'none'
							})
						} else if (res.msg === '请去个人资料填写车牌号') {
							uni.showModal({
								title: '提示',
								content: '请去个人资料填写车牌号',
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
										uni.navigateTo({
											url: "/pages/myEdit/myEdit?from=drivePage"
										})
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						} else {
							uni.showToast({
								title: res.msg,
								duration: 2000,
								mask: true,
								icon: 'none'
							})
						}
					})
				}else{
					uni.showToast({
						title: "请勾选已阅读须知",
						duration: 2000,
						icon: 'none'
					})
				}
				
			},
		}
	}
</script>

<style scoped>
	.content {
		/* width: 90%; */
		background: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 30rpx 0;
		box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.5);
		margin: 10rpx;
		border-radius: 50rpx;
	}

	.notice-content {
		background: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 15rpx 0;
		box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.5);
		margin: 10rpx;
		border-radius: 50rpx;

	}

	.notice-content-title {
		width: 640rpx;
		height: 60rpx;
		/* line-height: 60rpx; */
	}

	.notice-item {
		padding: 30rpx 0;
		border-top: 1rpx solid #eee;
	}

	.notice-item-title {
		height: 60rpx;
	}

	.notice-item-info {
		display: flex;
		justify-content: space-between;
		width: 640rpx;
		overflow: hidden;

	}

	.title-text {
		font-size: 32rpx;
		font-weight: 400;
	}

	.number-text {
		color: #1296db;
	}

	.search-text {
		color: #1296db;
		font-size: 28rpx;
		font-weight: 300;
		margin-right: 20rpx;
	}

	.time-text {
		color: #999;
		font-size: 28rpx;
	}

	.address-icon {
		width: 50rpx;
		height: 50rpx;
	}

	.address-title {
		font-size: 28rpx;
		font-weight: 600;
	}

	.address-text {
		font-size: 26rpx;
		/* font-weight: 400; */
	}

	.listContent-item {
		display: flex;
		align-items: center;
		margin-top: 10rpx;
		/* height: 60rpx; */
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


	.arror-img {
		width: 30rpx;
		height: 30rpx;
	}

	.item-time {
		/* height: 100rpx; */
		width: 90%;
		display: flex;
		justify-content: space-around;
		/* align-items: center; */
	}

	.item-remark {
		width: 90%;
		height: 100rpx;
	}

	.confirm-rules {
		display: flex;
		align-items: flex-end;
	}

	.confirm-box {
		margin-top: 5rpx;
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: 555;
	}

	.uni-data-checklist {
		margin-right: 0;
	}

	.confirm-text {
		font-size: 24rpx;
		color: #007aff;
	}

	.location-content {
		background: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 30rpx 0;
		margin: 10rpx;
		border-radius: 50rpx;
		box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.5);
	}

	.inputLocation {
		width: 90%;
		height: 100rpx;
		/* border: 1px solid #e0e0e0; */
		display: flex;
		/* justify-content: center; */
		align-items: center;
		background: #F7F8FC;
		border-radius: 25rpx;
	}

	.img-content {
		width: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.inputImg {
		width: 30rpx;
		height: 30rpx;
	}

	.location-input {
		font-size: 24rpx;
		width: 90%;
		background: none;
	}

	.m-t_10 {
		margin-top: 20rpx;
	}

	.m-r_20 {
		margin-right: 20rpx;
	}

	.timePickerBox {
		width: 33%;
	}



	.uni-input {
		/* width: 300rpx; */
		height: 70rpx;
		line-height: 70rpx;
		color: gray;
		text-align: center;
		border: 1px solid #F0F0F0;
		border-radius: 10%;
	}

	.submit-btn {
		width: 500rpx;
	}

	.notice-bar {
		/* position: absolute; */
		width: 100%;
	}

	.option-list {
		display: flex;
		background: #fff;
		/* justify-content: space-around; */
	}

	.option-list-item {
		width: 50%;
		height: 40rpx;
		text-align: center;
		border-right: 1px solid #555;
	}

	.bImg {
		width: 20rpx;
		height: 20rpx;
	}

	.circle {
		width: 10px;
		height: 10px;

		border-radius: 50%;
	}

	.cirle_start {
		border: 2px solid #1296db;
	}

	.cirle_end {
		border: 2px solid #0e932e;
	}

	.form-item {
		display: inline-block;
	}

	.popup-content {
		/* display: flex; */
		align-items: center;
		justify-content: center;
		/* padding: 15px; */
		/* height: 50px; */
		background-color: #fff;
	}

	.bottom {
		background: #007aff;
		color: #fff;
		border-radius: 80rpx;
		margin: 50rpx 50rpx;
		font-size: 25rpx;
	}

	.bottomFixed {
		width: 100%;
		text-align: center;
		height: 200rpx;
	}

	.bottomText {
		color: #888;
		font-size: 13rpx;
	}

	.scroll-view {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		/* #endif */
		flex: 1
	}

	.scroll-view-box {
		flex: 1;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
</style>
