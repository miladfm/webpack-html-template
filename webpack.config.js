const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  /**
   * Javascript file for each primary pages
   */
  entry: {
    'index': './src/js/index-page.js',
    'page1': './src/js/page1.js',
  },
  module: {
    rules: [
      // {
      //   test: /\.html$/,
      //   use: [{
      //     loader: 'html-loader',
      //     // options: {
      //     //   attributes: false
      //     // }
      //   }],
      //   /**
      //    *  Primary pages should be part of exclude list
      //    */
      //   exclude: [
      //     /index.html/,
      //     /page1.html/,
      //   ]
      // },
      { test: /\.ejs$/i, use: [ { loader: 'ejs-easy-loader' } ] },
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new HtmlMinimizerPlugin(),
      new TerserPlugin()
    ],
  },
  output: {
    filename: './js/[name]-[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    // overlay: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/[name]-[contenthash].bundle.css"
    }),
    // new CopyWebpackPlugin([{
    //   from: './assets',
    //   to: path.resolve(__dirname, './dist/assets')
    // }]),
    new CopyWebpackPlugin({
      patterns: [{
        from: './assets',
        to: path.resolve(__dirname, './dist/assets')
      }],
    }),

    /**
     * Primary pages should load with HtmlWebpackPlugin
     */
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/html/index.ejs',
      chunks: ['index'],
      test: 'Test Duummy Text'
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'page1.html',
    //   template: './src/html/page1.ejs',
    //   chunks: ['page1']
    // })
  ]
};