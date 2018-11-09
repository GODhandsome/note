// error 事件的监听

const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.throw(501);
};

app.use(main);

app.on('error', (err, ctx) => {
  console.error('server error', err);
  }
);

app.listen(2195, () => {
  console.log('error 事件的监听链接成功')
})