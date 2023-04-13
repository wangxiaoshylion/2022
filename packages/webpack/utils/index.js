// /将\替换成/
function toUnixPath(filePath) {
  return filePath.replace(/\\/g, "/");
}

const baseDir = toUnixPath(process.cwd()); //获取工作目录，在哪里执行命令就获取哪里的目录，这里获取的也是跟操作系统有关系，要替换成/

module.exports = {
  toUnixPath,
  baseDir,
};
