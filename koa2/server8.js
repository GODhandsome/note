// 中间件合并
// 注意next要写 以及 compose顺序

const Koa = require('koa');
const compose = require('koa-compose');
const app = new Koa();

const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  next();
}

const main = ctx => {
  ctx.response.body = 'Hello World';
};

const middlewares = compose([logger, main]);

app.use(middlewares);

app.listen(2195, () => {
  console.log('中间件合并链接成功')
})