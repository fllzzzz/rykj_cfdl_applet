export default function MapLoader() {
	return new Promise((resolve, reject) => {
		if (window.AMap) {
			resolve(window.AMap);
		} else {
			window._AMapSecurityConfig = {
				securityJsCode: 'ccf3648a070d272a3ac13d49c6347a15',
			}
			var script = document.createElement('script');
			script.type = "text/javascript";
			script.async = true;
			script.src =
				"https://webapi.amap.com/maps?v=1.4.15&key=f538fe2cc7644e35d642a55f3bf20248&callback=initAMap";
			script.onerror = reject;
			document.head.appendChild(script);
		}
		window.initAMap = () => {
			resolve(window.AMap);
		};
	});
}
