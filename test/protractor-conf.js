exports.config = {
	seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

	specs: [
		'c2g*.js'
	],

	capabilities: {
		'browserName': 'chrome',
		shardTestFiles: true,
		maxInstances: 3
	}
};
