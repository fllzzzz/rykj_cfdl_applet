/**
 * window.localStorage 浏览器永久缓存
 * @method setItem 设置缓存
 * @method getItem 获取缓存
 * @method removeItem 移除缓存
 * @method clear 移除全部缓存
 */
export const Storage = {
	setItem(key: string, value: any) {
		// 小程序不支持window对象
		// window.localStorage.setItem(key, JSON.stringify(value))
		uni.setStorageSync(key,value)
	},
	getItem(key: string) {
		// let json: any = window.localStorage.getItem(key)
		let json: any = uni.getStorageSync('key')
		return JSON.parse(json)
	},
	removeItem(key: string) {
		// window.localStorage.removeItem(key)
		uni.removeStorageSync(key);
	},
	clear() {
		// window.localStorage.clear()
		uni.clearStorageSync();
	}
}

