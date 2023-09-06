<script>
	export default {
		onLaunch: function() {
			if (this.globalData.envIndex === "dev") {
				this.globalData.env = this.globalData.dev
			} else {
				this.globalData.env = this.globalData.prod
			}
		},
		globalData: {
			version: '0.1.9',
			envIndex: "prod",
			// 生产环境	
			prod: {
				baseUrl: 'https://parking.cfmoto.com:8186/parking',
				agentId: '2039403901'
			},
			// 测试环境
			dev: {
				baseUrl: 'http://test-parking.cfmoto.com:8186/parking',
				agentId: '2034016904'
			},
			env: {}
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		background-color: #F7F8FC;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>