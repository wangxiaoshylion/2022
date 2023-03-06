// import test from "!c-loader!./test.js"; //使用内联Loader
// const a = 1;
import "./index.less";

const sum = (a, b) => a + b; //这里是个箭头函数，需要通过loader转换成普通函数
sum(1, 2);
