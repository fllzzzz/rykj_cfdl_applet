<template>
	<!-- 车牌号选择 -->
	<view class="contentCar">
		<!-- <button type="default" @click="addLicenseDialog">添加车牌</button> -->
		<cowain-add-license v-if="showLicenseDialog" @onCancel='cancelLicenseDialog' @onOk='okLicense' />
	</view>
	<view class="vehicleEntryBox">
		<view class="timeBox">
			<!-- <uni-section title="当前车辆" type="line"> -->
			<view class="titleBox">
				<view class="icon-title">
				</view>
				<view class="title">
					当前车辆
				</view>
			</view>
			<view class="formBox">
				<view class="example-body">
					<uni-data-select
							v-model="result"
							:localdata="range"
							@change="selectVehicleEntryChange"
							placeholder="请选择车辆"
					></uni-data-select>
				</view>
				<button class="but" type="primary" @click="showDrawer('showLeft','entry')">车辆录入</button>
			</view>
		</view>
		<view class="tableBody">
			<view class="tableBox" v-if="range.length > 0">
				<uni-notice-bar v-if="imgData.state=='1'" color="#E6A23C" background-color="#fdf6ec" single text="审核中"></uni-notice-bar>
				<uni-notice-bar v-if="imgData.state=='2'"  color="#fa3534" background-color="#fef0f0" single :text="`审核不通过:${imgData.state}`"></uni-notice-bar>
				<uni-notice-bar v-if="imgData.state=='3'"  color="#19be6b" background-color="#dbf1e1" single text="审核通过"></uni-notice-bar>
				<!-- <uni-section title="车辆照片" type="line"> -->
				<uni-collapse>
					<uni-collapse-item :show-animation="true" title="车辆照片">
						<view class="sectionValue">
							<image class="valueImage" mode="aspectFit" :src="imgData.vehicleImg" @click="previewImage(imgData.vehicleImg)"></image>
						</view>
					</uni-collapse-item>
				</uni-collapse>
				<!-- </uni-section> -->
				<!-- <uni-section title="驾驶证" type="line"> -->
				<uni-collapse>
					<uni-collapse-item :show-animation="true" title="驾驶证">
						<view class="sectionValue">
							<image class="valueImage" mode="aspectFit" :src="imgData.drivingLicenseImg" @click="previewImage(imgData.drivingLicenseImg)"></image>
						</view>
					</uni-collapse-item>
				</uni-collapse>
				<!-- </uni-section> -->
				<!-- <uni-section title="行驶证" type="line"> -->
				<uni-collapse>
					<uni-collapse-item :show-animation="true" title="行驶证">
						<view class="sectionValue">
							<image class="valueImage" mode="aspectFit" :src="imgData.drivingPermitImg" @click="previewImage(imgData.drivingPermitImg)"></image>
						</view>
					</uni-collapse-item>
				</uni-collapse>

				<!-- </uni-section> -->
				<view class="btns">
					<!-- <view class="left">
						<button>车辆录入</button>
					</view>
					<view class="right">
						<button>修改</button>
						<button>删除</button>
					</view> -->
					<button  class="left-btn" type="primary" @click="showDrawer('showLeft','update')">修改</button>
					<!-- <view></view> -->
					<button  class="right-btn" type="primary" @click="deleteVehicle()">删除</button>
				</view>
			</view>
			<view class="qsBox" v-else>暂无车辆数据</view>
		</view>
		<view class="dialogBox">
			<uni-drawer class="drawerBox" ref="showLeft" mode="left" :width="320" @change="change($event,'showLeft')">
				<!-- <view class="close">
          <button @click="closeDrawer('showLeft')"><text class="word-btn-white">关闭Drawer</text></button>
        </view> -->
				<view class="conterBox">
					<uni-title type="h1" :title="dialogTitle" @click="zzzClick"></uni-title>
					<!-- 基础用法，不包含校验规则 -->
					<view class="conterItem">
						<view class="titleBox">
							<view class="icon-title">
							</view>
							<view class="title">
								车牌号 <text class="rule">*</text>
							</view>
						</view>
						<view class="formBox">
							<view class="inputBox" @click="addLicenseDialog">
								<text>
									{{dialogName||"请输入车牌"}}
								</text>
							</view>
						</view>
					</view>
					<view class="conterItem">
						<view class="titleBox">
							<view class="icon-title">
							</view>
							<view class="title">
								车辆照片 <text class="rule">*</text>
							</view>
						</view>
						<view class="formBox">
							<uni-file-picker
									v-model="dialogVehicle"
									fileMediatype="image"
									:sizeType="['compressed']"
									limit="1"
									@select="selectChange($event,'vehicle')"
									@delete="deleteChange($event,'vehicle')"
							>
							</uni-file-picker>
						</view>
					</view>
					<view class="conterItem">
						<view class="titleBox">
							<view class="icon-title">
							</view>
							<view class="title">
								驾驶证 <text class="rule">*</text>
							</view>
						</view>
						<view class="formBox">
							<uni-file-picker
									v-model="dialogDrive"
									fileMediatype="image"
									:sizeType="['compressed']"
									limit="1"
									@select="selectChange($event,'drive')"
									@delete="deleteChange($event,'drive')" >
							</uni-file-picker>
						</view>
					</view>
					<view class="conterItem">
						<view class="titleBox">
							<view class="icon-title">
							</view>
							<view class="title">
								行驶证 <text class="rule">*</text>
							</view>
						</view>
						<view class="formBox">
							<uni-file-picker
									v-model="dialogTravel"
									fileMediatype="image"
									:sizeType="['compressed']"
									limit="1"
									@select="selectChange($event,'travel')"
									@delete="deleteChange($event,'travel')"

							></uni-file-picker>
						</view>
					</view>
					<view class="btns">
						<button  class="left-btn" type="primary" @click="dialogUpdata()">提交审核</button>
						<view></view>
						<button  class="right-btn" type="primary" @click="closeDrawer('showLeft')" >取消</button>
					</view>
				</view>
			</uni-drawer>
		</view>
		<canvas style="display: none;" id="canvas"></canvas>
	</view>
