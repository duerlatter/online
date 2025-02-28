!function(t) {
	function e(r) {
		if (n[r])
			return n[r].exports;
		var o = n[r] = {
			i : r,
			l : !1,
			exports : {}
		};
		return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports
	}
	var n = {};
	e.m = t, e.c = n, e.d = function(t, n, r) {
		e.o(t, n) || Object.defineProperty(t, n, {
					configurable : !1,
					enumerable : !0,
					get : r
				})
	}, e.n = function(t) {
		var n = t && t.__esModule ? function() {
			return 
		} : function() {
			return t
		};
		return e.d(n, "a", n), n
	}, e.o = function(t, e) {
		return Object.prototype.hasOwnProperty.call(t, e)
	}, e.p = "", e(e.s = 5)
}([function(t, e, n) {
			n(3), t.exports = {
				getItem : function(t) {
					return window.VhallEnv[t]
				},
				setItem : function(t, e) {
					window.VhallEnv[t] = e
				}
			}
		}, function(t, e, n) {
			var r = n(4), o = (n(2), n(0));
			t.exports = {
				_conf : {},
				_get : function(t, e, n) {
					e.client = "js", e.app_id = o.getItem("appId"), e.third_party_user_id = o
							.getItem("thirdPartyUserId"), e.access_token = o
							.getItem("accessToken"), e.package_check = "peter", e.room_id = o
							.getItem("roomId");
					var r = function(t) {
						if (200 != t.code)
							return void console.error(t.msg);
						n(t)
					};
					window
							.jsonp(o.getItem("API_SERVER") + t, e, "call_back",
									r)
				},
				init : function(t) {
					this._get(r.init, {}, t)
				},
				sendMessage : function(t, e) {
					var n = "";
					window.VHPublisher && (n = o.getItem("roomId")), this._get(
							r.sendMessage, {
								body : e,
								type : t,
								channel_id : o.getItem("channelId"),
								room_id : n
							}, function(t) {
								200 == t.code
										? console.log("发送消息成功！")
										: console.log("发送消息失败！")
							})
				},
				getRoomInfo : function(t) {
					this._get(r.getRoomInfo, {}, t)
				},
				getChannelId : function(t) {
					this._get(r.getChannelId, {}, t)
				},
				getPushStreamUrl : function(t) {
					this._get(r.getPushStreamUrl, {}, t)
				},
				initLive : function(t) {
					this._get(r.initLive, {}, t)
				},
				initVod : function(t) {
					this._get(r.initVod, {
								record_id : o.getItem("recordId")
							}, t)
				},
				createRecord : function(t, e, n) {
					this._get(r.createRecord, {
								start_time : t,
								end_time : e
							}, n)
				},
				getPublishDocInfo : function(t, e, n) {
					console.log("document_id", e), this._get(
							r.getPublishDocInfo, {
								document_id : t,
								channel_id : e
							}, n)
				}
			}
		}, function(t, e, n) {
			var r = n(0);
			t.exports = {
				log : function(t, e) {
					e = e || "log", r.getItem("isdebug") && console[e]
							&& console[e](t)
				}
			}
		}, function(t, e) {
			window.Vhall = {}, window.VhallEnv = {}, window.Vhall.events = {};
			var n = {
				isDebug : "0",
				swfFilePath : "./images",
				secretKey : "",
				accountId : "",
				appId : "",
				appName : "",
				thirdPartyUserId : "",
				roomId : "",
				recordId : "",
				accessToken : "this is access token",
				channelId : "",
				connection_token : "",
				nginx_server : "",
				socket_server : "",
				publish_server : {
					publish_domainname : ["", ""],
					publish_args : {
						token : "",
						mixer : "",
						accesstoken : "",
						vhost : ""
					}
				},
				log_info : {
					session_id : "",
					uid : "",
					ip : "",
					third_party_user_id : "",
					account_id : "",
					app_name : ""
				},
				room_info : [],
				default_server : {
					hls_urls : {
						same : [{
									hls_url : "",
									line : ""
								}, {
									hls_url : "",
									line : ""
								}]
					},
					rtmp_urls : {
						same : [{
									line : "",
									rtmp_url : ""
								}, {
									line : "",
									rtmp_url : ""
								}]
					},
					token : "",
					httpflv_urls : {
						same : [{
									httpflv_url : "",
									line : "线路1"
								}, {
									httpflv_url : "",
									line : "线路2"
								}]
					},
					rand : 840202908
				},
				dispatch_server : "",
				log_info : {
					session_id : "",
					uid : "",
					ip : "",
					third_party_user_id : "",
					account_id : "",
					app_name : ""
				}
			};
			for (var r in n)
				window.VhallEnv[r] = n[r];
			window.VhallEnv.VERSION = "3.0.2", window.VhallEnv.API_SERVER = "//api.yun.vhall.com/sdk/v1", window.VhallEnv.REPORT_SERVER = "//t-dc.e.vhall.com/login"
		}, function(t, e) {
			t.exports = {
				init : "/init/start",
				sendMessage : "/message/sent",
				getPushStreamUrl : "/",
				getRoomInfo : "/room/get-publish-info",
				sendMessage : "/message/sent",
				createRecord : "/record/create",
				initLive : "/room/get-watch-info",
				initVod : "/demand/get-record-watch-info",
				getPublishDocInfo : "/document/get-publish-info",
				getWatchDocInfo : "/document/document/get-watch-info"
			}
		}, function(t, e, n) {
			t.exports = n(6)
		}, function(t, e, n) {
			var r = n(0), o = n(1), i = n(7), s = n(12);
			!function(t) {
				var e = {}, n = {};
				n.v = {}, n.player = function() {
					console.error("未初始化！")
				}, n.cutpoint = [], n.timer = null, n.events = {
					StreamStart : function() {
						console.log("推流开始")
					},
					StreamOver : function() {
						console.log("推流结束")
					}
				}, n.onError = function(t) {
				}, n.streamUrl = "", n.setReturnValue = function(t) {
					if (200 == t.code) {
						var e = t.data;
						for (var n in e)
							r.setItem(n, e[n])
					}
				}, n.initMessage = function() {
					i.pMsg().on(function(t) {
								n.events[t.event]()
							}), i.sMsg().on(function(t) {
								n.events[t.event]()
							})
				}, n.getLiveInfo = function(t) {
					o.initLive(function(e) {
								n.setReturnValue(e), t(e)
							})
				}, n.getVodinfo = function(t) {
					o.initVod(function(e) {
								n.setReturnValue(e), t(e)
							})
				}, n.setReturnValue = function(t) {
					if (200 == t.code) {
						var e = t.data;
						for (var n in e)
							r.setItem(n, e[n])
					}
				}, n.initPlayer = function(t, e) {
					var o = {
						id_ : "myVideo",
						type_ : "hls",
						baseMode : "vod",
						bufferSize : 3145728,
						useApi : !0,
						uri : "",
						pushUrl : "//" + r.getItem("log_server"),
						arguments : {
							aid : "411275671",
							uid : "16417358",
							id : "1234567890",
							p : "411275671",
							s : "",
							si : "192.168.12.138",
							bu : "1",
							app_id : "987654",
							vid : "",
							vfid : ""
						},
						subSrc : [],
						catonChangeSrcMaxTime : 10,
						useApi : !0,
						closePush : !1,
						vodQuality : []
					};
					for (var i in t)
						t[i] && (o[i] = t[i]);
					n.v = new window.SuperVideo(o), n.player = n.v.player, e()
				}, n.parseCutpoint = function() {
					window.VhallEnv && window.VhallEnv.cue_point && s({
								url : window.VhallEnv.cue_point,
								type : "get",
								timeOut : 5e3,
								success : function(t) {
									n.cutpoint = JSON.parse(t).cuepoint, n
											.setInterval()
								},
								error : function() {
									console.error("获取cutpoint失败")
								}
							})
				}, n.cutpointSort = function() {
					var t = [];
					t.push(n.cutpoint.shift()), console.log("in cutpointSort"), console
							.dir(t);
					for (var e = 0; e < n.cutpoint.length; e++)
						t[0] && t[0].created_at && function() {
							console.dir(n.cutpoint[e]), n.cutpoint[e].created_at < t[0].created_at
									? t.unshift(n.cutpoint[e])
									: t.push(n.cutpoint[e])
						}();
					n.cutpoint = t
				}, n.cutpointSort = function(t) {
					var e = [];
					e.push(t.shift());
					for (var n = 0; n < t.length; n++)
						e[0] && e[0].created_at && function() {
							console.dir(t[n]), t[n].created_at < e[0].created_at
									? e.unshift(t[n])
									: e.push(t[n])
						}();
					return e
				}, n._p = [], n.formatCutPont = function() {
					n._p = n.cutpoint, console.dir(JSON.stringify(n._p));
					for (var t = {
						forPage : []
					}, e = 0; e < n._p.length; e++) {
						var r = n._p.splice(e, 1);
						n._p[e]
								&& ("string" == typeof n._p[e]
										&& (n._p[e] = JSON.parse(n._p[e])), "string" == typeof n._p[e].content
										&& (n._p[e].content = JSON
												.parse(n._p[e].content)), console
										.log("_this._p[i].content.currentPage",
												n._p[e].content.currentPage), r
										&& n._p[e].content.currentPage
										&& t.forPage.push(r))
					}
					return t
				}, n.getCurrentPage = function() {
					for (var t = n.cutpoint, e = n.player.currentTime(), r = [{
								cz : 0,
								currentPage : 0
							}], o = 0; o < t.length; o++)
						e > t[o].created_at
								&& ("string" == typeof t[o].content
										&& (t[o].content = JSON
												.parse(t[o].content)), r.push({
											cz : e - t[o].created_at,
											currentPage : t[o].content.currentPage
										}));
					return r.sort(function(t) {
								return function(e, n) {
									return e[t] - n[t]
								}
							}("cz")), r[0].currentPage
				}, n.getBordMsgByTime = function(t) {
					for (var e = [], r = null, o = n.cutpoint.sort(function(t) {
								return function(e, n) {
									var r = e[t];
									return n[t] - r
								}
							}("created_at")), i = 0; i < o.length; i++)
						if (t > o[i].created_at) {
							"string" == typeof o[i].content
									&& (o[i].content = JSON.parse(o[i].content)), null == r
									&& (r = o[i].content.currentPage);
							var s = o[i], a = s.content;
							"string" == typeof a && (a = JSON.parse(a)), a.currentPage == r
									&& e.push(a)
						}
					return e
				}, n.setInterval = function() {
					n.timer && clearInterval(n.timer), n.timer = window
							.setInterval(function() {
								var t = n.player.currentTime();
								if (t && n.cutpoint[0])
									for (var e = n.getBordMsgByTime(t), r = 0; r < e.length; r++)
										window.Vhall.emitBroadcast(e[r])
							}, 1e3)
				}, e.init = function(t) {
					n.initMessage();
					var e = (window.Vhall.videoNode = t.videoNode, t.roomId), o = t.recordId, i = t.type
							|| "live", s = t.complete;
					if (!window.Vhall)
						return void n.onError({
									code : "1001",
									msg : "缺少基础类Vhall"
								});
					if ("live" == i)
						r.setItem("roomId", e), n.getLiveInfo(function(e) {
							if (200 != e.code)
								return void console.error("初始化失败：", e.msg);
							var o = e.data;
							console.log("vid:_d.log_info.third_party_user_id",
									o.log_info.third_party_user_id), console
									.log("vfid:_d.log_info.account_id",
											o.log_info.account_id), n
									.initPlayer({
										id : t.videoNode,
										type_ : "flv",
										baseMode : "live",
										dispatchDomain : o.dispatch_server,
										arguments : {
											aid : r.getItem("roomId"),
											uid : o.log_info.uid,
											id : "",
											p : r.getItem("roomId"),
											s : o.log_info.session_id,
											si : o.log_info.ip,
											bu : "1",
											app_id : r.getItem("appId"),
											vid : o.log_info.third_party_user_id,
											vfid : o.log_info.account_id
										}
									}, s)
						});
					else {
						if (!o)
							return void console.error("recordId不能为空");
						r.setItem("recordId", o), n.getVodinfo(function(e) {
							if (200 != e.code)
								return void console.error("初始化失败：", e.msg);
							var o = e.data, i = o.default_server.uri.split(".")[1];
							"m3u8" == i && (i = "hls"), console.log(
									"vid:_d.log_info.third_party_user_id",
									o.log_info.third_party_user_id), console
									.log("vfid:_d.log_info.account_id",
											o.log_info.account_id), n
									.initPlayer({
										id : t.videoNode,
										type_ : i,
										baseMode : "vod",
										dispatchDomain : o.dispatch_server,
										uri : o.default_server.uri,
										arguments : {
											aid : r.getItem("appId"),
											uid : o.log_info.uid,
											id : "",
											p : r.getItem("recordId"),
											s : o.log_info.session_id,
											si : o.log_info.ip,
											bu : "1",
											app_id : r.getItem("appId"),
											vid : o.log_info.third_party_user_id,
											vfid : o.log_info.account_id
										},
										vodQuality : o.definition
									}, s), n.parseCutpoint()
						})
					}
				}, e.destroy = function() {
					for (var t = document
							.getElementById(window.Vhall.videoNode), n = t.childNodes, r = n.length
							- 1; r >= 0; r--)
						t.removeChild(n.item(r));
					delete window.VhallLive, window.VhallLive = e
				}, e.error = function(t) {
					"function" == typeof t && (n.onError = t)
				}, e.play = function() {
					n.player.play()
				}, e.pause = function() {
					n.player.pause()
				}, e.getQualitys = function() {
					return n.v.choiceClearStatus()
				}, e.setQuality = function(t) {
					n.v.customChoiceQualitySrc(t)
				}, e.setFullScreen = function(t) {
					var r = e.isFullscreen();
					console.log("isFullscreen:" + r), r
							|| n.player.tech_.enterFullScreen()
				}, e.isFullscreen = function() {
					return n.player.isFullscreen()
				}, e.setVolume = function(t) {
					t = parseInt(t), t /= 100, n.player.volume(t)
				}, e.setWidth = function(t) {
					n.player.width(t)
				}, e.setHeight = function(t) {
					n.player.height(t)
				}, e.getDuration = function() {
					return n.player.duration()
				}, e.getCurrentTime = function() {
					return n.player.currentTime()
				}, e.seek = function(t) {
					n.player.currentTime(t)
				}, e.getNetworkState = function() {
					return n.player.networkState()
				}, e.onPublishStart = function(t) {
					"function" == typeof t && (n.events.StreamStart = t)
				}, e.onPublishStop = function(t) {
					"function" == typeof t && (n.events.StreamOver = t)
				}, t.VhallLive = e
			}(window)
		}, function(t, e, n) {
			var r = n(8), o = n(10);
			t.exports = {
				pMsg : r,
				sMsg : o
			}
		}, function(t, e, n) {
			n(9);
			var r = n(0), o = n(1);
			t.exports = function() {
				var t = {}, e = new window.PushStream({
							host : r.getItem("nginx_server"),
							modes : "websocket|longpolling",
							messagesPublishedAfter : 0,
							useSSL : "https:" === window.location.protocol,
							messagesControlByArgument : !0
						});
				return e.addChannel(r.getItem("channelId")), e.connect(), e.onmessage = function(
						e) {
					var n;
					try {
						n = JSON.parse(e)
					} catch (t) {
						return
					}
					try {
						t[n.event] && t[n.event](n)
					} catch (t) {
					}
				}, {
					on : function(e, n) {
						t[e] = n
					},
					emit : function(t, e) {
						o.sendMessage(t, e)
					}
				}
			}
		}, function(t, e) {
			!function(t, e, n) {
				"use strict";
				if (!t.PushStream) {
					var r = {}, o = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri",
							"Sat"], i = ["Jan", "Feb", "Mar", "Apr", "May",
							"Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], s = function(
							t) {
						return (t < 10 ? "0" : "") + t
					};
					r.dateToUTCString = function(t) {
						var e = s(t.getUTCHours()) + ":" + s(t.getUTCMinutes())
								+ ":" + s(t.getUTCSeconds());
						return o[t.getUTCDay()] + ", " + s(t.getUTCDate())
								+ " " + i[t.getUTCMonth()] + " "
								+ t.getUTCFullYear() + " " + e + " GMT"
					};
					var a = function() {
						for (var t = arguments[0] || {}, e = 0; e < arguments.length; e++) {
							var n = arguments[e];
							for (var r in n)
								n.hasOwnProperty && !n.hasOwnProperty(r)
										|| (t[r] = n[r])
						}
						return t
					}, c = /^[\],:{}\s]*$/, u = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, h = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, l = /(?:^|:|,)(?:\s*\[)+/g, p = function(
							t) {
						return t.replace(/^\s*/, "").replace(/\s*$/, "")
					};
					r.parseJSON = function(e) {
						if (!e || !b(e))
							return null;
						if (e = p(e), t.JSON && t.JSON.parse)
							try {
								return t.JSON.parse(e)
							} catch (t) {
								throw "Invalid JSON: " + e
							}
						if (c.test(e.replace(u, "@").replace(h, "]").replace(l,
								"")))
							return new Function("return " + e)();
						throw "Invalid JSON: " + e
					};
					var f = function(t) {
						var e = {};
						return e[t.tagArgument] = "", e[t.timeArgument] = "", e[t.eventIdArgument] = "", t.messagesControlByArgument
								&& (e[t.tagArgument] = Number(t._etag), t._lastModified
										? e[t.timeArgument] = t._lastModified
										: t._lastEventId
												&& (e[t.eventIdArgument] = t._lastEventId)), e
					}, d = function() {
						return (new Date).getTime()
					}, g = function() {
						return {
							_ : d()
						}
					}, m = function(e) {
						var n = e;
						if ("object" == typeof e) {
							n = "";
							for (var r in e)
								e.hasOwnProperty
										&& !e.hasOwnProperty(r)
										|| (n += "&" + r + "=" + t.escape(e[r]));
							n = n.substring(1)
						}
						return n || ""
					}, y = function(t, e) {
						return t + (t.indexOf("?") < 0 ? "?" : "&") + m(e)
					}, v = Array.isArray || function(t) {
						return "[object Array]" === Object.prototype.toString
								.call(t)
					}, b = function(t) {
						return "[object String]" === Object.prototype.toString
								.call(t)
					}, _ = function(t) {
						return "[object Date]" === Object.prototype.toString
								.call(t)
					}, w = {
						logger : null,
						debug : function() {
							"debug" === q.LOG_LEVEL
									&& w._log.apply(w._log, arguments)
						},
						info : function() {
							"info" !== q.LOG_LEVEL && "debug" !== q.LOG_LEVEL
									|| w._log.apply(w._log, arguments)
						},
						error : function() {
							w._log.apply(w._log, arguments)
						},
						_initLogger : function() {
							var e = t.console;
							e
									&& e.log
									&& (e.log.apply
											? w.logger = e.log
											: "object" == typeof e.log
													&& Function.prototype.bind
													? w.logger = Function.prototype.bind
															.call(e.log, e)
													: "object" == typeof e.log
															&& Function.prototype.call
															&& (w.logger = function() {
																Function.prototype.call
																		.call(
																				e.log,
																				e,
																				Array.prototype.slice
																						.call(arguments))
															}))
						},
						_log : function() {
							if (w.logger || w._initLogger(), w.logger)
								try {
									w.logger.apply(t.console, arguments)
								} catch (e) {
									w._initLogger(), w.logger
											&& w.logger.apply(t.console,
													arguments)
								}
							var n = e.getElementById(q.LOG_OUTPUT_ELEMENT_ID);
							if (n) {
								for (var r = "", o = 0; o < arguments.length; o++)
									r += arguments[o] + " ";
								n.innerHTML += r + "\n";
								var i = n.innerHTML.split("\n");
								i.length > 100
										&& (n.innerHTML = i.slice(-100)
												.join("\n"))
							}
						}
					}, k = {
						_getXHRObject : function(e) {
							var n = !1;
							if (e) {
								try {
									n = new t.XDomainRequest
								} catch (t) {
								}
								if (n)
									return n
							}
							try {
								n = new t.XMLHttpRequest
							} catch (e) {
								try {
									n = new t.ActiveXObject("Msxml2.XMLHTTP")
								} catch (e) {
									try {
										n = new t.ActiveXObject("Microsoft.XMLHTTP")
									} catch (t) {
										n = !1
									}
								}
							}
							return n
						},
						_send : function(e, n) {
							e = e || {}, e.timeout = e.timeout || 3e4;
							var r = k._getXHRObject(e.crossDomain);
							if (r && e.url) {
								k.clear(e), e.xhr = r, t.XDomainRequest
										&& r instanceof t.XDomainRequest
										? (r.onload = function() {
											e.afterReceive && e.afterReceive(r), e.success
													&& e
															.success(r.responseText)
										}, r.onerror = r.ontimeout = function() {
											e.afterReceive && e.afterReceive(r), e.error
													&& e.error(r.status)
										})
										: r.onreadystatechange = function() {
											4 === r.readyState
													&& (k.clear(e), e.afterReceive
															&& e
																	.afterReceive(r), 200 === r.status
															? e.success
																	&& e
																			.success(r.responseText)
															: e.error
																	&& e
																			.error(r.status))
										}, e.beforeOpen && e.beforeOpen(r);
								var o = {}, i = null, s = "GET";
								n ? (i = m(e.data), s = "POST") : o = e.data
										|| {}, r.open(s,
										y(e.url, a({}, o, g())), !0), e.beforeSend
										&& e.beforeSend(r);
								var c = function() {
									k.clear(e);
									try {
										r.abort()
									} catch (t) {
									}
									e.error(304)
								};
								return n
										? r.setRequestHeader
												&& (r.setRequestHeader(
														"Accept",
														"application/json"), r
														.setRequestHeader(
																"Content-type",
																"application/x-www-form-urlencoded"))
										: e.timeoutId = t.setTimeout(c,
												e.timeout + 2e3), r.send(i), r
							}
						},
						_clear_xhr : function(t) {
							t && (t.onreadystatechange = null)
						},
						_clear_script : function(t) {
							t
									&& (t.onerror = t.onload = t.onreadystatechange = null, t.parentNode
											&& t.parentNode.removeChild(t))
						},
						_clear_timeout : function(t) {
							t.timeoutId = B(t.timeoutId)
						},
						_clear_jsonp : function(e) {
							var n = e.data.callback;
							n && (t[n] = function() {
								t[n] = null
							})
						},
						clear : function(t) {
							k._clear_timeout(t), k._clear_jsonp(t), k
									._clear_script(e.getElementById(t.scriptId)), k
									._clear_xhr(t.xhr)
						},
						jsonp : function(n) {
							n.timeout = n.timeout || 3e4, k.clear(n);
							var r = e.head || e.getElementsByTagName("head")[0], o = e
									.createElement("script"), i = d(), s = function() {
								k.clear(n);
								var t = d();
								n.error(t - i > n.timeout / 2 ? 304 : 403)
							}, c = function() {
								k.clear(n), n.load()
							}, u = function() {
								n.afterSuccess = !0, n.success.apply(null,
										arguments)
							};
							return o.onerror = s, o.onload = o.onreadystatechange = function(
									t) {
								o.readyState
										&& !/loaded|complete/
												.test(o.readyState)
										|| (n.afterSuccess ? c() : s())
							}, n.beforeOpen && n.beforeOpen({}), n.beforeSend
									&& n.beforeSend({}), n.timeoutId = t
									.setTimeout(s, n.timeout + 2e3), n.scriptId = n.scriptId
									|| d(), n.afterSuccess = null, n.data.callback = n.scriptId
									+ "_onmessage_" + d(), t[n.data.callback] = u, o
									.setAttribute("src", y(n.url, a({}, n.data,
															g()))), o
									.setAttribute("async", "async"), o
									.setAttribute("id", n.scriptId), r
									.insertBefore(o, r.firstChild), n
						},
						load : function(t) {
							return k._send(t, !1)
						},
						post : function(t) {
							return k._send(t, !0)
						}
					}, S = function(e) {
						return e ? t.escape(e) : ""
					}, x = function(e) {
						return e ? t.unescape(e) : ""
					};
					r.parseMessage = function(t, e) {
						var n = t;
						return b(t) && (n = r.parseJSON(t)), {
							id : n[e.jsonIdKey],
							channel : n[e.jsonChannelKey],
							text : b(n[e.jsonTextKey])
									? x(n[e.jsonTextKey])
									: n[e.jsonTextKey],
							tag : n[e.jsonTagKey],
							time : n[e.jsonTimeKey],
							eventid : n[e.jsonEventIdKey] || ""
						}
					};
					var C = function(t) {
						return t.backtrack ? ".b" + Number(t.backtrack) : ""
					}, A = function(t, e) {
						var n = "";
						for (var r in t)
							t.hasOwnProperty && !t.hasOwnProperty(r)
									|| (n += "/" + r + (e ? C(t[r]) : ""));
						return n
					}, E = function(t, e, n, r) {
						var o = t.wrapper.type === R.TYPE, i = t.useSSL, s = P(
								i, t.port), c = o ? i ? "wss://" : "ws://" : i
								? "https://"
								: "http://";
						c += t.host, c += s ? ":" + s : "", c += e;
						var u = A(t.channels, r);
						if (t.channelsByArgument) {
							var h = {};
							h[t.channelsArgument] = u.substring(1), n = a({},
									n, h)
						} else
							c += u;
						return y(c, n)
					}, T = function(t) {
						var e = P(t.useSSL, t.port), n = t.useSSL
								? "https://"
								: "http://";
						return n += t.host, n += e ? ":" + e : "", n += t.urlPrefixPublisher, n += "?id="
								+ A(t.channels, !1)
					};
					r.extract_xss_domain = function(t) {
						if (t.match(/^(\d{1,3}\.){3}\d{1,3}$/))
							return t;
						var e = t.split("."), n = Math.max(e.length - 1, t
										.match(/(\w{4,}\.\w{2}|\.\w{3,})$/)
										? 2
										: 3);
						return e.slice(-1 * n).join(".")
					};
					var P = function(t, e) {
						return e = Number(e || (t ? 443 : 80)), !t && 80 === e
								|| t && 443 === e ? "" : e
					};
					r.isCrossDomainUrl = function(n) {
						if (!n)
							return !1;
						var r = e.createElement("a");
						r.href = n;
						var o = P("https:" === t.location.protocol,
								t.location.port), i = P(
								"https:" === r.protocol, r.port);
						return t.location.protocol !== r.protocol
								|| t.location.hostname !== r.hostname
								|| o !== i
					};
					var I = function(t, e) {
						return function() {
							return t.apply(e, arguments)
						}
					}, B = function(e) {
						return e && t.clearTimeout(e), null
					}, O = function(t) {
						w.info("[" + this.type + "] message received",
								arguments);
						var e = r.parseMessage(t.data, this.pushstream);
						e.tag && (this.pushstream._etag = e.tag), e.time
								&& (this.pushstream._lastModified = e.time), e.eventid
								&& (this.pushstream._lastEventId = e.eventid), this.pushstream
								._onmessage(e.text, e.id, e.channel, e.eventid,
										!0)
					}, j = function() {
						this.pushstream._onopen(), w.info("[" + this.type
								+ "] connection opened")
					}, N = function(e) {
						w.info(	"[" + this.type
										+ "] error (disconnected by server):",
								e), this.pushstream.readyState === q.OPEN
								&& this.type === L.TYPE
								&& "error" === e.type
								&& this.connection.readyState === t.EventSource.CONNECTING
								|| (this._closeCurrentConnection(), this.pushstream
										._onerror({
											type : e
													&& ("load" === e.type || "close" === e.type)
													|| this.pushstream.readyState === q.CONNECTING
													? "load"
													: "timeout"
										}))
					}, R = function(e) {
						if (!t.WebSocket && !t.MozWebSocket)
							throw "WebSocket not supported";
						this.type = R.TYPE, this.pushstream = e, this.connection = null
					};
					R.TYPE = "WebSocket", R.prototype = {
						connect : function() {
							this._closeCurrentConnection();
							var e = a({}, this.pushstream.extraParams(), g(),
									f(this.pushstream)), n = E(this.pushstream,
									this.pushstream.urlPrefixWebsocket, e,
									!this.pushstream._useControlArguments());
							this.connection = t.WebSocket
									? new t.WebSocket(n)
									: new t.MozWebSocket(n), this.connection.onerror = I(
									N, this), this.connection.onclose = I(N,
									this), this.connection.onopen = I(j, this), this.connection.onmessage = I(
									O, this), w.info(
									"[WebSocket] connecting to:", n)
						},
						disconnect : function() {
							this.connection
									&& (w
											.debug(
													"[WebSocket] closing connection to:",
													this.connection.url), this.connection.onclose = null, this
											._closeCurrentConnection(), this.pushstream
											._onclose())
						},
						_closeCurrentConnection : function() {
							if (this.connection) {
								try {
									this.connection.close()
								} catch (t) {
								}
								this.connection = null
							}
						},
						sendMessage : function(t) {
							this.connection && this.connection.send(t)
						}
					};
					var L = function(e) {
						if (!t.EventSource)
							throw "EventSource not supported";
						this.type = L.TYPE, this.pushstream = e, this.connection = null
					};
					L.TYPE = "EventSource", L.prototype = {
						connect : function() {
							this._closeCurrentConnection();
							var e = a({}, this.pushstream.extraParams(), g(),
									f(this.pushstream)), n = E(this.pushstream,
									this.pushstream.urlPrefixEventsource, e,
									!this.pushstream._useControlArguments());
							this.connection = new t.EventSource(n), this.connection.onerror = I(
									N, this), this.connection.onopen = I(j,
									this), this.connection.onmessage = I(O,
									this), w.info(
									"[EventSource] connecting to:", n)
						},
						disconnect : function() {
							this.connection
									&& (w
											.debug(
													"[EventSource] closing connection to:",
													this.connection.url), this.connection.onclose = null, this
											._closeCurrentConnection(), this.pushstream
											._onclose())
						},
						_closeCurrentConnection : function() {
							if (this.connection) {
								try {
									this.connection.close()
								} catch (t) {
								}
								this.connection = null
							}
						}
					};
					var M = function(t) {
						this.type = M.TYPE, this.pushstream = t, this.connection = null, this.url = null, this.frameloadtimer = null, this.pingtimer = null, this.iframeId = "PushStreamManager_"
								+ t.id
					};
					M.TYPE = "Stream", M.prototype = {
						connect : function() {
							this._closeCurrentConnection();
							var t = r.extract_xss_domain(this.pushstream.host);
							try {
								e.domain = t
							} catch (e) {
								w
										.error("[Stream] (warning) problem setting document.domain = "
												+ t
												+ " (OBS: IE8 does not support set IP numbers as domain)")
							}
							var n = a({}, this.pushstream.extraParams(), g(), {
										streamid : this.pushstream.id
									}, f(this.pushstream));
							this.url = E(this.pushstream,
									this.pushstream.urlPrefixStream, n,
									!this.pushstream._useControlArguments()), w
									.debug("[Stream] connecting to:", this.url), this
									.loadFrame(this.url)
						},
						disconnect : function() {
							this.connection
									&& (w.debug(
											"[Stream] closing connection to:",
											this.url), this
											._closeCurrentConnection(), this.pushstream
											._onclose())
						},
						_clear_iframe : function() {
							var t = e.getElementById(this.iframeId);
							t
									&& (t.onload = null, t.src = "about:blank", t.parentNode
											&& t.parentNode.removeChild(t))
						},
						_closeCurrentConnection : function() {
							this._clear_iframe(), this.connection
									&& (this.pingtimer = B(this.pingtimer), this.frameloadtimer = B(this.frameloadtimer), this.connection = null, this.transferDoc = null, "function" == typeof t.CollectGarbage
											&& t.CollectGarbage())
						},
						loadFrame : function(n) {
							this._clear_iframe();
							var r = null;
							if ("ActiveXObject" in t) {
								var o = new t.ActiveXObject("htmlfile");
								o.open(), o
										.write("<html><script>document.domain='"
												+ e.domain
												+ "';<\/script><body><iframe id='"
												+ this.iframeId
												+ "' src='"
												+ n
												+ "'></iframe></body></html>"), o.parentWindow.PushStream = q, o
										.close(), r = o
										.getElementById(this.iframeId), this.transferDoc = o
							} else
								r = e.createElement("IFRAME"), r.style.width = "1px", r.style.height = "1px", r.style.border = "none", r.style.position = "absolute", r.style.top = "-10px", r.style.marginTop = "-10px", r.style.zIndex = "-20", r.PushStream = q, e.body
										.appendChild(r), r.setAttribute("src",
										n), r.setAttribute("id", this.iframeId);
							r.onload = I(N, this), this.connection = r, this.frameloadtimer = t
									.setTimeout(I(N, this),
											this.pushstream.timeout)
						},
						register : function(t) {
							this.frameloadtimer = B(this.frameloadtimer), t.p = I(
									this.process, this), this.connection.onload = I(
									this._onframeloaded, this), this.pushstream
									._onopen(), this.setPingTimer(), w
									.info("[Stream] frame registered")
						},
						process : function(t, e, n, r, o, i) {
							this.pingtimer = B(this.pingtimer), w.info(
									"[Stream] message received", arguments), -1 !== t
									&& (i && (this.pushstream._etag = i), o
											&& (this.pushstream._lastModified = o), r
											&& (this.pushstream._lastEventId = r)), this.pushstream
									._onmessage(x(n), t, e, r || "", !0), this
									.setPingTimer()
						},
						_onframeloaded : function() {
							w
									.info("[Stream] frame loaded (disconnected by server)"), this.connection.onload = null, this
									.disconnect()
						},
						setPingTimer : function() {
							this.pingtimer && B(this.pingtimer), this.pingtimer = t
									.setTimeout(I(N, this),
											this.pushstream.pingtimeout)
						}
					};
					var D = function(t) {
						this.type = D.TYPE, this.pushstream = t, this.connection = null, this.opentimer = null, this.messagesQueue = [], this._linkedInternalListen = I(
								this._internalListen, this), this.xhrSettings = {
							timeout : this.pushstream.timeout,
							data : {},
							url : null,
							success : I(this.onmessage, this),
							error : I(this.onerror, this),
							load : I(this.onload, this),
							beforeSend : I(this.beforeSend, this),
							afterReceive : I(this.afterReceive, this)
						}
					};
					D.TYPE = "LongPolling", D.prototype = {
						connect : function() {
							this.messagesQueue = [], this
									._closeCurrentConnection(), this.urlWithBacktrack = E(
									this.pushstream,
									this.pushstream.urlPrefixLongpolling, {},
									!0), this.urlWithoutBacktrack = E(
									this.pushstream,
									this.pushstream.urlPrefixLongpolling, {},
									!1), this.xhrSettings.url = this.urlWithBacktrack, this.useJSONP = this.pushstream._crossDomain
									|| this.pushstream.useJSONP, this.xhrSettings.scriptId = "PushStreamManager_"
									+ this.pushstream.id, this.useJSONP
									&& (this.pushstream.messagesControlByArgument = !0), this
									._listen(), this.opentimer = t.setTimeout(
									I(j, this), 150), w.info(
									"[LongPolling] connecting to:",
									this.xhrSettings.url)
						},
						_listen : function() {
							this._internalListenTimeout
									&& B(this._internalListenTimeout), this._internalListenTimeout = t
									.setTimeout(this._linkedInternalListen, 100)
						},
						_internalListen : function() {
							this.pushstream._keepConnected
									&& (this.xhrSettings.url = this.pushstream
											._useControlArguments()
											? this.urlWithoutBacktrack
											: this.urlWithBacktrack, this.xhrSettings.data = a(
											{}, this.pushstream.extraParams(),
											this.xhrSettings.data,
											f(this.pushstream)), this.useJSONP
											? this.connection = k
													.jsonp(this.xhrSettings)
											: this.connection
													|| (this.connection = k
															.load(this.xhrSettings)))
						},
						disconnect : function() {
							this.connection
									&& (w
											.debug(
													"[LongPolling] closing connection to:",
													this.xhrSettings.url), this
											._closeCurrentConnection(), this.pushstream
											._onclose())
						},
						_closeCurrentConnection : function() {
							if (this.opentimer = B(this.opentimer), this.connection) {
								try {
									this.connection.abort()
								} catch (t) {
									try {
										k.clear(this.connection)
									} catch (t) {
									}
								}
								this.connection = null, this.xhrSettings.url = null
							}
						},
						beforeSend : function(t) {
							this.pushstream.messagesControlByArgument
									|| (t.setRequestHeader("If-None-Match",
											this.pushstream._etag), t
											.setRequestHeader(
													"If-Modified-Since",
													this.pushstream._lastModified))
						},
						afterReceive : function(t) {
							this.pushstream.messagesControlByArgument
									|| (this.pushstream._etag = t
											.getResponseHeader("Etag"), this.pushstream._lastModified = t
											.getResponseHeader("Last-Modified")), this.connection = null
						},
						onerror : function(t) {
							this._closeCurrentConnection(), this.pushstream._keepConnected
									&& (304 === t
											? this._listen()
											: (w
													.info(
															"[LongPolling] error (disconnected by server):",
															t), this.pushstream
													._onerror({
														type : 403 === t
																|| this.pushstream.readyState === q.CONNECTING
																? "load"
																: "timeout"
													})))
						},
						onload : function() {
							this._listen()
						},
						onmessage : function(t) {
							this._internalListenTimeout
									&& B(this._internalListenTimeout), w.info(
									"[LongPolling] message received", t);
							for (var e = null, n = v(t) ? t : t.replace(
									/\}\{/g, "}\r\n{").split("\r\n"), o = 0; o < n.length; o++)
								n[o]
										&& (e = r.parseMessage(n[o],
												this.pushstream), this.messagesQueue
												.push(e), this.pushstream.messagesControlByArgument
												&& e.time
												&& (this.pushstream._etag = e.tag, this.pushstream._lastModified = e.time));
							for (this._listen(); this.messagesQueue.length > 0;) {
								var i = this.messagesQueue.shift();
								this.pushstream._onmessage(i.text, i.id,
										i.channel, i.eventid,
										0 === this.messagesQueue.length)
							}
						}
					};
					var U = [], q = function(e) {
						e = e || {}, this.id = U.push(this) - 1, this.useSSL = e.useSSL
								|| !1, this.host = e.host
								|| t.location.hostname, this.port = Number(e.port
								|| (this.useSSL ? 443 : 80)), this.timeout = e.timeout
								|| 3e4, this.pingtimeout = e.pingtimeout || 3e4, this.reconnectOnTimeoutInterval = e.reconnectOnTimeoutInterval
								|| 3e3, this.reconnectOnChannelUnavailableInterval = e.reconnectOnChannelUnavailableInterval
								|| 6e4, this.lastEventId = e.lastEventId
								|| null, this.messagesPublishedAfter = e.messagesPublishedAfter, this.messagesControlByArgument = e.messagesControlByArgument
								|| !1, this.tagArgument = e.tagArgument
								|| "tag", this.timeArgument = e.timeArgument
								|| "time", this.eventIdArgument = e.eventIdArgument
								|| "eventid", this.useJSONP = e.useJSONP || !1, this._reconnecttimer = null, this._etag = 0, this._lastModified = null, this._lastEventId = null, this.urlPrefixPublisher = e.urlPrefixPublisher
								|| "/pub", this.urlPrefixStream = e.urlPrefixStream
								|| "/sub", this.urlPrefixEventsource = e.urlPrefixEventsource
								|| "/ev", this.urlPrefixLongpolling = e.urlPrefixLongpolling
								|| "/lp", this.urlPrefixWebsocket = e.urlPrefixWebsocket
								|| "/ws", this.jsonIdKey = e.jsonIdKey || "id", this.jsonChannelKey = e.jsonChannelKey
								|| "channel", this.jsonTextKey = e.jsonTextKey
								|| "text", this.jsonTagKey = e.jsonTagKey
								|| "tag", this.jsonTimeKey = e.jsonTimeKey
								|| "time", this.jsonEventIdKey = e.jsonEventIdKey
								|| "eventid", this.modes = (e.modes || "eventsource|websocket|stream|longpolling")
								.split("|"), this.wrappers = [], this.wrapper = null, this.onchanneldeleted = e.onchanneldeleted
								|| null, this.onmessage = e.onmessage || null, this.onerror = e.onerror
								|| null, this.onstatuschange = e.onstatuschange
								|| null, this.extraParams = e.extraParams
								|| function() {
									return {}
								}, this.channels = {}, this.channelsCount = 0, this.channelsByArgument = e.channelsByArgument
								|| !1, this.channelsArgument = e.channelsArgument
								|| "channels", this._crossDomain = r
								.isCrossDomainUrl(T(this));
						for (var n = 0; n < this.modes.length; n++)
							try {
								var o = null;
								switch (this.modes[n]) {
									case "websocket" :
										o = new R(this);
										break;
									case "eventsource" :
										o = new L(this);
										break;
									case "longpolling" :
										o = new D(this);
										break;
									case "stream" :
										o = new M(this)
								}
								this.wrappers[this.wrappers.length] = o
							} catch (t) {
								w.info(t)
							}
						this.readyState = 0
					};
					q.LOG_LEVEL = "error", q.LOG_OUTPUT_ELEMENT_ID = "Log4jsLogOutput", q.CLOSED = 0, q.CONNECTING = 1, q.OPEN = 2, q.prototype = {
						addChannel : function(t, e) {
							if (S(t) !== t)
								throw "Invalid channel name! Channel has to be a set of [a-zA-Z0-9]";
							if (w.debug("entering addChannel"), void 0 !== this.channels[t])
								throw "Cannot add channel " + t
										+ ": already subscribed";
							e = e || {}, w.info("adding channel", t, e), this.channels[t] = e, this.channelsCount++, this.readyState !== q.CLOSED
									&& this.connect(), w
									.debug("leaving addChannel")
						},
						removeChannel : function(t) {
							this.channels[t]
									&& (w.info("removing channel", t), delete this.channels[t], this.channelsCount--)
						},
						removeAllChannels : function() {
							w.info("removing all channels"), this.channels = {}, this.channelsCount = 0
						},
						_setState : function(t) {
							this.readyState !== t
									&& (w.info("status changed", t), this.readyState = t, this.onstatuschange
											&& this
													.onstatuschange(this.readyState))
						},
						connect : function() {
							if (w.debug("entering connect"), !this.host)
								throw "PushStream host not specified";
							if (isNaN(this.port))
								throw "PushStream port not specified";
							if (!this.channelsCount)
								throw "No channels specified";
							if (0 === this.wrappers.length)
								throw "No available support for this browser";
							this._keepConnected = !0, this._lastUsedMode = 0, this
									._connect(), w.debug("leaving connect")
						},
						disconnect : function() {
							w.debug("entering disconnect"), this._keepConnected = !1, this
									._disconnect(), this._setState(q.CLOSED), w
									.info("disconnected"), w
									.debug("leaving disconnect")
						},
						_useControlArguments : function() {
							return this.messagesControlByArgument
									&& (null !== this._lastModified || null !== this._lastEventId)
						},
						_connect : function() {
							if (null === this._lastEventId
									&& (this._lastEventId = this.lastEventId), null === this._lastModified) {
								var t = this.messagesPublishedAfter;
								if (!_(t)) {
									var e = Number(this.messagesPublishedAfter);
									e > 0 ? (t = new Date, t.setTime(t
											.getTime()
											- 1e3 * e)) : e < 0
											&& (t = new Date(0))
								}
								_(t)
										&& (this._lastModified = r
												.dateToUTCString(t))
							}
							this._disconnect(), this._setState(q.CONNECTING), this.wrapper = this.wrappers[this._lastUsedMode++
									% this.wrappers.length];
							try {
								this.wrapper.connect()
							} catch (t) {
								this.wrapper && this.wrapper.disconnect()
							}
						},
						_disconnect : function() {
							this._reconnecttimer = B(this._reconnecttimer), this.wrapper
									&& this.wrapper.disconnect()
						},
						_onopen : function() {
							this._reconnecttimer = B(this._reconnecttimer), this
									._setState(q.OPEN), this._lastUsedMode > 0
									&& this._lastUsedMode--
						},
						_onclose : function() {
							this._reconnecttimer = B(this._reconnecttimer), this
									._setState(q.CLOSED), this
									._reconnect(this.reconnectOnTimeoutInterval)
						},
						_onmessage : function(t, e, n, r, o) {
							w.debug("message", t, e, n, r, o), -2 === e
									? this.onchanneldeleted
											&& this.onchanneldeleted(n)
									: e > 0 && this.onmessage
											&& this.onmessage(t, e, n, r, o)
						},
						_onerror : function(t) {
							this._setState(q.CLOSED), this
									._reconnect("timeout" === t.type
											? this.reconnectOnTimeoutInterval
											: this.reconnectOnChannelUnavailableInterval), this.onerror
									&& this.onerror(t)
						},
						_reconnect : function(e) {
							this._keepConnected
									&& !this._reconnecttimer
									&& this.readyState !== q.CONNECTING
									&& (w.info("trying to reconnect in", e), this._reconnecttimer = t
											.setTimeout(I(this._connect, this),
													e))
						},
						sendMessage : function(t, e, n) {
							t = S(t), this.wrapper.type === R.TYPE
									? (this.wrapper.sendMessage(t), e && e())
									: k.post({
												url : T(this),
												data : t,
												success : e,
												error : n,
												crossDomain : this._crossDomain
											})
						}
					}, q.sendMessage = function(t, e, n, r) {
						k.post({
									url : t,
									data : S(e),
									success : n,
									error : r
								})
					}, q.register = function(t) {
						var e = t.window.location.href
								.match(/streamid=([0-9]*)&?/);
						e[1] && U[e[1]] && U[e[1]].wrapper.register(t)
					}, q.unload = function() {
						for (var t = 0; t < U.length; t++)
							try {
								U[t].disconnect()
							} catch (t) {
							}
					}, t.PushStream = q, t.PushStreamManager = U, t.attachEvent
							&& t.attachEvent("onunload", q.unload), t.addEventListener
							&& t.addEventListener.call(t, "unload", q.unload,
									!1)
				}
			}(window, document)
		}, function(t, e, n) {
			var r = n(11), o = n(0), i = n(1);
			t.exports = function() {
				socket = r.connect(o.getItem("socket_server"), {
							query : "token=" + o.getItem("connection_token"),
							transports : ["websocket", "polling"],
							forceNew : !0
						});
				var t = {
					channel : o.getItem("channelId"),
					third_party_user_id : o.getItem("thirdPartyUserId")
				};
				return socket.emit("join", t), {
					on : function(t) {
						socket.on("msg", function(e) {
									console.dir(e), t(e)
								})
					},
					emit : function(t) {
						i.sendMessage(type, t)
					}
				}
			}
		}, function(t, e, n) {
			var r, r;
			!function(e) {
				t.exports = e()
			}(function() {
				var t;
				return function t(e, n, o) {
					function i(a, c) {
						if (!n[a]) {
							if (!e[a]) {
								var u = "function" == typeof r && r;
								if (!c && u)
									return r(a, !0);
								if (s)
									return s(a, !0);
								throw new Error("Cannot find module '" + a
										+ "'")
							}
							var h = n[a] = {
								exports : {}
							};
							e[a][0].call(h.exports, function(t) {
										var n = e[a][1][t];
										return i(n || t)
									}, h, h.exports, t, e, n, o)
						}
						return n[a].exports
					}
					for (var s = "function" == typeof r && r, a = 0; a < o.length; a++)
						i(o[a]);
					return i
				}({
					1 : [function(t, e, n) {
								e.exports = t("./lib/")
							}, {
								"./lib/" : 2
							}],
					2 : [function(t, e, n) {
						function r(t, e) {
							"object" == typeof t && (e = t, t = void 0), e = e
									|| {};
							var n, r = o(t), i = r.source, u = r.id;
							return e.forceNew || e["force new connection"]
									|| !1 === e.multiplex
									? (a("ignoring socket cache for %s", i), n = s(
											i, e))
									: (c[u]
											|| (a("new io instance for %s", i), c[u] = s(
													i, e)), n = c[u]), n
									.socket(r.path)
						}
						var o = t("./url"), i = t("socket.io-parser"), s = t("./manager"), a = t("debug")("socket.io-client");
						e.exports = n = r;
						var c = n.managers = {};
						n.protocol = i.protocol, n.connect = r, n.Manager = t("./manager"), n.Socket = t("./socket")
					}, {
						"./manager" : 3,
						"./socket" : 5,
						"./url" : 6,
						debug : 10,
						"socket.io-parser" : 46
					}],
					3 : [function(t, e, n) {
						function r(t, e) {
							if (!(this instanceof r))
								return new r(t, e);
							t && "object" == typeof t && (e = t, t = void 0), e = e
									|| {}, e.path = e.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = e, this
									.reconnection(!1 !== e.reconnection), this
									.reconnectionAttempts(e.reconnectionAttempts
											|| 1 / 0), this
									.reconnectionDelay(e.reconnectionDelay
											|| 1e3), this
									.reconnectionDelayMax(e.reconnectionDelayMax
											|| 5e3), this
									.randomizationFactor(e.randomizationFactor
											|| .5), this.backoff = new p({
										min : this.reconnectionDelay(),
										max : this.reconnectionDelayMax(),
										jitter : this.randomizationFactor()
									}), this.timeout(null == e.timeout
									? 2e4
									: e.timeout), this.readyState = "closed", this.uri = t, this.connected = [], this.encoding = !1, this.packetBuffer = [], this.encoder = new a.Encoder, this.decoder = new a.Decoder, this.autoConnect = !1 !== e.autoConnect, this.autoConnect
									&& this.open()
						}
						var o = (t("./url"), t("engine.io-client")), i = t("./socket"), s = t("component-emitter"), a = t("socket.io-parser"), c = t("./on"), u = t("component-bind"), h = (t("object-component"), t("debug")("socket.io-client:manager")), l = t("indexof"), p = t("backo2");
						e.exports = r, r.prototype.emitAll = function() {
							this.emit.apply(this, arguments);
							for (var t in this.nsps)
								this.nsps[t].emit
										.apply(this.nsps[t], arguments)
						}, r.prototype.updateSocketIds = function() {
							for (var t in this.nsps)
								this.nsps[t].id = this.engine.id
						}, s(r.prototype), r.prototype.reconnection = function(
								t) {
							return arguments.length
									? (this._reconnection = !!t, this)
									: this._reconnection
						}, r.prototype.reconnectionAttempts = function(t) {
							return arguments.length
									? (this._reconnectionAttempts = t, this)
									: this._reconnectionAttempts
						}, r.prototype.reconnectionDelay = function(t) {
							return arguments.length
									? (this._reconnectionDelay = t, this.backoff
											&& this.backoff.setMin(t), this)
									: this._reconnectionDelay
						}, r.prototype.randomizationFactor = function(t) {
							return arguments.length
									? (this._randomizationFactor = t, this.backoff
											&& this.backoff.setJitter(t), this)
									: this._randomizationFactor
						}, r.prototype.reconnectionDelayMax = function(t) {
							return arguments.length
									? (this._reconnectionDelayMax = t, this.backoff
											&& this.backoff.setMax(t), this)
									: this._reconnectionDelayMax
						}, r.prototype.timeout = function(t) {
							return arguments.length
									? (this._timeout = t, this)
									: this._timeout
						}, r.prototype.maybeReconnectOnOpen = function() {
							!this.reconnecting && this._reconnection
									&& 0 === this.backoff.attempts
									&& this.reconnect()
						}, r.prototype.open = r.prototype.connect = function(t) {
							if (h("readyState %s", this.readyState), ~this.readyState
									.indexOf("open"))
								return this;
							h("opening %s", this.uri), this.engine = o(
									this.uri, this.opts);
							var e = this.engine, n = this;
							this.readyState = "opening", this.skipReconnect = !1;
							var r = c(e, "open", function() {
										n.onopen(), t && t()
									}), i = c(e, "error", function(e) {
								if (h("connect_error"), n.cleanup(), n.readyState = "closed", n
										.emitAll("connect_error", e), t) {
									var r = new Error("Connection error");
									r.data = e, t(r)
								} else
									n.maybeReconnectOnOpen()
							});
							if (!1 !== this._timeout) {
								var s = this._timeout;
								h("connect attempt will timeout after %d", s);
								var a = setTimeout(function() {
									h("connect attempt timed out after %d", s), r
											.destroy(), e.close(), e.emit(
											"error", "timeout"), n.emitAll(
											"connect_timeout", s)
								}, s);
								this.subs.push({
											destroy : function() {
												clearTimeout(a)
											}
										})
							}
							return this.subs.push(r), this.subs.push(i), this
						}, r.prototype.onopen = function() {
							h("open"), this.cleanup(), this.readyState = "open", this
									.emit("open");
							var t = this.engine;
							this.subs.push(c(t, "data", u(this, "ondata"))), this.subs
									.push(c(this.decoder, "decoded", u(this,
													"ondecoded"))), this.subs
									.push(c(t, "error", u(this, "onerror"))), this.subs
									.push(c(t, "close", u(this, "onclose")))
						}, r.prototype.ondata = function(t) {
							this.decoder.add(t)
						}, r.prototype.ondecoded = function(t) {
							this.emit("packet", t)
						}, r.prototype.onerror = function(t) {
							h("error", t), this.emitAll("error", t)
						}, r.prototype.socket = function(t) {
							var e = this.nsps[t];
							if (!e) {
								e = new i(this, t), this.nsps[t] = e;
								var n = this;
								e.on("connect", function() {
											e.id = n.engine.id, ~l(n.connected,
													e)
													|| n.connected.push(e)
										})
							}
							return e
						}, r.prototype.destroy = function(t) {
							var e = l(this.connected, t);
							~e && this.connected.splice(e, 1), this.connected.length
									|| this.close()
						}, r.prototype.packet = function(t) {
							h("writing packet %j", t);
							var e = this;
							e.encoding
									? e.packetBuffer.push(t)
									: (e.encoding = !0, this.encoder.encode(t,
											function(t) {
												for (var n = 0; n < t.length; n++)
													e.engine.write(t[n]);
												e.encoding = !1, e
														.processPacketQueue()
											}))
						}, r.prototype.processPacketQueue = function() {
							if (this.packetBuffer.length > 0 && !this.encoding) {
								var t = this.packetBuffer.shift();
								this.packet(t)
							}
						}, r.prototype.cleanup = function() {
							for (var t; t = this.subs.shift();)
								t.destroy();
							this.packetBuffer = [], this.encoding = !1, this.decoder
									.destroy()
						}, r.prototype.close = r.prototype.disconnect = function() {
							this.skipReconnect = !0, this.backoff.reset(), this.readyState = "closed", this.engine
									&& this.engine.close()
						}, r.prototype.onclose = function(t) {
							h("close"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this
									.emit("close", t), this._reconnection
									&& !this.skipReconnect && this.reconnect()
						}, r.prototype.reconnect = function() {
							if (this.reconnecting || this.skipReconnect)
								return this;
							var t = this;
							if (this.backoff.attempts >= this._reconnectionAttempts)
								h("reconnect failed"), this.backoff.reset(), this
										.emitAll("reconnect_failed"), this.reconnecting = !1;
							else {
								var e = this.backoff.duration();
								h("will wait %dms before reconnect attempt", e), this.reconnecting = !0;
								var n = setTimeout(function() {
									t.skipReconnect
											|| (h("attempting reconnect"), t
													.emitAll(
															"reconnect_attempt",
															t.backoff.attempts), t
													.emitAll("reconnecting",
															t.backoff.attempts), t.skipReconnect
													|| t.open(function(e) {
														e
																? (h("reconnect attempt error"), t.reconnecting = !1, t
																		.reconnect(), t
																		.emitAll(
																				"reconnect_error",
																				e.data))
																: (h("reconnect success"), t
																		.onreconnect())
													}))
								}, e);
								this.subs.push({
											destroy : function() {
												clearTimeout(n)
											}
										})
							}
						}, r.prototype.onreconnect = function() {
							var t = this.backoff.attempts;
							this.reconnecting = !1, this.backoff.reset(), this
									.updateSocketIds(), this.emitAll(
									"reconnect", t)
						}
					}, {
						"./on" : 4,
						"./socket" : 5,
						"./url" : 6,
						backo2 : 7,
						"component-bind" : 8,
						"component-emitter" : 9,
						debug : 10,
						"engine.io-client" : 11,
						indexof : 42,
						"object-component" : 43,
						"socket.io-parser" : 46
					}],
					4 : [function(t, e, n) {
								function r(t, e, n) {
									return t.on(e, n), {
										destroy : function() {
											t.removeListener(e, n)
										}
									}
								}
								e.exports = r
							}, {}],
					5 : [function(t, e, n) {
						function r(t, e) {
							this.io = t, this.nsp = e, this.json = this, this.ids = 0, this.acks = {}, this.io.autoConnect
									&& this.open(), this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0
						}
						var o = t("socket.io-parser"), i = t("component-emitter"), s = t("to-array"), a = t("./on"), c = t("component-bind"), u = t("debug")("socket.io-client:socket"), h = t("has-binary");
						e.exports = r;
						var l = {
							connect : 1,
							connect_error : 1,
							connect_timeout : 1,
							disconnect : 1,
							error : 1,
							reconnect : 1,
							reconnect_attempt : 1,
							reconnect_failed : 1,
							reconnect_error : 1,
							reconnecting : 1
						}, p = i.prototype.emit;
						i(r.prototype), r.prototype.subEvents = function() {
							if (!this.subs) {
								var t = this.io;
								this.subs = [a(t, "open", c(this, "onopen")),
										a(t, "packet", c(this, "onpacket")),
										a(t, "close", c(this, "onclose"))]
							}
						}, r.prototype.open = r.prototype.connect = function() {
							return this.connected
									? this
									: (this.subEvents(), this.io.open(), "open" == this.io.readyState
											&& this.onopen(), this)
						}, r.prototype.send = function() {
							var t = s(arguments);
							return t.unshift("message"), this.emit.apply(this,
									t), this
						}, r.prototype.emit = function(t) {
							if (l.hasOwnProperty(t))
								return p.apply(this, arguments), this;
							var e = s(arguments), n = o.EVENT;
							h(e) && (n = o.BINARY_EVENT);
							var r = {
								type : n,
								data : e
							};
							return "function" == typeof e[e.length - 1]
									&& (u("emitting packet with ack id %d",
											this.ids), this.acks[this.ids] = e
											.pop(), r.id = this.ids++), this.connected
									? this.packet(r)
									: this.sendBuffer.push(r), this
						}, r.prototype.packet = function(t) {
							t.nsp = this.nsp, this.io.packet(t)
						}, r.prototype.onopen = function() {
							u("transport is open - connecting"), "/" != this.nsp
									&& this.packet({
												type : o.CONNECT
											})
						}, r.prototype.onclose = function(t) {
							u("close (%s)", t), this.connected = !1, this.disconnected = !0, delete this.id, this
									.emit("disconnect", t)
						}, r.prototype.onpacket = function(t) {
							if (t.nsp == this.nsp)
								switch (t.type) {
									case o.CONNECT :
										this.onconnect();
										break;
									case o.EVENT :
									case o.BINARY_EVENT :
										this.onevent(t);
										break;
									case o.ACK :
									case o.BINARY_ACK :
										this.onack(t);
										break;
									case o.DISCONNECT :
										this.ondisconnect();
										break;
									case o.ERROR :
										this.emit("error", t.data)
								}
						}, r.prototype.onevent = function(t) {
							var e = t.data || [];
							u("emitting event %j", e), null != t.id
									&& (u("attaching ack callback to event"), e
											.push(this.ack(t.id))), this.connected
									? p.apply(this, e)
									: this.receiveBuffer.push(e)
						}, r.prototype.ack = function(t) {
							var e = this, n = !1;
							return function() {
								if (!n) {
									n = !0;
									var r = s(arguments);
									u("sending ack %j", r);
									var i = h(r) ? o.BINARY_ACK : o.ACK;
									e.packet({
												type : i,
												id : t,
												data : r
											})
								}
							}
						}, r.prototype.onack = function(t) {
							u("calling ack %s with %j", t.id, t.data), this.acks[t.id]
									.apply(this, t.data), delete this.acks[t.id]
						}, r.prototype.onconnect = function() {
							this.connected = !0, this.disconnected = !1, this
									.emit("connect"), this.emitBuffered()
						}, r.prototype.emitBuffered = function() {
							var t;
							for (t = 0; t < this.receiveBuffer.length; t++)
								p.apply(this, this.receiveBuffer[t]);
							for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++)
								this.packet(this.sendBuffer[t]);
							this.sendBuffer = []
						}, r.prototype.ondisconnect = function() {
							u("server disconnect (%s)", this.nsp), this
									.destroy(), this
									.onclose("io server disconnect")
						}, r.prototype.destroy = function() {
							if (this.subs) {
								for (var t = 0; t < this.subs.length; t++)
									this.subs[t].destroy();
								this.subs = null
							}
							this.io.destroy(this)
						}, r.prototype.close = r.prototype.disconnect = function() {
							return this.connected
									&& (u("performing disconnect (%s)",
											this.nsp), this.packet({
												type : o.DISCONNECT
											})), this.destroy(), this.connected
									&& this.onclose("io client disconnect"), this
						}
					}, {
						"./on" : 4,
						"component-bind" : 8,
						"component-emitter" : 9,
						debug : 10,
						"has-binary" : 38,
						"socket.io-parser" : 46,
						"to-array" : 50
					}],
					6 : [function(t, e, n) {
					(function(n) {
							function r(t, e) {
								var r = t, e = e || n.location;
								return null == t
										&& (t = e.protocol + "//" + e.host), "string" == typeof t
										&& ("/" == t.charAt(0)
												&& (t = "/" == t.charAt(1)
														? e.protocol + t
														: e.hostname + t), /^(https?|wss?):\/\//
												.test(t)
												|| (i("protocol-less url %s", t), t = void 0 !== e
														? e.protocol + "//" + t
														: "https://" + t), i(
												"parse %s", t), r = o(t)), r.port
										|| (/^(http|ws)$/.test(r.protocol)
												? r.port = "80"
												: /^(http|ws)s$/
														.test(r.protocol)
														&& (r.port = "443")), r.path = r.path
										|| "/", r.id = r.protocol + "://"
										+ r.host + ":" + r.port, r.href = r.protocol
										+ "://"
										+ r.host
										+ (e && e.port == r.port ? "" : ":"
												+ r.port), r
							}
							var o = t("parseuri"), i = t("debug")("socket.io-client:url");
							e.exports = r
						}).call(this, "undefined" != typeof self
										? self
										: "undefined" != typeof window
												? window
												: {})
					}, {
						debug : 10,
						parseuri : 44
					}],
					7 : [function(t, e, n) {
						function r(t) {
							t = t || {}, this.ms = t.min || 100, this.max = t.max
									|| 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0
									&& t.jitter <= 1 ? t.jitter : 0, this.attempts = 0
						}
						e.exports = r, r.prototype.duration = function() {
							var t = this.ms
									* Math.pow(this.factor, this.attempts++);
							if (this.jitter) {
								var e = Math.random(), n = Math.floor(e
										* this.jitter * t);
								t = 0 == (1 & Math.floor(10 * e)) ? t - n : t
										+ n
							}
							return 0 | Math.min(t, this.max)
						}, r.prototype.reset = function() {
							this.attempts = 0
						}, r.prototype.setMin = function(t) {
							this.ms = t
						}, r.prototype.setMax = function(t) {
							this.max = t
						}, r.prototype.setJitter = function(t) {
							this.jitter = t
						}
					}, {}],
					8 : [function(t, e, n) {
						var r = [].slice;
						e.exports = function(t, e) {
							if ("string" == typeof e && (e = t[e]), "function" != typeof e)
								throw new Error("bind() requires a function");
							var n = r.call(arguments, 2);
							return function() {
								return e.apply(t, n.concat(r.call(arguments)))
							}
						}
					}, {}],
					9 : [function(t, e, n) {
						function r(t) {
							if (t)
								return o(t)
						}
						function o(t) {
							for (var e in r.prototype)
								t[e] = r.prototype[e];
							return t
						}
						e.exports = r, r.prototype.on = r.prototype.addEventListener = function(
								t, e) {
							return this._callbacks = this._callbacks || {}, (this._callbacks[t] = this._callbacks[t]
									|| []).push(e), this
						}, r.prototype.once = function(t, e) {
							function n() {
								r.off(t, n), e.apply(this, arguments)
							}
							var r = this;
							return this._callbacks = this._callbacks || {}, n.fn = e, this
									.on(t, n), this
						}, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(
								t, e) {
							if (this._callbacks = this._callbacks || {}, 0 == arguments.length)
								return this._callbacks = {}, this;
							var n = this._callbacks[t];
							if (!n)
								return this;
							if (1 == arguments.length)
								return delete this._callbacks[t], this;
							for (var r, o = 0; o < n.length; o++)
								if ((r = n[o]) === e || r.fn === e) {
									n.splice(o, 1);
									break
								}
							return this
						}, r.prototype.emit = function(t) {
							this._callbacks = this._callbacks || {};
							var e = [].slice.call(arguments, 1), n = this._callbacks[t];
							if (n) {
								n = n.slice(0);
								for (var r = 0, o = n.length; r < o; ++r)
									n[r].apply(this, e)
							}
							return this
						}, r.prototype.listeners = function(t) {
							return this._callbacks = this._callbacks || {}, this._callbacks[t]
									|| []
						}, r.prototype.hasListeners = function(t) {
							return !!this.listeners(t).length
						}
					}, {}],
					10 : [function(t, e, n) {
						function r(t) {
							return r.enabled(t) ? function(e) {
								e = o(e);
								var n = new Date, i = n - (r[t] || n);
								r[t] = n, e = t + " " + e + " +"
										+ r.humanize(i), window.console
										&& console.log
										&& Function.prototype.apply
												.call(console.log, console,
														arguments)
							} : function() {
							}
						}
						function o(t) {
							return t instanceof Error
									? t.stack || t.message
									: t
						}
						e.exports = r, r.names = [], r.skips = [], r.enable = function(
								t) {
							try {
								localStorage.debug = t
							} catch (t) {
							}
							for (var e = (t || "").split(/[\s,]+/), n = e.length, o = 0; o < n; o++)
								t = e[o].replace("*", ".*?"), "-" === t[0]
										? r.skips.push(new RegExp("^"
												+ t.substr(1) + "$"))
										: r.names
												.push(new RegExp("^" + t + "$"))
						}, r.disable = function() {
							r.enable("")
						}, r.humanize = function(t) {
							return t >= 36e5
									? (t / 36e5).toFixed(1) + "h"
									: t >= 6e4
											? (t / 6e4).toFixed(1) + "m"
											: t >= 1e3
													? (t / 1e3 | 0) + "s"
													: t + "ms"
						}, r.enabled = function(t) {
							for (var e = 0, n = r.skips.length; e < n; e++)
								if (r.skips[e].test(t))
									return !1;
							for (var e = 0, n = r.names.length; e < n; e++)
								if (r.names[e].test(t))
									return !0;
							return !1
						};
						try {
							window.localStorage && r.enable(localStorage.debug)
						} catch (t) {
						}
					}, {}],
					11 : [function(t, e, n) {
								e.exports = t("./lib/")
							}, {
								"./lib/" : 12
							}],
					12 : [function(t, e, n) {
						e.exports = t("./socket"), e.exports.parser = t("engine.io-parser")
					}, {
						"./socket" : 13,
						"engine.io-parser" : 25
					}],
					13 : [function(t, e, n) {
					(function(n) {
							function r(t, e) {
								if (!(this instanceof r))
									return new r(t, e);
								if (e = e || {}, t && "object" == typeof t
										&& (e = t, t = null), t
										&& (t = h(t), e.host = t.host, e.secure = "https" == t.protocol
												|| "wss" == t.protocol, e.port = t.port, t.query
												&& (e.query = t.query)), this.secure = null != e.secure
										? e.secure
										: n.location
												&& "https:" == location.protocol, e.host) {
									var o = e.host.split(":");
									e.hostname = o.shift(), o.length
											? e.port = o.pop()
											: e.port
													|| (e.port = this.secure
															? "443"
															: "80")
								}
								this.agent = e.agent || !1, this.hostname = e.hostname
										|| (n.location
												? location.hostname
												: "localhost"), this.port = e.port
										|| (n.location && location.port
												? location.port
												: this.secure ? 443 : 80), this.query = e.query
										|| {}, "string" == typeof this.query
										&& (this.query = p.decode(this.query)), this.upgrade = !1 !== e.upgrade, this.path = (e.path || "/engine.io")
										.replace(/\/$/, "")
										+ "/", this.forceJSONP = !!e.forceJSONP, this.jsonp = !1 !== e.jsonp, this.forceBase64 = !!e.forceBase64, this.enablesXDR = !!e.enablesXDR, this.timestampParam = e.timestampParam
										|| "t", this.timestampRequests = e.timestampRequests, this.transports = e.transports
										|| ["polling", "websocket"], this.readyState = "", this.writeBuffer = [], this.callbackBuffer = [], this.policyPort = e.policyPort
										|| 843, this.rememberUpgrade = e.rememberUpgrade
										|| !1, this.binaryType = null, this.onlyBinaryUpgrades = e.onlyBinaryUpgrades, this.pfx = e.pfx
										|| null, this.key = e.key || null, this.passphrase = e.passphrase
										|| null, this.cert = e.cert || null, this.ca = e.ca
										|| null, this.ciphers = e.ciphers
										|| null, this.rejectUnauthorized = e.rejectUnauthorized
										|| null, this.open()
							}
							function o(t) {
								var e = {};
								for (var n in t)
									t.hasOwnProperty(n) && (e[n] = t[n]);
								return e
							}
							var i = t("./transports"), s = t("component-emitter"), a = t("debug")("engine.io-client:socket"), c = t("indexof"), u = t("engine.io-parser"), h = t("parseuri"), l = t("parsejson"), p = t("parseqs");
							e.exports = r, r.priorWebsocketSuccess = !1, s(r.prototype), r.protocol = u.protocol, r.Socket = r, r.Transport = t("./transport"), r.transports = t("./transports"), r.parser = t("engine.io-parser"), r.prototype.createTransport = function(
									t) {
								a('creating transport "%s"', t);
								var e = o(this.query);
								return e.EIO = u.protocol, e.transport = t, this.id
										&& (e.sid = this.id), new i[t]({
									agent : this.agent,
									hostname : this.hostname,
									port : this.port,
									secure : this.secure,
									path : this.path,
									query : e,
									forceJSONP : this.forceJSONP,
									jsonp : this.jsonp,
									forceBase64 : this.forceBase64,
									enablesXDR : this.enablesXDR,
									timestampRequests : this.timestampRequests,
									timestampParam : this.timestampParam,
									policyPort : this.policyPort,
									socket : this,
									pfx : this.pfx,
									key : this.key,
									passphrase : this.passphrase,
									cert : this.cert,
									ca : this.ca,
									ciphers : this.ciphers,
									rejectUnauthorized : this.rejectUnauthorized
								})
							}, r.prototype.open = function() {
								var t;
								if (this.rememberUpgrade
										&& r.priorWebsocketSuccess
										&& -1 != this.transports
												.indexOf("websocket"))
									t = "websocket";
								else {
									if (0 == this.transports.length) {
										var e = this;
										return void setTimeout(function() {
													e
															.emit("error",
																	"No transports available")
												}, 0)
									}
									t = this.transports[0]
								}
								this.readyState = "opening";
								var t;
								try {
									t = this.createTransport(t)
								} catch (t) {
									return this.transports.shift(), void this
											.open()
								}
								t.open(), this.setTransport(t)
							}, r.prototype.setTransport = function(t) {
								a("setting transport %s", t.name);
								var e = this;
								this.transport
										&& (a("clearing existing transport %s",
												this.transport.name), this.transport
												.removeAllListeners()), this.transport = t, t
										.on("drain", function() {
													e.onDrain()
												}).on("packet", function(t) {
													e.onPacket(t)
												}).on("error", function(t) {
													e.onError(t)
												}).on("close", function() {
													e
															.onClose("transport close")
												})
							}, r.prototype.probe = function(t) {
								function e() {
									if (p.onlyBinaryUpgrades) {
										var e = !this.supportsBinary
												&& p.transport.supportsBinary;
										l = l || e
									}
									l
											|| (a(
													'probe transport "%s" opened',
													t), h.send([{
														type : "ping",
														data : "probe"
													}]), h.once("packet",
													function(e) {
														if (!l)
															if ("pong" == e.type
																	&& "probe" == e.data) {
																if (a(
																		'probe transport "%s" pong',
																		t), p.upgrading = !0, p
																		.emit(
																				"upgrading",
																				h), !h)
																	return;
																r.priorWebsocketSuccess = "websocket" == h.name, a(
																		'pausing current transport "%s"',
																		p.transport.name), p.transport
																		.pause(
																				function() {
																					l
																							|| "closed" != p.readyState
																							&& (a("changing transport and sending upgrade packet"), u(), p
																									.setTransport(h), h
																									.send([
																											{
																												type : "upgrade"
																											}]), p
																									.emit(
																											"upgrade",
																											h), h = null, p.upgrading = !1, p
																									.flush())
																				})
															} else {
																a(
																		'probe transport "%s" failed',
																		t);
																var n = new Error("probe error");
																n.transport = h.name, p
																		.emit(
																				"upgradeError",
																				n)
															}
													}))
								}
								function n() {
									l || (l = !0, u(), h.close(), h = null)
								}
								function o(e) {
									var r = new Error("probe error: " + e);
									r.transport = h.name, n(), a(
											'probe transport "%s" failed because of error: %s',
											t, e), p.emit("upgradeError", r)
								}
								function i() {
									o("transport closed")
								}
								function s() {
									o("socket closed")
								}
								function c(t) {
									h
											&& t.name != h.name
											&& (a('"%s" works - aborting "%s"',
													t.name, h.name), n())
								}
								function u() {
									h.removeListener("open", e), h
											.removeListener("error", o), h
											.removeListener("close", i), p
											.removeListener("close", s), p
											.removeListener("upgrading", c)
								}
								a('probing transport "%s"', t);
								var h = this.createTransport(t, {
											probe : 1
										}), l = !1, p = this;
								r.priorWebsocketSuccess = !1, h.once("open", e), h
										.once("error", o), h.once("close", i), this
										.once("close", s), this.once(
										"upgrading", c), h.open()
							}, r.prototype.onOpen = function() {
								if (a("socket open"), this.readyState = "open", r.priorWebsocketSuccess = "websocket" == this.transport.name, this
										.emit("open"), this.flush(), "open" == this.readyState
										&& this.upgrade && this.transport.pause) {
									a("starting upgrade probes");
									for (var t = 0, e = this.upgrades.length; t < e; t++)
										this.probe(this.upgrades[t])
								}
							}, r.prototype.onPacket = function(t) {
								if ("opening" == this.readyState
										|| "open" == this.readyState)
									switch (a(
											'socket receive: type "%s", data "%s"',
											t.type, t.data), this.emit(
											"packet", t), this
											.emit("heartbeat"), t.type) {
										case "open" :
											this.onHandshake(l(t.data));
											break;
										case "pong" :
											this.setPing();
											break;
										case "error" :
											var e = new Error("server error");
											e.code = t.data, this.emit("error",
													e);
											break;
										case "message" :
											this.emit("data", t.data), this
													.emit("message", t.data)
									}
								else
									a(
											'packet received with socket readyState "%s"',
											this.readyState)
							}, r.prototype.onHandshake = function(t) {
								this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this
										.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this
										.onOpen(), "closed" != this.readyState
										&& (this.setPing(), this
												.removeListener("heartbeat",
														this.onHeartbeat), this
												.on("heartbeat",
														this.onHeartbeat))
							}, r.prototype.onHeartbeat = function(t) {
								clearTimeout(this.pingTimeoutTimer);
								var e = this;
								e.pingTimeoutTimer = setTimeout(function() {
											"closed" != e.readyState
													&& e
															.onClose("ping timeout")
										}, t || e.pingInterval + e.pingTimeout)
							}, r.prototype.setPing = function() {
								var t = this;
								clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(
										function() {
											a(
													"writing ping packet - expecting pong within %sms",
													t.pingTimeout), t.ping(), t
													.onHeartbeat(t.pingTimeout)
										}, t.pingInterval)
							}, r.prototype.ping = function() {
								this.sendPacket("ping")
							}, r.prototype.onDrain = function() {
								for (var t = 0; t < this.prevBufferLen; t++)
									this.callbackBuffer[t]
											&& this.callbackBuffer[t]();
								this.writeBuffer.splice(0, this.prevBufferLen), this.callbackBuffer
										.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 == this.writeBuffer.length
										? this.emit("drain")
										: this.flush()
							}, r.prototype.flush = function() {
								"closed" != this.readyState
										&& this.transport.writable
										&& !this.upgrading
										&& this.writeBuffer.length
										&& (a("flushing %d packets in socket",
												this.writeBuffer.length), this.transport
												.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this
												.emit("flush"))
							}, r.prototype.write = r.prototype.send = function(
									t, e) {
								return this.sendPacket("message", t, e), this
							}, r.prototype.sendPacket = function(t, e, n) {
								if ("closing" != this.readyState
										&& "closed" != this.readyState) {
									var r = {
										type : t,
										data : e
									};
									this.emit("packetCreate", r), this.writeBuffer
											.push(r), this.callbackBuffer
											.push(n), this.flush()
								}
							}, r.prototype.close = function() {
								function t() {
									r.onClose("forced close"), a("socket closing - telling transport to close"), r.transport
											.close()
								}
								function e() {
									r.removeListener("upgrade", e), r
											.removeListener("upgradeError", e), t()
								}
								function n() {
									r.once("upgrade", e), r.once(
											"upgradeError", e)
								}
								if ("opening" == this.readyState
										|| "open" == this.readyState) {
									this.readyState = "closing";
									var r = this;
									this.writeBuffer.length ? this.once(
											"drain", function() {
												this.upgrading ? n() : t()
											}) : this.upgrading ? n() : t()
								}
								return this
							}, r.prototype.onError = function(t) {
								a("socket error %j", t), r.priorWebsocketSuccess = !1, this
										.emit("error", t), this.onClose(
										"transport error", t)
							}, r.prototype.onClose = function(t, e) {
								if ("opening" == this.readyState
										|| "open" == this.readyState
										|| "closing" == this.readyState) {
									a('socket close with reason: "%s"', t);
									var n = this;
									clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), setTimeout(
											function() {
												n.writeBuffer = [], n.callbackBuffer = [], n.prevBufferLen = 0
											}, 0), this.transport
											.removeAllListeners("close"), this.transport
											.close(), this.transport
											.removeAllListeners(), this.readyState = "closed", this.id = null, this
											.emit("close", t, e)
								}
							}, r.prototype.filterUpgrades = function(t) {
								for (var e = [], n = 0, r = t.length; n < r; n++)
									~c(this.transports, t[n]) && e.push(t[n]);
								return e
							}
						}).call(this, "undefined" != typeof self
										? self
										: "undefined" != typeof window
												? window
												: {})
					}, {
						"./transport" : 14,
						"./transports" : 15,
						"component-emitter" : 9,
						debug : 22,
						"engine.io-parser" : 25,
						indexof : 42,
						parsejson : 34,
						parseqs : 35,
						parseuri : 36
					}],
					14 : [function(t, e, n) {
						function r(t) {
							this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, this.query = t.query, this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, this.readyState = "", this.agent = t.agent
									|| !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized
						}
						var o = t("engine.io-parser"), i = t("component-emitter");
						e.exports = r, i(r.prototype), r.timestamps = 0, r.prototype.onError = function(
								t, e) {
							var n = new Error(t);
							return n.type = "TransportError", n.description = e, this
									.emit("error", n), this
						}, r.prototype.open = function() {
							return "closed" != this.readyState
									&& "" != this.readyState
									|| (this.readyState = "opening", this
											.doOpen()), this
						}, r.prototype.close = function() {
							return "opening" != this.readyState
									&& "open" != this.readyState
									|| (this.doClose(), this.onClose()), this
						}, r.prototype.send = function(t) {
							if ("open" != this.readyState)
								throw new Error("Transport not open");
							this.write(t)
						}, r.prototype.onOpen = function() {
							this.readyState = "open", this.writable = !0, this
									.emit("open")
						}, r.prototype.onData = function(t) {
							var e = o.decodePacket(t, this.socket.binaryType);
							this.onPacket(e)
						}, r.prototype.onPacket = function(t) {
							this.emit("packet", t)
						}, r.prototype.onClose = function() {
							this.readyState = "closed", this.emit("close")
						}
					}, {
						"component-emitter" : 9,
						"engine.io-parser" : 25
					}],
					15 : [function(t, e, n) {
					(function(e) {
							function r(t) {
								var n = !1, r = !1, a = !1 !== t.jsonp;
								if (e.location) {
									var c = "https:" == location.protocol, u = location.port;
									u || (u = c ? 443 : 80), n = t.hostname != location.hostname
											|| u != t.port, r = t.secure != c
								}
								if (t.xdomain = n, t.xscheme = r, "open" in new o(t)
										&& !t.forceJSONP)
									return new i(t);
								if (!a)
									throw new Error("JSONP disabled");
								return new s(t)
							}
							var o = t("xmlhttprequest"), i = t("./polling-xhr"), s = t("./polling-jsonp"), a = t("./websocket");
							n.polling = r, n.websocket = a
						}).call(this, "undefined" != typeof self
										? self
										: "undefined" != typeof window
												? window
												: {})
					}, {
						"./polling-jsonp" : 16,
						"./polling-xhr" : 17,
						"./websocket" : 19,
						xmlhttprequest : 20
					}],
					16 : [function(t, e, n) {
					(function(n) {
							function r() {
							}
							function o(t) {
								i.call(this, t), this.query = this.query || {}, a
										|| (n.___eio || (n.___eio = []), a = n.___eio), this.index = a.length;
								var e = this;
								a.push(function(t) {
											e.onData(t)
										}), this.query.j = this.index, n.document
										&& n.addEventListener
										&& n.addEventListener("beforeunload",
												function() {
													e.script
															&& (e.script.onerror = r)
												}, !1)
							}
							var i = t("./polling"), s = t("component-inherit");
							e.exports = o;
							var a, c = /\n/g, u = /\\n/g;
							s(o, i), o.prototype.supportsBinary = !1, o.prototype.doClose = function() {
								this.script
										&& (this.script.parentNode
												.removeChild(this.script), this.script = null), this.form
										&& (this.form.parentNode
												.removeChild(this.form), this.form = null, this.iframe = null), i.prototype.doClose
										.call(this)
							}, o.prototype.doPoll = function() {
								var t = this, e = document
										.createElement("script");
								this.script
										&& (this.script.parentNode
												.removeChild(this.script), this.script = null), e.async = !0, e.src = this
										.uri(), e.onerror = function(e) {
									t.onError("jsonp poll error", e)
								};
								var n = document.getElementsByTagName("script")[0];
								n.parentNode.insertBefore(e, n), this.script = e, "undefined" != typeof navigator
										&& /gecko/i.test(navigator.userAgent)
										&& setTimeout(function() {
											var t = document
													.createElement("iframe");
											document.body.appendChild(t), document.body
													.removeChild(t)
										}, 100)
							}, o.prototype.doWrite = function(t, e) {
								function n() {
									r(), e()
								}
								function r() {
									if (o.iframe)
										try {
											o.form.removeChild(o.iframe)
										} catch (t) {
											o
													.onError(
															"jsonp polling iframe removal error",
															t)
										}
									try {
										var t = '<iframe src="javascript:0" name="'
												+ o.iframeId + '">';
										i = document.createElement(t)
									} catch (t) {
										i = document.createElement("iframe"), i.name = o.iframeId, i.src = "javascript:0"
									}
									i.id = o.iframeId, o.form.appendChild(i), o.iframe = i
								}
								var o = this;
								if (!this.form) {
									var i, s = document.createElement("form"), a = document
											.createElement("textarea"), h = this.iframeId = "eio_iframe_"
											+ this.index;
									s.className = "socketio", s.style.position = "absolute", s.style.top = "-1000px", s.style.left = "-1000px", s.target = h, s.method = "POST", s
											.setAttribute("accept-charset",
													"utf-8"), a.name = "d", s
											.appendChild(a), document.body
											.appendChild(s), this.form = s, this.area = a
								}
								this.form.action = this.uri(), r(), t = t
										.replace(u, "\\\n"), this.area.value = t
										.replace(c, "\\n");
								try {
									this.form.submit()
								} catch (t) {
								}
								this.iframe.attachEvent
										? this.iframe.onreadystatechange = function() {
											"complete" == o.iframe.readyState
													&& n()
										}
										: this.iframe.onload = n
							}
						}).call(this, "undefined" != typeof self
										? self
										: "undefined" != typeof window
												? window
												: {})
					}, {
						"./polling" : 18,
						"component-inherit" : 21
					}],
					17 : [function(t, e, n) {
					(function(n) {
							function r() {
							}
							function o(t) {
								if (c.call(this, t), n.location) {
									var e = "https:" == location.protocol, r = location.port;
									r || (r = e ? 443 : 80), this.xd = t.hostname != n.location.hostname
											|| r != t.port, this.xs = t.secure != e
								}
							}
							function i(t) {
								this.method = t.method || "GET", this.uri = t.uri, this.xd = !!t.xd, this.xs = !!t.xs, this.async = !1 !== t.async, this.data = void 0 != t.data
										? t.data
										: null, this.agent = t.agent, this.isBinary = t.isBinary, this.supportsBinary = t.supportsBinary, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this
										.create()
							}
							function s() {
								for (var t in i.requests)
									i.requests.hasOwnProperty(t)
											&& i.requests[t].abort()
							}
							var a = t("xmlhttprequest"), c = t("./polling"), u = t("component-emitter"), h = t("component-inherit"), l = t("debug")("engine.io-client:polling-xhr");
							e.exports = o, e.exports.Request = i, h(o, c), o.prototype.supportsBinary = !0, o.prototype.request = function(
									t) {
								return t = t || {}, t.uri = this.uri(), t.xd = this.xd, t.xs = this.xs, t.agent = this.agent
										|| !1, t.supportsBinary = this.supportsBinary, t.enablesXDR = this.enablesXDR, t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized, new i(t)
							}, o.prototype.doWrite = function(t, e) {
								var n = "string" != typeof t && void 0 !== t, r = this
										.request({
													method : "POST",
													data : t,
													isBinary : n
												}), o = this;
								r.on("success", e), r.on("error", function(t) {
											o.onError("xhr post error", t)
										}), this.sendXhr = r
							}, o.prototype.doPoll = function() {
								l("xhr poll");
								var t = this.request(), e = this;
								t.on("data", function(t) {
											e.onData(t)
										}), t.on("error", function(t) {
											e.onError("xhr poll error", t)
										}), this.pollXhr = t
							}, u(i.prototype), i.prototype.create = function() {
								var t = {
									agent : this.agent,
									xdomain : this.xd,
									xscheme : this.xs,
									enablesXDR : this.enablesXDR
								};
								t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized;
								var e = this.xhr = new a(t), r = this;
								try {
									if (l("xhr open %s: %s", this.method,
											this.uri), e.open(this.method,
											this.uri, this.async), this.supportsBinary
											&& (e.responseType = "arraybuffer"), "POST" == this.method)
										try {
											this.isBinary
													? e
															.setRequestHeader(
																	"Content-type",
																	"application/octet-stream")
													: e
															.setRequestHeader(
																	"Content-type",
																	"text/plain;charset=UTF-8")
										} catch (t) {
										}
									"withCredentials" in e
											&& (e.withCredentials = !0), this
											.hasXDR() ? (e.onload = function() {
										r.onLoad()
									}, e.onerror = function() {
										r.onError(e.responseText)
									}) : e.onreadystatechange = function() {
										4 == e.readyState
												&& (200 == e.status
														|| 1223 == e.status ? r
														.onLoad() : setTimeout(
														function() {
															r.onError(e.status)
														}, 0))
									}, l("xhr data %s", this.data), e
											.send(this.data)
								} catch (t) {
									return void setTimeout(function() {
												r.onError(t)
											}, 0)
								}
								n.document
										&& (this.index = i.requestsCount++, i.requests[this.index] = this)
							}, i.prototype.onSuccess = function() {
								this.emit("success"), this.cleanup()
							}, i.prototype.onData = function(t) {
								this.emit("data", t), this.onSuccess()
							}, i.prototype.onError = function(t) {
								this.emit("error", t), this.cleanup(!0)
							}, i.prototype.cleanup = function(t) {
								if (void 0 !== this.xhr && null !== this.xhr) {
									if (this.hasXDR()
											? this.xhr.onload = this.xhr.onerror = r
											: this.xhr.onreadystatechange = r, t)
										try {
											this.xhr.abort()
										} catch (t) {
										}
									n.document && delete i.requests[this.index], this.xhr = null
								}
							}, i.prototype.onLoad = function() {
								var t;
								try {
									var e;
									try {
										e = this.xhr
												.getResponseHeader("Content-Type")
												.split(";")[0]
									} catch (t) {
									}
									t = "application/octet-stream" === e
											? this.xhr.response
											: this.supportsBinary
													? "ok"
													: this.xhr.responseText
								} catch (t) {
									this.onError(t)
								}
								null != t && this.onData(t)
							}, i.prototype.hasXDR = function() {
								return void 0 !== n.XDomainRequest && !this.xs
										&& this.enablesXDR
							}, i.prototype.abort = function() {
								this.cleanup()
							}, n.document
									&& (i.requestsCount = 0, i.requests = {}, n.attachEvent
											? n.attachEvent("onunload", s)
											: n.addEventListener
													&& n.addEventListener(
															"beforeunload", s,
															!1))
						}).call(this, "undefined" != typeof self
										? self
										: "undefined" != typeof window
												? window
												: {})
					}, {
						"./polling" : 18,
						"component-emitter" : 9,
						"component-inherit" : 21,
						debug : 22,
						xmlhttprequest : 20
					}],
					18 : [function(t, e, n) {
						function r(t) {
							var e = t && t.forceBase64;
							u && !e || (this.supportsBinary = !1), o.call(this,
									t)
						}
						var o = t("../transport"), i = t("parseqs"), s = t("engine.io-parser"), a = t("component-inherit"), c = t("debug")("engine.io-client:polling");
						e.exports = r;
						var u = function() {
							return null != new (t("xmlhttprequest"))({
										xdomain : !1
									}).responseType
						}();
						a(r, o), r.prototype.name = "polling", r.prototype.doOpen = function() {
							this.poll()
						}, r.prototype.pause = function(t) {
							function e() {
								c("paused"), n.readyState = "paused", t()
							}
							var n = this;
							if (this.readyState = "pausing", this.polling
									|| !this.writable) {
								var r = 0;
								this.polling
										&& (c("we are currently polling - waiting to pause"), r++, this
												.once("pollComplete",
														function() {
															c("pre-pause polling complete"), --r
																	|| e()
														})), this.writable
										|| (c("we are currently writing - waiting to pause"), r++, this
												.once("drain", function() {
													c("pre-pause writing complete"), --r
															|| e()
												}))
							} else
								e()
						}, r.prototype.poll = function() {
							c("polling"), this.polling = !0, this.doPoll(), this
									.emit("poll")
						}, r.prototype.onData = function(t) {
							var e = this;
							c("polling got data %s", t);
							var n = function(t, n, r) {
								if ("opening" == e.readyState && e.onOpen(), "close" == t.type)
									return e.onClose(), !1;
								e.onPacket(t)
							};
							s.decodePayload(t, this.socket.binaryType, n), "closed" != this.readyState
									&& (this.polling = !1, this
											.emit("pollComplete"), "open" == this.readyState
											? this.poll()
											: c(
													'ignoring poll - transport state "%s"',
													this.readyState))
						}, r.prototype.doClose = function() {
							function t() {
								c("writing close packet"), e.write([{
											type : "close"
										}])
							}
							var e = this;
							"open" == this.readyState
									? (c("transport open - closing"), t())
									: (c("transport not open - deferring close"), this
											.once("open", t))
						}, r.prototype.write = function(t) {
							var e = this;
							this.writable = !1;
							var n = function() {
								e.writable = !0, e.emit("drain")
							}, e = this;
							s.encodePayload(t, this.supportsBinary,
									function(t) {
										e.doWrite(t, n)
									})
						}, r.prototype.uri = function() {
							var t = this.query || {}, e = this.secure
									? "https"
									: "http", n = "";
							return !1 !== this.timestampRequests
									&& (t[this.timestampParam] = +new Date
											+ "-" + o.timestamps++), this.supportsBinary
									|| t.sid || (t.b64 = 1), t = i.encode(t), this.port
									&& ("https" == e && 443 != this.port || "http" == e
											&& 80 != this.port)
									&& (n = ":" + this.port), t.length
									&& (t = "?" + t), e + "://" + this.hostname
									+ n + this.path + t
						}
					}, {
						"../transport" : 14,
						"component-inherit" : 21,
						debug : 22,
						"engine.io-parser" : 25,
						parseqs : 35,
						xmlhttprequest : 20
					}],
					19 : [function(t, e, n) {
						function r(t) {
							t && t.forceBase64 && (this.supportsBinary = !1), o
									.call(this, t)
						}
						var o = t("../transport"), i = t("engine.io-parser"), s = t("parseqs"), a = t("component-inherit"), c = t("debug")("engine.io-client:websocket"), u = t("ws");
						e.exports = r, a(r, o), r.prototype.name = "websocket", r.prototype.supportsBinary = !0, r.prototype.doOpen = function() {
							if (this.check()) {
								var t = this.uri(), e = {
									agent : this.agent
								};
								e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, this.ws = new u(
										t, void 0, e), void 0 === this.ws.binaryType
										&& (this.supportsBinary = !1), this.ws.binaryType = "arraybuffer", this
										.addEventListeners()
							}
						}, r.prototype.addEventListeners = function() {
							var t = this;
							this.ws.onopen = function() {
								t.onOpen()
							}, this.ws.onclose = function() {
								t.onClose()
							}, this.ws.onmessage = function(e) {
								t.onData(e.data)
							}, this.ws.onerror = function(e) {
								t.onError("websocket error", e)
							}
						}, "undefined" != typeof navigator
								&& /iPad|iPhone|iPod/i
										.test(navigator.userAgent)
								&& (r.prototype.onData = function(t) {
									var e = this;
									setTimeout(function() {
												o.prototype.onData.call(e, t)
											}, 0)
								}), r.prototype.write = function(t) {
							function e() {
								n.writable = !0, n.emit("drain")
							}
							var n = this;
							this.writable = !1;
							for (var r = 0, o = t.length; r < o; r++)
								i.encodePacket(t[r], this.supportsBinary,
										function(t) {
											try {
												n.ws.send(t)
											} catch (t) {
												c("websocket closed before onclose event")
											}
										});
							setTimeout(e, 0)
						}, r.prototype.onClose = function() {
							o.prototype.onClose.call(this)
						}, r.prototype.doClose = function() {
							void 0 !== this.ws && this.ws.close()
						}, r.prototype.uri = function() {
							var t = this.query || {}, e = this.secure
									? "wss"
									: "ws", n = "";
							return this.port
									&& ("wss" == e && 443 != this.port || "ws" == e
											&& 80 != this.port)
									&& (n = ":" + this.port), this.timestampRequests
									&& (t[this.timestampParam] = +new Date), this.supportsBinary
									|| (t.b64 = 1), t = s.encode(t), t.length
									&& (t = "?" + t), e + "://" + this.hostname
									+ n + this.path + t
						}, r.prototype.check = function() {
							return !(!u || "__initialize" in u
									&& this.name === r.prototype.name)
						}
					}, {
						"../transport" : 14,
						"component-inherit" : 21,
						debug : 22,
						"engine.io-parser" : 25,
						parseqs : 35,
						ws : 37
					}],
					20 : [function(t, e, n) {
						var r = t("has-cors");
						e.exports = function(t) {
							var e = t.xdomain, n = t.xscheme, o = t.enablesXDR;
							try {
								if ("undefined" != typeof XMLHttpRequest
										&& (!e || r))
									return new XMLHttpRequest
							} catch (t) {
							}
							try {
								if ("undefined" != typeof XDomainRequest && !n
										&& o)
									return new XDomainRequest
							} catch (t) {
							}
							if (!e)
								try {
									return new ActiveXObject("Microsoft.XMLHTTP")
								} catch (t) {
								}
						}
					}, {
						"has-cors" : 40
					}],
					21 : [function(t, e, n) {
						e.exports = function(t, e) {
							var n = function() {
							};
							n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
						}
					}, {}],
					22 : [function(t, e, n) {
						function r() {
							return "WebkitAppearance" in document.documentElement.style
									|| window.console
									&& (console.firebug || console.exception
											&& console.table)
									|| navigator.userAgent.toLowerCase()
											.match(/firefox\/(\d+)/)
									&& parseInt(RegExp.$1, 10) >= 31
						}
						function o() {
							var t = arguments, e = this.useColors;
							if (t[0] = (e ? "%c" : "") + this.namespace
									+ (e ? " %c" : " ") + t[0]
									+ (e ? "%c " : " ") + "+"
									+ n.humanize(this.diff), !e)
								return t;
							var r = "color: " + this.color;
							t = [t[0], r, "color: inherit"]
									.concat(Array.prototype.slice.call(t, 1));
							var o = 0, i = 0;
							return t[0].replace(/%[a-z%]/g, function(t) {
										"%" !== t
												&& (o++, "%c" === t && (i = o))
									}), t.splice(i, 0, r), t
						}
						function i() {
							return "object" == typeof console
									&& "function" == typeof console.log
									&& Function.prototype.apply.call(
											console.log, console, arguments)
						}
						function s(t) {
							try {
								null == t
										? localStorage.removeItem("debug")
										: localStorage.debug = t
							} catch (t) {
							}
						}
						function a() {
							var t;
							try {
								t = localStorage.debug
							} catch (t) {
							}
							return t
						}
						n = e.exports = t("./debug"), n.log = i, n.formatArgs = o, n.save = s, n.load = a, n.useColors = r, n.colors = [
								"lightseagreen", "forestgreen", "goldenrod",
								"dodgerblue", "darkorchid", "crimson"], n.formatters.j = function(
								t) {
							return JSON.stringify(t)
						}, n.enable(a())
					}, {
						"./debug" : 23
					}],
					23 : [function(t, e, n) {
						function r() {
							return n.colors[h++ % n.colors.length]
						}
						function o(t) {
							function e() {
							}
							function o() {
								var t = o, e = +new Date, i = e - (u || e);
								t.diff = i, t.prev = u, t.curr = e, u = e, null == t.useColors
										&& (t.useColors = n.useColors()), null == t.color
										&& t.useColors && (t.color = r());
								var s = Array.prototype.slice.call(arguments);
								s[0] = n.coerce(s[0]), "string" != typeof s[0]
										&& (s = ["%o"].concat(s));
								var a = 0;
								s[0] = s[0].replace(/%([a-z%])/g,
										function(e, r) {
											if ("%" === e)
												return e;
											a++;
											var o = n.formatters[r];
											if ("function" == typeof o) {
												var i = s[a];
												e = o.call(t, i), s
														.splice(a, 1), a--
											}
											return e
										}), "function" == typeof n.formatArgs
										&& (s = n.formatArgs.apply(t, s)), (o.log
										|| n.log || console.log.bind(console))
										.apply(t, s)
							}
							e.enabled = !1, o.enabled = !0;
							var i = n.enabled(t) ? o : e;
							return i.namespace = t, i
						}
						function i(t) {
							n.save(t);
							for (var e = (t || "").split(/[\s,]+/), r = e.length, o = 0; o < r; o++)
								e[o]
										&& (t = e[o].replace(/\*/g, ".*?"), "-" === t[0]
												? n.skips.push(new RegExp("^"
														+ t.substr(1) + "$"))
												: n.names.push(new RegExp("^"
														+ t + "$")))
						}
						function s() {
							n.enable("")
						}
						function a(t) {
							var e, r;
							for (e = 0, r = n.skips.length; e < r; e++)
								if (n.skips[e].test(t))
									return !1;
							for (e = 0, r = n.names.length; e < r; e++)
								if (n.names[e].test(t))
									return !0;
							return !1
						}
						function c(t) {
							return t instanceof Error
									? t.stack || t.message
									: t
						}
						n = e.exports = o, n.coerce = c, n.disable = s, n.enable = i, n.enabled = a, n.humanize = t("ms"), n.names = [], n.skips = [], n.formatters = {};
						var u, h = 0
					}, {
						ms : 24
					}],
					24 : [function(t, e, n) {
						function r(t) {
							var e = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i
									.exec(t);
							if (e) {
								var n = parseFloat(e[1]);
								switch ((e[2] || "ms").toLowerCase()) {
									case "years" :
									case "year" :
									case "y" :
										return n * l;
									case "days" :
									case "day" :
									case "d" :
										return n * h;
									case "hours" :
									case "hour" :
									case "h" :
										return n * u;
									case "minutes" :
									case "minute" :
									case "m" :
										return n * c;
									case "seconds" :
									case "second" :
									case "s" :
										return n * a;
									case "ms" :
										return n
								}
							}
						}
						function o(t) {
							return t >= h ? Math.round(t / h) + "d" : t >= u
									? Math.round(t / u) + "h"
									: t >= c ? Math.round(t / c) + "m" : t >= a
											? Math.round(t / a) + "s"
											: t + "ms"
						}
						function i(t) {
							return s(t, h, "day") || s(t, u, "hour")
									|| s(t, c, "minute") || s(t, a, "second")
									|| t + " ms"
						}
						function s(t, e, n) {
							if (!(t < e))
								return t < 1.5 * e ? Math.floor(t / e) + " "
										+ n : Math.ceil(t / e) + " " + n + "s"
						}
						var a = 1e3, c = 60 * a, u = 60 * c, h = 24 * u, l = 365.25
								* h;
						e.exports = function(t, e) {
							return e = e || {}, "string" == typeof t
									? r(t)
									: e.long ? i(t) : o(t)
						}
					}, {}],
					25 : [function(t, e, n) {
					(function(e) {
							function r(t, e) {
								return e("b" + n.packets[t.type] + t.data.data)
							}
							function o(t, e, r) {
								if (!e)
									return n.encodeBase64Packet(t, r);
								var o = t.data, i = new Uint8Array(o), s = new Uint8Array(1
										+ o.byteLength);
								s[0] = y[t.type];
								for (var a = 0; a < i.length; a++)
									s[a + 1] = i[a];
								return r(s.buffer)
							}
							function i(t, e, r) {
								if (!e)
									return n.encodeBase64Packet(t, r);
								var o = new FileReader;
								return o.onload = function() {
									t.data = o.result, n.encodePacket(t, e, !0,
											r)
								}, o.readAsArrayBuffer(t.data)
							}
							function s(t, e, r) {
								if (!e)
									return n.encodeBase64Packet(t, r);
								if (m)
									return i(t, e, r);
								var o = new Uint8Array(1);
								return o[0] = y[t.type], r(new _([o.buffer,
										t.data]))
							}
							function a(t, e, n) {
								for (var r = new Array(t.length), o = p(
										t.length, n), i = 0; i < t.length; i++)
									!function(t, n, o) {
										e(n, function(e, n) {
													r[t] = n, o(e, r)
												})
									}(i, t[i], o)
							}
							var c = t("./keys"), u = t("has-binary"), h = t("arraybuffer.slice"), l = t("base64-arraybuffer"), p = t("after"), f = t("utf8"), d = navigator.userAgent
									.match(/Android/i), g = /PhantomJS/i
									.test(navigator.userAgent), m = d || g;
							n.protocol = 3;
							var y = n.packets = {
								open : 0,
								close : 1,
								ping : 2,
								pong : 3,
								message : 4,
								upgrade : 5,
								noop : 6
							}, v = c(y), b = {
								type : "error",
								data : "parser error"
							}, _ = t("blob");
							n.encodePacket = function(t, n, i, a) {
								"function" == typeof n && (a = n, n = !1), "function" == typeof i
										&& (a = i, i = null);
								var c = void 0 === t.data
										? void 0
										: t.data.buffer || t.data;
								if (e.ArrayBuffer && c instanceof ArrayBuffer)
									return o(t, n, a);
								if (_ && c instanceof e.Blob)
									return s(t, n, a);
								if (c && c.base64)
									return r(t, a);
								var u = y[t.type];
								return void 0 !== t.data
										&& (u += i
												? f.encode(String(t.data))
												: String(t.data)), a("" + u)
							}, n.encodeBase64Packet = function(t, r) {
								var o = "b" + n.packets[t.type];
								if (_ && t.data instanceof _) {
									var i = new FileReader;
									return i.onload = function() {
										var t = i.result.split(",")[1];
										r(o + t)
									}, i.readAsDataURL(t.data)
								}
								var s;
								try {
									s = String.fromCharCode.apply(null,
											new Uint8Array(t.data))
								} catch (e) {
									for (var a = new Uint8Array(t.data), c = new Array(a.length), u = 0; u < a.length; u++)
										c[u] = a[u];
									s = String.fromCharCode.apply(null, c)
								}
								return o += e.btoa(s), r(o)
							}, n.decodePacket = function(t, e, r) {
								if ("string" == typeof t || void 0 === t) {
									if ("b" == t.charAt(0))
										return n.decodeBase64Packet(
												t.substr(1), e);
									if (r)
										try {
											t = f.decode(t)
										} catch (t) {
											return b
										}
									var o = t.charAt(0);
									return Number(o) == o && v[o]
											? t.length > 1 ? {
												type : v[o],
												data : t.substring(1)
											} : {
												type : v[o]
											}
											: b
								}
								var i = new Uint8Array(t), o = i[0], s = h(t, 1);
								return _ && "blob" === e && (s = new _([s])), {
									type : v[o],
									data : s
								}
							}, n.decodeBase64Packet = function(t, n) {
								var r = v[t.charAt(0)];
								if (!e.ArrayBuffer)
									return {
										type : r,
										data : {
											base64 : !0,
											data : t.substr(1)
										}
									};
								var o = l.decode(t.substr(1));
								return "blob" === n && _ && (o = new _([o])), {
									type : r,
									data : o
								}
							}, n.encodePayload = function(t, e, r) {
								function o(t) {
									return t.length + ":" + t
								}
								function i(t, r) {
									n.encodePacket(t, !!s && e, !0,
											function(t) {
												r(null, o(t))
											})
								}
								"function" == typeof e && (r = e, e = null);
								var s = u(t);
								return e && s
										? _ && !m
												? n.encodePayloadAsBlob(t, r)
												: n.encodePayloadAsArrayBuffer(
														t, r)
										: t.length ? void a(t, i,
												function(t, e) {
													return r(e.join(""))
												}) : r("0:")
							}, n.decodePayload = function(t, e, r) {
								if ("string" != typeof t)
									return n.decodePayloadAsBinary(t, e, r);
								"function" == typeof e && (r = e, e = null);
								var o;
								if ("" == t)
									return r(b, 0, 1);
								for (var i, s, a = "", c = 0, u = t.length; c < u; c++) {
									var h = t.charAt(c);
									if (":" != h)
										a += h;
									else {
										if ("" == a || a != (i = Number(a)))
											return r(b, 0, 1);
										if (s = t.substr(c + 1, i), a != s.length)
											return r(b, 0, 1);
										if (s.length) {
											if (o = n.decodePacket(s, e, !0), b.type == o.type
													&& b.data == o.data)
												return r(b, 0, 1);
											if (!1 === r(o, c + i, u))
												return
										}
										c += i, a = ""
									}
								}
								return "" != a ? r(b, 0, 1) : void 0
							}, n.encodePayloadAsArrayBuffer = function(t, e) {
								function r(t, e) {
									n.encodePacket(t, !0, !0, function(t) {
												return e(null, t)
											})
								}
								if (!t.length)
									return e(new ArrayBuffer(0));
								a(t, r, function(t, n) {
									var r = n.reduce(function(t, e) {
												var n;
												return n = "string" == typeof e
														? e.length
														: e.byteLength, t
														+ n.toString().length
														+ n + 2
											}, 0), o = new Uint8Array(r), i = 0;
									return n.forEach(function(t) {
										var e = "string" == typeof t, n = t;
										if (e) {
											for (var r = new Uint8Array(t.length), s = 0; s < t.length; s++)
												r[s] = t.charCodeAt(s);
											n = r.buffer
										}
										o[i++] = e ? 0 : 1;
										for (var a = n.byteLength.toString(), s = 0; s < a.length; s++)
											o[i++] = parseInt(a[s]);
										o[i++] = 255;
										for (var r = new Uint8Array(n), s = 0; s < r.length; s++)
											o[i++] = r[s]
									}), e(o.buffer)
								})
							}, n.encodePayloadAsBlob = function(t, e) {
								function r(t, e) {
									n.encodePacket(t, !0, !0, function(t) {
										var n = new Uint8Array(1);
										if (n[0] = 1, "string" == typeof t) {
											for (var r = new Uint8Array(t.length), o = 0; o < t.length; o++)
												r[o] = t.charCodeAt(o);
											t = r.buffer, n[0] = 0
										}
										for (var i = t instanceof ArrayBuffer
												? t.byteLength
												: t.size, s = i.toString(), a = new Uint8Array(s.length
												+ 1), o = 0; o < s.length; o++)
											a[o] = parseInt(s[o]);
										if (a[s.length] = 255, _) {
											var c = new _([n.buffer, a.buffer,
													t]);
											e(null, c)
										}
									})
								}
								a(t, r, function(t, n) {
											return e(new _(n))
										})
							}, n.decodePayloadAsBinary = function(t, e, r) {
								"function" == typeof e && (r = e, e = null);
								for (var o = t, i = [], s = !1; o.byteLength > 0;) {
									for (var a = new Uint8Array(o), c = 0 === a[0], u = "", l = 1; 255 != a[l]; l++) {
										if (u.length > 310) {
											s = !0;
											break
										}
										u += a[l]
									}
									if (s)
										return r(b, 0, 1);
									o = h(o, 2 + u.length), u = parseInt(u);
									var p = h(o, 0, u);
									if (c)
										try {
											p = String.fromCharCode.apply(null,
													new Uint8Array(p))
										} catch (t) {
											var f = new Uint8Array(p);
											p = "";
											for (var l = 0; l < f.length; l++)
												p += String.fromCharCode(f[l])
										}
									i.push(p), o = h(o, u)
								}
								var d = i.length;
								i.forEach(function(t, o) {
											r(n.decodePacket(t, e, !0), o, d)
										})
							}
						}).call(this, "undefined" != typeof self
										? self
										: "undefined" != typeof window
												? window
												: {})
					}, {
						"./keys" : 26,
						after : 27,
						"arraybuffer.slice" : 28,
						"base64-arraybuffer" : 29,
						blob : 30,
						"has-binary" : 31,
						utf8 : 33
					}],
					26 : [function(t, e, n) {
								e.exports = Object.keys || function(t) {
									var e = [], n = Object.prototype.hasOwnProperty;
									for (var r in t)
										n.call(t, r) && e.push(r);
									return e
								}
							}, {}],
					27 : [function(t, e, n) {
						function r(t, e, n) {
							function r(t, o) {
								if (r.count <= 0)
									throw new Error("after called too many times");
								--r.count, t
										? (i = !0, e(t), e = n)
										: 0 !== r.count || i || e(null, o)
							}
							var i = !1;
							return n = n || o, r.count = t, 0 === t ? e() : r
						}
						function o() {
						}
						e.exports = r
					}, {}],
					28 : [function(t, e, n) {
						e.exports = function(t, e, n) {
							var r = t.byteLength;
							if (e = e || 0, n = n || r, t.slice)
								return t.slice(e, n);
							if (e < 0 && (e += r), n < 0 && (n += r), n > r
									&& (n = r), e >= r || e >= n || 0 === r)
								return new ArrayBuffer(0);
							for (var o = new Uint8Array(t), i = new Uint8Array(n
									- e), s = e, a = 0; s < n; s++, a++)
								i[a] = o[s];
							return i.buffer
						}
					}, {}],
					29 : [function(t, e, n) {
						!function(t) {
							"use strict";
							n.encode = function(e) {
								var n, r = new Uint8Array(e), o = r.length, i = "";
								for (n = 0; n < o; n += 3)
									i += t[r[n] >> 2], i += t[(3 & r[n]) << 4
											| r[n + 1] >> 4], i += t[(15 & r[n
											+ 1]) << 2
											| r[n + 2] >> 6], i += t[63
											& r[n + 2]];
								return o % 3 == 2 ? i = i.substring(0, i.length
												- 1)
										+ "=" : o % 3 == 1
										&& (i = i.substring(0, i.length - 2)
												+ "=="), i
							}, n.decode = function(e) {
								var n, r, o, i, s, a = .75 * e.length, c = e.length, u = 0;
								"=" === e[e.length - 1]
										&& (a--, "=" === e[e.length - 2] && a--);
								var h = new ArrayBuffer(a), l = new Uint8Array(h);
								for (n = 0; n < c; n += 4)
									r = t.indexOf(e[n]), o = t
											.indexOf(e[n + 1]), i = t
											.indexOf(e[n + 2]), s = t
											.indexOf(e[n + 3]), l[u++] = r << 2
											| o >> 4, l[u++] = (15 & o) << 4
											| i >> 2, l[u++] = (3 & i) << 6
											| 63 & s;
								return h
							}
						}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
					}, {}],
					30 : [function(t, e, n) {
					(function(t) {
							function n(t, e) {
								e = e || {};
								for (var n = new r, o = 0; o < t.length; o++)
									n.append(t[o]);
								return e.type ? n.getBlob(e.type) : n.getBlob()
							}
							var r = t.BlobBuilder || t.WebKitBlobBuilder
									|| t.MSBlobBuilder || t.MozBlobBuilder, o = function() {
								try {
									return 2 == new Blob(["hi"]).size
								} catch (t) {
									return !1
								}
							}(), i = r && r.prototype.append
									&& r.prototype.getBlob;
							e.exports = function() {
								return o ? t.Blob : i ? n : void 0
							}()
						}).call(this, "undefined" != typeof self
										? self
										: "undefined" != typeof window
												? window
												: {})
					}, {}],
					31 : [function(t, e, n) {
					(function(n) {
							function r(t) {
								function e(t) {
									if (!t)
										return !1;
									if (n.Buffer && n.Buffer.isBuffer(t)
											|| n.ArrayBuffer
											&& t instanceof ArrayBuffer
											|| n.Blob && t instanceof Blob
											|| n.File && t instanceof File)
										return !0;
									if (o(t)) {
										for (var r = 0; r < t.length; r++)
											if (e(t[r]))
												return !0
									} else if (t && "object" == typeof t) {
										t.toJSON && (t = t.toJSON());
										for (var i in t)
											if (t.hasOwnProperty(i) && e(t[i]))
												return !0
									}
									return !1
								}
								return e(t)
							}
							var o = t("isarray");
							e.exports = r
						}).call(this, "undefined" != typeof self
										? self
										: "undefined" != typeof window
												? window
												: {})
					}, {
						isarray : 32
					}],
					32 : [function(t, e, n) {
						e.exports = Array.isArray || function(t) {
							return "[object Array]" == Object.prototype.toString
									.call(t)
						}
					}, {}],
					33 : [function(e, n, r) {
					(function(e) {
							!function(o) {
								function i(t) {
									for (var e, n, r = [], o = 0, i = t.length; o < i;)
										e = t.charCodeAt(o++), e >= 55296
												&& e <= 56319 && o < i
												? (n = t.charCodeAt(o++), 56320 == (64512 & n)
														? r
																.push(((1023 & e) << 10)
																		+ (1023 & n)
																		+ 65536)
														: (r.push(e), o--))
												: r.push(e);
									return r
								}
								function s(t) {
									for (var e, n = t.length, r = -1, o = ""; ++r < n;)
										e = t[r], e > 65535
												&& (e -= 65536, o += b(e >>> 10
														& 1023 | 55296), e = 56320
														| 1023 & e), o += b(e);
									return o
								}
								function a(t, e) {
									return b(t >> e & 63 | 128)
								}
								function c(t) {
									if (0 == (4294967168 & t))
										return b(t);
									var e = "";
									return 0 == (4294965248 & t)
											? e = b(t >> 6 & 31 | 192)
											: 0 == (4294901760 & t)
													? (e = b(t >> 12 & 15 | 224), e += a(
															t, 6))
													: 0 == (4292870144 & t)
															&& (e = b(t >> 18
																	& 7 | 240), e += a(
																	t, 12), e += a(
																	t, 6)), e += b(63
											& t | 128)
								}
								function u(t) {
									for (var e, n = i(t), r = n.length, o = -1, s = ""; ++o < r;)
										e = n[o], s += c(e);
									return s
								}
								function h() {
									if (v >= y)
										throw Error("Invalid byte index");
									var t = 255 & m[v];
									if (v++, 128 == (192 & t))
										return 63 & t;
									throw Error("Invalid continuation byte")
								}
								function l() {
									var t, e, n, r, o;
									if (v > y)
										throw Error("Invalid byte index");
									if (v == y)
										return !1;
									if (t = 255 & m[v], v++, 0 == (128 & t))
										return t;
									if (192 == (224 & t)) {
										var e = h();
										if ((o = (31 & t) << 6 | e) >= 128)
											return o;
										throw Error("Invalid continuation byte")
									}
									if (224 == (240 & t)) {
										if (e = h(), n = h(), (o = (15 & t) << 12
												| e << 6 | n) >= 2048)
											return o;
										throw Error("Invalid continuation byte")
									}
									if (240 == (248 & t)
											&& (e = h(), n = h(), r = h(), (o = (15 & t) << 18
													| e << 12 | n << 6 | r) >= 65536
													&& o <= 1114111))
										return o;
									throw Error("Invalid UTF-8 detected")
								}
								function p(t) {
									m = i(t), y = m.length, v = 0;
									for (var e, n = []; !1 !== (e = l());)
										n.push(e);
									return s(n)
								}
								var f = "object" == typeof r && r, d = "object" == typeof n
										&& n && n.exports == f && n, g = "object" == typeof e
										&& e;
								g.global !== g && g.window !== g || (o = g);
								var m, y, v, b = String.fromCharCode, _ = {
									version : "2.0.0",
									encode : u,
									decode : p
								};
								if ("function" == typeof t
										&& "object" == typeof t.amd && t.amd)
									t(function() {
												return _
											});
								else if (f && !f.nodeType)
									if (d)
										d.exports = _;
									else {
										var w = {}, k = w.hasOwnProperty;
										for (var S in _)
											k.call(_, S) && (f[S] = _[S])
									}
								else
									o.utf8 = _
							}(this)
						}).call(this, "undefined" != typeof self
										? self
										: "undefined" != typeof window
												? window
												: {})
					}, {}],
					34 : [function(t, e, n) {
					(function(t) {
							var n = /^[\],:{}\s]*$/, r = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, o = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, i = /(?:^|:|,)(?:\s*\[)+/g, s = /^\s+/, a = /\s+$/;
							e.exports = function(e) {
								return "string" == typeof e && e ? (e = e
										.replace(s, "").replace(a, ""), t.JSON
										&& JSON.parse ? JSON.parse(e) : n
										.test(e.replace(r, "@").replace(o, "]")
												.replace(i, ""))
										? new Function("return " + e)()
										: void 0) : null
							}
						}).call(this, "undefined" != typeof self
										? self
										: "undefined" != typeof window
												? window
												: {})
					}, {}],
					35 : [function(t, e, n) {
						n.encode = function(t) {
							var e = "";
							for (var n in t)
								t.hasOwnProperty(n)
										&& (e.length && (e += "&"), e += encodeURIComponent(n)
												+ "="
												+ encodeURIComponent(t[n]));
							return e
						}, n.decode = function(t) {
							for (var e = {}, n = t.split("&"), r = 0, o = n.length; r < o; r++) {
								var i = n[r].split("=");
								e[decodeURIComponent(i[0])] = decodeURIComponent(i[1])
							}
							return e
						}
					}, {}],
					36 : [function(t, e, n) {
						var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, o = [
								"source", "protocol", "authority", "userInfo",
								"user", "password", "host", "port", "relative",
								"path", "directory", "file", "query", "anchor"];
						e.exports = function(t) {
							var e = t, n = t.indexOf("["), i = t.indexOf("]");
							-1 != n
									&& -1 != i
									&& (t = t.substring(0, n)
											+ t.substring(n, i).replace(/:/g,
													";")
											+ t.substring(i, t.length));
							for (var s = r.exec(t || ""), a = {}, c = 14; c--;)
								a[o[c]] = s[c] || "";
							return -1 != n
									&& -1 != i
									&& (a.source = e, a.host = a.host
											.substring(1, a.host.length - 1)
											.replace(/;/g, ":"), a.authority = a.authority
											.replace("[", "").replace("]", "")
											.replace(/;/g, ":"), a.ipv6uri = !0), a
						}
					}, {}],
					37 : [function(t, e, n) {
						function r(t, e, n) {
							return e ? new i(t, e) : new i(t)
						}
						var o = function() {
							return this
						}(), i = o.WebSocket || o.MozWebSocket;
						e.exports = i ? r : null, i
								&& (r.prototype = i.prototype)
					}, {}],
					38 : [function(t, e, n) {
					(function(n) {
							function r(t) {
								function e(t) {
									if (!t)
										return !1;
									if (n.Buffer && n.Buffer.isBuffer(t)
											|| n.ArrayBuffer
											&& t instanceof ArrayBuffer
											|| n.Blob && t instanceof Blob
											|| n.File && t instanceof File)
										return !0;
									if (o(t)) {
										for (var r = 0; r < t.length; r++)
											if (e(t[r]))
												return !0
									} else if (t && "object" == typeof t) {
										t.toJSON && (t = t.toJSON());
										for (var i in t)
											if (Object.prototype.hasOwnProperty
													.call(t, i)
													&& e(t[i]))
												return !0
									}
									return !1
								}
								return e(t)
							}
							var o = t("isarray");
							e.exports = r
						}).call(this, "undefined" != typeof self
										? self
										: "undefined" != typeof window
												? window
												: {})
					}, {
						isarray : 39
					}],
					39 : [function(t, e, n) {
								e.exports = t(32)
							}, {}],
					40 : [function(t, e, n) {
						var r = t("global");
						try {
							e.exports = "XMLHttpRequest" in r
									&& "withCredentials" in new r.XMLHttpRequest
						} catch (t) {
							e.exports = !1
						}
					}, {
						global : 41
					}],
					41 : [function(t, e, n) {
								e.exports = function() {
									return this
								}()
							}, {}],
					42 : [function(t, e, n) {
								var r = [].indexOf;
								e.exports = function(t, e) {
									if (r)
										return t.indexOf(e);
									for (var n = 0; n < t.length; ++n)
										if (t[n] === e)
											return n;
									return -1
								}
							}, {}],
					43 : [function(t, e, n) {
								var r = Object.prototype.hasOwnProperty;
								n.keys = Object.keys || function(t) {
									var e = [];
									for (var n in t)
										r.call(t, n) && e.push(n);
									return e
								}, n.values = function(t) {
									var e = [];
									for (var n in t)
										r.call(t, n) && e.push(t[n]);
									return e
								}, n.merge = function(t, e) {
									for (var n in e)
										r.call(e, n) && (t[n] = e[n]);
									return t
								}, n.length = function(t) {
									return n.keys(t).length
								}, n.isEmpty = function(t) {
									return 0 == n.length(t)
								}
							}, {}],
					44 : [function(t, e, n) {
						var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, o = [
								"source", "protocol", "authority", "userInfo",
								"user", "password", "host", "port", "relative",
								"path", "directory", "file", "query", "anchor"];
						e.exports = function(t) {
							for (var e = r.exec(t || ""), n = {}, i = 14; i--;)
								n[o[i]] = e[i] || "";
							return n
						}
					}, {}],
					45 : [function(t, e, n) {
					(function(e) {
							var r = t("isarray"), o = t("./is-buffer");
							n.deconstructPacket = function(t) {
								function e(t) {
									if (!t)
										return t;
									if (o(t)) {
										var i = {
											_placeholder : !0,
											num : n.length
										};
										return n.push(t), i
									}
									if (r(t)) {
										for (var s = new Array(t.length), a = 0; a < t.length; a++)
											s[a] = e(t[a]);
										return s
									}
									if ("object" == typeof t
											&& !(t instanceof Date)) {
										var s = {};
										for (var c in t)
											s[c] = e(t[c]);
										return s
									}
									return t
								}
								var n = [], i = t.data, s = t;
								return s.data = e(i), s.attachments = n.length, {
									packet : s,
									buffers : n
								}
							}, n.reconstructPacket = function(t, e) {
								function n(t) {
									if (t && t._placeholder) {
										return e[t.num]
									}
									if (r(t)) {
										for (var o = 0; o < t.length; o++)
											t[o] = n(t[o]);
										return t
									}
									if (t && "object" == typeof t) {
										for (var i in t)
											t[i] = n(t[i]);
										return t
									}
									return t
								}
								return t.data = n(t.data), t.attachments = void 0, t
							}, n.removeBlobs = function(t, n) {
								function i(t, c, u) {
									if (!t)
										return t;
									if (e.Blob && t instanceof Blob || e.File
											&& t instanceof File) {
										s++;
										var h = new FileReader;
										h.onload = function() {
											u
													? u[c] = this.result
													: a = this.result, --s
													|| n(a)
										}, h.readAsArrayBuffer(t)
									} else if (r(t))
										for (var l = 0; l < t.length; l++)
											i(t[l], l, t);
									else if (t && "object" == typeof t && !o(t))
										for (var p in t)
											i(t[p], p, t)
								}
								var s = 0, a = t;
								i(a), s || n(a)
							}
						}).call(this, "undefined" != typeof self
										? self
										: "undefined" != typeof window
												? window
												: {})
					}, {
						"./is-buffer" : 47,
						isarray : 48
					}],
					46 : [function(t, e, n) {
						function r() {
						}
						function o(t) {
							var e = "", r = !1;
							return e += t.type, n.BINARY_EVENT != t.type
									&& n.BINARY_ACK != t.type
									|| (e += t.attachments, e += "-"), t.nsp
									&& "/" != t.nsp && (r = !0, e += t.nsp), null != t.id
									&& (r && (e += ",", r = !1), e += t.id), null != t.data
									&& (r && (e += ","), e += l
											.stringify(t.data)), h(
									"encoded %j as %s", t, e), e
						}
						function i(t, e) {
							function n(t) {
								var n = f.deconstructPacket(t), r = o(n.packet), i = n.buffers;
								i.unshift(r), e(i)
							}
							f.removeBlobs(t, n)
						}
						function s() {
							this.reconstructor = null
						}
						function a(t) {
							var e = {}, r = 0;
							if (e.type = Number(t.charAt(0)), null == n.types[e.type])
								return u();
							if (n.BINARY_EVENT == e.type
									|| n.BINARY_ACK == e.type) {
								for (var o = ""; "-" != t.charAt(++r)
										&& (o += t.charAt(r), r != t.length););
								if (o != Number(o) || "-" != t.charAt(r))
									throw new Error("Illegal attachments");
								e.attachments = Number(o)
							}
							if ("/" == t.charAt(r + 1))
								for (e.nsp = ""; ++r;) {
									var i = t.charAt(r);
									if ("," == i)
										break;
									if (e.nsp += i, r == t.length)
										break
								}
							else
								e.nsp = "/";
							var s = t.charAt(r + 1);
							if ("" !== s && Number(s) == s) {
								for (e.id = ""; ++r;) {
									var i = t.charAt(r);
									if (null == i || Number(i) != i) {
										--r;
										break
									}
									if (e.id += t.charAt(r), r == t.length)
										break
								}
								e.id = Number(e.id)
							}
							if (t.charAt(++r))
								try {
									e.data = l.parse(t.substr(r))
								} catch (t) {
									return u()
								}
							return h("decoded %s as %j", t, e), e
						}
						function c(t) {
							this.reconPack = t, this.buffers = []
						}
						function u(t) {
							return {
								type : n.ERROR,
								data : "parser error"
							}
						}
						var h = t("debug")("socket.io-parser"), l = t("json3"), p = (t("isarray"), t("component-emitter")), f = t("./binary"), d = t("./is-buffer");
						n.protocol = 4, n.types = ["CONNECT", "DISCONNECT",
								"EVENT", "BINARY_EVENT", "ACK", "BINARY_ACK",
								"ERROR"], n.CONNECT = 0, n.DISCONNECT = 1, n.EVENT = 2, n.ACK = 3, n.ERROR = 4, n.BINARY_EVENT = 5, n.BINARY_ACK = 6, n.Encoder = r, n.Decoder = s, r.prototype.encode = function(
								t, e) {
							if (h("encoding packet %j", t), n.BINARY_EVENT == t.type
									|| n.BINARY_ACK == t.type)
								i(t, e);
							else {
								e([o(t)])
							}
						}, p(s.prototype), s.prototype.add = function(t) {
							var e;
							if ("string" == typeof t)
								e = a(t), n.BINARY_EVENT == e.type
										|| n.BINARY_ACK == e.type
										? (this.reconstructor = new c(e), 0 === this.reconstructor.reconPack.attachments
												&& this.emit("decoded", e))
										: this.emit("decoded", e);
							else {
								if (!d(t) && !t.base64)
									throw new Error("Unknown type: " + t);
								if (!this.reconstructor)
									throw new Error("got binary data when not reconstructing a packet");
								(e = this.reconstructor.takeBinaryData(t))
										&& (this.reconstructor = null, this
												.emit("decoded", e))
							}
						}, s.prototype.destroy = function() {
							this.reconstructor
									&& this.reconstructor
											.finishedReconstruction()
						}, c.prototype.takeBinaryData = function(t) {
							if (this.buffers.push(t), this.buffers.length == this.reconPack.attachments) {
								var e = f.reconstructPacket(this.reconPack,
										this.buffers);
								return this.finishedReconstruction(), e
							}
							return null
						}, c.prototype.finishedReconstruction = function() {
							this.reconPack = null, this.buffers = []
						}
					}, {
						"./binary" : 45,
						"./is-buffer" : 47,
						"component-emitter" : 9,
						debug : 10,
						isarray : 48,
						json3 : 49
					}],
					47 : [function(t, e, n) {
					(function(t) {
							function n(e) {
								return t.Buffer && t.Buffer.isBuffer(e)
										|| t.ArrayBuffer
										&& e instanceof ArrayBuffer
							}
							e.exports = n
						}).call(this, "undefined" != typeof self
										? self
										: "undefined" != typeof window
												? window
												: {})
					}, {}],
					48 : [function(t, e, n) {
								e.exports = t(32)
							}, {}],
					49 : [function(e, n, r) {
						!function(e) {
							function n(t) {
								if (n[t] !== s)
									return n[t];
								var e;
								if ("bug-string-char-index" == t)
									e = "a" != "a"[0];
								else if ("json" == t)
									e = n("json-stringify") && n("json-parse");
								else {
									var r, o = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
									if ("json-stringify" == t) {
										var i = h.stringify, c = "function" == typeof i
												&& l;
										if (c) {
											(r = function() {
												return 1
											}).toJSON = r;
											try {
												c = "0" === i(0)
														&& "0" === i(new Number)
														&& '""' == i(new String)
														&& i(a) === s
														&& i(s) === s
														&& i() === s
														&& "1" === i(r)
														&& "[1]" == i([r])
														&& "[null]" == i([s])
														&& "null" == i(null)
														&& "[null,null,null]" == i([
																s, a, null])
														&& i({
															a : [r, !0, !1,
																	null,
																	"\0\b\n\f\r\t"]
														}) == o
														&& "1" === i(null, r)
														&& "[\n 1,\n 2\n]" == i(
																[1, 2], null, 1)
														&& '"-271821-04-20T00:00:00.000Z"' == i(new Date(-864e13))
														&& '"+275760-09-13T00:00:00.000Z"' == i(new Date(864e13))
														&& '"-000001-01-01T00:00:00.000Z"' == i(new Date(-621987552e5))
														&& '"1969-12-31T23:59:59.999Z"' == i(new Date(-1))
											} catch (t) {
												c = !1
											}
										}
										e = c
									}
									if ("json-parse" == t) {
										var u = h.parse;
										if ("function" == typeof u)
											try {
												if (0 === u("0") && !u(!1)) {
													r = u(o);
													var p = 5 == r.a.length
															&& 1 === r.a[0];
													if (p) {
														try {
															p = !u('"\t"')
														} catch (t) {
														}
														if (p)
															try {
																p = 1 !== u("01")
															} catch (t) {
															}
														if (p)
															try {
																p = 1 !== u("1.")
															} catch (t) {
															}
													}
												}
											} catch (t) {
												p = !1
											}
										e = p
									}
								}
								return n[t] = !!e
							}
							var o, i, s, a = {}.toString, c = "function" == typeof t
									&& t.amd, u = "object" == typeof JSON
									&& JSON, h = "object" == typeof r && r
									&& !r.nodeType && r;
							h && u
									? (h.stringify = u.stringify, h.parse = u.parse)
									: h = e.JSON = u || {};
							var l = new Date(-0xc782b5b800cec);
							try {
								l = -109252 == l.getUTCFullYear()
										&& 0 === l.getUTCMonth()
										&& 1 === l.getUTCDate()
										&& 10 == l.getUTCHours()
										&& 37 == l.getUTCMinutes()
										&& 6 == l.getUTCSeconds()
										&& 708 == l.getUTCMilliseconds()
							} catch (t) {
							}
							if (!n("json")) {
								var p = n("bug-string-char-index");
								if (!l)
									var f = Math.floor, d = [0, 31, 59, 90,
											120, 151, 181, 212, 243, 273, 304,
											334], g = function(t, e) {
										return d[e]
												+ 365
												* (t - 1970)
												+ f((t - 1969 + (e = +(e > 1)))
														/ 4)
												- f((t - 1901 + e) / 100)
												+ f((t - 1601 + e) / 400)
									};
								(o = {}.hasOwnProperty) || (o = function(t) {
									var e, n = {};
									return (n.__proto__ = null, n.__proto__ = {
										toString : 1
									}, n).toString != a ? o = function(t) {
										var e = this.__proto__, n = t in (this.__proto__ = null, this);
										return this.__proto__ = e, n
									}
											: (e = n.constructor, o = function(
													t) {
												var n = (this.constructor || e).prototype;
												return t in this
														&& !(t in n && this[t] === n[t])
											}), n = null, o.call(this, t)
								});
								var m = {
									boolean : 1,
									number : 1,
									string : 1,
									undefined : 1
								}, y = function(t, e) {
									var n = typeof t[e];
									return "object" == n ? !!t[e] : !m[n]
								};
								if (i = function(t, e) {
									var n, r, s, c = 0;
									(n = function() {
										this.valueOf = 0
									}).prototype.valueOf = 0, r = new n;
									for (s in r)
										o.call(r, s) && c++;
									return n = r = null, c ? i = 2 == c
											? function(t, e) {
												var n, r = {}, i = "[object Function]" == a
														.call(t);
												for (n in t)
													i && "prototype" == n
															|| o.call(r, n)
															|| !(r[n] = 1)
															|| !o.call(t, n)
															|| e(n)
											}
											: function(t, e) {
												var n, r, i = "[object Function]" == a
														.call(t);
												for (n in t)
													i
															&& "prototype" == n
															|| !o.call(t, n)
															|| (r = "constructor" === n)
															|| e(n);
												(r || o.call(t,
														n = "constructor"))
														&& e(n)
											}
											: (r = ["valueOf", "toString",
													"toLocaleString",
													"propertyIsEnumerable",
													"isPrototypeOf",
													"hasOwnProperty",
													"constructor"], i = function(
													t, e) {
												var n, i, s = "[object Function]" == a
														.call(t), c = !s
														&& "function" != typeof t.constructor
														&& y(t,
																"hasOwnProperty")
														? t.hasOwnProperty
														: o;
												for (n in t)
													s && "prototype" == n
															|| !c.call(t, n)
															|| e(n);
												for (i = r.length; n = r[--i]; c
														.call(t, n)
														&& e(n));
											}), i(t, e)
								}, !n("json-stringify")) {
									var v = {
										92 : "\\\\",
										34 : '\\"',
										8 : "\\b",
										12 : "\\f",
										10 : "\\n",
										13 : "\\r",
										9 : "\\t"
									}, b = function(t, e) {
										return ("000000" + (e || 0)).slice(-t)
									}, _ = function(t) {
										var e, n = '"', r = 0, o = t.length, i = o > 10
												&& p;
										for (i && (e = t.split("")); r < o; r++) {
											var s = t.charCodeAt(r);
											switch (s) {
												case 8 :
												case 9 :
												case 10 :
												case 12 :
												case 13 :
												case 34 :
												case 92 :
													n += v[s];
													break;
												default :
													if (s < 32) {
														n += "\\u00"
																+ b(
																		2,
																		s
																				.toString(16));
														break
													}
													n += i ? e[r] : p ? t
															.charAt(r) : t[r]
											}
										}
										return n + '"'
									}, w = function(t, e, n, r, c, u, h) {
										var l, p, d, m, y, v, k, S, x, C, A, E, T, P, I, B;
										try {
											l = e[t]
										} catch (t) {
										}
										if ("object" == typeof l && l)
											if ("[object Date]" != (p = a
													.call(l))
													|| o.call(l, "toJSON"))
												"function" == typeof l.toJSON
														&& ("[object Number]" != p
																&& "[object String]" != p
																&& "[object Array]" != p || o
																.call(l,
																		"toJSON"))
														&& (l = l.toJSON(t));
											else if (l > -1 / 0 && l < 1 / 0) {
												if (g) {
													for (y = f(l / 864e5), d = f(y
															/ 365.2425)
															+ 1970 - 1; g(
															d + 1, 0) <= y; d++);
													for (m = f((y - g(d, 0))
															/ 30.42); g(d, m
																	+ 1) <= y; m++);
													y = 1 + y - g(d, m), v = (l
															% 864e5 + 864e5)
															% 864e5, k = f(v
															/ 36e5)
															% 24, S = f(v / 6e4)
															% 60, x = f(v / 1e3)
															% 60, C = v % 1e3
												} else
													d = l.getUTCFullYear(), m = l
															.getUTCMonth(), y = l
															.getUTCDate(), k = l
															.getUTCHours(), S = l
															.getUTCMinutes(), x = l
															.getUTCSeconds(), C = l
															.getUTCMilliseconds();
												l = (d <= 0 || d >= 1e4
														? (d < 0 ? "-" : "+")
																+ b(
																		6,
																		d < 0
																				? -d
																				: d)
														: b(4, d))
														+ "-"
														+ b(2, m + 1)
														+ "-"
														+ b(2, y)
														+ "T"
														+ b(2, k)
														+ ":"
														+ b(2, S)
														+ ":"
														+ b(2, x)
														+ "."
														+ b(3, C) + "Z"
											} else
												l = null;
										if (n && (l = n.call(e, t, l)), null === l)
											return "null";
										if ("[object Boolean]" == (p = a
												.call(l)))
											return "" + l;
										if ("[object Number]" == p)
											return l > -1 / 0 && l < 1 / 0 ? ""
													+ l : "null";
										if ("[object String]" == p)
											return _("" + l);
										if ("object" == typeof l) {
											for (P = h.length; P--;)
												if (h[P] === l)
													throw TypeError();
											if (h.push(l), A = [], I = u, u += c, "[object Array]" == p) {
												for (T = 0, P = l.length; T < P; T++)
													E = w(T, l, n, r, c, u, h), A
															.push(E === s
																	? "null"
																	: E);
												B = A.length
														? c ? "[\n"
																+ u
																+ A.join(",\n"
																		+ u)
																+ "\n" + I
																+ "]" : "["
																+ A.join(",")
																+ "]"
														: "[]"
											} else
												i(r || l, function(t) {
													var e = w(t, l, n, r, c, u,
															h);
													e !== s
															&& A
																	.push(_(t)
																			+ ":"
																			+ (c
																					? " "
																					: "")
																			+ e)
												}), B = A.length
														? c ? "{\n"
																+ u
																+ A.join(",\n"
																		+ u)
																+ "\n" + I
																+ "}" : "{"
																+ A.join(",")
																+ "}"
														: "{}";
											return h.pop(), B
										}
									};
									h.stringify = function(t, e, n) {
										var r, o, i, s;
										if ("function" == typeof e
												|| "object" == typeof e && e)
											if ("[object Function]" == (s = a
													.call(e)))
												o = e;
											else if ("[object Array]" == s) {
												i = {};
												for (var c, u = 0, h = e.length; u < h; c = e[u++], ("[object String]" == (s = a
														.call(c)) || "[object Number]" == s)
														&& (i[c] = 1));
											}
										if (n)
											if ("[object Number]" == (s = a
													.call(n))) {
												if ((n -= n % 1) > 0)
													for (r = "", n > 10
															&& (n = 10); r.length < n; r += " ");
											} else
												"[object String]" == s
														&& (r = n.length <= 10
																? n
																: n
																		.slice(
																				0,
																				10));
										return w("", (c = {}, c[""] = t, c), o,
												i, r, "", [])
									}
								}
								if (!n("json-parse")) {
									var k, S, x = String.fromCharCode, C = {
										92 : "\\",
										34 : '"',
										47 : "/",
										98 : "\b",
										116 : "\t",
										110 : "\n",
										102 : "\f",
										114 : "\r"
									}, A = function() {
										throw k = S = null, SyntaxError()
									}, E = function() {
										for (var t, e, n, r, o, i = S, s = i.length; k < s;)
											switch (o = i.charCodeAt(k)) {
												case 9 :
												case 10 :
												case 13 :
												case 32 :
													k++;
													break;
												case 123 :
												case 125 :
												case 91 :
												case 93 :
												case 58 :
												case 44 :
													return t = p
															? i.charAt(k)
															: i[k], k++, t;
												case 34 :
													for (t = "@", k++; k < s;)
														if ((o = i
																.charCodeAt(k)) < 32)
															A();
														else if (92 == o)
															switch (o = i
																	.charCodeAt(++k)) {
																case 92 :
																case 34 :
																case 47 :
																case 98 :
																case 116 :
																case 110 :
																case 102 :
																case 114 :
																	t += C[o], k++;
																	break;
																case 117 :
																	for (e = ++k, n = k
																			+ 4; k < n; k++)
																		(o = i
																				.charCodeAt(k)) >= 48
																				&& o <= 57
																				|| o >= 97
																				&& o <= 102
																				|| o >= 65
																				&& o <= 70
																				|| A();
																	t += x("0x"
																			+ i
																					.slice(
																							e,
																							k));
																	break;
																default :
																	A()
															}
														else {
															if (34 == o)
																break;
															for (o = i
																	.charCodeAt(k), e = k; o >= 32
																	&& 92 != o
																	&& 34 != o;)
																o = i
																		.charCodeAt(++k);
															t += i.slice(e, k)
														}
													if (34 == i.charCodeAt(k))
														return k++, t;
													A();
												default :
													if (e = k, 45 == o
															&& (r = !0, o = i
																	.charCodeAt(++k)), o >= 48
															&& o <= 57) {
														for (48 == o
																&& (o = i
																		.charCodeAt(k
																				+ 1)) >= 48
																&& o <= 57
																&& A(), r = !1; k < s
																&& (o = i
																		.charCodeAt(k)) >= 48
																&& o <= 57; k++);
														if (46 == i
																.charCodeAt(k)) {
															for (n = ++k; n < s
																	&& (o = i
																			.charCodeAt(n)) >= 48
																	&& o <= 57; n++);
															n == k && A(), k = n
														}
														if (101 == (o = i
																.charCodeAt(k))
																|| 69 == o) {
															for (o = i
																	.charCodeAt(++k), 43 != o
																	&& 45 != o
																	|| k++, n = k; n < s
																	&& (o = i
																			.charCodeAt(n)) >= 48
																	&& o <= 57; n++);
															n == k && A(), k = n
														}
														return +i.slice(e, k)
													}
													if (r && A(), "true" == i
															.slice(k, k + 4))
														return k += 4, !0;
													if ("false" == i.slice(k, k
																	+ 5))
														return k += 5, !1;
													if ("null" == i.slice(k, k
																	+ 4))
														return k += 4, null;
													A()
											}
										return "$"
									}, T = function(t) {
										var e, n;
										if ("$" == t && A(), "string" == typeof t) {
											if ("@" == (p ? t.charAt(0) : t[0]))
												return t.slice(1);
											if ("[" == t) {
												for (e = []; "]" != (t = E()); n
														|| (n = !0))
													n
															&& ("," == t
																	? "]" == (t = E())
																			&& A()
																	: A()), "," == t
															&& A(), e
															.push(T(t));
												return e
											}
											if ("{" == t) {
												for (e = {}; "}" != (t = E()); n
														|| (n = !0))
													n
															&& ("," == t
																	? "}" == (t = E())
																			&& A()
																	: A()), "," != t
															&& "string" == typeof t
															&& "@" == (p
																	? t
																			.charAt(0)
																	: t[0])
															&& ":" == E()
															|| A(), e[t
															.slice(1)] = T(E());
												return e
											}
											A()
										}
										return t
									}, P = function(t, e, n) {
										var r = I(t, e, n);
										r === s ? delete t[e] : t[e] = r
									}, I = function(t, e, n) {
										var r, o = t[e];
										if ("object" == typeof o && o)
											if ("[object Array]" == a.call(o))
												for (r = o.length; r--;)
													P(o, r, n);
											else
												i(o, function(t) {
															P(o, t, n)
														});
										return n.call(t, e, o)
									};
									h.parse = function(t, e) {
										var n, r;
										return k = 0, S = "" + t, n = T(E()), "$" != E()
												&& A(), k = S = null, e
												&& "[object Function]" == a
														.call(e)
												? I((r = {}, r[""] = n, r), "",
														e)
												: n
									}
								}
							}
							c && t(function() {
										return h
									})
						}(this)
					}, {}],
					50 : [function(t, e, n) {
								function r(t, e) {
									var n = [];
									e = e || 0;
									for (var r = e || 0; r < t.length; r++)
										n[r - e] = t[r];
									return n
								}
								e.exports = r
							}, {}]
				}, {}, [1])(1)
			})
		}, function(t, e) {
			!function(e, n) {
				function r(t) {
					function r(t, e) {
						l !== n && (m = setTimeout(function() {
							"jsonp" === u ? (delete o[t], document.body
									.removeChild(e)) : (g = !0, y && y.abort()), console
									.log("timeout")
						}, l))
					}
					var i = t.url || "", s = (t.type || "get").toLowerCase(), a = t.data
							|| null, c = t.contentType || "", u = t.dataType
							|| "", h = t.async === n || t.async, l = t.timeOut, p = t.before
							|| function() {
							}, f = t.error || function() {
					}, d = t.success || function() {
					}, g = !1, m = null, y = null;
					!function() {
						function t(e, r) {
							function o(e, r, o) {
								var i = [];
								return e = o === n ? e : o + "[" + e + "]", "object" == typeof r
										&& null !== r
										? i = i.concat(t(r, e))
										: (e = encodeURIComponent(e), r = encodeURIComponent(r), i
												.push(e + "=" + r)), i
							}
							var i, s = [];
							if ("[object Array]" == Object.prototype.toString
									.call(e))
								for (var a = 0, c = e.length; a < c; a++)
									i = e[a], s = s
											.concat(o("object" == typeof i
															? a
															: "", i, r));
							else if ("[object Object]" == Object.prototype.toString
									.call(e))
								for (var u in e)
									i = e[u], s = s.concat(o(u, i, r));
							return s
						}
						a && ("string" == typeof a ? a = function(t) {
							for (var e = t.split("&"), n = 0, r = e.length; n < r; n++)
								name = encodeURIComponent(e[n].split("=")[0]), value = encodeURIComponent(e[n]
										.split("=")[1]), e[n] = name + "="
										+ value;
							return e
						}(a)
								: "object" == typeof a && (a = t(a)), a = a
								.join("&").replace("/%20/g", "+"), "get" !== s
								&& "jsonp" !== u
								|| (i += i.indexOf("?") > -1
										? i.indexOf("=") > -1 ? "&" + a : a
										: "?" + a))
					}(), p(), "jsonp" === u ? function() {
						var t = document.createElement("script"), e = (new Date)
								.getTime()
								+ Math.round(1e3 * Math.random()), n = "JSONP_"
								+ e;
						o[n] = function(e) {
							clearTimeout(m), document.body.removeChild(t), d(e)
						}, t.src = i + (i.indexOf("?") > -1 ? "&" : "?")
								+ "callback=" + n, t.type = "text/javascript", document.body
								.appendChild(t), r(n, t)
					}()
							: function() {
								y = function() {
									if (e.XMLHttpRequest)
										return new XMLHttpRequest;
									for (var t = ["Microsoft", "msxm3",
											"msxml2", "msxml1"], n = 0; n < t.length; n++)
										try {
											var r = t[n] + ".XMLHTTP";
											return new ActiveXObject(r)
										} catch (t) {
										}
								}(), y.open(s, i, h), "post" !== s || c
										? c
												&& y.setRequestHeader(
														"Content-Type", c)
										: y
												.setRequestHeader(
														"Content-Type",
														"application/x-www-form-urlencoded;charset=UTF-8"), y.onreadystatechange = function() {
									if (4 === y.readyState) {
										if (l !== n) {
											if (g)
												return;
											clearTimeout(m)
										}
										y.status >= 200 && y.status < 300
												|| 304 == y.status
												? d(y.responseText)
												: f(y.status, y.statusText)
									}
								}, y.send("get" === s ? null : a), r()
							}()
				}
				var o = {};
				t.exports = r
			}(window)
		}]);