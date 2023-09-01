<template>
	<uni-popup type="bottom" ref="selectAddressRef" @change="popupChange">
		<view class="select-address-box">
			<view class="header-box">
				<view></view>
				<view class="title-box">选择所在地区</view>
				<view class="close-icon" @tap="closePopup">
					<view class="iconfont icon-a-Shutdown-01"></view>
				</view>
			</view>
			<view class="main-box">
				<view class="address-info">
					<view class="address-item" @tap="setSelectStatus(0)">
						<view class="strip-item">
							<view
								:class="{
									'show-line': props.address.province,
									active: props.address.province
								}"
							></view>
						</view>
						<view class="name-box">
							<text v-if="props.address.province">
								{{ props.address.province }}
							</text>
							<text v-else>请选择所在省份</text>
						</view>
						<view class="icon-box">
							<view class="iconfont icon-xiangyou"></view>
						</view>
					</view>
					<view
						v-if="props.address.province"
						class="address-item"
						@tap="setSelectStatus(1)"
					>
						<view class="strip-item">
							<view
								:class="{
									'show-line': props.address.city,
									active: props.address.city
								}"
							></view>
						</view>
						<view class="name-box">
							<text v-if="props.address.city">
								{{ props.address.city }}
							</text>
							<text v-else>请选择所在城市</text>
						</view>
						<view class="icon-box">
							<view class="iconfont icon-xiangyou"></view>
						</view>
					</view>
					<view
						v-if="props.address.city"
						class="address-item"
						@tap="setSelectStatus(2)"
					>
						<view class="strip-item last-strip-item">
							<view
								:class="{
									active: props.address.area
								}"
							></view>
						</view>
						<view class="name-box">
							<text v-if="props.address.area">
								{{ props.address.area }}
							</text>
							<text v-else>请选择所在区/县</text>
						</view>
						<view class="icon-box">
							<view class="iconfont icon-xiangyou"></view>
						</view>
					</view>
				</view>
				<view class="address-select-box">
					<scroll-view
						class="content-box"
						:style="{ height: scrollHeight }"
						scroll-y="true"
					>
						<view v-if="selectStatus === 0">
							<view class="select-tip">请选择省份</view>
							<view
								class="select-item"
								v-for="(i, index) in provinvial"
								@tap="changeProvinvial(i, index)"
							>
								{{ i.label }}
							</view>
						</view>
						<view v-else-if="selectStatus === 1">
							<view class="select-tip">请选择城市</view>
							<view
								class="select-item"
								v-for="(i, index) in city"
								@tap="changeCity(i, index)"
							>
								{{ i.label }}
							</view>
						</view>
						<view v-else>
							<view class="select-tip">请选择区/县</view>
							<view
								class="select-item"
								v-for="i in area"
								@tap="chengArea(i)"
							>
								{{ i.label }}
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
import { watch, ref, onMounted, computed } from 'vue';
import provinvial from '@/common/js/provincial.js';
import cityData from '@/common/js/city.js';
import areaData from '@/common/js/area.js';

const props = defineProps({
	modelValue: Boolean,
	address: {
		type: Object,
		require: true,
		default: () => ({
			province: '',
			city: '',
			area: ''
		})
	}
});

// 市数据
const city = ref([]);
// 区县数据
const area = ref([]);
//  0 1 2 当前正在选择 省 市 区
const selectStatus = ref(0);

const emit = defineEmits(['update:modelValue', 'change']);

//  popup ref
const selectAddressRef = ref(null);

// 监听是否打开 popup
watch(
	() => props.modelValue,
	newModuleValue => {
		if (newModuleValue) {
			return selectAddressRef.value.open();
		}
		return selectAddressRef.value.close();
	}
);

onMounted(() => {
	if (props.modelValue) {
		selectAddressRef.value.open();
	}
});

// 关闭 ref
function closePopup() {
	selectAddressRef.value.close();
}

// 当popup发生改变
function popupChange(e) {
	emit('update:modelValue', e.show);
}

// 高度变化
const scrollHeight = computed(() => {
	let height = 710;
	if (props.address.province) {
		height -= 70;
	}
	if (props.address.city) {
		height -= 70;
	}
	return height + 'rpx';
});

// 选择省份的index
const proIdnex = ref(-1);

// 选择省份
function changeProvinvial(i, index) {
	if (i.label !== props.address.province) {
		emit('change', {
			province: i.label,
			city: '',
			area: ''
		});
		city.value = cityData[index];
		proIdnex.value = index;
	}

	selectStatus.value = 1;
}

// 选择市
function changeCity(i, index) {
	if (i.label !== props.address.city) {
		emit('change', {
			province: props.address.province,
			city: i.label,
			area: ''
		});
		area.value = areaData[proIdnex.value][index];
	}
	selectStatus.value = 2;
}

// 选择 区县
function chengArea(i) {
	emit('change', {
		province: props.address.province,
		city: props.address.city,
		area: i.label
	});
	selectAddressRef.value.close();
}

// 修改选择内容
function setSelectStatus(i) {
	selectStatus.value = i;
	proIdnex.value = provinvial.findIndex(
		i => i.label === props.address.province
	);
	// 获取 市数据
	if (i == 1) {
		city.value = cityData[proIdnex.value];
	}

	if (i == 2) {
		const cityIndex = cityData[proIdnex.value].findIndex(
			i => i.label === props.address.city
		);
		area.value = areaData[proIdnex.value][cityIndex];
	}
}
</script>

<style lang="scss">
.select-address-box {
	height: 900rpx;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	background-color: #fff;
	padding: 30rpx 0;

	.header-box {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 40rpx;
		padding: 0 20rpx;

		> .title-box {
			font-size: 32rpx;
		}

		.iconfont {
			color: #72899b;
		}
	}

	.main-box {
		.address-info {
			padding: 0 20rpx;

			> .address-item {
				display: flex;
				align-items: center;
				height: 80rpx;

				.strip-item {
					color: #333;
					margin-right: 48rpx;
					position: relative;

					> view {
						width: 12rpx;
						height: 12rpx;
						border-radius: 50%;
						border: 2rpx solid #086df7;
						transition: all 0.25s;
						box-sizing: border-box;
					}

					.show-line {
						&::after {
							content: '';
							position: absolute;
							top: 100%;
							left: 50%;
							width: 2rpx;
							height: 69rpx;
							background-color: #086df7;
						}

						/* #ifndef H5 */
						&::after {
							transform: translateX(-50%);
						}
						/* #endif */
					}

					.active {
						background: #086df7;
					}
				}

				.name-box {
					font-size: 24rpx;
					flex: 1;
				}

				.icon-box {
					.iconfont {
						font-size: 24rpx;
						color: #72899b;
					}
				}
			}
		}

		.address-select-box {
			padding: 20rpx 20rpx;
			border-top: 2rpx solid #d4d4d4;

			.content-box {
				height: 600rpx;

				.select-tip {
					font-size: 28rpx;
					color: #333;
					font-weight: bold;
				}

				.select-item {
					padding: 15rpx 20rpx;
					font-size: 24rpx;
					color: #333;
				}
			}
		}
	}
}
</style>
