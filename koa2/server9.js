// 错误处理
// ctx.response.status设置成404，就相当于ctx.throw(404)

const Koa = require('koa');
const app = new Koa();

const logger = (ctx, next) => {
  ctx.throw(503);
}

app.use(logger);

app.listen(2195, () => {
  console.log('错误处理链接成功')
})