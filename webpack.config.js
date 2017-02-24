var path = require('path');
var webpack = require('webpack')

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
            plugins: ['transform-decorators-legacy', "lodash"],
            presets: ['es2015','react', 'stage-0']
          }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.css$/,
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