// 使用koa-static
// 在127.0.0.1:2195/server1.js 可以获取静态资源
const Koa = require('koa');
const app = new Koa();
const path = require('path');
const serve = require('koa-static');

const main = serve(path.join(__dirname));

app.use(main);

app.listen(2195, () => {
  console.log('连接成功')
})