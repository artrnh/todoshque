const path = require('path')
const webpack = require('webpack')

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
        use: [          
          { loader: 'ts-loader', options: { transpileOnly: true } },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /.jpe?g$|.gif$|.png$|.svg$|.woff$|.woff2$|.ttf$|.eot$/,
        use: 'url-loader'
      }
    ],
  },  
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [new webpack.NamedModulesPlugin()],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    publicPath: '/',
    port: 3000
  }
}
