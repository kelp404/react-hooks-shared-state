const path = require('path');

module.exports = () => ({
  target: 'web',
  mode: 'development',
  entry: {
    app: path.join(__dirname, 'example', 'app.js')
  },
  devServer: {
    host: 'localhost',
    port: 8001,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Max-Age': '3000',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET'
    }
  },
  resolve: {
    extensions: ['.js']
  },
  output: {
    path: path.join(__dirname, 'example', 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: [
                ['@babel/react'],
                ['@babel/preset-env', {}]
              ]
            }
          }
        ]
      }
    ]
  }
});
