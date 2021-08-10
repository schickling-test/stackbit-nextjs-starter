const path = require('path');
const sourcebit = require('sourcebit');
const sourcebitConfig = require('./sourcebit.js');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

sourcebit.fetch(sourcebitConfig);

module.exports = withStackbitComponents({
  componentsMapPath: '.stackbit/components-map.json',
  trailingSlash: true,
  devIndicators: {
    autoPrerender: false,
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  externals: {
    bufferutil: 'bufferutil',
    'utf-8-validate': 'utf-8-validate',
  },
  webpack: (config, { webpack, isServer }) => {
    config.resolve.alias['react'] = path.resolve('./node_modules/react');
    config.resolve.alias['react-dom'] = path.resolve('./node_modules/react');

    // Tell webpack to ignore watching content files in the content folder.
    // Otherwise webpack receompiles the app and refreshes the whole page.
    // Instead, the src/pages/[...slug].js uses the "withRemoteDataUpdates"
    // function to update the content on the page without refreshing the
    // whole page
    config.plugins.push(new webpack.WatchIgnorePlugin({ paths: [/\/content\//] }));

    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          openAnalyzer: true,
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          // analyzerMode: 'static',
          // reportFilename: isServer
          //     ? '../analyze/server.html'
          //     : './analyze/client.html'
        })
      );
    }

    return config;
  },
});
