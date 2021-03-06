const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /.jpe?g$|.gif$|.png$|.svg$|.woff$|.woff2$|.ttf$|.eot$/,
        use: 'url-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      Utils: path.resolve(__dirname, 'src/utils/'),
      Stores: path.resolve(__dirname, 'src/stores/'),
      Models: path.resolve(__dirname, 'src/models/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Pages: path.resolve(__dirname, 'src/components/pages/'),
      Common: path.resolve(__dirname, 'src/components/common/'),
    },
  },
  plugins: [new webpack.NamedModulesPlugin()],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    publicPath: '/',
    port: 3000,
    hot: true,
  },
};
