// 自定义loader loader1
const loader1 = (source) => {
  return source + "//给你的代码加点注释：loader1";
};

// 自定义loader loader2
const loader2 = (source) => {
  return source + "//给你的代码加点注释：loader2";
};

module.exports = {
  loader1,
  loader2,
};
