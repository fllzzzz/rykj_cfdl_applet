<template>
	<view class="page">
		<view class="content">
			<view class="inputLocation" style="border: none;" @click="atlas_location()">
				<view class="drawer-img-content">
					<!-- <span class="circle"></span> -->
					<img class="location-icon" src="@/static/location.png" alt="">
				</view>
				<input class="drawer-location-input" disabled placeholder="请选择" v-model="address.title" />
			</view>
			<!-- <view class="inputLocation mt_10" style="border: none;">
				<view class="drawer-img-content"><span class="circle"></span></view>
				<input class="drawer-location-input" v-model="addressDetail" placeholder="请输入详细地址" />
			</view> -->
			<view class="usualLcaction">
				<view class="targ-text">
					<text>常用地址：</text>
				</view>
				<view class="tag-list">
					<view class="tag-circle" @click="quickSelect(addressDefalut)">
						<text>春风动力</text>
					</view>
					<view class="tag-circle" v-for="item in dataList" @click="quickSelect(item)">
						<text>{{item.title}}</text>
					</view>
					<view class="add-address">
						<button class="add-address-btn" @tap="navUsualAddress()">新增地址</button>
					</view>
				</view>
				<view class="location-view">
					<!-- <button type="primary" class="location-submit" @tap="submit()">确认</button> -->
				</view>
			</view>
			<img class="addressSelector_bg" src="@/static/addressSelector_bg.svg" alt="">
		</view>

	</view>
</template>

<script>
	import * as dd from "dingtalk-jsapi";
	import {
		getAddress
	} from '@/api/usualAddress.js'
	import {
		getAuthInfo
	} from "@/api/user";
	import {
		useaddressStore
	} from '@/store/modules/address'
	const addressStore = useaddressStore()
	export default {
		data() {
			return {
				dataList: {},
				// 获取当前地址信息
				nowAddress: {
					latitude: '',
					longitude: ''
				},
				addressDefalut: {
					title: '春风动力',
					province: '浙江省',
					city: '杭州市',
					adName: '临平区',
					latitude: '30.4375621',
					longitude: '120.2513994'
				},
				address: {
					title: '',
					province: '',
					city: '',
					area: '',
					latitude: '',
					longitude: ''
				},
				quickSelectItems: ["老厂区"]
			}
		},
		onShow() {
			this.getAuthInfoShow();
			this.getData()
		},
		methods: {
			getData() {
				getAddress().then(res => {
					this.dataList = res.data
				})
			},
			navUsualAddress() {
				uni.navigateTo({
					url: "/pages/usualAddress/usualAddress"
				})
			},
			quickSelect(obj) {
				this.nowAddress.latitude = obj.latitude
				this.nowAddress.longitude = obj.longitude
				this.address.title = obj.title
				this.address.province = obj.province
				this.address.city = obj.city
				this.address.area = obj.adName
				this.address.latitude = obj.latitude
				this.address.longitude = obj.longitude

				this.submit()
			},
			// 获取当前位置
			getAuthInfoShow() {
				let _this = this;
				// 获取位置
				dd.ready(function() {
					dd.device.geolocation.get({
						targetAccuracy: 200,
						coordinate: 1,
						withReGeocode: true,
						useCache: false, //默认是true，如果需要频繁获取地理位置，请设置false
						onSuccess: function(result) {
							_this.nowAddress.latitude = result.latitude
							_this.nowAddress.longitude = result.longitude
						},
						onFail: function(err) {

						}
					});
				});
			},
			// 地图调用
			atlas_location() {
				let _this = this;
				// 地图定位
				dd.biz.map.locate({
					latitude: _this.nowAddress.latitude, // 纬度，非必须
					longitude: _this.nowAddress.longitude, // 经度，非必须
					onSuccess: function(result) {
						_this.quickSelect(result)
						/* result 结构 */
						// {
						//     province: 'xxx', // POI所在省会，可能为空
						//     provinceCode: 'xxx', // POI所在省会编码，可能为空
						//     city: 'xxx', // POI所在城市，可能为空
						//     cityCode: 'xxx', // POI所在城市，可能为空
						//     adName: 'xxx', // POI所在区名称，可能为空
						//     adCode: 'xxx', // POI所在区编码，可能为空
						//     distance: 'xxx', // POI与设备位置的距离
						//     postCode: 'xxx', // POI的邮编，可能为空
						//     snippet: 'xxx', // POI的街道地址，可能为空
						//     title: 'xxx', // POI的名称
						//     latitude: 39.903578, // POI的纬度
						//     longitude: 116.473565, // POI的经度
						// }
					},
					onFail: function(err) {
						// alert("03error: " + JSON.stringify(err))
					}
				});
			},
			submit() {
				if (this.address.title) {
					addressStore.setAddress(this.address)
					if (addressStore.addressType === 0 || addressStore.addressType === 1) {
						uni.switchTab({
							url: `/pages/drivePage/drivePage`
						})
					} else if (addressStore.addressType === 2 || addressStore.addressType === 3) {
						uni.switchTab({
							url: `/pages/travel/travel`
						})
					} else {
						uni.navigateTo({
							url: `/pages/usualAddress/usualAddress`
						})
					}
				} else {
					uni.showToast({
						icon:'none',
						title: '请输入完整信息'
					})
				}
			}
		}
	}
</script>

<style>
	.content {
		/* width: 100%; */
		/* height: 25vh; */
		/* margin: 10rpx; */
		background: #fff;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		padding: 30rpx;
		border-radius: 0 0 50rpx 50rpx;
		/* margin-top: 50rpx; */
		/* box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.5); */
	}

	.inputLocation {
		width: 100%;
		height: 100rpx;
		background: #F7F8FC;
		display: flex;
		border-radius: 20rpx;
		/* justify-content: center; */
		align-items: center;
	}

	.drawer-header {
		padding: 20rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		/* justify-content: center; */
		border-bottom: 1px solid #eee;
	}

	.usualLcaction {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		/* height: 150rpx; */
		/* padding: 0 30rpx; */
		font-size: 28rpx;
		color: #666;
		/* align-content: center; */
	}

	.drawer-location-input {
		width: 80%;
		height: 80rpx;
		line-height: 80rpx;
		background: none;
	}

	.drawer-img-content {
		width: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.location-icon {
		width: 40rpx;
		height: 40rpx;
	}

	.drawer-inputImg {
		width: 30rpx;
		height: 30rpx;
	}

	.location-view {
		width: 100%;
		margin-top: 50px;
	}

	.location-submit {
		/* margin-top: 150rpx; */
		width: 50%;
	}

	.mt_10 {
		margin-top: 10rpx;
	}

	.circle {
		width: 10px;
		height: 10px;
		border: 2px solid #007aff;
		border-radius: 50%;
	}

	.addressSelector_bg {
		opacity: 80%;
		margin-top: 200rpx;
		width: 70%;
	}

	.tag-list {
		display: flex;
		justify-content: baseline;
		flex-wrap: wrap;
		align-items: center;
		margin-top: 10rpx;
	}

	.tag-circle {
		background: #aaa;
		font-size: 28rpx;
		color: #fff;
		border-radius: 20rpx;
		margin-right: 20rpx;
		padding: 10rpx;
		height: 30rpx;
		line-height: 30rpx;
		margin-top: 30rpx;
	}

	.add-address-btn {
		width: 180rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 26rpx;
		background: none;
		color: #007aff;
		border: 1rpx solid #007aff;
		margin-top: 30rpx;
	}
</style>
