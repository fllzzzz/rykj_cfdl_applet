var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// <define:process.env.UNI_STAT_TITLE_JSON>
var init_define_process_env_UNI_STAT_TITLE_JSON = __esm({
  "<define:process.env.UNI_STAT_TITLE_JSON>"() {
  }
});

// E:/parkManage/parking-applet/node_modules/@amap/amap-jsapi-loader/dist/index.js
var require_dist = __commonJS({
  "E:/parkManage/parking-applet/node_modules/@amap/amap-jsapi-loader/dist/index.js"(exports, module) {
    "use strict";
    init_define_process_env_UNI_STAT_TITLE_JSON();
    (function(m, p) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = p() : typeof define === "function" && define.amd ? define(p) : (m = m || self, m.AMapLoader = p());
    })(exports, function() {
      function m(a) {
        var b2 = [];
        a.AMapUI && b2.push(p(a.AMapUI));
        a.Loca && b2.push(r(a.Loca));
        return Promise.all(b2);
      }
      function p(a) {
        return new Promise(function(h, c) {
          var f = [];
          if (a.plugins)
            for (var e = 0; e < a.plugins.length; e += 1)
              d.AMapUI.plugins.indexOf(a.plugins[e]) == -1 && f.push(a.plugins[e]);
          if (g.AMapUI === b.failed)
            c("\u524D\u6B21\u8BF7\u6C42 AMapUI \u5931\u8D25");
          else if (g.AMapUI === b.notload) {
            g.AMapUI = b.loading;
            d.AMapUI.version = a.version || d.AMapUI.version;
            e = d.AMapUI.version;
            var l = document.body || document.head, k = document.createElement("script");
            k.type = "text/javascript";
            k.src = "https://webapi.amap.com/ui/" + e + "/main.js";
            k.onerror = function(a2) {
              g.AMapUI = b.failed;
              c("\u8BF7\u6C42 AMapUI \u5931\u8D25");
            };
            k.onload = function() {
              g.AMapUI = b.loaded;
              if (f.length)
                window.AMapUI.loadUI(f, function() {
                  for (var a2 = 0, b2 = f.length; a2 < b2; a2++) {
                    var c2 = f[a2].split("/").slice(-1)[0];
                    window.AMapUI[c2] = arguments[a2];
                  }
                  for (h(); n.AMapUI.length; )
                    n.AMapUI.splice(0, 1)[0]();
                });
              else
                for (h(); n.AMapUI.length; )
                  n.AMapUI.splice(0, 1)[0]();
            };
            l.appendChild(k);
          } else
            g.AMapUI === b.loaded ? a.version && a.version !== d.AMapUI.version ? c("\u4E0D\u5141\u8BB8\u591A\u4E2A\u7248\u672C AMapUI \u6DF7\u7528") : f.length ? window.AMapUI.loadUI(f, function() {
              for (var a2 = 0, b2 = f.length; a2 < b2; a2++) {
                var c2 = f[a2].split("/").slice(-1)[0];
                window.AMapUI[c2] = arguments[a2];
              }
              h();
            }) : h() : a.version && a.version !== d.AMapUI.version ? c("\u4E0D\u5141\u8BB8\u591A\u4E2A\u7248\u672C AMapUI \u6DF7\u7528") : n.AMapUI.push(function(a2) {
              a2 ? c(a2) : f.length ? window.AMapUI.loadUI(f, function() {
                for (var a3 = 0, b2 = f.length; a3 < b2; a3++) {
                  var c2 = f[a3].split("/").slice(-1)[0];
                  window.AMapUI[c2] = arguments[a3];
                }
                h();
              }) : h();
            });
        });
      }
      function r(a) {
        return new Promise(function(h, c) {
          if (g.Loca === b.failed)
            c("\u524D\u6B21\u8BF7\u6C42 Loca \u5931\u8D25");
          else if (g.Loca === b.notload) {
            g.Loca = b.loading;
            d.Loca.version = a.version || d.Loca.version;
            var f = d.Loca.version, e = d.AMap.version.startsWith("2"), l = f.startsWith("2");
            if (e && !l || !e && l)
              c("JSAPI \u4E0E Loca \u7248\u672C\u4E0D\u5BF9\u5E94\uFF01\uFF01");
            else {
              e = d.key;
              l = document.body || document.head;
              var k = document.createElement("script");
              k.type = "text/javascript";
              k.src = "https://webapi.amap.com/loca?v=" + f + "&key=" + e;
              k.onerror = function(a2) {
                g.Loca = b.failed;
                c("\u8BF7\u6C42 AMapUI \u5931\u8D25");
              };
              k.onload = function() {
                g.Loca = b.loaded;
                for (h(); n.Loca.length; )
                  n.Loca.splice(0, 1)[0]();
              };
              l.appendChild(k);
            }
          } else
            g.Loca === b.loaded ? a.version && a.version !== d.Loca.version ? c("\u4E0D\u5141\u8BB8\u591A\u4E2A\u7248\u672C Loca \u6DF7\u7528") : h() : a.version && a.version !== d.Loca.version ? c("\u4E0D\u5141\u8BB8\u591A\u4E2A\u7248\u672C Loca \u6DF7\u7528") : n.Loca.push(function(a2) {
              a2 ? c(a2) : c();
            });
        });
      }
      if (!window)
        throw Error("AMap JSAPI can only be used in Browser.");
      var b;
      (function(a) {
        a.notload = "notload";
        a.loading = "loading";
        a.loaded = "loaded";
        a.failed = "failed";
      })(b || (b = {}));
      var d = { key: "", AMap: { version: "1.4.15", plugins: [] }, AMapUI: { version: "1.1", plugins: [] }, Loca: { version: "1.3.2" } }, g = { AMap: b.notload, AMapUI: b.notload, Loca: b.notload }, n = { AMap: [], AMapUI: [], Loca: [] }, q = [], t = function(a) {
        typeof a == "function" && (g.AMap === b.loaded ? a(window.AMap) : q.push(a));
      };
      return { load: function(a) {
        return new Promise(function(h, c) {
          if (g.AMap == b.failed)
            c("");
          else if (g.AMap == b.notload) {
            var f = a.key, e = a.version, l = a.plugins;
            f ? (window.AMap && location.host !== "lbs.amap.com" && c("\u7981\u6B62\u591A\u79CDAPI\u52A0\u8F7D\u65B9\u5F0F\u6DF7\u7528"), d.key = f, d.AMap.version = e || d.AMap.version, d.AMap.plugins = l || d.AMap.plugins, g.AMap = b.loading, e = document.body || document.head, window.___onAPILoaded = function(d2) {
              delete window.___onAPILoaded;
              if (d2)
                g.AMap = b.failed, c(d2);
              else
                for (g.AMap = b.loaded, m(a).then(function() {
                  h(window.AMap);
                })["catch"](c); q.length; )
                  q.splice(0, 1)[0]();
            }, l = document.createElement("script"), l.type = "text/javascript", l.src = "https://webapi.amap.com/maps?callback=___onAPILoaded&v=" + d.AMap.version + "&key=" + f + "&plugin=" + d.AMap.plugins.join(","), l.onerror = function(a2) {
              g.AMap = b.failed;
              c(a2);
            }, e.appendChild(l)) : c("\u8BF7\u586B\u5199key");
          } else if (g.AMap == b.loaded)
            if (a.key && a.key !== d.key)
              c("\u591A\u4E2A\u4E0D\u4E00\u81F4\u7684 key");
            else if (a.version && a.version !== d.AMap.version)
              c("\u4E0D\u5141\u8BB8\u591A\u4E2A\u7248\u672C JSAPI \u6DF7\u7528");
            else {
              f = [];
              if (a.plugins)
                for (e = 0; e < a.plugins.length; e += 1)
                  d.AMap.plugins.indexOf(a.plugins[e]) == -1 && f.push(a.plugins[e]);
              if (f.length)
                window.AMap.plugin(f, function() {
                  m(a).then(function() {
                    h(window.AMap);
                  })["catch"](c);
                });
              else
                m(a).then(function() {
                  h(window.AMap);
                })["catch"](c);
            }
          else if (a.key && a.key !== d.key)
            c("\u591A\u4E2A\u4E0D\u4E00\u81F4\u7684 key");
          else if (a.version && a.version !== d.AMap.version)
            c("\u4E0D\u5141\u8BB8\u591A\u4E2A\u7248\u672C JSAPI \u6DF7\u7528");
          else {
            var k = [];
            if (a.plugins)
              for (e = 0; e < a.plugins.length; e += 1)
                d.AMap.plugins.indexOf(a.plugins[e]) == -1 && k.push(a.plugins[e]);
            t(function() {
              if (k.length)
                window.AMap.plugin(k, function() {
                  m(a).then(function() {
                    h(window.AMap);
                  })["catch"](c);
                });
              else
                m(a).then(function() {
                  h(window.AMap);
                })["catch"](c);
            });
          }
        });
      }, reset: function() {
        delete window.AMap;
        delete window.AMapUI;
        delete window.Loca;
        d = { key: "", AMap: { version: "1.4.15", plugins: [] }, AMapUI: { version: "1.1", plugins: [] }, Loca: { version: "1.3.2" } };
        g = {
          AMap: b.notload,
          AMapUI: b.notload,
          Loca: b.notload
        };
        n = { AMap: [], AMapUI: [], Loca: [] };
      } };
    });
  }
});

// dep:@amap_amap-jsapi-loader
init_define_process_env_UNI_STAT_TITLE_JSON();
var amap_amap_jsapi_loader_default = require_dist();
export {
  amap_amap_jsapi_loader_default as default
};
//# sourceMappingURL=@amap_amap-jsapi-loader.js.map
