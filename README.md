# CRACO Change Build Directory Plugin

This plugin allows you to change the `build` directory path on your create-react-app project.

It replaces the following CRA and Webpack configuration settings with your new path:

- `paths.appBuild`
- `webpackConfig.output.path`

## Usage Example

Install CRACO following the instructions on their documentation: <https://www.npmjs.com/package/@craco/craco#installation>

Install the plugin using:

```bash
npm install -D craco-change-build-directory
```

Create a `craco.config.js` containing at the least the following:

```js
const path = require('path');
const changeBuildDirectory = require('craco-change-build-directory');

const newBuildPath = path.resolve('your-new-build-directory');

module.exports = {
  plugins: [
    {
      plugin: changeBuildDirectory,
      options: {
        newPath: newBuildPath,
      },
    },
  ],
};
```

## Limitations and Known Issues

The way this plugin works is kind of a hack. The purpose of the method `overrideWebpackConfig` is to return a modified webpack configuration, but we use the same method make changes to the `context.paths` object received as parameter.

Unfortunately, right now, there's no hook method on CRACO plugin system with the purpose of making changes to the `context` or `context.paths` object. This misuse of CRACO plugin API implies that small changes in the future can easily break this plugin functionality.

Also there's a chance that other (CRA/CRACO/Jest/WebPack/...) plugins read the path before our changes are made, or have this paths hardcoded.
