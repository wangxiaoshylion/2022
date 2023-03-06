// // commonJs 原理
// // var modules = {
// //   "./src/name.js": (module) => {
// //     module.exports = "不要秃头啊";
// //   },
// // };
// // var cache = {};

// // //接受模块的路径为参数，返回具体的模块的内容
// // function require(modulePath) {
// //   var cachedModule = cache[modulePath]; //获取模块缓存
// //   if (cachedModule !== undefined) {
// //     //如果有缓存则不允许模块内容，直接retuen导出的值
// //     return cachedModule.exports;
// //   }
// //   //如果没有缓存，则定义module对象，定义exports属性
// //   //这里注意！！！module = cache[modulePath] 代表引用的是同一个内存地址
// //   var module = (cache[modulePath] = { exports: {} });
// //   //运行模块内的代码，在模块代码中会给module.exports对象赋值
// //   modules[modulePath](module);
// //   // modules[modulePath](module, module.exports, require);

// //   //导入module.exports对象
// //   return module.exports;
// // }

// // (() => {
// //   let author = require("./src/name.js");
// //   console.log(author, "author");
// // })();

// //模块定义
// // var modules = {
// //   "./src/name.js": (module, exports, require) => {
// //     //给该模块设置tag：标识这是一个ES Module
// //     require.setModuleTag(exports);
// //     //通过代理给exports设置属性值
// //     require.defineProperty(exports, {
// //       age: () => age,
// //       default: () => DEFAULT_EXPORT,
// //     });
// //     const author = "不要秃头啊";
// //     const age = "18";
// //     const DEFAULT_EXPORT = author;
// //   },
// // };

// // var cache = {};
// // function require(modulePath) {
// //   var cachedModule = cache[modulePath];
// //   if (cachedModule !== undefined) {
// //     return cachedModule.exports;
// //   }
// //   var module = (cache[modulePath] = {
// //     exports: {},
// //   });
// //   modules[modulePath](module, module.exports, require);
// //   return module.exports;
// // }

// // //对exports对象做代理
// // require.defineProperty = (exports, definition) => {
// //   for (var key in definition) {
// //     Object.defineProperty(exports, key, {
// //       enumerable: true,
// //       get: definition[key],
// //     });
// //   }
// // };

// // //标识模块的类型为ES Module
// // require.setModuleTag = (exports) => {
// //   Object.defineProperty(exports, Symbol.toStringTag, {
// //     value: "Module",
// //   });

// //   Object.defineProperty(exports, "__esModule", {
// //     value: true,
// //   });
// // };

// // //以下是main.js编译后的代码
// // //拿到模块导出对象exports

// // (() => {
// //   let obj = require("./src/name.js");
// //   console.log(obj, "obj");
// // })();

// var modules = {
//   "./src/name.js": (module) => {
//     module.exports = "不要秃头啊";
//   },
// };
// var cache = {};
// function require(modulePath) {
//   var cachedModule = cache[modulePath];
//   if (cachedModule !== undefined) {
//     return cachedModule.exports;
//   }
//   var module = (cache[modulePath] = {
//     exports: {},
//   });
//   modules[modulePath](module, module.exports, require);
//   return module.exports;
// }

// require.n = (module) => {
//   var getter =
//     module && module.__esModule ? () => module["default"] : () => module;
//   require.defineProperty(getter, {
//     a: getter,
//   });
//   return getter;
// };

// require.defineProperty = (exports, definition) => {
//   for (var key in definition) {
//     Object.defineProperty(exports, key, {
//       enumerable: true,
//       get: definition[key],
//     });
//   }
// };

// require.setModuleTag = (exports) => {
//   Object.defineProperty(exports, Symbol.toStringTag, {
//     value: "Module",
//   });

//   Object.defineProperty(exports, "__esModule", {
//     value: true,
//   });
// };

// var __webpack_exports__ = {};
// (() => {
//   "use strict";
//   require.setModuleTag(__webpack_exports__);
//   var _name__WEBPACK_IMPORTED_MODULE_0__ = require("./src/name.js");
//   var _name__WEBPACK_IMPORTED_MODULE_0___default = require.n(
//     _name__WEBPACK_IMPORTED_MODULE_0__
//   );
//   console.log(_name__WEBPACK_IMPORTED_MODULE_0___default(), "author");
// })();

// // a, b, node

const a = require("./a");
const b = require("./b");

console.log("node 入口文件");
