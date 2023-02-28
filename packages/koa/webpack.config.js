const path = require("path");
const nodeExcternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const webpackConfig = {
  target: "node",
  mode: "development",
  entry: {
    server: path.join(__dirname, "src/index.js"),
  },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
        },
        exclude: [path.join(__dirname, "/node_modules")],
      },
    ],
  },
  devtool: "eval-source-map",
  externals: [nodeExcternals()],
  plugins: [new CleanWebpackPlugin()],
  node: {
    global: true,
    __filename: false,
    __dirname: false,
    // console: true,
    // global: true,
    // process: true,
    // Buffer: true,
    // __filename: true,
    // __dirname: true,
    // setImmediate: true,
    // path: true,
  },
};

module.exports = webpackConfig;
