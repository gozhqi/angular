var config = exports.config = require('./protractor-shared.js').config;
// load traceur runtime as our tests are written in es6
require('traceur/bin/traceur-runtime.js');

var cloudReporterConfig;
try {
  cloudReporterConfig = require('./perf-cloud-secret.js');
} catch (e) {
  cloudReporterConfig = null;
}

config.specs = ['dist/cjs/**/*_perf.js'];
config.params = {
  benchmark: {
    // size of the sample to take
    sampleSize: 20,
    timeout: 20000,
    metrics: ['script', 'render', 'gcAmount', 'gcAmountInScript', 'gcTime'],
    // forces a gc after every run
    forceGc: false,
    reporters: [
      require('./dist/cjs/tools/benchpress/src/console_reporter.js'),
      cloudReporterConfig ? require('./dist/cjs/tools/benchpress/src/cloud_reporter.js') : null,
    ],
    cloudReporter: cloudReporterConfig,
    scaling: [{
      browserName: /chrome/, value: 0.5
    }]
  }
};
