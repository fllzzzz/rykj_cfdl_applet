<template>
	<view>
			<uni-notice-bar show-icon scrollable
				:text="textValue" />
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			textValue:"您有未完成的订单：2022/10/01 08:00   2022/10/01 18:00"
			}
		},
		methods: {

		}
	}
</script>

<style scoped>

</style>
