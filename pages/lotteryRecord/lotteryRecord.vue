<template>
	<view class="lotteryRecordBox">
		<view class="timeBox">
			<uni-section title="期号" type="line">
				<view class="example-body">
					<uni-datetime-picker  type="daterange" :clear-icon="false" v-model="timeList" @change="timeChange" />
				</view>
			</uni-section>
			<uni-section title="摇号结果" type="line">
			      <uni-data-select
			        v-model="form.result"
			        :localdata="range"
			        @change="selectChange"
					placeholder="请选择摇号结果"
			      ></uni-data-select>
			    </uni-section>
		</view>
		<view class="tableBody">
			<view class="tableBox">
				<uni-table ref="table" :loading="loading" border stripe  emptyText="暂无更多数据" >
					<uni-tr>
						<uni-th width="120" align="center">期号</uni-th>
						<uni-th width="210" align="center">车位有效期</uni-th>
						<uni-th width="120" align="center">摇号结果</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in tableData" :key="index">
						<uni-td>{{ item.batchNum }}</uni-td>
						<uni-td>
							<view class="name">{{ item.validStartDate }}-{{item.validEndDate}}</view>
						</uni-td>
						<uni-td align="center">{{ item.result }}</uni-td>
					</uni-tr>
				</uni-table>
				<view class="uni-pagination-box"><uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" /></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getApplyRecordList} from "@/api/lottery.js"
	export default {
		data() {
			return {
				single:'',
				form:{
					result:'',
					startDate:'',
					endDate:''
				},
				range: [
					{ value: '1', text: "摇中" },
					{ value: '0', text: "未中" },
				],
				timeList: [],
				//表格依赖
				searchVal: '',
				tableData: [{
					"date": "2020-09-01",
					"name": "2023-05-01—2023-08-01",
					"address": "产品楼B1停车场"
				}, {
					"date": "2020-09-02",
					"name": "2023-05-01—2023-08-01",
					"address": "未中"
				},{
					"date": "2020-09-01",
					"name": "2023-05-01—2023-08-01",
					"address": "产品楼B1停车场"
				}, {
					"date": "2020-09-02",
					"name": "2023-05-01—2023-08-01",
					"address": "未中"
				},{
					"date": "2020-09-01",
					"name": "2023-05-01—2023-08-01",
					"address": "产品楼B1停车场"
				}, ],
				// 每页数据量
				pageSize: 10,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				loading: false
			}
		},
		methods: {
			timeChange(e) {
				this.timeList=e
				this.form.startDate=this.timeList[0]
				this.form.endDate=this.timeList[1]
				this.pageCurrent=1
				this.getlist()
			},
			selectChange(e){
				this.form.result = e
				this.pageCurrent=1
				this.getlist()
			},
			change(e){
				this.pageCurrent=e.current
				this.getlist()
			},
			async getlist(){
				let parasm={
					...this.form,
					pageNo:this.pageCurrent,
					pageSize:this.pageSize
				}
				const res=await getApplyRecordList(parasm)
				this.tableData=res.data.list
				this.total=res.total
			}
		},
		onLoad() {
			this.getlist()
		}
	}
</script>

<style lang="scss">
.lotteryRecordBox{
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
	.tableBody{
		border-radius: 10px;
		padding: 30rpx;
		border-radius: 50rpx;
		box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.5);
		background-color: #fff;
		margin-top: 10px;
		.tableBox{
			margin-top: 20px;
		}
	}
	
}


</style>
