// webpack.production.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //分离css和js文件
const CleanWebpackPlugin = require("clean-webpack-plugin"); //每次构建时，去除build文件夹中的残余文件

module.exports = {
  entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
  output: {
    path: __dirname + "/build",
    filename: "bundle-[hash].js"
  },
  devtool: 'null', //注意修改了这里，这能大大压缩我们的打包代码
  devServer: {
    contentBase: "./public", //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    inline: true,
    hot: true
  },
  module: {
      rules: [{
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      }, 
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          }, 
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.html" //new 一个这个插件的实例，并传入相关的参数
    }),
    new webpack.optimize.OccurrenceOrderPlugin(), //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new webpack.optimize.UglifyJsPlugin(), //压缩JS代码
    new ExtractTextPlugin("style.css"), //分离css文件
    new CleanWebpackPlugin('build/*.*', {
      root: __dirname,
      verbose: true,
      dry: false
    })
  ],
};