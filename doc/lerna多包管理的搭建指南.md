## lerna 多包架构

### 搭建环境

全局安装
npm i lerna -g

项目初始化
lerna init
npx lerna init --independent

添加子包
lerna create <pkgName>

给子包添加依赖
lerna add <moduleName> // 所有子包都添加这个依赖
lerna add <moduleName> --scope = <pkgName> // 给 scope 后的包添加依赖
lerna add <pkgName1> --scope = <pkgName2> // 给 pkgName2 中添加 pkgName1，包内的互相引用，会复制 pkgName1 到 pkgName2 中

子包更新依赖
lerna bootstrap

执行 package script
lerna run --parallel start
