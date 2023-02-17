/**  
 * 从.env中获取  
 * 模仿vue-cli-service，不是APP_VUE*这个开头的全局变量就会被过滤掉  
 */
const fs = require('fs')
const path = require('path')
const yargs = require('./yargs')

// 读取 env 内容
function parse(src) {
	const LINE =
		/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg
	
	const obj = {}

	let lines = src.toString()
	lines = lines.replace(/\r\n?/mg, '\n')

	let match
	while ((match = LINE.exec(lines)) != null) {
		const key = match[1]

		let value = (match[2] || '')

		value = value.trim()

		const maybeQuote = value[0]

		value = value.replace(/^(['"`])([\s\S]*)\1$/mg, '$2')

		if (maybeQuote === '"') {
			value = value.replace(/\\n/g, '\n')
			value = value.replace(/\\r/g, '\r')
		}

		obj[key] = value
	}
	return obj
}

module.exports = function() {
	const config = yargs();
	
	const env = config.mode;
	const envPath = path.resolve(__dirname, '../../') + '/.env.' + env
	
	try{
		const data = fs.readFileSync(envPath, 'utf8')
		return parse(data)
	}catch(e){
		console.log('读取env出错：' + JSON.stringify(e));
	}
}
