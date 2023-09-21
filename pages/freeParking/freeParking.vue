<template>
	<view class="freeParkingBox">
		<view class="timeBox">
			<view class="timelist"> 
				<view class="title">
					我的停车场 ：
				</view>
				<view class="message">
				{{ baseFormData.free!=''?baseFormData.free:'暂无停车场信息'}}
				</view>
			</view>
		</view>
		<view class="timeBox" style="margin-top: 20rpx;">
				<uni-section title="转赠用户" type="line">
					<view class="example-body">
						<uni-combox :candidates="candidates" placeholder="请选择转赠用户" v-model="baseFormData.name"></uni-combox>
					</view>
				</uni-section>
		</view>
		<view class="btns">
			<button class="submit-btn" type="primary" @click="submit()">转赠</button>
		</view>
	</view>
</template>

<script>
	import { transfer ,getUserList,getParkingLot} from "@/api/lottery.js"
	export default {
		data() {
			return {
				// 基础表单数据
				baseFormData: {
					name: '',
					free: '',
				},
				candidates: [],
			}
		},
		methods: {
			async submit(){
				console.log(this.baseFormData.name)
				if (this.baseFormData.free=='') {
					uni.showToast({
						title: "暂无停车场信息无法转增",
						icon:'none',
					})
					return
				}
				if (this.baseFormData.name=="") {
					uni.showToast({
						title: "请选择转赠用户",
						icon:'none',
					})
					return
				} 
				var index = this.baseFormData.name.lastIndexOf("(");
				let str=""
				str = this.baseFormData.name.substring(index+1,this.baseFormData.name.length-1);
				let params={
					jobNum:str
				}
				const res=await transfer(params)
				if (res.code==200) {
					uni.showToast({
						title: "转赠成功",
						icon:'none',
					})
				} else{
					uni.showToast({
						title: res.msg,
						icon:'none',
					})
				}
				
				
			},
			async getnameList(){
				const res=await getUserList()
				if (res.code==200) {
					res.data.forEach((item,index)=>{
						let string=`${item.name}(${item.code})`
						this.candidates.push(string)
					})
				}
			},
			async getParkingLotName(){
				const res=await getParkingLot()
				console.log(res,"获取停车信息");
				if (res.code==200) {
					this.baseFormData.free=res.data
					console.log("停车信息",this.baseFormData);
				}
			}
		},
		onLoad() {
			console.log(this);
			this.getnameList()
			this.getParkingLotName()
		}
	}
</script>

<style lang="scss">
.freeParkingBox{
	font-size: 14px;
	padding: 20rpx;
	.timeBox{
		border-radius: 10px;
		padding: 30rpx;
		border-radius: 50rpx;
		box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.5);
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
		
		.uni-forms {
			::v-deep .uni-forms-item__label{
				width: 85px !important;
			}
		}
		.uni-section{
			background: transparent;
		}
		
	}
	.btns{
		margin-top: 20px;
	}
	.centerBox{
		margin-top: 30rpx;
	}
}


</style>
