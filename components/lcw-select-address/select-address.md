# 介绍

仿淘宝地址选择组件，只做了省市区三级

# 注意

只支持vue3

## props

``` js
{
	modelValue: Boolean,  // v-model绑定值用于控制是否打开选择地址组件
	address: {  // 地址数据 必须包含 province、city、area
		type: Object,
		require: true,
		default: () => ({
			province: '',
			city: '',
			area: ''
		})
	}
}
```

# 事件

| 事件名 | 说明           | 回调参数              |
| ------ | -------------- | --------------------- |
| change | 地址改变后触发 | 更新的address地址数据 |

