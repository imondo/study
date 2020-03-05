//index.js
//获取应用实例
const app = getApp();

Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		task: {
			taskName: '我的挑战',
			remarks: 'mondo',
			className: '150班级'
		}
	},
	// 登录
	bindLogin() {
		/* 1. 获取code 请求开发服务器 
     * 2. 开发服务器通过 code + appid + secret 请求微信服务器获取 openid
     */
		wx.login({
			success: res => {
				if (res.code) {
					const { task } = this.data;
					this.request(Object.assign(task, { code: res.code }));
				}
			}
		});
	},
	request(data) {
		wx.request({
			url: `http://192.168.2.218:2021/app/send`,
			method: 'POST',
			header: {
				'Content-Type': 'application/json'
			},
			data,
			success(res) {
				if (res.data.code === 200) {
					wx.showToast({
						title: res.data.msg,
						icon: 'success',
						duration: 2000
					});
				} else {
					wx.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 2000
					});
				}
			}
		});
	},
	// 获取下发权限
	bindSubscribeMessage() {
		wx.requestSubscribeMessage({
			tmplIds: app.globalData.tempIds,
			complete(res) {
				console.log(res); // { tempid: 'accept', errMsg: 'requestSubscribeMessage:ok' }
				if (res.errMsg === 'requestSubscribeMessage:ok') {
					// 当前模板消息ID
					const currTmapId = app.globalData.tempIds.find(v => !!res[v]);
					console.log(res[currTmapId]) // 是否授权：accept | reject | ban
				}
			}
		});
	},
	bindTask(e) {
		console.log(e);
		const { target: { dataset: { key } }, detail: { value } } = e;
		const task = this.data.task;
		task[key] = value;
		this.setData({
			task
		});
	},
	//事件处理函数
	bindViewTap: function() {
		wx.navigateTo({
			url: '../logs/logs'
		});
	},
	onLoad: function() {
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			});
		} else if (this.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				});
			};
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo;
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					});
				}
			});
		}
	},
	getUserInfo: function(e) {
		console.log(e);
		app.globalData.userInfo = e.detail.userInfo;
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		});
	}
});
