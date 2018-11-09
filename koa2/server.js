const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./router.js');
const app = new Koa();

app.use(koaBody({multipart:true}));
app.use(router.routes());

app.listen(2195, () => {
  console.log('连接成功')
})