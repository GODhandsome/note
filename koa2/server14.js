// POST提取键值对

const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();

const main = async function (ctx) {
  const body = ctx.request.body;
  if (!body.name) ctx.throw(400, '.name required');
  ctx.body = {
    name: body.name
  };
};

app.use(koaBody());
app.use(main);
app.listen(2195, () => {
  console.log('POST提取键值对链接成功');
})