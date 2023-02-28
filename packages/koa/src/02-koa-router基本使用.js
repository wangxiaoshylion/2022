const Koa = require("koa");
const Router = require("koa-router");
const cors = require("@koa/cors");

const app = new Koa();
const router = new Router();
const { koaBody } = require("koa-body");

router.get("/", async (ctx) => {
  ctx.body = "从根路由过来的请求";
});

router.get("/html", async (ctx) => {
  ctx.body = ctx.originalUrl;
});

router.post("/post", (ctx) => {
  let { body } = ctx.request;
  ctx.body = `Request Body: ${JSON.stringify(body)}`;
});

app
  .use(koaBody())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen("3000", () => {
    console.log("server start at: http://localhost:3000/");
  });
