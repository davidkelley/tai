const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    event: './functions/event',
  },
  target: 'node',
  externals: {
    'aws-sdk': 'aws-sdk',
  },
  resolve: {
    alias: {
      jsonpath: 'jsonpath/jsonpath.min.js',
    },
  },
  output: {
    libraryTarget: 'commonjs2',
    path: `${__dirname}/out`,
    filename: '[name].js',
  },
  plugins: [
    new UglifyJSPlugin(),
  ],
  module: {
    noParse: [/dtrace-provider$/, /safe-json-stringify$/, /mv/],
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
};
