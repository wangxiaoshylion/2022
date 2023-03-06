const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolveLoader: {
    modules: ["loaders", "node_modules"],
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: ["a-loader", "b-loader", "c-loader"],
      // },
      {
        test: /\.js$/,
        use: [
          {
            loader: "my-babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader", //将css内容变成style标签插入到html中去
          "css-loader", //一般会解析url合@import等语法
          "less-loader", //将less=>css
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],

  // 使用自定义Loader的三种方式
  // 1. 配置loader的绝对路径
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       use: [
  //         {
  //           loader: path.resolve(__dirname, "./loaders/simplLoader.js"),
  //           options: {
  //             // ...
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },

  // 2. 配置resolveLoader.alias配置别名
  // resolveLoader: {
  //   alias: {
  //     simpleLoader: path.resolve(__dirname, "./loaders/simplLoader.js"),
  //   },
  // },
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       use: [
  //         {
  //           loader: "simpleLoader",
  //           options: {
  //             //...
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },

  // 3. 配置resolveLoader.modules
  // resolveLoader: {
  //   modules: ["loaders", "node_modules"],
  // },
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       use: [
  //         {
  //           loader: "simpleLoader",
  //           options: {
  //             // ...
  //           },
  //         },
  //       ],
  //       // enforce: "pre", //这里也可以是post，默认不写就是normal
  //     },
  //     {
  //       test: /\.js$/,
  //       use: ["eslint-loader"],
  //       enforce: "pre", //编译前先对js文件进行校验 enforce: "post"后置类型,
  //     },
  //     {
  //       test: /\.js$/,
  //       use: ["babel-loader"],
  //     },
  //   ],
  // },
};
