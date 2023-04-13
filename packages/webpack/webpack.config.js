const path = require("path");
const { WebpackRunPlugin, WebpackDonePlugin } = require("./plugins/index");
const { loader1, loader2 } = require("./loaders/index");

module.exports = {
  mode: "development", // 开发环境, 防止代码被压缩
  devtool: false, // 防止干扰源文件
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"), // 绝对路径
    filename: "[name].js", // 打包后的文件名称
  },
  // loader 插件
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [loader1, loader2], // loader插件
      },
    ],
  },
  // plugin 插件
  plugins: [new WebpackRunPlugin(), new WebpackDonePlugin()],
  // 配置模块如何解析
  resolve: {
    extensions: ["", ".js", ".jsx"], // 尝试按顺序解析这些后缀名，譬如多个文件有相同的名字，但是后缀名不同，webpack会解析列在数组首位的后缀的文件，并跳过其余的后缀
  },
};
