源代码和构建产物之间的关系

### webpack 如何将源代码转换成 dist/main.js?

1. 根据配置信息找到入口文件
2. 收集入口文件相关依赖
3. 输出文件到硬盘
   Q: 浏览器不认识 html,css, js 以外的文件格式，所以需要对资源文件做转换 > Loader 系统
   Q: 打包前是否可以进行一些优化操作，比如校验用户传参、哪些模块可以忽略编译直接走 cdn、编译完成后将输出内容插入到 html > Plugin 系统

### 架构设计

1. 打包前
2. 编译阶段
3. 打包结束后
   Q: watch mode(文件变化时，将重新进行编译 > compilation) ?

### 关键词

compiler
compilation
tapable

### 什么是 Webpack Plugin?

向第三方开发者提供了 Webpack 引擎中完整的能力。使用阶段式的构建回调，开发者可以在 Webpack 构建流程中引入自定义的行为。创建插件比创建 loader 更加高级，因为你需要理解 Webpack 底层的特性来处理相应的钩子

在构建流程中插入我们的自定义行为

### Tapable

tapable: 类似 node.js 中的 evetEmitter 库，可以注册自定义事件，并在适当时机触发执行

发布订阅模式， tap 注册监听函数，call 触发执行

webpack 本质是一种事件流的机制，它的工作流程就是将各个插件串联起来
webpack 内部通过 tapable 提前定义好一系列不同阶段的 hook, 然后在固定时间点去执行触发。而插件就是通过 tap 和 call，让其控制在 webpack 事件流上运行

比如 打包前处理用户参数，判断是单入口还是多入口打包，EntyOptionPlugin 插件
打包完成后，需要先清空 dist 文件夹 CleanWebpackPlugin 插件

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

### 具体实现？

1. 搭建结构，读取配置参数
2. 用配置参数对象初始化 Compiler 对象
3. 挂载配置文件中的插件
4. 执行 Compiler 对象的 run 方法开始执行编译
5. 根据配置文件中的 entry 配置项找到所有的入口
6. 从入口文件出发，调用配置的 loader 规则，对各模块进行编译
   a. 解析入口文件绝对路径添加到依赖数组 fileDependencies
   b. 得到入口模块的 module 对象（里面放着该模块的路径、依赖模块、源代码等）
   c. 找打对应的 loader 对员代码进行翻译和替换
   d.将生成的入口文件 module 对象 push 进 this.modules 中

7. 找出此模块所依赖的模块，再对依赖模块进行编译
8. 等所有模块都编译完成后，根据模块之间的依赖关系，组装代码块 chunk
9. 把各个代码块 chunk 转换成一个一个文件加入到输出列表
10. 确定好输出内容之后，根据配置的输出路径和文件名，将文件内容写入到文件系统

### 导入的 CDN 如何和 webpack 构建配合使用呢？

externals: 指定某些包运行时从外部获取

### webpack 中的 Loader 机制

#### Loader 的本质？

接收资源文件或者上一个 Loader 产生的结果作为入参，也可以用多个 Loader 函数组成 loader chain（链）(从右向左执行)，最终输出转换后的结果

### webpack 中如何使用自定义 Loader,有几种方式？

1. 配置 loader 的绝对路径
2. 配置 resolveLoader 别名，再配置 module 里的 rules 规则
3. 配置 resolveLoader.modules，再配置 module 里的 rules 规则

### Loader 的四种类型

前置 pre: 配置了 enforce: "pre"
普通 normal
行内 inline：import xxx from "inline-loader1!inline-loader2!/src/xxx.css"; 表示用了 inline-loader1 和 inline-loader2 来解析引入的文件
后置 post

### Loader 类型，运行顺序，如何控制运行顺序？

Pitching 阶段： 后置 > 行内 > 普通 > 前置
Normal 阶段： 前置 > 普通 > 行内 > 后置

### Normal Loader 和 Pitching Loader?

PitchLoader 参数：PreviousRequest、CurrentRequest、remainingRequest

### 如果只想执行特定的 Loader 怎么办？

可以通过行内类型前加
! 禁用掉普通类型
!!禁用掉其他类型，只内联 loader
-! 禁用 pre 和 normal 类型，不禁用 post 类型

比如指向执行内联类型的 CLoader

完整的 Loader 运行机制是怎么样？
为什么 Loader 最后处理结果必须是 JS 类型的字符串？

### Loader 和 Babel Plugin 和 Webpack Plugin 区别？
