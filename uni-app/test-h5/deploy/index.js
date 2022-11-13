const path = require('path')
const fs = require('fs')
const env = require('./modules/readEnv')
const parseManifest = require('./modules/manifest')
const config = env();

// 写入 /static/global.js
writeGlobalConfig()
// 修改 manifest.json 配置
writeManifest()

function writeGlobalConfig() {
	const _global = {}
	for (let key in config) {
		if (key.includes('_API')) {
			_global[key] = config[key]
		}
	}
	const data = `window.__ZZ__CS_GLOBAL__ = ${JSON.stringify(_global)}`
	fs.writeFileSync(path.resolve(__dirname, '../static/global.js'), data)
}

function writeManifest() {
	const _global = {}
	for (let key in config) {
		if (key.includes('_config')) {
			const k = key.slice(0, -7)
			_global[k] = config[key]
		}
	}
	parseManifest(_global);
}
