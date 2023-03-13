### 什么是 Webpack Plugin?

向第三方开发者提供了 Webpack 引擎中完整的能力。使用阶段式的构建回调，开发者可以在 Webpack 构建流程中引入自定义的行为。创建插件比创建 loader 更加高级，因为你需要理解 Webpack 底层的特性来处理相应的钩子

在构建流程中插入我们的自定义行为

### Webpack 插件

tapable: 类似 node.js 中的 evetEmitter 库，可以注册自定义事件，并在适当时机触发执行
compiler
compilation

### tapable

发布订阅模式， tap 注册监听函数，call 触发执行

webpack 本质是一种事件流的机制，它的工作流程就是将各个插件串联起来
webpack 内部通过 tapable 提前定义好一系列不同阶段的 hook, 然后在固定时间点去执行触发。而插件就是通过 tap 和 call，让其控制在 webpack 事件流上运行

比如 打包前处理用户参数，判断是单入口还是多入口打包，EntyOptionPlugin 插件
打包完成后，需要先清空 dist 文件夹 CleanWebpackPlugin 插件

### Tapable

发布订阅模式
懒编译
类与继承抽象类的面向对象思想
this 指向的升华

### 如何使用 tapable?

1. 实例化钩子
2. 注册事件
3. 触发事件

### tapable 相关 API

同步钩子: 注册 tap > 触发 call
异步钩子：注册 tap、tapAsync、tapPromise > 触发 callAsync、 promise

SyncHook： 基本类型
SyncBailHook: 同步、保险
SyncWaterfallHook: 同步、瀑布流
SyncLoopHook: 同步、循环
AsyncParalleHook: 异步、基本类型
AsyncParallelBailHook: 异步、保险
AsyncSeriesHook: 异步、串行
AsyncSeriesBailHook: 异步、串行、保险
AsyncSeriesWayerfallHook: 异步、串行、瀑布流

### compiler

代表完整的 webpack 生命周期，包括 options、loader、plugin

### compilation

compilation 代表了一次资源版本构建， 可以理解为是整个生命周期中的一小部分。它主要负责对模块资源的处理。

这样，就并不需要每次都重新创建 compiler 实例，只需要重新创建一个 compilation 来记录编译信息即可
每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用

<!-- 小试牛刀之-在构建完成后打印日志 -->
