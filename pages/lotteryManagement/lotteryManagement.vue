<template>
	<view class="box">
		<!-- 车牌号选择 -->
		<view class="contentCar">
			<!-- <button type="default" @click="addLicenseDialog">添加车牌</button> -->
			<cowain-add-license v-if="showLicenseDialog" @onCancel='cancelLicenseDialog' @onOk='okLicense' />
		</view>
		<view class="zzcBox" v-if="zzcisShow" @click="zzcisShow=false"></view>
		<!-- 普通弹窗 -->
		<view class="tkBox">
			<view class="popupBox" ref="popup" v-if="zzcisShow">
				<view class="seteleCenter">
					<view :class="popupActive==item?'active':''" class="btn" v-for="item in cphList" :key="item" @click="popupClick(item)">
						{{item}}
					</view>
				</view>
			</view>
		</view>
		<view class="lotteryManagementBox">
			<view class="parkingLotBox">
				<scroll-view class="scroll-view_H" :scroll-x="true"  :catchtouchmove ="true"  @scroll="scroll">
					<view class="scroll-view-item_H" v-for="item in parkingLotList" :key="item.id">
						<view class="itemBox">
							<view class="imgBox">
								<swiper class="swiper" circular :vertical="true" :indicator-dots="true" :autoplay="true" :interval="2000"
												:duration="500" v-if="item.files&&item.files.length>0">
									<swiper-item v-for="(element,index) in item.files" :key="index">
										<img class="scroll_img" :src="element.url" alt="" @click="previewImage(element.url)">
									</swiper-item>
								</swiper>
								<view v-else class="qsIcon">
									<uni-icons type="image-filled" size="30"></uni-icons>
								</view>
							</view>
							<view class="message">
								<view class="title">{{item.region}}</view>
								<view class="particulars">
									<text class="text">车位：{{item.amount}}个</text>
									<text class="text">详情：{{item.remark}}</text>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="centerBox">
				<view class="title">
					<view class="title-left" @click="seletecp">
						<img class="cl_logo" src="../../static/yh_cl.png" alt="">
						<text class="name">{{popupActive}}</text>
					</view>
					<view class="title-right">
						<view class="clgl"  @click="handleNavigateTo('vehicleEntry')">
							<text class="name">车辆管理</text>
							<uni-icons class="icon" type="right" color="#FFFFFF" size="14"></uni-icons>
						</view>
					</view>

				</view>
				<view class="tabControl">
					<view class="tabs bck">
						<view @click="tabActive(0)" :class="active == 0?'tab active':'tab'">车位摇号</view>
						<view @click="tabActive(2)" :class="active == 2?'tab active':'tab'">车位交换<view class="uni-badge-left-margin"><uni-badge class="uni-badge-left-margin" :text="exchangeCount" v-if="exchangeCount!='0'"  /></view></view>
						<view @click="tabActive(1)" :class="active == 1?'tab active':'tab'">权限转移</view>
						<view @click="tabActive(3)" :class="active == 3?'tab active':'tab'">挪车查询</view>
					</view>
					<view class="lotteryBox" v-if="active==0">
						<view v-if="lotteryData.timeState">
							<button v-if="!lotteryData.applyState" :disabled="!cphList.length>0" :class="!cphList.length>0?'btn disabledColor':'btn'" type="primary" @click="lotterySubmit" >立即报名</button>
							<button v-else :class="!cphList.length>0?'btn disabledColor':'btn'" type="primary" :disabled="!cphList.length>0" @click="lotteryCancelClick">取消申请</button>
							<view class="time bck" >
								<text class="text">距报名结束还有</text>
								<uni-countdown :show-colon="false" :font-size="16" :day="countDown.day" :hour="countDown.hour" :minute="countDown.minute" :second="countDown.second" color="#FFFFFF" background-color="#007AFF" />
							</view>
						</view>
						<view class="message bck">
							<view class="item">
								<text class="name">摇号期数</text>
								<text class="value">{{lotteryData.batchNum}}</text>
							</view>
							<view class="item">
								<text class="name">车位有效期</text>
								<text class="value">{{lotteryData.validStartDate}} - {{lotteryData.validEndDate}}</text>
							</view>
							<view class="item">
								<text class="name">时间报名</text>
								<text class="value">{{lotteryData.applyStartTime}} - {{lotteryData.applyEndTime}}</text>
							</view>
							<view class="item">
								<text class="name">摇号车位</text>
								<text class="value">{{lotteryData.parkingLotName}}</text>
							</view>
							<view class="item">
								<text class="name">摇号状态</text>
								<text class="value gren" v-if="lotteryData.resultColor=='0'||lotteryData.resultColor=='1'||lotteryData.resultColor=='2'">
									{{lotteryData.result}}
								</text>
								<text class="value error" v-if="lotteryData.resultColor=='3'">
									{{lotteryData.result}}
								</text>
								<text class="value succeed" v-if="lotteryData.resultColor=='4'">
									{{lotteryData.result}}
								</text>
							</view>
						</view>
						<view class="message bck">
							<view class="rule-title"><text>摇号规则</text></view>
							<view class="item">
								<text :class="isIconShow?'value':'value-once'">{{lotteryDescriptionInfo||'暂无规则'}}</text>
							</view>
						</view>
						<view class="isIcon" @click="isIconShowClick">
							<uni-icons type="bottom" size="20" color="#ccc" v-if="!isIconShow"></uni-icons>
							<uni-icons type="top" size="20" color="#ccc" v-else></uni-icons>
						</view>

					</view>
					<view class="transferBox" v-if="active==1">
						<view v-if="userparkingList.length>0">
							<view class="message bck" v-for="(item,index) in userparkingList" :key="index">
								<view class="item">
									<text class="name">车位信息</text>
									<text class="value">{{item.parkingName}}</text>
								</view>
								<view class="item">
									<text class="name">车位有效期</text>
									<text class="value">{{item.startDate}} - {{item.endDate}}</text>
								</view>
							</view>
						</view>
						<view class="qsText" v-else>
							暂无车位
						</view>
					</view>
					<view class="exchangeBox" v-if="active==2">
						<view v-if="userparkingList.length>0">
							<view :class="parkingData.parkingLot==item.parkingLot?'active':''" class="message bck" v-for="(item,index) in userparkingList" :key="index" @click="cutParking(item)">
								<view class="item">
									<text class="name">车位信息</text>
									<text class="value">{{item.parkingName}}</text>
								</view>
								<view class="item">
									<text class="name">车位有效期</text>
									<text class="value">{{item.startDate}} - {{item.endDate}}</text>
								</view>
							</view>
						</view>
						<view class="qsText" v-else>
							暂无车位
						</view>
					</view>

				</view>
			</view>
			<view class="lotteryotherGuide" v-if="active==0">
				<view class="lotteryList titleBox" >
					<view class="title">
						<view class="title-left">
							<view class="icon-title"></view>
							<view class="text">摇号记录</view>
						</view>
						<view class="title-right" @click="isShowClick">
							{{isShow?'收起':'展开'}}
						</view>
					</view>
					<!-- <view :class="isShow?'ul Entrance':'ul departure'" v-show="isShow"> -->
					<scroll-view class="ul" v-if="isShow" :scroll-y="true"  @scrolltolower="onLoadMore">
						<view class="message bck" v-for="item in lotteryRecordList" :key="item.id">
							<view class="item">
								<text class="name">摇号期数</text>
								<text class="value">{{item.batchNum}}</text>
							</view>
							<view class="item">
								<text class="name">车位有效期</text>
								<text class="value">{{ item.validStartDate }}-{{item.validEndDate}}</text>
							</view>
							<view class="item">
								<text class="name">摇号结果</text>
								<text class="value">
									{{ item.result }}
								</text>
							</view>
						</view>
						<view v-if="showLoading" class="loading">{{loadingText}}</view>
					</scroll-view>

					<!-- </view> -->

				</view>
			</view>
			<view class="transferGuide" v-if="active==1">
				<view class="transferSelete titleBox" v-if="userparkingList.length>0">
					<view class="title">
						<view class="title-left">
							<view class="icon-title"></view>
							<view class="text">转移</view>
						</view>
					</view>
					<view class="form">
						<view class="example-body">
							<uni-combox @input="inputValue" :candidates="dataList" placeholder="请选择转移人" v-model="transferName"></uni-combox>
						</view>
						<view>
							<button class="but" @click="parkingTransfer">
								立即转移
							</button>
						</view>

					</view>
				</view>
				<view class="transferList titleBox">
					<view class="title">
						<view class="title-left">
							<view class="icon-title"></view>
							<view class="text">转移记录</view>
						</view>
						<view class="title-right" @click="iszyShowClick">
							{{iszyShow?'收起':'展开'}}
						</view>
					</view>
					<scroll-view class="ul" v-if="iszyShow" :scroll-y="true"  @scrolltolower="onLoadMoreZy">
						<view class="message bck" v-for="item in transferRecordList" :key="item.id">
							<view class="item">
								<text class="name">转移日期</text>
								<text class="value">{{item.createTm}}</text>
							</view>
							<view class="item">
								<text class="name">转移车位</text>
								<text class="value">{{ item.parkingLotRegion}}</text>
							</view>
							<view class="item">
								<text class="name">转移人</text>
								<text class="value">{{ item.acceptUserName}}</text>
							</view>
							<view class="item">
								<text class="name">转移有效期</text>
								<text class="value">{{ item.validStartDate }}-{{item.validEndDate}}</text>
							</view>

						</view>
						<view v-if="showLoadingzy" class="loading">{{loadingTextzy}}</view>
					</scroll-view>
				</view>
			</view>
			<view class="transferGuide" v-if="active==2">
				<view class="transferSelete titleBox" v-if="userparkingList.length>0">
					<view class="title">
						<view class="title-left">
							<view class="icon-title"></view>
							<view class="text">交换</view>
						</view>
					</view>
					<view class="form" v-if="ApplyExchangeList.length==0">
						<view class="example-body">
							<uni-combox @input="inputValue" :candidates="dataList" placeholder="请选择交换人" v-model="exchangeName"></uni-combox>
						</view>
						<view>
							<button class="but" @click="ImmediateExchange">
								立即交换
							</button>
						</view>
					</view>
					<view>
						<view class="exchangeList" v-for="item in ApplyExchangeList" :key="item.id">
							<view class="message" >
								<view class="user">
									<text class="title">交换人</text>
									<text class="name">{{item.acceptUserName}}</text>
									<text class="stall" v-if="item.userId!=userId">{{parkingData.parkingName}}</text>
								</view>
								<view class="icon">
									<img class="cw_jh" src="../../static/cw_jh.png" alt="">
								</view>
								<view class="user">
									<text class="title">申请人</text>
									<text class="name">{{item.userName}}</text>
									<text class="stall">{{item.parkingName}}</text>
								</view>
							</view>
							<view class="btns" v-if="item.userId!=userId">
								<button class="btn blue" @click="ExchangeOperation(item,'consent')">
									同意
								</button>
								<button class="btn red" @click="ExchangeOperation(item,'disagree')">
									不同意
								</button>
							</view>
							<view class="btns" v-else>
								<button class="btn blue cx" @click="ExchangeOperation(item,'revocation')">
									撤销
								</button>
							</view>
						</view>
					</view>

				</view>
				<view class="transferList titleBox">
					<view class="title">
						<view class="title-left">
							<view class="icon-title"></view>
							<view class="text">交换记录</view>
						</view>
						<view class="title-right" @click="isjhShowClick">
							{{isjhShow?'收起':'展开'}}
						</view>
					</view>
					<scroll-view class="ul" v-if="isjhShow" :scroll-y="true"  @scrolltolower="onLoadMoreJh">
						<view class="message bck" v-for="item in exchangeRecordList" :key="item.id">
							<view class="exchangeR" >
								<view class="user">
									<text class="title">交换人</text>
									<text class="name">{{item.acceptUserName}}</text>
									<text class="stall">{{item.acceptParkingName}}</text>
								</view>
								<view class="icon">
									<img class="cw_jh" src="../../static/cw_jh.png" alt="">
								</view>
								<view class="user">
									<text class="title">申请人</text>
									<text class="name">{{item.userName}}</text>
									<text class="stall">{{item.parkingName}}</text>
								</view>
								<view v-if="item.state=='1'" class="typeBox trpegreen">同意</view>
								<view v-if="item.state=='2'" class="typeBox trpered">拒绝</view>
								<view v-if="item.state=='3'" class="typeBox trpeblue">撤销</view>
							</view>

						</view>
						<view v-if="showLoadingjh" class="loading">{{loadingTextjh}}</view>
					</scroll-view>
				</view>
			</view>
			<view class="transferGuide" v-if="active==3">
				<view class="conterBox">
					<view class="titleBox">
						<view class="title">
							<view class="title-left">
								<view class="icon-title"></view>
								<view class="text">挪车查询</view>
							</view>
						</view>
						<view class="form">
							<view class="example-body">
								<!-- <input v-model="license" @click="addLicenseDialog" class="u-input" placeholder="请输入车牌号" /> -->
								<view class="copeInput" @click="addLicenseDialog">
									{{license||'请输入车牌号'}}
								</view>
							</view>
							<view>
								<button class="but" @click="getinfo">
									查询
								</button>
							</view>
						</view>
						<view class="message bck" v-if="isUserMessageShow">
							<view class="item">
								<text class="name">车主名称</text>
								<text class="value">{{userData.name}}</text>
							</view>
							<view class="item">
								<text class="name">车主工号</text>
								<text class="value">{{userData.jobNumber}}</text>
							</view>
							<view class="item">
								<text class="name">车主电话</text>
								<text class="value">{{userData.mobile}}</text>
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>
		<uni-drawer class="drawerBox" ref="showLeft" mode="left" :width="320" @change="change($event,'showLeft')">
			<view class="conterBox">
				<view class="titleBox">
					<view class="title">
						<view class="title-left">
							<view class="icon-title"></view>
							<view class="text">一键挪车</view>
						</view>
					</view>
					<view class="form">
						<view class="example-body">
							<!-- <input v-model="license" @click="addLicenseDialog" class="u-input" placeholder="请输入车牌号" /> -->
							<view class="copeInput" @click="addLicenseDialog">
								{{license||'请输入车牌号'}}
							</view>
						</view>
						<view>
							<button class="but" @click="getinfo">
								查询
							</button>
						</view>
					</view>
					<view class="message bck" v-if="isUserMessageShow">
						<view class="item">
							<text class="name">车主名称</text>
							<text class="value">{{userData.name}}</text>
						</view>
						<view class="item">
							<text class="name">车主工号</text>
							<text class="value">{{userData.jobNumber}}</text>
						</view>
						<view class="item">
							<text class="name">车主电话</text>
							<text class="value">{{userData.mobile}}</text>
						</view>
					</view>
				</view>

			</view>
		</uni-drawer>
	</view>
