import { defineStore } from 'pinia'

export const useaddressStore = defineStore('address', {
	state: () => ({
		addressType: 0,
		addressStart: {
			title: '',
			province: '',
			city: '',
			area: '',
			latitude: 0,
			longitude: 0
		},
		addressEnd: {
			title: '',
			province: '',
			city: '',
			area: '',
			latitude: 0,
			longitude: 0
		},
		travelAddressStart: {
			title: '',
			province: '',
			city: '',
			area: '',
			latitude: 0,
			longitude: 0
		},
		travelAddressEnd: {
			title: '',
			province: '',
			city: '',
			area: '',
			latitude: 0,
			longitude: 0
		},
		usualAddress: {
			title: '',
			province: '',
			city: '',
			area: '',
			latitude: 0,
			longitude: 0
		},
		passengerNum: 0,
		remark: ""
	}),
	actions: {
		resetData(type: number) {
			switch (type) {
				case 0:
					this.addressStart = {
						title: '',
						province: '',
						city: '',
						area: '',
						latitude: 0,
						longitude: 0
					}
					break;
				case 1:
					this.addressEnd = {
						title: '',
						province: '',
						city: '',
						area: '',
						latitude: 0,
						longitude: 0
					}
					break;
				case 2:
					this.travelAddressStart = {
						title: '',
						province: '',
						city: '',
						area: '',
						latitude: 0,
						longitude: 0
					}
					break;
				case 3:
					this.travelAddressEnd = {
						title: '',
						province: '',
						city: '',
						area: '',
						latitude: 0,
						longitude: 0
					}
					break;
				case 4:
					this.usualAddress = {
						title: '',
						province: '',
						city: '',
						area: '',
						latitude: 0,
						longitude: 0
					}
					break;
				case 99:
					this.addressStart = {
						title: '',
						province: '',
						city: '',
						area: '',
						latitude: 0,
						longitude: 0
					}
					this.addressEnd = {
						title: '',
						province: '',
						city: '',
						area: '',
						latitude: 0,
						longitude: 0
					}
					this.travelAddressStart = {
						title: '',
						province: '',
						city: '',
						area: '',
						latitude: 0,
						longitude: 0
					}
					this.travelAddressEnd = {
						title: '',
						province: '',
						city: '',
						area: '',
						latitude: 0,
						longitude: 0
					}
					this.usualAddress = {
						title: '',
						province: '',
						city: '',
						area: '',
						latitude: 0,
						longitude: 0
					}
					break;
				default:
			}
		},
		// 再来一单
		setAllInfo(obj: any) {
			this.addressStart.province = obj.startProvince
			this.addressStart.city = obj.startCity
			this.addressStart.area = obj.startCounty
			this.addressStart.latitude = obj.startLatitude
			this.addressStart.longitude = obj.startLongitude
			this.addressStart.title = obj.startAddress
			this.addressEnd.province = obj.destProvince
			this.addressEnd.city = obj.destCity
			this.addressEnd.area = obj.destCounty
			this.addressEnd.title = obj.destAddress
			this.addressEnd.longitude = obj.destLongitude
			this.addressEnd.latitude = obj.destLatitude
			this.passengerNum = obj.passengerNum
			this.remark = obj.remark
		},
		setAddress(val: object) {
			switch (this.addressType) {
				case 0:
					this.addressStart = val
					break;
				case 1:
					this.addressEnd = val
					break;
				case 2:
					this.travelAddressStart = val
					break;
				case 3:
					this.travelAddressEnd = val
					break;
				case 4:
					this.usualAddress = val
					break;
				default:

			}
		},
		setAddressType(val: number) {
			this.addressType = val
		}
	}
})
