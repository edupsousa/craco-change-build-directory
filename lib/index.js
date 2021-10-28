const path = require('path');

let i = 0;

module.exports = {
  overrideWebpackConfig: ({
    webpackConfig,
    context: { paths },
    pluginOptions: { newPath },
  }) => {
    const newBuildPath = path.resolve(newPath);
    paths.appBuild = newBuildPath;
    if (webpackConfig.output && webpackConfig.output.path) {
      webpackConfig.output.path = newBuildPath;
    }
    return webpackConfig;
  },
};
