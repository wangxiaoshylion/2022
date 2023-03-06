const { runLoaders } = require("loader-runner"); //webpack内容用的此库解析loaders
const path = require("path");
const entryFile = path.resolve(__dirname, "./src/index.js"); //拿到入口文件的绝对路径

//模拟使用行内loader
let modulePath = `-!inline-loader1!inline-loader2!${entryFile}`;
//模拟webpack.config.js中的配置
let rules = [
  {
    test: /\.js$/,
    use: ["normal-loader1", "normal-loader2"], //使用两个normalLoader
  },
  {
    test: /\.js$/,
    enforce: "post",
    use: ["post-loader1", "post-loader2"], //使用两个postLoader
  },
  {
    test: /\.js$/,
    enforce: "pre",
    use: ["pre-loader1", "pre-loader2"], //使用两个preLoader
  },
];

let preLoaders = [],
  inlineLoaders = [],
  postLoaders = [],
  normalLoaders = [];

//找出 inlineLoaders
let useInlineLoadersArray = modulePath.replace(/^-?!+/, "").split("!"); //['inline-loader1','inline-loader2','入口模块的路径']
let resource = useInlineLoadersArray.pop(); //弹出最后一个元素 resource = 入口模块的路径
inlineLoaders = useInlineLoadersArray; //[inline-loader1,inline-loader2]

//对其他类型的loader进行分类
for (let i = 0; i < rules.length; i++) {
  let rule = rules[i];
  if (rule.test.test(resource)) {
    if (rule.enforce === "pre") {
      preLoaders.push(...rule.use);
    } else if (rule.enforce === "post") {
      postLoaders.push(...rule.use);
    } else {
      normalLoaders.push(...rule.use);
    }
  }
}

let loaders = [];

if (request.startsWith("!!")) {
  //使用 !! 前缀，将禁用其他类型的loader，只要内联loader
  loaders = [...inlineLoaders];
} else if (request.startsWith("-!")) {
  //使用 -! 前缀，将禁用所有已配置的 preLoader 和 loader，但是不禁用 postLoaders，也就是不要前置和普通 loader
  loaders = [...postLoaders, ...inlineLoaders];
} else if (request.startsWith("!")) {
  //使用 ! 前缀，将禁用所有已配置的 normal loader(普通 loader)
  loaders = [...postLoaders, ...inlineLoaders, ...preLoaders];
} else {
  loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders, ...preLoaders];
}

//把loader数组从名称变成绝对路径，因为runLoaders接收的是绝对路径
loaders = loaders.map((loader) => path.resolve(__dirname, "loaders", loader));

runLoaders(
  {
    resource, //你要加载的资源
    loaders,
  },
  (err, result) => {
    console.log(err, "err"); //运行错误
    console.log(result, "最后要输出的result"); //运行的结果
    console.log(
      result.resourceBuffer ? result.resourceBuffer.toString("utf8") : null,
      "读到的原始的文件"
    ); //读到的原始的文件
  }
);
