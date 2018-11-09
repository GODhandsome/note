// 异步中间件
const fs = require('fs.promised');
const Koa = require('koa');
const app = new Koa();

const main = async function (ctx, next) {
  ctx.response.type = 'html';
  ctx.response.body = await fs.readFile('./back.html', 'utf8');
};

app.use(main);
app.listen(2195, () => {
  console.log('异步中间件链接成功')
})