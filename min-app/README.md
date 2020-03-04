# 小程序消息推送

小程序消息推送种类

* 订阅消息
* 模板消息
* 统一服务消息
* 客服消息

由于[模板消息](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/template-message.html)**已经下线**，这里的示例消息是[订阅消息](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/subscribe-message.html)

实现订阅消息我们开始需要知道几个小程序的参数值

* 小程序appid

* 小程序密钥

* 小程序订阅模板 id (template_id)

以上参数都可以在[小程序管理后台](https://mp.weixin.qq.com/wxamp/home)上找到

## 小程序端

* 开发前需要获取小程序设置模板 ID，没有设置模板消息时可以添加新的模板 [https://mp.weixin.qq.com](https://mp.weixin.qq.com)

* 拥有模板 ID 后，需要获取到下发消息权限

### 用户下发推送消息权限

在订单或者其它操作完成时，调起客户端小程序订阅消息界面，获取到用户操作结果

```js
// index.wxml
<button bindtap="bindSubscribeMessage"> 获取下发权限 </button>

// index.js
bindSubscribeMessage() {
  wx.requestSubscribeMessage({
    tmplIds: ['tmplIds'],
    success (res) { 
      console.log(res)
      }
  })
}
```


### 传送用户 code

由于消息推送服务端需要小程序 `openid` 所以我们需要将通过 `wx.login` 登录小程序将 `code` 发送给服务端

```js
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
}
```

## 服务端

这里由于是自己模拟服务端，使用的 `Koa` 来实现基本流程，其他后端实现流程应该是一样的

由于推送消息需要小程序 `access_token` 和 `openid`，所以我们先要获取这两个参数

获取流程

![流程](https://cdn.nlark.com/yuque/0/2020/png/124135/1583308543537-72931735-d734-4b9c-b7e4-e6ffc135de01.png)

### 获取小程序客服端传参 code

通过客户端发送接口 `app/send` 拿到参数 `code`
 
```js
function getBodyMessage(ctx) {
	const { body } = ctx.request;
	return body;
}
```

### 获取 openid

通过 `code` + `secret(小程序密钥)` + `appid` 获取 `openid` 

```js
function getOpenId(js_code) {
	return new Promise(resolve => {
		http(
			{
				url: `https://api.weixin.qq.com/sns/jscode2session`,
				method: 'get',
				qs: {
					grant_type: 'authorization_code',
					js_code,
					appid: APP.appid,
					secret: APP.secret
				},
				json: true //设置返回的数据为json
			},
			(error, response, body) => {
				if (!error && response.statusCode == 200) {
					resolve(body);
				}
			}
		);
	});
}
```

### 获取 access_token

```js
function getAccessToken() {
	return new Promise(resolve => {
		http(
			{
				url: `${WX_API}/token`,
				method: 'get',
				qs: {
					grant_type: 'client_credential', // 注意 type 类型
					appid: APP.appid,
					secret: APP.secret
				},
				json: true //设置返回的数据为json
			},
			(error, response, body) => {
				if (!error && response.statusCode == 200) {
					const { access_token } = body;
					resolve(access_token);
				}
			}
		);
	});
}
```

### 推送消息

我们获取到 `openid` 和 `access_token` 后就可以推送消息给用户了

这里我们需要注意：

* 下发的消息模板需要注意订阅消息参数值内容限制，需要[参考](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/subscribe-message/subscribeMessage.send.html)

* 下发模板消息属性需要注意

![](https://cdn.nlark.com/yuque/0/2020/png/124135/1583309132874-47a80bb3-10d7-4e5b-a6e7-f75ab7117747.png)

* 开发模式下，授权一次下发一次消息

```js
function sendMessage({ access_token, openid, msg }) {
	const requestData = {
		touser: openid,
    template_id: APP.template_id,
    // 模板消息属性和属性值需要注意内容限制
		data: {
			thing1: {
				value: msg.taskName
			},
			thing10: {
				value: msg.remarks
			},
			thing9: {
				value: msg.className
			}
		}
  };
  console.log(requestData);
	return new Promise((resolve, reject) => {
		http(
			{
				url: `${WX_API}/message/subscribe/send?access_token=${access_token}`,
				headers: {
					'content-type': 'application/json'
				},
				method: 'post',
				body: requestData, // 需要注意是放在 body 上，而不是 form 上
				json: true // 设置返回的数据为json
			},
			(error, response, body) => {
				if (!error && response.statusCode == 200) {
					resolve(body);
				} else {
					reject();
				}
			}
		);
	});
}
```

