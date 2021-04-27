const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'main-js': './src/main.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            attributes: false
          }
        }],
        /**
         *  Primary pages should be part of exclude list
         */
        exclude: [
          /index.html/,
          /page1.html/,
        ]
      }
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 3000,
    overlay: true
  },
  plugins: [
    /**
     * Primary pages should load with HtmlWebpackPlugin
     */
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['main-js'],
      title: 'Test Title'
    }),
    new HtmlWebpackPlugin({
      filename: 'page1.html',
      template: './src/page1.html',
      chunks: ['main-js']
    }),
  ]
};