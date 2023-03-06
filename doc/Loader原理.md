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