</template>

<script>
import {
	getUserList,
	lotteryInfo,
	lotteryApply,
	getparkingLotList,
	getApplyRecordList,
	lotteryCancel,
	getVehicleList,
	getUserParkingLotList,
	transfer,
	gettransferRecordList,
	applyExchange,
	getExchangeCount,
	getExchangeList,
	ExchangeDeal,
	getinfoByPlateNo,
	getdescriptionInfo
} from "@/api/lottery.js"
export default {
	data() {
		return {
			userId:uni.getStorageSync('user').userId,
			// userId:1668559697477717,
			old: {
				scrollTop: 0
			},
			active:0,
			isShow:false,
			iszyShow:false,
			isjhShow:false,
			// 获取人员列表
			candidates:[],
			dataList: [],
			//选择转赠用户
			userName:'',
			//摇号信息
			lotteryData:{
				applyEndTime: "",
				applyStartTime: "",
				applyState: true,
				batchId: 0,
				result: "测试数据结果",
				resultColor:'1',
				timeState: true,
				validEndDate: "",
				validStartDate: "",
				batchNum:''
			},
			//倒计时
			countDown:{
				day:0,
				hour:0,
				minute:0,
				second:0
			},
			//停车场列表
			parkingLotList:[],
			//摇号记录列表
			lotteryPageData:{
				pageNo:1,
				pageSize:4
			},
			//转移记录列表
			transferPageData:{
				pageNo:1,
				pageSize:4
			},
			//交换记录列表
			exchangePageData:{
				pageNo:1,
				pageSize:4,
				nestate:0
			},
			lotteryRecordList:[],
			transferRecordList:[],
			exchangeRecordList:[],
			showLoading: false, // 是否展示加载中提示
			loadingText: '加载中，请稍后',// 加载中提示文本
			showLoadingzy: false, // 是否展示加载中提示
			loadingTextzy: '加载中，请稍后',// 加载中提示文本
			showLoadingjh: false, // 是否展示加载中提示
			loadingTextjh: '加载中，请稍后',// 加载中提示文本
			cphList: [],//车牌号列表
			popupActive:'',//车牌号名称
			userparkingList:[],//用户停车位信息
			transferName:'',//转赠人
			parkingData:{ //需要交换的车位信息
				endDate: "",
				jobNumber: "",//工号
				parkingLot: "",
				startDate: "",
				parkingName:''
			},
			exchangeName:'',//交换人员
			exchangeCount:'',//交换信息数量
			ApplyExchangeList:[],//申请列表
			zzcisShow:false,//遮罩层
			license:'',//查询车牌号
			userData:{
				name:'',
				jobNumber:'',
				mobile:''
			},
			isUserMessageShow:false,
			showLicenseDialog:false,
			isIconShow:false,
			lotteryDescriptionInfo:''
		}
	},
	methods: {
		handleNavigateTo(path){
			console.log(path);
			uni.navigateTo({
				url:`/pages/${path}/${path}`
			})
		},
		scroll: function(e) {
			this.old.scrollTop = e.detail.scrollTop
		},
		tabActive(data){
			this.active=data
		},
		isShowClick(){
			this.isShow=!this.isShow
		},
		iszyShowClick(){
			this.iszyShow=!this.iszyShow
		},
		isjhShowClick(){
			this.isjhShow=!this.isjhShow
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
		inputValue(data) {
			if (data) {
				this.dataList = JSON.parse(JSON.stringify(this.candidates))
			} else {
				this.dataList = []
			}
		},
		//点击放大图片
		previewImage(url){
			console.log(url);
			let arr=[]
			arr.push(url)
			uni.previewImage({
				urls:arr
			})
		},
		//获取摇号信息
		async getLotteryInfo(){
			const res = await lotteryInfo()
			console.log(res);
			this.lotteryData=res.data;
			this.countDownFun(new Date(this.lotteryData.applyEndTime));
			this.lotteryData.applyEndTime = this.lotteryData.applyEndTime && this.lotteryData.applyEndTime.length > 10 ? this.lotteryData.applyEndTime.substring(0,10) : this.lotteryData.applyEndTime;
			this.lotteryData.applyStartTime = this.lotteryData.applyStartTime && this.lotteryData.applyStartTime.length > 10 ? this.lotteryData.applyStartTime.substring(0,10) : this.lotteryData.applyStartTime;
		},
		//获取停车场信息
		async getparkingLot(){
			const res=await getparkingLotList()
			console.log("res",res);
			this.parkingLotList=res.data
		},
		//根据日期计算时分秒
		countDownFun(time) {
			let now = new Date();
			let endDate = time;
			console.log('now', now, endDate)
			let leftTime = endDate.getTime() - now.getTime(); //计算剩余的毫秒数
			if (leftTime <= 0) {
				leftTime = 0;
			}
			let leftsecond = parseInt(leftTime / 1000); //计算剩余的秒数
			let day = Math.floor(leftsecond / (60 * 60 * 24));
			let hour = Math.floor((leftsecond - day * 24 * 60 * 60) / 3600);
			let minute = Math.floor((leftsecond - day * 24 * 60 * 60 - hour * 3600) / 60);
			let second = Math.floor(leftTime / 1000 % 60, 10);
			// return `${day}天${hour}小时${minute}分钟${second}秒`;
			this.countDown={
				day,
				hour,
				minute,
				second
			}
			console.log('this.countDown', this.countDown)

		},
		//立即报名
		async lotterySubmit(){
			console.log("提交申请");
			try{
				const res = await lotteryApply({batchId:this.lotteryData.batchId})
				if(res.code==200){
					this.lotteryData.applyState=true
					uni.showToast({
						title: "申请成功",
						icon:'none',
					})
				}
			}catch(e){
				console.log(e);
			}

		},
		//取消报名
		lotteryCancelClick(){
			let _this = this
			uni.showModal({
				title: '提示',
				content: '是否确认取消申请?',
				cancelText: '取消',
				confirmText: '确定',
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定');
						_this.lotteryCancelFun()
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		async lotteryCancelFun(){
			console.log("取消申请");
			const res = await lotteryCancel({batchId:this.lotteryData.batchId})
			if(res.code==200){
				this.lotteryData.applyState=false
				uni.showToast({
					title: "取消成功",
					icon:'none',
				})
			}
		},
		//摇号记录查询
		async getlotteryList(){
			if (!this.showLoading) {
				this.showLoading = true // 展示加载中提示
				const res=await getApplyRecordList(this.lotteryPageData)
				if(res.data.list.length>0){
					this.loadingText="加载中，请稍后"
					res.data.list.forEach((element)=>{
						this.lotteryRecordList.push(element)
					})

				}else{
					this.loadingText="暂无更多"
				}
				this.showLoading = false // 隐藏加载中提示
			}

		},
		//转移记录查询
		async getTransferList(){
			if (!this.showLoadingzy) {
				this.showLoadingzy = true // 展示加载中提示
				const res=await gettransferRecordList(this.transferPageData)
				if(res.data.list.length>0){
					this.loadingTextzy="加载中，请稍后"
					res.data.list.forEach((element)=>{
						this.transferRecordList.push(element)
					})
				}else{
					this.loadingTextzy="暂无更多"
				}
				this.showLoadingzy = false // 隐藏加载中提示

			}
		},
		//交换记录查询
		async getExchangeRecordList(){
			if (!this.showLoadingjh) {
				this.showLoadingjh = true // 展示加载中提示
				const res=await getExchangeList(this.exchangePageData)
				if(res.data.list.length>0){
					this.loadingTextjh="加载中，请稍后"
					res.data.list.forEach((element)=>{
						this.exchangeRecordList.push(element)
					})
				}else{
					this.loadingTextjh="暂无更多"
				}
				this.showLoadingjh = false // 隐藏加载中提示

			}

		},
		// 交换列表查询
		async getExchangeArr(){
			let params={
				pageNo:1,
				pageSize:10,
				state:0
			}
			const res=await getExchangeList(params)
			console.log(res,"res");
			this.ApplyExchangeList=res.data.list
		},
		//获取车牌号码
		async getseleteList(name){
			const res= await getVehicleList()
			console.log(res,"车牌号码list");
			this.cphList=res.data
			this.popupActive=this.cphList[0]

		},
		//获取当前用户车位信息
		async getuserlotList(){
			const res=await getUserParkingLotList()
			console.log(res);
			this.userparkingList=res.data
		},
		//转移车位
		async parkingTransfer(){
			let todayDate=new Date().setHours(0,0,0,0);
			let isToday=false
			// this.userparkingList[0].endDate='2023-10-11'
			this.userparkingList.forEach((element)=>{
				let paramsDate=new Date(element.endDate).setHours(0,0,0,0);//给new Date()传入时间，并返回传入时间的时间戳s
				if(todayDate<paramsDate){
					isToday=true
				}
			})
			if(!isToday){
				uni.showToast({
					title: "当前车位无法转移",
					icon:'none',
				})
				return
			}
			console.log(isToday,"isToday");
			if (this.transferName=="") {
				uni.showToast({
					title: "请选择转移人",
					icon:'none',
				})
				return
			}
			var index = this.transferName.lastIndexOf("(");
			let str=""
			str = this.transferName.substring(index+1,this.transferName.length-1);
			let params={
				jobNum:str
			}
			const res=await transfer(params)
			if (res.code==200) {
				this.getuserlotList()
				uni.showToast({
					title: "转移成功",
					icon:'none',
				})
			} else{
				uni.showToast({
					title: res.msg,
					icon:'none',
				})
			}

		},
		//交换车位
		async ImmediateExchange(){
			if(this.parkingData.parkingLot==''){
				uni.showToast({
					title: "请选择要交换的车位",
					icon:'none',
				})
				return
			}
			if(this.exchangeName==''){
				uni.showToast({
					title: "请选择交换人",
					icon:'none',
				})
				return
			}
			var index = this.exchangeName.lastIndexOf("(");
			let JobNumber=""
			JobNumber = this.exchangeName.substring(index+1,this.exchangeName.length-1);
			let UserName=""
			UserName=this.exchangeName.substring(0,index);
			let params = {
				acceptJobNumber: JobNumber,
				acceptUserName:UserName,
				parkingCode: this.parkingData.parkingLot,
				validEndDate: this.parkingData.endDate,
				validStartDate: this.parkingData.startDate
			}
			try{
				const res= await applyExchange(params)
				if (res.code==200) {
					uni.showToast({
						title: "申请成功",
						icon:'none',
					})
					this.getExchangeArr()
					this.getExchange()
				} else{
					uni.showToast({
						title: res.msg,
						icon:'none',
					})
				}
			}catch(e){
				//TODO handle the exception
			}
		},
		//交换列表操作 同意 不同意 撤销
		async ExchangeOperation(item,type){
			console.log(item,"type");
			if(type=='consent'){
				console.log(1);
				if(this.parkingData.parkingLot!=''){
					console.log("调接口");
					let params={
						acceptParkingCode: this.parkingData.parkingLot,
						id: item.id,
						state: "1",
						validEndDate: this.parkingData.endDate,
						validStartDate: this.parkingData.startDate
					}
					const res =await ExchangeDeal(params)
					if (res.code==200) {
						uni.showToast({
							title: "交换成功",
							icon:'none',
						})
						this.getuserlotList()
						this.getExchangeArr()
						this.getExchange()
					} else{
						uni.showToast({
							title: res.msg,
							icon:'none',
						})
					}
				}else{
					uni.showToast({
						title: '请选择要交换的车位',
						icon:'none',
					})
				}
			}else {
				let params={
					state:'',
					id:item.id
				}
				let typeName=''
				if(type=='disagree'){
					console.log(2);
					params.state='2'
					typeName="否决"
				}else if(type=='revocation'){
					console.log(3);
					params.state='3'
					typeName="撤销"
				}
				const res =await ExchangeDeal(params)
				if (res.code==200) {
					uni.showToast({
						title: `${typeName}成功`,
						icon:'none',
					})
					this.getuserlotList()
					this.getExchangeArr()
					this.getExchange()
				} else{
					uni.showToast({
						title: res.msg,
						icon:'none',
					})
				}
			}
		},
		async getinfo(){
			if (this.license!='') {
				let params={
					plateNo:this.license
				}
				const res= await getinfoByPlateNo(params)
				console.log(res);
				if(res.code==200){
					this.userData=res.data
					this.isUserMessageShow=true
				}else{
					uni.showToast({
						title: res.msg,
						icon:'none',
					})
				}

			} else{
				uni.showToast({
					title: '请输入车牌号码',
					icon:'none',
				})
			}

		},
		//摇号记录查询
		onLoadMore(){
			console.log("触底");
			this.lotteryPageData.pageNo++
			this.getlotteryList()
		},
		//转移记录查询
		onLoadMoreZy(){
			console.log("触底");
			this.transferPageData.pageNo++
			this.getTransferList()
		},
		onLoadMoreJh(){
			console.log("触底");
			this.exchangePageData.pageNo++
			this.getExchangeRecordList()
		},
		seletecp(){
			console.log(this.zzcisShow);
			console.log("点击了");
			this.zzcisShow=true
			console.log(this.zzcisShow);
		},
		popupClick(cphm){
			console.log(cphm,"车牌");
			this.popupActive=cphm
		},
		//选择交换车位
		cutParking(item){
			console.log(item,"item");
			this.parkingData=item
		},
		//查询车位交换信息数量
		async getExchange(){
			const res=await getExchangeCount()
			console.log(res);
			this.exchangeCount = String(res.data)
		},
		//一键挪车弹框
		showDrawer(e) {
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
			this.license = license
		},
		//显示隐藏 规则
		isIconShowClick(){
			console.log("点击了");
			console.log(this.isIconShow);
			this.isIconShow=!this.isIconShow
			console.log(this.isIconShow);
		},
		async getlotterInfo(){
			const res=await getdescriptionInfo()
			this.lotteryDescriptionInfo=res.data.description
		}
	},
	onLoad(query) {
		this.active = query.page ? query.page : 0
		//获取人员列表
		this.getnameList()
		//获取摇号信息
		this.getLotteryInfo()
		//获取停车场信息列表
		this.getparkingLot()
		//获取摇号记录
		this.getlotteryList()
		//获取车牌号码列表
		this.getseleteList()
		//获取当前用户停车场信息
		this.getuserlotList()
		//查询转移记录
		this.getTransferList()
		//查询车位交换数量
		this.getExchange()
		//交换列表查询
		this.getExchangeArr()
		//查询交换记录
		this.getExchangeRecordList()
		//查询摇号规则
		this.getlotterInfo()
	}
}
</script>

<style lang="scss">
.contentCar{
	position: relative;
	z-index: 999 !important;
}
.box{
	.zzcBox{
		background-color: rgba(0,0,0,0.58);
		width: 100%;
		height: 100%;
		z-index: 9999;
		position: absolute;
		top: 0;
		left: 0;
	}

	.uni-drawer{
		z-index:3 !important;
	}
	.conterBox{
		padding: 20rpx;
		.titleBox{
			padding: 20rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0,0,0,0.08);
			border-radius: 16rpx;
			margin-top: 20rpx;
			.title{
				height: 60rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx;
				.title-left{
					display: flex;
					justify-content: center;
					align-items: center;
					.icon-title{
						width: 8rpx;
						height: 32rpx;
						background: #007AFF;
					}
					.text{
						font-size: 32rpx;
						font-weight: 600;
						color: #000000;
						margin-left: 10rpx;
					}
				}
				.title-right{
					font-size: 24rpx;
					color: #007AFF;
				}
			}
		}
		.form{
			display: flex;
			justify-content: space-around;
			.example-body{
				width: 70%;
				.copeInput{
					border-radius: 8rpx;
					height: 100%;
					font-size: 20rpx;
					padding: 10rpx;
					box-sizing: border-box;
					border: 1px solid #ccc;
					display: flex;
					align-items: center;
				}

			}
			.but{
				width: 152rpx;
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
		.message{
			padding: 20rpx;
			background: #EEF6FF;
			border-radius: 8rpx;
			margin-top: 20rpx;
			.item{
				line-height: 50rpx;
				.name{
					width: 25%;
					font-size: 28rpx;
					font-weight: 600;
					color: #000000;
					display: inline-block;
				}
				.value{
					width: 70%;
					font-size: 28rpx;
					color: #000000;
				}
			}
		}
	}
	// }
}
.lotteryManagementBox{
	background-color: #F1F8FF;
	padding: 16rpx;
	.disabledColor{
		background-color: #ccc !important;
		box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(217,217,217,0.5) !important;
	}
	.parkingLotBox{
		margin-top: 9px;
		overflow: auto;
		.scroll-view_H {
			white-space: nowrap;
			// width: 100%;
			overflow-x: scroll;
			.scroll-view-item_H {
				width: 616rpx;
				height: 200rpx;
				display: inline-block;
				background: #FFFFFF;
				box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(217,217,217,0.5);
				border-radius: 16rpx;
				padding: 14rpx;
				margin-right: 20rpx;
				overflow: hidden;
				.itemBox{
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 100%;
					.imgBox{
						width: 258rpx;
						height: 100%;
						border: 1px solid #ccc;
						.swiper{
							height: 100%;
							.scroll_img{
								width: 100%;
								height: 100%;
							}
						}
						.qsIcon{

							height: 100%;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
					.message{
						width: 320rpx;
						height: 100%;
						overflow-y: scroll;
						.title{
							font-size: 32rpx;
							font-weight: bold;
						}
						.particulars{
							margin-top: 26rpx;
							font-size: 26rpx;
							.text{
								display: -webkit-box;
								// -webkit-box-orient: vertical;
								// -webkit-line-clamp: 2;
								// overflow: hidden;
								line-height: 34rpx;
								margin-top: 10rpx;
								font-weight: 600;
							}
						}
					}
				}

			}
		}
	}
	.centerBox{
		width: 718rpx;
		background: linear-gradient(79deg, #00B2FF 0%, #007AFF 100%);
		box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0,0,0,0.08);
		border-radius: 32rpx;
		margin-top: 20rpx;
		.title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 8%;
			padding: 20rpx;
			.title-left{
				display: flex;
				align-items: center;
				.cl_logo{
					width: 46rpx;
					height: 36rpx;
					margin-top: 15rpx;
				}
				.name{
					font-size: 34rpx;
					height: 40rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: #FFFFFF;
					line-height: 50rpx;
					margin-left: 10rpx;
					// margin-top: 14rpx;
				}
			}
			.title-right{
				display: flex;
				justify-content: center;
				align-items: center;
				.search{
					font-size: 20rpx;
					color: #FFFFFF;
					margin-right: 10rpx;
				}
				.clgl{
					width: 176rpx;
					height: 64rpx;
					background: #007AFF;
					border-radius: 34rpx;
					border: 2rpx solid rgba(255,255,255,0.56);
					display: flex;
					justify-content: center;
					line-height: 64rpx
				}
				.name{
					font-size: 24rpx;
					color: #FFFFFF;
				}
			}
		}

		.tabControl{
			height: 88%;
			background: #FFFFFF;
			border-radius: 32rpx;
			padding: 20rpx;
			.isIcon{
				text-align: center;
				margin-top: 10rpx;
			}
			.qsText{
				padding: 30rpx;
				text-align: center;
				font-size: 20rpx;
				color: #b3b3b3;
			}
			.exchangeBox{
				.active{
					border: 1px solid #007AFF;
				}
			}
			.bck{
				background: #EEF6FF;
				border-radius: 8rpx;
			}
			.tabs{
				height: 80rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				.tab{
					width: 25%;
					height: 64rpx;
					border-radius: 8rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-weight: bold;
					position: relative;
					.uni-badge-left-margin{
						position: absolute;
						right: 0;
						top: 0;
					}
				}
				.active{
					background: #FFFFFF;
					color:#007AFF ;
				}
			}
			.btn{
				width: 654rpx;
				height: 80rpx;
				background: #007AFF;
				box-shadow: 0rpx 12rpx 14rpx 0rpx rgba(0,122,255,0.24);
				border-radius: 48rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #FFFFFF;
				font-weight: bold;
				margin-top: 30rpx;
			}
			.time{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 30rpx;
				padding: 12rpx;
				.uni-countdown__number{
					border-radius: 50% !important;
				}
				.text{
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: bold;
					color: #000000;
				}

			}
			.message{
				margin-top: 30rpx;
				padding: 12rpx;
				.rule-title {
					text-align: center;
					font-size: 32rpx;
					line-height: 60rpx;
					color: #000000;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: bold;
				}
				.item{
					line-height: 50rpx;
					display: flex;
					.name{
						flex: 1;
						font-size: 28rpx;
						font-weight: 600;
						color: #000000;
						display: inline-block;
					}
					.value{
						flex: 3;
						font-size: 28rpx;
						color: #000000;
					}
					.value-once{
						flex: 3;
						font-size: 28rpx;
						color: #000000;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.gren{
						color: #00B8D3;
					}
					.error{
						color:#fa3534
					}
					.succeed{
						color: #19be6b;
					}
				}
			}
		}
	}
	.lotteryList{
		overflow: hidden;


	}
	.titleBox{
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0,0,0,0.08);
		border-radius: 16rpx;
		margin-top: 20rpx;
		.title{
			height: 60rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx;
			.title-left{
				display: flex;
				justify-content: center;
				align-items: center;
				.icon-title{
					width: 8rpx;
					height: 32rpx;
					background: #007AFF;
				}
				.text{
					font-size: 32rpx;
					font-weight: 600;
					color: #000000;
					margin-left: 10rpx;
				}
			}
			.title-right{
				font-size: 24rpx;
				color: #007AFF;
			}
		}
		.ul{
			padding: 10rpx 30rpx 20rpx;
			max-height: 700rpx;
			width: 92%;
			.message{
				padding: 12rpx;
				background: #EEF6FF;
				border-radius: 8rpx;
				margin-top: 20rpx;

				.item{
					line-height: 50rpx;
					.name{
						width: 25%;
						font-size: 28rpx;
						font-weight: 600;
						color: #000000;
						display: inline-block;
					}
					.value{
						width: 70%;
						font-size: 28rpx;
						color: #000000;
					}
					.gren{
						color: #00B8D3;
					}
					.error{
						color:#fa3534
					}
					.succeed{
						color: #19be6b;
					}
				}
				.exchangeR{
					display: flex;
					justify-content: space-between;
					height: 128rpx;
					padding: 14rpx 16rpx;
					background: #EEF6FF;
					border-radius: 8rpx;
					position: relative;
					.typeBox{
						width: 60rpx;
						height: 60rpx;
						position: absolute;
						right: 0;
						top: 0;
						border-radius: 50%;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 20rpx;
						color: white;
					}
					.trpered{
						border: 1px solid #ff3c3c;
						background-color: #ff3c3c;
					}
					.trpegreen{
						border: 1px solid #20eb12;
						background-color: #20eb12;
					}
					.trpeblue{
						border: 1px solid #007AFF;
						background-color: #007AFF;
					}
					.user{
						width: 40%;
						display: flex;
						flex-direction: column;
						// justify-content: space-evenly;
						color: #000000;
						.title{
							font-size: 30rpx;
							font-weight: 600;
							padding: 0;
							height: 30rpx;
						}
						.name{
							font-size: 20rpx;
							height: 30rpx;
							margin-top: 10rpx;
						}
						.stall{
							font-size: 28rpx;
							font-weight: 600;
							height: 30rpx;
						}
					}
					.icon{
						display: flex;
						justify-content: center;
						align-items: center;
						.cw_jh{
							width: 48rpx;
							height: 48rpx;
						}
					}
				}
			}

			.loading{
				text-align: center;
				font-size: 14px;
				margin-top: 10rpx;
				color: #ccc;
			}
		}
		.Entrance{
			animation: Entrance  .3s;
		}
		.departure{
			animation: departure .3s;
			animation-fill-mode : forwards; //  动画停留在最后一刻，也就是隐藏
		}
	}
	.transferGuide{
		.transferSelete{
			padding: 0 0 30rpx 0;
			.form{
				display: flex;
				justify-content: space-around;
				.example-body{
					width: 466rpx;
					.uni-combox{
						background: #EEF6FF;
						border-radius: 8rpx;
						height: 70%;
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
			.exchangeList{
				padding: 0 30rpx;
				margin-top: 30rpx;
				.message{
					display: flex;
					justify-content: space-between;
					height: 128rpx;
					padding: 14rpx 16rpx;
					background: #EEF6FF;
					border-radius: 8rpx;
					.user{
						width: 40%;
						display: flex;
						flex-direction: column;
						// justify-content: space-evenly;
						color: #000000;
						.title{
							font-size: 30rpx;
							font-weight: 600;
							padding: 0;
							height: 30rpx;
						}
						.name{
							font-size: 20rpx;
							height: 30rpx;
							margin-top: 10rpx;
						}
						.stall{
							font-size: 28rpx;
							font-weight: 600;
							height: 30rpx;
						}
					}
					.icon{
						display: flex;
						justify-content: center;
						align-items: center;
						.cw_jh{
							width: 48rpx;
							height: 48rpx;
						}
					}

				}
				.btns{
					display: flex;
					justify-content: space-between;
					margin-top: 20rpx;
					.btn{
						width: 310rpx;
						height: 80rpx;
						text-align: center;
						line-height: 80rpx;
						border-radius: 8rpx;
						font-size: 32rpx;
						font-weight: 600;
						color: #FFFFFF;
					}
					.blue{
						background: #007AFF;
					}
					.red{
						background: #f43939;
					}
					.cx{
						width: 100%;
					}
				}
			}
		}
		.transferList{
			overflow: hidden;
		}
	}
	@keyframes Entrance {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(0);
		}
	}
	@keyframes departure {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-100%);
		}
	}
}
.tkBox{
	width: 100%;
	height: 100%;
	.popupBox{
		z-index: 99999;
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		.seteleCenter{
			height: 200rpx;
			border-radius: 0 0 30rpx 30rpx;
			background-color: #FFFFFF;
			padding: 10rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.btn{
				height: 30rpx;
				padding: 10px;
				border: 1px solid #ccc;
				text-align: center;
				line-height: 30rpx;
				font-weight: bold;
			}
			.active{
				background-color: #007AFF;
				color: #FFFFFF;
			}
		}
	}
}


</style>
