### 什么是 Webpack Plugin?

向第三方开发者提供了 Webpack 引擎中完整的能力。使用阶段式的构建回调，开发者可以在 Webpack 构建流程中引入自定义的行为。创建插件比创建 loader 更加高级，因为你需要理解 Webpack 底层的特性来处理相应的钩子

在构建流程中插入我们的自定义行为

### Webpack 插件

tapable: 类似 node.js 中的 evetEmitter 库，可以注册自定义事件，并在适当时机触发执行
compiler
compilation
