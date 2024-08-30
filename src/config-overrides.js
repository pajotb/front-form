const { override, addWebpackDevServerConfig } = require('customize-cra');

module.exports = override(
  addWebpackDevServerConfig({
    allowedHosts: 'all',
  })
);
