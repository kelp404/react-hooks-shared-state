const path = require('path');

module.exports = (env = {}) => ({
  target: 'web',
  mode: env.mode || 'development',
  entry: {
    app: path.join(__dirname, 'example', 'app.js')
  },
  devServer: {
    host: 'localhost',
    port: 8000,
    contentBase: path.join(__dirname, 'example'),
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: 'index.html'
        }
      ]
    },
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
