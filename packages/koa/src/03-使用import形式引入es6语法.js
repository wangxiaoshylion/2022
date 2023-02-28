// 支持es6语法引入
import koa from "koa";
const app = new koa();

app.use(async (ctx) => {
  ctx.body = "hello world";
});

app.listen(3000);
