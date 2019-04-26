const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清空打包输出目录
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// https://juejin.im/post/5b0ba2d56fb9a00a1357a334
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8888, // 端口
    host: 'localhost',
  },
  resolve: {
    //自动补全后缀，注意第一个必须是空字符串,后缀一定以点开头
    extensions: ['*', '.vue', '.js', '.jsx', '.json', '.css'],
    // 配置别名
    alias: {
      // "jQ": path.resolve(__dirname, "src/vendor/jquery.min.js")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.jsx?$/,
        use: ["babel-loader"], // 根目录配置.babelrc
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    })
  ]
}