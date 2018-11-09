// 错误处理中间件
// ctx.response.status设置成404，就相当于ctx.throw(404)

const Koa = require('koa');
const app = new Koa();

const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
};

const main = ctx => {
  ctx.throw(500);
};

app.use(handler);
app.use(main);

app.listen(2195, () => {
  console.log('错误处理链接成功')
})