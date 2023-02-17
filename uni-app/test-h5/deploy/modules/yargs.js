module.exports = function() {
	let args = process.argv;
	let argv = {};
	for (let i = 2; i < args.length; ++i) {
		let cur = args[i];
		if (/^(--)(\S*)(=)/.test(cur)) {
			const keys = cur.split('=')
			argv[keys[0].slice(2)] = keys[1];
		}
	}
	return argv
}
