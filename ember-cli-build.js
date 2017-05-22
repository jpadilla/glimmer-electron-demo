'use strict';

const Concat = require('broccoli-concat');
const MergeTrees = require('broccoli-merge-trees');
const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;

class CustomApp extends GlimmerApp {
  // app.import is not yet implemented for GlimmerApp
  // This prevents error being thrown when ember-electron uses app.import
  import() {}
}

module.exports = function(defaults) {
  const app = new CustomApp(defaults);

  // TODO Include only while in development
  const vendorScripts = Concat('node_modules', {
    inputFiles: ['ember-electron/app/electron/reload.js'],
    outputFile: 'ember/vendor.js'
  });

  return new MergeTrees([
    app.toTree(),
    vendorScripts
  ], { overwrite: true });
};
