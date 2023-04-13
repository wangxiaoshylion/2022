// 自定义插件 WebpackRunPlugin
class WebpackRunPlugin {
  apply(compiler) {
    compiler.hooks.run.tap("WebpackRunPlugin", () => {
      console.log("开始编译");
    });
  }
}

//自定义插件 WebpackDonePlugin
class WebpackDonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap("WebpackDonePlugin", () => {
      console.log("结束编译");
    });
  }
}

module.exports = {
  WebpackRunPlugin,
  WebpackDonePlugin,
};