</template>

<script>
import { getVehicleList ,getVehicleInfo,deleteVerifyList,addVerify,updateVerify} from "@/api/lottery.js"
const baseUrl = getApp().globalData.env.baseUrl
export default {
	data() {
		return {
			result:'',
			range: [],
			imgData:{
				drivingPermitImg:'',
				drivingLicenseImg:'',
				vehicleImg:'',
				id:'',
				state:'',
				reason:''
			},
			//弹出层依赖
			dialogName:'',
			//弹出层名称
			dialogTitle:'车辆新增',
			//上传
			//车辆
			dialogVehicle:{},
			//驾驶证
			dialogDrive:{},
			//行驶证
			dialogTravel:{},
			//车牌号选择
			showLicenseDialog:false
			//接受服务器返回url显示出来
			// vehicleImg:'',
			// driveImg:'',
			// travelImg:''
		}
	},
	methods: {
		//点击放大图片
		previewImage(url){
			console.log(url);
			let arr=[]
			arr.push(url)
			uni.previewImage({
				urls:arr
			})
		},
		async selectVehicleEntryChange(e){
			this.result = e
			let parasm={
				plateNo:this.result
			}
			console.log(parasm);
			const res= await getVehicleInfo(parasm)
			this.imgData=res.data

		},
		// 打开窗口
		showDrawer(e,type) {
			console.log(e,type);
			if(type=='entry'){
				this.dialogName=""
				this.dialogVehicle={}
				this.dialogDrive={}
				this.dialogTravel={}
				this.dialogTitle='车辆新增'
			}else if(type=="update"){
				this.dialogName=this.result
				this.dialogVehicle={
					name:'vehicleImg',
					url:this.imgData.vehicleImg
				}
				this.dialogDrive={
					name:'vehicleImg',
					url:this.imgData.drivingLicenseImg
				}
				this.dialogTravel={
					name:'vehicleImg',
					url:this.imgData.drivingPermitImg
				}
				this.dialogTitle='车辆修改'
			}
			this.$refs[e].open()
		},
		// 关闭窗口
		closeDrawer(e) {
			this.$refs[e].close()
		},
		// 抽屉状态发生变化触发
		change(e, type) {
			console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
			this[type] = e
		},
		selectChange(event,name){
			console.log(event);
			uni.showLoading({
				title: '加载中'
			})
			uni.uploadFile({
				url: `${baseUrl}/user/verify/imageUpload`,
				filePath: event.tempFiles[0].url,
				name:'image',
				fileType: "image",
				success: (uploadFileRes) => {
					uni.hideLoading()
					let res=JSON.parse(uploadFileRes.data)
					console.log(res,"上传返回的url");
					if (res.code==200) {
						uni.showToast({
							title: "上传成功",
							icon:'none',
						})
						if(name=='vehicle'){
							this.dialogVehicle={
								name:event.tempFiles[0].name,
								url:res.data
							}
						}else if(name=='drive'){
							this.dialogDrive={
								name:event.tempFiles[0].name,
								url:res.data
							}
						}else if(name=='travel'){
							this.dialogTravel={
								name:event.tempFiles[0].name,
								url:res.data
							}
						}
					} else{
						uni.showToast({
							title:res.msg,
							icon:'none',
						})
					}
				},
				fail(res) {
					uni.hideLoading()
					console.log("事故：", res)
				},
				complete(res) {
					uni.hideLoading()
					console.log("complete：", res)
				}
			});
		},
		deleteChange(event,name){
			if(name=='vehicle'){
				this.dialogVehicle={}
			}else if(name=='drive'){
				this.dialogDrive={}
			}else if(name=='travel'){
				this.dialogTravel={}
			}
		},
		async dialogUpdata(){
			if (this.dialogName=="") {
				uni.showToast({
					title: "请输入车牌号",
					icon:'none',
				})
				return
			} else if( JSON.stringify(this.dialogVehicle)=='{}'||JSON.stringify(this.dialogVehicle)=='[]' ){
				uni.showToast({
					title: "请选择车辆照片",
					icon:'none',
				})
				return
			}else if( JSON.stringify(this.dialogDrive)=='{}'||JSON.stringify(this.dialogDrive)=='[]' ){
				uni.showToast({
					title: "请选择驾驶证照片",
					icon:'none',
				})
				return
			}else if( JSON.stringify(this.dialogTravel)=='{}'||JSON.stringify(this.dialogTravel)=='[]' ){
				uni.showToast({
					title: "请选择行驶证照片",
					icon:'none',
				})
				return
			}
			if(this.dialogTitle=='车辆新增'){
				console.log('app方式的请求， start:')
				let params={
					plateNo:this.dialogName,
					vehicleImg:this.dialogVehicle.url,
					drivingLicenseImg:this.dialogDrive.url,
					drivingPermitImg:this.dialogTravel.url
				}
				console.log(params,"params");
				const res=await addVerify(params)
				console.log(res,"提交审核res");
				if (res.code==200) {
					uni.showToast({
						title: "新增成功",
						icon:'none',
					})
					this.closeDrawer('showLeft')
					this.getseleteList(this.dialogName)
				} else{
					uni.showToast({
						title:res.msg,
						icon:'none',
					})
				}
				// uni.uploadFile({
				//     url: `${baseUrl}/user/verify/add`,
				// 	files: imageArr,
				// 	fileType: "image",
				//     formData: {
				// 		'plateNo': `${this.dialogName}`,
				//     },
				//     success: (uploadFileRes) => {
				// 		let res=JSON.parse(uploadFileRes.data)
				//
				//     },
				// 	fail(res) {
				// 		console.log("事故：", res)
				// 	},
				// 	complete(res) {
				// 		console.log("complete：", res)
				// 	}
				// });
			}else if(this.dialogTitle=='车辆修改'){
				console.log('app方式的请求， start:')
				let params={
					id:this.imgData.id,
					plateNo:this.dialogName,
					vehicleImg:this.dialogVehicle.url,
					drivingLicenseImg:this.dialogDrive.url,
					drivingPermitImg:this.dialogTravel.url
				}
				console.log(params,"params");
				const res=await updateVerify(params)
				console.log(res,"修改审核res");
				if (res.code==200) {
					uni.showToast({
						title: "修改成功",
						icon:'none',
					})
					this.closeDrawer('showLeft')
					this.getseleteList(this.dialogName)
				} else{
					uni.showToast({
						title:res.msg,
						icon:'none',
					})
				}
				// uni.uploadFile({
				//     url: `${baseUrl}/user/verify/update`,
				// 	files: imageArr,
				// 	fileType: "image",
				//     formData: {
				// 		'plateNo': `${this.dialogName}`,
				// 		'id':`${this.imgData.id}`
				//     },
				//     success: (uploadFileRes) => {
				//         let res=JSON.parse(uploadFileRes.data)
				//         if (res.code==200) {
				//         	uni.showToast({
				//         		title: "修改成功",
				//         		icon:'none',
				//         	})
				// 			console.log("修改成功");
				//         	this.closeDrawer('showLeft')
				// 			this.selectVehicleEntryChange(this.dialogName)
				//         } else{
				//         	uni.showToast({
				//         		title:res.msg,
				//         		icon:'none',
				//         	})
				//         }
				//     }
				// });
			}

		},
		async getseleteList(name){
			this.range=[]
			const res= await getVehicleList()
			if (res.data.length>0) {
				for (var i = 0; i < res.data.length; i++) {
					let data={ value: res.data[i], text: res.data[i] }
					this.range.push(data)
				}
				console.log(this.range[0].value)
				this.selectVehicleEntryChange(name?name:this.range[0].value)
			}else{
				this.result=''
			}
			// this.result=this.range[0].value

		},
		deleteVehicle(){
			let _this=this
			uni.showModal({
				title: '提示',
				content: '你确定要删除吗',
				confirmText: "是",//这块是确定按钮的文字
				cancelText:"否",//这块是取消的文字
				success: async function (res) {
					if (res.confirm) {
						console.log(_this,"_this")
						const res=await deleteVerifyList({id:_this.imgData.id})
						if (res.code==200) {
							uni.showToast({
								title: "删除成功",
								icon:'none',
							})
						}else{
							uni.showToast({
								title: "删除失败",
								icon:'none',
							})
						}
						_this.getseleteList()
					} else if (res.cancel) {
						console.log('取消');
					}
				}
			});

		},
		//显示添加车牌
		addLicenseDialog() {
			this.showLicenseDialog = true;
		},
		//取消添加车牌
		cancelLicenseDialog() {
			this.showLicenseDialog = false;
		},
		//添加车牌成功
		okLicense(license) {
			console.log(license);
			this.dialogName = license
		},
	},
	async onLoad() {
		console.log(this);
		this.getseleteList()
		console.log(uni.compressImage);
	}
}
</script>

