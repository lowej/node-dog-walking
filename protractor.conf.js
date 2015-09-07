//Config for protractor to run the end 2 end (Selenium tests)

exports.config = {
  framework: 'mocha',
  specs: [
    'test/e2e/**/*.spec.js'
  ],
  mochaOpts: {
    enableTimeouts: false
  },
  onPrepare: function () {
	  process.env.PORT = 3001;
	   require('./server');
  }
}