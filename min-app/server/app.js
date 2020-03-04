const Koa = require('koa');
const app = new Koa();
const http = require('request');
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());

const APP = require('./../config');
const WX_API = `https://api.weixin.qq.com/cgi-bin`;

/**
 * 1. 获取小程序客服端传参 code
 * 2. 通过 code + appid + secret 获取 openid
 * 3. 获取 access_token
 * 4. 通过 access_token + openid 下发消息
 */

app.use(async ctx => {
	const url = ctx.request.url;
	if (url.includes('/app/send')) {
		try {
			// 获取小程序客服端传参 code
			const { code, ...msg } = getBodyMessage(ctx);
			// 通过 code + appid + secret 获取 openid
			const { openid } = await getOpenId(code);
			// 获取 access_token
			const access_token = await getAccessToken();
			// 通过 access_token + openid 下发消息
			const send = await sendMessage({ access_token, openid, msg });
			if (send.errcode === 0) {
				ctx.body = {
					code: 200,
					msg: '下发成功'
				};
			} else {
				ctx.body = {
					code: 300,
					msg: send.errmsg
				};
			}
		} catch (error) {
			console.log(error);
		}
	}
});

// 获取code和下发的消息
function getBodyMessage(ctx) {
	const { body } = ctx.request;
	return body;
}

// 获取 openid 凭证
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

// 获取 access_token
function getAccessToken() {
	return new Promise(resolve => {
		http(
			{
				url: `${WX_API}/token`,
				method: 'get',
				qs: {
					grant_type: 'client_credential',
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

// 下发消息
function sendMessage({ access_token, openid, msg }) {
	const requestData = {
		touser: openid,
		template_id: APP.template_id,
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
				body: requestData,
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

app.listen(process.env.PORT);
