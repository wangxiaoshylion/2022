const babel = require("@babel/core");
const path = require("path");

function babelLoader(source) {
  //loader里面的this=loaderContext，是一个唯一的对象，不管在哪个loader或方法里，它的this都是同一个对象，称为loaderContext，这个等会就会实现
  const options = this.getOptions(); //拿到在webpack中传递给该loader的参数，也就是presets: ["@babel/preset-env"],
  console.log("自己写的babel-loader");
  const { code } = babel.transformSync(source, options); //交给babel库去解析
  return code;
}

module.exports = babelLoader;
