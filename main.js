
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

//地图挂载
var amapFile = require('@/common/amap-wx.130.js');
Vue.prototype.myAmapFun = new amapFile.AMapWX({
	key: '9dae9b79eb9babd928ff62c8f4cdef36'
});

//生产提醒
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'

// pinia
import * as Pinia from 'pinia';
//dingtalk
// import * as dd from 'dingtalk-jsapi';



export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia());
  return {
    app,
	Pinia,
	// dd
  }
}
// #endif