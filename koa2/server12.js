// 释放 error 事件

// 需要注意的是，如果错误被try...catch捕获，就不会触发error事件。
// 这时，必须调用ctx.app.emit()，手动释放error事件，才能让监听函数生效。

const Koa = require('koa');
const compose = require('koa-compose');
const app = new Koa();

const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.type = 'html';
    ctx.response.body = '<p>Something wrong, please contact administrator.</p>';
    ctx.app.emit('error', err, ctx);
  }
};

const main = ctx => {
  ctx.throw(500);
};

const middlewares = compose([handler, main]);

app.on('error', function (err) {
  console.log('logging error ', err.message);
  console.log(err);
});

app.use(middlewares);

app.listen(2195, () => {
  console.log('释放 error 事件链接成功')
})