<style lang="scss">
.contentCar{
	position: relative;
	z-index: 100 !important;
}
.vehicleEntryBox{
	font-size: 14px;
	padding: 20rpx;

	.timeBox{
		border-radius: 10px;
		padding: 30rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0,0,0,0.08);
		border-radius: 16rpx;
		.titleBox{
			display: flex;
			align-items: center;
			.icon-title{
				width: 8rpx;
				height: 32rpx;
				background: #007AFF;
			}
			.title{
				font-size: 32rpx;
				font-weight: 600;
				color: #000000;
				margin-left: 10rpx;
			}
		}
		.formBox{
			display: flex;
			justify-content: space-around;
			margin-top: 20rpx;
			.example-body{
				width: 436rpx;
				height: 80rpx;
				.uni-stat__select{
					background: #EEF6FF;
					border-radius: 8rpx;
					height: 100%;
				}
				::v-deep .uni-select{
					border: 1px solid #EEF6FF !important;
				}
			}
			.but{
				width: 192rpx;
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 32rpx;
				font-weight: 600;
				color: #FFFFFF;
				background: #007AFF;
				border-radius: 8rpx;
			}
		}
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
	.tableBody{
		border-radius: 10px;
		padding: 30rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0,0,0,0.08);
		border-radius: 16rpx;
		margin-top: 10px;
		.qsBox{
			display: flex;
			justify-content: center;
			align-items: center;
			color: #ccc;
		}
		.tableBox{
			margin-top: 0px;
			.btns{
				margin-top: 10px;
				display: flex;
				justify-content: space-around;
				.left-btn{
					width: 45%;
				}
				.right-btn{
					width: 45%;
					background-color: #f43939;
					border: 1px solid #f43939;
				}
			}
			.sectionValue{
				.valueImage{
					width: 100%;
				}
			}
		}
	}
	.dialogBox{
		.uni-drawer{
			z-index:3 !important;
		}
		.drawerBox{
			z-index:2 !important;
		}
		.conterBox{
			padding: 10px;
			background-color: #FFFFFF;
			.conterItem{
				margin-top: 23rpx;
				.titleBox{
					display: flex;
					align-items: center;
					padding-left: 10rpx;
					.icon-title{
						width: 8rpx;
						height: 32rpx;
						background: #007AFF;
					}
					.title{
						font-size: 32rpx;
						font-weight: 600;
						color: #000000;
						margin-left: 10rpx;
					}
					.rule{
						color: red;
					}
				}
				.formBox{
					margin-top: 20rpx
				;
				}
			}
			.inputBox{
				border: 1px solid rgba(238,238,238);
				height: 60rpx;
				padding-left:20rpx;
				line-height: 60rpx;
			}
			.btns{
				margin-top: 10px;
				display: flex;
				justify-content: space-around;
				.left-btn{
					width: 45%;
				}
				.right-btn{
					width: 45%
				}
			}
		}
	}

}


</style>
