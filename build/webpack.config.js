var path = require('path');
var webpack = require('webpack')

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, './src'); //__dirname 中的src目录，以此类推
var STYLE_PATH = path.resolve(ROOT_PATH, './src/styles');
var LOCAL_STYLE_PATH = path.resolve(ROOT_PATH, './src/styleslocal');

module.exports = {
  devtool: 'cheap-mmodule-eval-source-map',
  entry: [
    'webpack/hot/dev-server',
    path.resolve(__dirname, 'src/app.js')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
          test: /\.jsx?$/,
          loader: 'babel',
          exclude: /node_modules/,
          include: __dirname,
          query: {
              plugins: ['transform-decorators-legacy', "lodash", ["import", {
              "libraryName": "yo-component",
              "style": true,   // or 'css' 
              }, {
              "libraryName": "antd",
              "style": true,   // or 'css' 
              }]],
            presets: ['es2015','react', 'stage-0']
          }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192!img-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.css$/,
        include: [LOCAL_STYLE_PATH],
        loaders: ['style?sourceMap',
        'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]']
      },
      {
        test: /\.css$/,
        exclude: [LOCAL_STYLE_PATH],
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
      hot: true,
      inline: true
  }
};